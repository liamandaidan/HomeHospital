import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
import RefToken from '../../models/refreshTokens.Schema.js'

const JWT_KEY = ENV.JWT_KEY
const ACCESSTOKEN_TEST_SECRET = ENV.ACCESSTOKEN_TEST_SECRET;
const REFRESHTOKEN_TEST_SECRET = ENV.REFRESHTOKEN_TEST_SECRET;

let refreshTokensTemp = [

]

function generateToken(userID) {
	//route to get a token
	let id = Math.random().toString(36).substring(2, 8)
	let limit = 60 * 3 // 180 seconds
	let expires = Math.floor(Date.now() / 1000) + limit
	const payload = {
		_id: userID,
		exp: expires,
		name: 'Mike Cann!'
	}
	const token = jwt.sign(payload, JWT_KEY)

	return token
}

/*This method generates an access token. It is called as middleware whenever a user attempts to log in. It calls the method 
to generate a refresh token as well, so there should always be both together. For the moment, the refresh token is added to a
dynamic list of refreshTokens. After proof of concept though, that list will be moved to the database. */
export function generateAccessToken(req, res, next) {
	const user = req.body;//get the users email as a unique identifier
	console.log(user.email);
	const accessToken = jwt.sign({email: user.email}, ACCESSTOKEN_TEST_SECRET, {expiresIn: "2m"});//create token, expires in 30 seconds

	const refreshToken = generateRefreshToken(user.email);//create non-expiring token with same user email
	const savedRefToken = new RefToken({email: user.email, token: refreshToken});
	savedRefToken.save();
	req.tokens = {accessT: accessToken, refreshT: refreshToken};
	next();
}

function generateRefreshToken(email) {
	const refreshToken = jwt.sign(email, REFRESHTOKEN_TEST_SECRET);
	return refreshToken;
}

/*This middleware is used to check the validity of an access token. first we get both the access and refresh tokens from the 
header. If either are missing, we return a 401 error. If both exist, we attempt to verify the access token. If it has been 
modified, or is expired, it will fail. On failure, we attempt to refresh it using the refreshToken. The refreshAccessToken 
method returns a promise. If the promise resolves, it will resolve to either a new access token, or null. If null, then the 
user is logged out, and an unauthorized status is returned. If the promise resolves with a new access token, then both tokens 
are returned to the user and the request is allowed to proceed. 
 */
export function checkAccessToken(req, res, next) {
	const authHeader = req.headers['accesstoken'];//get the whole authorization header, which is 'Bearer token'
	const token = authHeader && authHeader.split(" ")[1];//get only the actual token string, if there is one. If not, return undefined
	const refToken = req.headers['refreshtoken'];
	const user = req.headers['uemail'];
	const email = user;//need to find a way to get the email from the decoded token

	if(token && refToken){
		console.log("Line 63 Token is: " + token);
		try{
			const valid = jwt.verify(token, ACCESSTOKEN_TEST_SECRET);
			console.log("Line 66 access token still valid");
			res.locals.accessT = token;
			res.locals.refreshT = refToken;
			next();
		} catch (err){
			console.log("Line 71 access token invalid, time to check refresh token");
			refreshAccessToken(refToken, email)
			.then(newAccessToken => {
				console.log("Line 74 returned access token is: " + newAccessToken);
				if(newAccessToken){
					console.log("Line 76 NewAccessToken: " + newAccessToken);
					res.locals.accessT = newAccessToken;//res.locals is an object that carries on through all middleware
					res.locals.refreshT = refToken;
					console.log("Line 79 The access token was refreshed: " + newAccessToken);
					next();
				} else{
					console.log("Line 82 New Access Token is: " + newAccessToken);
					return res.status(401).json({message: 'Authorization1 Failed'}); 
				}
			})
		}
	} else{
		return res.status(401).json({message: 'Authorization Failed'});
	}
}

/*In this method, we are passed a refreshToken and an email, which was the payload of the original accessToken. This method returns a Promise. 
The promise will resolve upon successful execution of the mongoose query to find the refresh token in the database. If the refresh token 
cannot be found in the DB, the query returns a null value. We resolve the promise with null. If the token is found, we verify its validity. If that 
passes as well, then we generate a new access token and resolve the promise with that token. An error with the query will reject the promise.
*/
function refreshAccessToken(refreshToken, email) {
	console.log("Line 97 RefToken in refreshAccessToken method: " + refreshToken);
	console.log("Line 98 email: " + email);
	return new Promise((resolve, reject) => {
		const thing = RefToken.findOne({token: refreshToken})
		.exec()
		.then(token=>{
			if(token){
				console.log("Line 105 Arrray contains refresh token");
				console.log("Line 106 Token: " + token);
				jwt.verify(refreshToken, REFRESHTOKEN_TEST_SECRET, (err, result) => {
					if(err) {
						console.log("Line 109 Something happened in jwt.verify. refreshToken: " + refreshToken);
						reject();
					} else {
						console.log("Line 112 Token verified");
						console.log(`Result: ${result}`)
						const newAccessToken = jwt.sign({email: email}, ACCESSTOKEN_TEST_SECRET, {expiresIn: "2m"});
						console.log("Line 115 New Access Token from refreshAccessToken: " + newAccessToken);
						resolve(newAccessToken);
					}
				
				});
			} else{
				console.log("User has been invalidated!");
				resolve(null);
			}
			
		})
		.catch(err=>{
			console.log("Line 127 Error in RefToken.findOne()");
			console.log(err);
			reject();
		})
	})
	
}


/*This method invalidates a user by removing their refresh token from the database, effectively 'logging out' that user. It relies on getting 
the access and refresh tokens from the header, which we will change to cookies later */
export function invalidateRefToken(req, res, next) {
	const authHeader = req.headers['accesstoken'];//get the whole authorization header, which is 'Bearer token'
	const token = authHeader && authHeader.split(" ")[1];//get only the actual token string, if there is one. If not, return undefined
	const refToken = req.headers['refreshtoken'];
	const user = req.headers['uemail'];
	const email = user;//need to find a way to get the email from the decoded token

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
		console.log("Line 157 error: " + err);
		return res.status(401).json({message: 'Something weird happened on logout attempt'});
	}
}
export { generateToken }
