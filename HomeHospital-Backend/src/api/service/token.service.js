import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
import RefToken from '../../models/refreshTokens.Schema.js'
import { accessOptions, refreshOptions } from '../../configure/cookie.configure.js'

const ACCESSTOKEN_TEST_SECRET = ENV.ACCESSTOKEN_TEST_SECRET;
const REFRESHTOKEN_TEST_SECRET = ENV.REFRESHTOKEN_TEST_SECRET;



/*This method generates an access token. It is called as middleware whenever a user attempts to log in. It calls the method 
to generate a refresh token as well, so there should always be both together. For the moment, the refresh token is added to a
dynamic list of refreshTokens. After proof of concept though, that list will be moved to the database. */
export function generateAccessToken(req, res, next) {
	const user = req.body;//get the users email as a unique identifier
	const accessToken = jwt.sign({email: user.email}, ACCESSTOKEN_TEST_SECRET, {expiresIn: "30s"});//create token, expires in 30 seconds

	const refreshToken = generateRefreshToken(user.email);//create non-expiring token with same user email
	const savedRefToken = new RefToken({email: user.email, token: refreshToken});//have expiry on refresh token?
	savedRefToken.save();
	req.tokens = {accessT: accessToken, refreshT: refreshToken};
	res.cookie('accessTokenCookie',accessToken, accessOptions)
	res.cookie('refreshTokenCookie', refreshToken, refreshOptions)
	next();
}



function generateRefreshToken(email) {
	const refreshToken = jwt.sign(email, REFRESHTOKEN_TEST_SECRET);
	return refreshToken;
}

/*
IMPORTANT: THIS MIDDLEWARE IS THE PRIMARY ACCESS VALIDATOR FOR ALL PAGES. ANY PAGE THAT REQUIRES A USER TO BE LOGGED IN
MUST BE ROUTED THROUGH THIS MIDDLEWARE BEFORE BEING ALLOWED TO PROCEED


This middleware is used to check the validity of an access token. First we collect the access and refresh tokens from both 
the header and from cookies. If any are missing, we return a 401 error. If all exist, we check to make sure that both sets of 
tokens match each other (access token from cookie matches access token from header, etc). Next, we attempt to verify the access 
token. If it has been modified, or is expired, it will fail. On failure, we attempt to refresh it using the refreshToken. 
The refreshAccessToken method returns a promise. If the promise resolves, it will resolve to either a new access token, or null. 
If null, then the user is logged out, and an unauthorized status is returned. If the promise resolves with a new access token, 
then new cookies are generated with the access and refresh tokens, and both tokens are sent in the response, and the request is 
allowed to proceed. 
 */
export function checkAccessToken(req, res, next) {

	if(ENV.DEV_ENV ==='prod'){
		console.log('its a prod env!')
	} else if (ENV.DEV_ENV === 'dev'){
		console.log('its a dev env!')
	}
	// For dev purposes, we only want to get tokens from cookies, for ease of use. In production, we want to get tokens
	//from both cookies and headers, and compare them
	const token = req.cookies['accessTokenCookie'];
	const refToken = req.cookies['refreshTokenCookie'];

	//get tokens production. Ensure variable names match throughout.
	//const cookieAccessToken = req.cookies['accessTokenCookie'];
	//const cookieRefToken = req.cookies['refreshTokenCookie'];
	//const authHeader = req.headers['accesstoken'];//get the whole authorization header, which is 'Bearer token'
	//const headerAccessToken = authHeader && authHeader.split(" ")[1];//get only the actual token string, if there is one. If not, return undefined
	//const headerRefToken = req.headers['refreshtoken'];
	
	let allTokensPresent = false;
	if(token && refToken/* && cookieAccessToken && cookieRefToken*/)
	{
		/*if(token === cookieAccessToken && refToken === cookieRefToken)
		{
			console.log("They match!");
			allTokensPresent = true;
		}*/
		allTokensPresent = true;
	}

	if(allTokensPresent){
		try{
			const validAccessToken = jwt.verify(token, ACCESSTOKEN_TEST_SECRET);//jwt.verify returns the entire token. By accessing valid.email, we get only the payload of the token, the user's email
			console.log("Access token still valid");
			res.locals.accessT = token;
			res.locals.refreshT = refToken;
			next();
		} catch (err){
			console.log("Access token invalid, time to check refresh token");
			refreshAccessToken(refToken)
			.then(newAccessToken => {
				if(newAccessToken){
					res.locals.accessT = newAccessToken;//res.locals is an object that carries on through all middleware
					res.locals.refreshT = refToken;
					res.cookie('accessTokenCookie', newAccessToken, accessOptions)
					res.cookie('refreshTokenCookie', refToken, refreshOptions)
					next();
				} else{
					return res.status(401).json({message: 'Authorization Failed'}); 
				}
			})
		}
	} else{
		return res.status(401).json({message: 'Authorization Failed'});
	}
}

/*In this method, we are passed a refreshToken. This method returns a Promise. The promise will resolve upon successful execution of the mongoose 
query to find the refresh token in the database. If the refresh token cannot be found in the DB, the query returns a null value. We resolve the 
promise with null. If the token is found, we verify its validity. If that passes as well, then we generate a new access token and resolve the promise 
with that token. An error with the query will reject the promise.
*/
function refreshAccessToken(refreshToken) {
	return new Promise((resolve, reject) => {
		const thing = RefToken.findOne({token: refreshToken})
		.exec()
		.then(token=>{
			if(token){
				jwt.verify(refreshToken, REFRESHTOKEN_TEST_SECRET, (err, result) => {
					if(err) {
						reject();
					} else {
						const email = result;
						console.log("Email from refresh token is " + email);
						const newAccessToken = jwt.sign({email: email}, ACCESSTOKEN_TEST_SECRET, {expiresIn: "30s"});
						resolve(newAccessToken);
					}
				});
			} else{
				console.log("User has been invalidated!");
				resolve(null);
			}
		})
		.catch(err=>{
			console.log(err);
			reject();
		})
	})	
}


/*This method invalidates a user by removing their refresh token from the database, effectively 'logging out' that user. This functionality is
backstopped in the logout route, which also clears the cookies containing the user's tokens.*/
export function invalidateRefToken(req, res, next) {
	const authHeader = req.headers['accesstoken'];//get the whole authorization header, which is 'Bearer token'
	//const token = authHeader && authHeader.split(" ")[1];//get only the actual token string, if there is one. If not, return undefined
	//const refToken = req.headers['refreshtoken'];
	const user = req.headers['uemail'];
	const email = user;//need to find a way to get the email from the decoded token

	const token = req.cookies['accessTokenCookie'];
	const refToken = req.cookies['refreshTokenCookie'];

	if(token && refToken){
		RefToken.findOneAndDelete({token: refToken})
		.exec()
		.then(deleted => {
			console.log("Successfully deleted: " + deleted);
			next();
		})
		.catch(err =>{
			console.log("Line 153 error: " + err);
			return res.status(401).json({message: 'Something weird happened on logout attempt'});
		});
	} else{
		console.log("Line 157 error");
		return res.status(401).json({message: 'Something weird happened on logout attempt'});
	}
}
