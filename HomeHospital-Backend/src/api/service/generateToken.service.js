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
modified, or is expired, it will fail. On failure, we attempt to refresh it using the refreshToken. If that succeeds, the 
new accessToken is passed to the response, along with the refreshToken, and the next() method is invoked. Otherwise, error 
401 is returned. 
 */
export async function checkAccessToken(req, res, next) {
	const authHeader = req.headers['accesstoken'];//get the whole authorization header, which is 'Bearer token'
	const token = authHeader && authHeader.split(" ")[1];//get only the actual token string, if there is one. If not, return undefined
	const refToken = req.headers['refreshtoken'];
	const user = req.headers['uemail'];
	const email = user;//need to find a way to get the email from the decoded token

	console.log(token);
	console.log(req.headers);
	if(token && refToken){
		console.log("Line 62 Token is: " + token);
		jwt.verify(token, ACCESSTOKEN_TEST_SECRET, async (err, tokenstring) => {
			console.log("Line 64 reached");
			if(err){
				console.error('before the refresh access token')
				const newAccessToken = await refreshAccessToken(refToken, email);
				console.log(newAccessToken)
					if(newAccessToken){
						console.log("Line 67 NewAccessToken: " + newAccessToken);
						res.locals.accessT = newAccessToken;//res.locals is an object that carries on through all middleware
						res.locals.refreshT = refToken;
						console.log("Line 70 The access token was refreshed: " + newAccessToken);
						next();
					} else{
						console.log("Line 74 New Access Token is: " + newAccessToken);
						return res.status(401).json({message: 'Authorization1 Failed'});
					}
				//try to refresh the access token
			} else{
				res.locals.accessT = token;
				res.locals.refreshT = refToken;
				next();//token is still valid, we can proceed
			}
		})
	} else{
		return res.status(401).json({message: 'Authorization Failed'});
	}
}

/*In this method, we are passed a refreshToken and an email, which was the payload of the original accessToken. First we
check to see if the refresh token exists in the list of valid refresh tokens. If it does, we attempt to verify the token 
to ensure there has been no tampering. If that succeeds, we generate a new accessToken using the same payload, secret, and 
expiration time, and return it. Any failures return null. 
*/
async function refreshAccessToken(refreshToken, email) {
	console.log("Line 95 RefToken in refreshAccessToken method: " + refreshToken);
	console.log("Line 96 email: " + email);
	//const savedRefToken = RefToken.findOne({ token: refreshToken })
	const savedRefToken = await RefToken.findOne({token: refreshToken}, function (err, token){
		if(err){
			console.log("Line 100 Error in RefToken.findOne()");
			console.log(err);
			return null;
		}
		if(token){
			console.log("Line 105 Arrray contains refresh token");
			console.log("Line 106 Token: " + token);
			jwt.verify(refreshToken, REFRESHTOKEN_TEST_SECRET, (err, result) => {
				if(err) {
					console.log("Line 109 Something happened in jwt.verify. refreshToken: " + refreshToken);
					return null;
				} else {
					console.log("Line 112 Token verified");
					console.log(`Result: ${result}`)
					const newAccessToken = jwt.sign({email: email}, ACCESSTOKEN_TEST_SECRET, {expiresIn: "2m"});
					console.log("Line 114 New Access Token from refreshAccessToken: " + newAccessToken);
					return newAccessToken;
				}
			
		});
		}
		
	})
	return savedRefToken
}

/*
function refreshAccessToken(refreshToken, email) {
	console.log("RefToken in refreshAccessToken method: " + refreshToken);
	console.log("email: " + email);
	//const savedRefToken = RefToken.findOne({ token: refreshToken })
	const savedRefToken = RefToken.findOne({token: refreshToken}, function (err, token){
		
	})
	console.log("Result from DB: " + savedRefToken);
	if(savedRefToken) {
		console.log("Arrray contains refresh token");
		jwt.verify(refreshToken, REFRESHTOKEN_TEST_SECRET, (err, result) => {
			if(err) {
				console.log("Something happened in jwt.verify. refreshToken: " + refreshToken);
				return null;
			} else {
				console.log("Token verified");
				const newAccessToken = jwt.sign({email: email}, ACCESSTOKEN_TEST_SECRET, {expiresIn: "2m"});
				console.log("New Access Token from refreshAccessToken: " + newAccessToken);
				return newAccessToken;
			}
			
		});
	} else{
		console.log("DB doesn't contain token. RefreshToken: " + refreshToken);
		return null;
	}


}
 */

export function logoutUser(req, res, next) {

}
export { generateToken }
