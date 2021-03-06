import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
import RefToken from '../../models/refreshTokens.Schema.js'
import {
	accessOptions,
	refreshOptions,
} from '../../configure/cookie.configure.js'

const ACCESSTOKEN_KEY = ENV.PATIENTACCESSTOKEN_SECRET
const REFRESHTOKEN_KEY = ENV.PATIENTREFRESHTOKEN_SECRET

/**
 * @function
 * @summary Generate access token for user
 *
 * @description This method generates an access token. It is called as middleware whenever a user attempts to log in. It calls the method
 * to generate a refresh token as well, so there should always be both together.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 */
export const generateAccessToken = (req, res, next) => {
	const user = req.body //get the users email as a unique identifier
	const id = req.patientId
	const accessToken = jwt.sign(
		{ email: user.email, patientId: req.patientId },
		ACCESSTOKEN_KEY,
		{ expiresIn: '30s' }
	) //create token, expires in 30 seconds
	const refreshToken = generateRefreshToken(user.email) //create non-expiring token with same user email
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

/**
 * @function
 * @summary Generate refresh token
 *
 * @description This method is called by the generateEmployeeAccessToken method. It is passed the employee's email and simply returns
 * a new non-expiring token with the email as the payload for storage in the login database
 * @param {string} email
 * @returns {jwt} a refresh token string
 */
const generateRefreshToken = (email) => {
	const refreshToken = jwt.sign(email, REFRESHTOKEN_KEY)
	return refreshToken
}

/*
IMPORTANT: THIS MIDDLEWARE IS THE PRIMARY ACCESS VALIdATOR FOR ALL PAGES. ANY PAGE THAT REQUIRES A USER TO BE LOGGED IN
MUST BE ROUTED THROUGH THIS MIdDLEWARE BEFORE BEING ALLOWED TO PROCEED


This middleware is used to check the validity of an access token. First we collect the access and refresh tokens from both 
the header and from cookies. If any are missing, we return a 401 error. If all exist, we check to make sure that both sets of 
tokens match each other (access token from cookie matches access token from header, etc). Next, we attempt to verify the access 
token. If it has been modified, or is expired, it will fail. If it succeeds, we call the function to check to ensure that the 
access token belongs to a user type authorized to view a patient page. On failure, we attempt to refresh it using the refreshToken. 
The refreshAccessToken method returns a promise. If the promise resolves, it will resolve to either a new access token, or null. 
If null, then the user is logged out, and an unauthorized status is returned. If the promise resolves with a new access token, 
then new cookies are generated with the access and refresh tokens, and both tokens are sent in the response, and the request is 
allowed to proceed. 
 */
/**
 * @function
 * @summary Check access token for validity and expiration
 *
 * @description This middleware is used to check the validity of an access token. First we collect the access and refresh tokens from both
 * the header and from cookies. If any are missing, we return a 401 error. If all exist, we check to make sure that both sets of
 * tokens match each other (access token from cookie matches access token from header, etc). Next, we attempt to verify the access
 * token. If it has been modified, or is expired, it will fail. If it succeeds, we call the function to check to ensure that the
 * access token belongs to a user type authorized to view a patient page. On failure, we attempt to refresh it using the refreshToken.
 * The refreshAccessToken method returns a promise. If the promise resolves, it will resolve to either a new access token, or null.
 * If null, then the user is logged out, and an unauthorized status is returned. If the promise resolves with a new access token,
 * then new cookies are generated with the access and refresh tokens, and both tokens are sent in the response, and the request is
 * allowed to proceed.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns an error message if something goes wrong, otherwise calls next(). May also pass a new access token to the repsonse object
 * if one was generated
 */
export const checkAccessToken = async (req, res, next) => {
	try {
		const accessToken = req.cookies['accessTokenCookie']
		const refreshToken = req.cookies['refreshTokenCookie']

		let allTokensPresent = false
		if (accessToken && refreshToken) {
			allTokensPresent = true
		}

		if (allTokensPresent) {
			try {
				const validAccessToken = jwt.verify(
					accessToken,
					ACCESSTOKEN_KEY
				)

				// check to ensure that the type of user making the request is a patient
				if (!checkAccessAuthorized(validAccessToken)) {
					return res
						.status(401)
						.json({ message: 'Authorization Failed' })
				}
				res.locals.accessT = accessToken
				res.locals.refreshT = refreshToken
				req.patientId = validAccessToken.patientId
				next()
			} catch (err) {
				if (err.name == 'TokenExpiredError') {
					if (!checkAccessAuthorized(jwt.decode(accessToken))) {
						return res
							.status(401)
							.json({ message: 'Authorization Failed' })
					}
					refreshAccessToken(refreshToken, accessToken).then(
						(newAccessToken) => {
							if (newAccessToken) {
								// Get the patientId from the new access token and attach it to the request
								const { patientId } = jwt.decode(newAccessToken)
								req.patientId = patientId
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
					console.log(`${new Date()}\tError:  ${err.message}`)
					res.status(401).send({ message: 'Authorization Failed' })
					return
				}
			}
		} else {
			res.status(401).json({ message: 'Authorization Failed' })
			return
		}
	} catch (error) {
		console.log(`${new Date()}\tError:  ${error.message}`)
		res.status(400).send({ message: 'Error' })
		return
	}
}

/**
 * @function
 * @summary Refresh the access token using the refresh token
 *
 * @description In this method, we are passed a refreshToken. This method returns a Promise. The promise will resolve upon successful execution of the mongoose
 * query to find the refresh token in the database. If the refresh token cannot be found in the DB, the query returns a null value. We resolve the
 * promise with null. If the token is found, we verify its validity. If that passes as well, then we generate a new access token and resolve the promise
 * with that token. An error with the query will reject the promise.
 * @param {jwt} refreshToken
 * @param {jwt} oldAccessToken
 * @returns a promise that resolves to a new access token string
 */
const refreshAccessToken = (refreshToken, oldAccessToken) => {
	return new Promise((resolve, reject) => {
		RefToken.findOne({ token: refreshToken })
			.exec()
			.then((token) => {
				if (token) {
					jwt.verify(
						refreshToken,
						REFRESHTOKEN_KEY,
						(err, result) => {
							if (err) {
								reject()
							} else {
								const email = result
								const oldPayload = jwt.decode(oldAccessToken)
								const pId = oldPayload.patientId
								const newAccessToken = jwt.sign(
									{ email: email, patientId: pId },
									ACCESSTOKEN_KEY,
									{ expiresIn: '30s' }
								)
								resolve(newAccessToken)
							}
						}
					)
				} else {
					resolve(null)
				}
			})
			.catch((err) => {
				console.log(`${new Date()}\tError:  ${err.message}`)
				reject()
			})
	})
}

/**
 * @function
 * @summary Logout method
 *
 * @description This method invalidates a user by removing their refresh token from the database, effectively 'logging out' that user. This functionality is
 * backstopped in the logout route, which also clears the cookies containing the user's tokens.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 */
export const invalidateRefToken = (req, res, next) => {
	const token = req.cookies['accessTokenCookie']
	const refToken = req.cookies['refreshTokenCookie']

	if (token && refToken) {
		RefToken.findOneAndDelete({ token: refToken })
			.exec()
			.then((deleted) => {
				next()
			})
			.catch((err) => {
				return res.status(401).json({
					message: 'Something weird happened on logout attempt',
				})
			})
	} else {
		RefToken.findOneAndDelete({ token: refToken })
			.exec()
			.then((deleted) => {
				next()
			})
			.catch((err) => {
				console.log(`${new Date()}\tError:  ${err.message}`)
				return res.status(401).json({
					message: 'Something weird happened on logout attempt',
				})
			})
	}
}

/**
 * @function
 * @summary Check that user is a patient
 *
 * @description This method simply checks to ensure that the user who is attempting to access the page is a patient. This method
 * is called in the checkAccessToken method, which is middleware placed on every page that a patient alone should
 * have access to
 * @param {string} validAccessToken the payload of a decoded token
 * @returns {boolean} true if user is a patient, false otherwise
 */
const checkAccessAuthorized = (validAccessToken) => {
	const userType = validAccessToken.patientId
	if (userType) {
		return true
	} else {
		return false
	}
}
