/**
 * This file is mostly identical to token.service.js, but modified for hospital employees. This was done to avoid cluttering up the patient token.service with
 * unnecessary conditionals to check for the user type
 */
import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
import RefToken from '../../models/refreshTokens.Schema.js'
import {
	accessOptions,
	refreshOptions,
} from '../../configure/cookie.configure.js'
import PatientModel from '../../models/patient.Model.js'
import PractitionerModel from '../../models/practitioner.Model.js'
import AdministratorModel from '../../models/administrator.Model.js'
//import PractitionerModel from '../../models/practitioner.Model.js'

const ACCESSTOKEN_TEST_SECRET = ENV.ACCESSTOKEN_TEST_SECRET
const REFRESHTOKEN_TEST_SECRET = ENV.REFRESHTOKEN_TEST_SECRET

/*This method generates an access token. Every login attempt will have an email, but an administrator logging in will have an adminId, whereas a 
practitioner logging in will have a practitionerId. We try to get both, and see which one returns an actual value to figure out which 
type of user is logging in */
export const generateEmployeeAccessToken = (req, res, next) => {
	const user = req.body //get the users email as a unique identifier
	const isAnAdmin = req.adminId
	const isAPractitioner = req.practitionerId
	console.log("isAnAdmin in generate: " + isAnAdmin);
	console.log("isAPractitioner in generate: " + isAPractitioner);
	let accessToken
	if(isAnAdmin) {
		accessToken = jwt.sign(
			{ email: user.email, adminId: req.adminId },
			ACCESSTOKEN_TEST_SECRET,
			{ expiresIn: '30s' }
		) 
	} else if (isAPractitioner) {
		accessToken = jwt.sign(
			{ email: user.email, practitionerId: req.practitionerId },
			ACCESSTOKEN_TEST_SECRET,
			{ expiresIn: '30s' }
		) 
	} else {
		return res.status(401).json({ message: 'Authorization Failed' })
	}

	const refreshToken = generateEmployeeRefreshToken(user.email) //create non-expiring token with same user email
	const savedRefToken = new RefToken({
		email: user.email,
		token: refreshToken,
	}) //have expiry on refresh token?
	savedRefToken.save()
	req.tokens = { accessT: accessToken, refreshT: refreshToken }
	res.cookie('accessTokenCookie', accessToken, accessOptions)
	res.cookie('refreshTokenCookie', refreshToken, refreshOptions)
	next()
}

const generateEmployeeRefreshToken = (email) => {
	const refreshToken = jwt.sign(email, REFRESHTOKEN_TEST_SECRET)
	return refreshToken
}

/*
IMPORTANT: THIS MIdDLEWARE IS THE PRIMARY ACCESS VALIdATOR FOR ALL PAGES. ANY PAGE THAT REQUIRES A USER TO BE LOGGED IN
MUST BE ROUTED THROUGH THIS MIdDLEWARE BEFORE BEING ALLOWED TO PROCEED


This middleware is used to check the validity of an access token. First we collect the access and refresh tokens from both 
the header and from cookies. If any are missing, we return a 401 error. If all exist, we check to make sure that both sets of 
tokens match each other (access token from cookie matches access token from header, etc). Next, we attempt to verify the access 
token. If it has been modified, or is expired, it will fail. On failure, we attempt to refresh it using the refreshToken. 
The refreshAccessToken method returns a promise. If the promise resolves, it will resolve to either a new access token, or null. 
If null, then the user is logged out, and an unauthorized status is returned. If the promise resolves with a new access token, 
then new cookies are generated with the access and refresh tokens, and both tokens are sent in the response, and the request is 
allowed to proceed. 
 */
export const checkEmployeeAccessToken = async (req, res, next) => {
	if (ENV.DEV_ENV === 'prod') {
		console.log('its a prod env!')
	} else if (ENV.DEV_ENV === 'dev') {
		console.log('its a dev env!')
	}
	// For dev purposes, we only want to get tokens from cookies, for ease of use. In production, we want to get tokens
	//from both cookies and headers, and compare them
	const accessToken = req.cookies['accessTokenCookie']
	const refreshToken = req.cookies['refreshTokenCookie']

	//get tokens production. Ensure variable names match throughout.
	//const cookieAccessToken = req.cookies['accessTokenCookie'];
	//const cookieRefToken = req.cookies['refreshTokenCookie'];
	//const authHeader = req.headers['accesstoken'];//get the whole authorization header, which is 'Bearer token'
	//const headerAccessToken = authHeader && authHeader.split(" ")[1];//get only the actual token string, if there is one. If not, return undefined
	//const headerRefToken = req.headers['refreshtoken'];

	let allTokensPresent = false
	if (
		accessToken &&
		refreshToken /* && cookieAccessToken && cookieRefToken*/
	) {
		/*if(token === cookieAccessToken && refToken === cookieRefToken)
		{
			console.log("They match!");
			allTokensPresent = true;
		}*/
		allTokensPresent = true
	}

	if (allTokensPresent) {
		try {
			const validAccessToken = jwt.verify(
				accessToken,
				ACCESSTOKEN_TEST_SECRET
			) //jwt.verify returns the entire token. By accessing valid.email, we get only the payload of the token, the user's email
			// console.log(`Access token still valid: ${validAccessToken.email}`)
			res.locals.accessT = accessToken
			res.locals.refreshT = refreshToken
			// if(!checkAccessAuthorized(jwt.decode(validAccessToken))) {
			// 	return res.status(401).json({ message: 'Authorization Failed' })
			// }
			const isAnAdmin = validAccessToken.adminId
			const isAPractitioner = validAccessToken.practitionerId
			console.log("validAccessToken is: " + validAccessToken);
			if(isAnAdmin) {
				req.adminId = validAccessToken.adminId
				console.log("User is an administrator, adminId is " + validAccessToken.adminId);
			} else if(isAPractitioner) {
				req.practitionerId = validAccessToken.practitionerId
				console.log("User is a practitioner, practitionerId is " + validAccessToken.practitionerId);
			} else {
				console.log("User does not exist in the system");
				return res.status(401).json({ message: 'Verification Failed' })
			}
			next()
		} catch (err) {
			if (err.name == 'TokenExpiredError') {
				console.log('Token is expired')
				console.log('Access token invalid, time to check refresh token')
				refreshEmployeeAccessToken(refreshToken, accessToken).then(
					(newAccessToken) => {
						if (newAccessToken) {
							// Get the patientId from the new access token and attach it to the request
							const { adminId, practitionerId } = jwt.decode(newAccessToken)
							console.log("Successfully returned from refreshEmployeeAccessToken. adminId from token is: " + adminId + " and practitionerId is: " + practitionerId);
							if(adminId) {
								req.adminId = adminId
							} else if(practitionerId) {
								req.practitionerId = practitionerId
							} else {
								return res.status(401).json({ message: 'No idea what happened here' })
							}
							res.locals.accessT = newAccessToken //res.locals is an object that carries on through all middleware
							res.locals.refreshT = refreshToken
							res.cookie(
								'accessTokenCookie',
								newAccessToken,
								accessOptions
							)
							res.cookie(
								'refreshTokenCookie',
								refreshToken,
								refreshOptions
							)
							next()
						} else {
							return res
								.status(401)
								.json({ message: 'Authorization Failed' })
						}
					}
				)
			} else {
				console.log(
					'Someone fiddled with the access token. No soup for you!'
				)
				console.log(err);
				return res.status(401).send({ message: 'Authorization Failed' })
			}
		}
	} else {
		console.log("One or more tokens wasn't present");
		res.status(401).json({ message: 'Authorization Failed' })
		return
	}
}

/*In this method, we are passed a refreshToken. This method returns a Promise. The promise will resolve upon successful execution of the mongoose 
query to find the refresh token in the database. If the refresh token cannot be found in the DB, the query returns a null value. We resolve the 
promise with null. If the token is found, we verify its validity. If that passes as well, then we generate a new access token and resolve the promise 
with that token. An error with the query will reject the promise.
*/
const refreshEmployeeAccessToken = (refreshToken, oldAccessToken) => {
	return new Promise((resolve, reject) => {
		const thing = RefToken.findOne({ token: refreshToken })
			.exec()
			.then((token) => {
				if (token) {
					jwt.verify(
						refreshToken,
						REFRESHTOKEN_TEST_SECRET,
						(err, result) => {
							if (err) {
								reject()
							} else {
								const email = result
								const oldPayload = jwt.decode(oldAccessToken)
								let newAccessToken
								const isAnAdmin = oldPayload.adminId
								const isAPractitioner = oldPayload.practitionerId
								console.log("oldPayload is: " + oldPayload);
								console.log("oldPayload adminId is: " + isAnAdmin);
								console.log("oldPayload practitionerNum is: " + isAPractitioner);
								if(isAnAdmin) {
									newAccessToken = jwt.sign(
										{ email: email, adminId: oldPayload.adminId },
										ACCESSTOKEN_TEST_SECRET,
										{ expiresIn: '30s' }
									)
									console.log("User is an administrator, adminId is " + oldPayload.adminId);
								} else if(isAPractitioner) {
									const iDNum = oldPayload.practitionerId
									newAccessToken = jwt.sign(
										{ email: email, practitionerId: oldPayload.practitionerId },
										ACCESSTOKEN_TEST_SECRET,
										{ expiresIn: '30s' }
									)
									console.log("User is a practitioner, practitionerId is " + oldPayload.practitionerId);
								} else {
									console.log("Refresh failed on old access token decode");
									reject()
								}
								resolve(newAccessToken)
							}
						}
					)
				} else {
					console.log('User has been invalidated!')
					resolve(null)
				}
			})
			.catch((err) => {
				console.log(err)
				reject()
			})
	})
}

/*This method invalidates a user by removing their refresh token from the database, effectively 'logging out' that user. This functionality is
backstopped in the logout route, which also clears the cookies containing the user's tokens.*/
export const invalidateEmployeeRefToken = (req, res, next) => {
	const authHeader = req.headers['accesstoken'] //get the whole authorization header, which is 'Bearer token'
	//const token = authHeader && authHeader.split(" ")[1];//get only the actual token string, if there is one. If not, return undefined
	//const refToken = req.headers['refreshtoken'];
	const user = req.headers['uemail']
	const email = user //need to find a way to get the email from the decoded token

	const token = req.cookies['accessTokenCookie']
	const refToken = req.cookies['refreshTokenCookie']

	if (token && refToken) {
		RefToken.findOneAndDelete({ token: refToken })
			.exec()
			.then((deleted) => {
				console.log('Successfully deleted: ' + deleted)
				next()
			})
			.catch((err) => {
				//console.log('Line 153 error: ' + err)
				return res.status(401).json({
					message: 'Something weird happened on logout attempt',
				})
			})
	} else {
		RefToken.findOneAndDelete({ token: refToken })
			.exec()
			.then((deleted) => {
				console.log('Successfully deleted: ' + deleted)
				console.log("Note, one of the tokens wasn't present");
				next()
			})
			.catch((err) => {
				console.log("Refresh token wasn't present: " + err)
				return res.status(401).json({
					message: 'Something weird happened on logout attempt',
				})
			})
		
		// console.log('Line 157 error')
		// return res
		// 	.status(401)
		// 	.json({ message: 'Something weird happened on logout attempt' })
	}
}

// const checkAccessAuthorized = (validAccessToken) => {
// 	const userType = validAccessToken.patientId;
// 	if(userType) {
// 		return true;
// 	} else {
// 		console.log("Not a patient. Go find your own page!");
// 		return false;
// 	}
// }
