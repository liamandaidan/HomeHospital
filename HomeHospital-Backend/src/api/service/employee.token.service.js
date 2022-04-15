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

const EMPLOYEE_ACCESS_KEY = ENV.EMPLOYEEACCESSTOKEN_SECRET
const EMPLOYEE_REFRESH_KEY = ENV.EMPLOYEEREFRESHTOKEN_SECRET

/**
 * @function
 * @summary Generate access and refresh tokens for practitioners and admins
 *
 * @description This method generates an access token. Every login attempt will have an email, but an administrator logging in will have an adminId, whereas a
 * practitioner logging in will have a practitionerId. We try to get both, and see which one returns an actual value to figure out which
 * type of user is logging in, then add that to the access token payload
 *
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns error message if it runs into a problem, calls next() otherwise
 */
export const generateEmployeeAccessToken = (req, res, next) => {
	const user = req.body //get the users email as a unique identifier
	const isAnAdmin = req.adminId
	const isAPractitioner = req.practitionerId
	let accessToken
	if (isAnAdmin) {
		accessToken = jwt.sign(
			{ email: user.email, adminId: req.adminId },
			EMPLOYEE_ACCESS_KEY,
			{ expiresIn: '30s' }
		)
		const refreshToken = generateEmployeeRefreshToken(user.email)
	} else if (isAPractitioner) {
		accessToken = jwt.sign(
			{ email: user.email, practitionerId: req.practitionerId },
			EMPLOYEE_ACCESS_KEY,
			{ expiresIn: '30s' }
		)
		const refreshToken = generateEmployeeRefreshToken(user.email)
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

/**
 * @function
 * @summary Generate refresh token for employee
 *
 * @description This method is called by the generateEmployeeAccessToken method. It is passed the employee's email and simply returns
 * a new non-expiring token with the email as the payload for storage in the login database
 *
 * @param {string} email
 * @returns {string} a refreshToken string
 */
const generateEmployeeRefreshToken = (email) => {
	const refreshToken = jwt.sign(email, EMPLOYEE_REFRESH_KEY)
	return refreshToken
}

/*
IMPORTANT: THIS MIDDLEWARE IS THE PRIMARY ACCESS VALIDATOR FOR ALL PAGES. ANY PAGE THAT REQUIRES A USER TO BE LOGGED IN
MUST BE ROUTED THROUGH THIS MIDDLEWARE BEFORE BEING ALLOWED TO PROCEED
*/

/**
 * @function
 * @summary Checks the employees access token
 *
 * @description This middleware is used to check the validity of an access token. First we collect the access and refresh tokens from both
 * the header and from cookies. If any are missing, we return a 401 error. If all exist, we check to make sure that both sets of
 * tokens match each other (access token from cookie matches access token from header, etc). Next, we attempt to verify the access
 * token. If it has been modified, or is expired, it will fail. On failure, we attempt to refresh it using the refreshToken.
 * The refreshAccessToken method returns a promise. If the promise resolves, it will resolve to either a new access token, or null.
 * If null, then the user is logged out, and an unauthorized status is returned. If the promise resolves with a new access token,
 * then new cookies are generated with the access and refresh tokens, and both tokens are sent in the response, and the request is
 * allowed to proceed.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns an error message to the response if it encounters an error, otherwise calls next(), and passes cookies to the response object
 */
export const checkEmployeeAccessToken = async (req, res, next) => {
	let accessToken = req.cookies['accessTokenCookie']
	const refreshToken = req.cookies['refreshTokenCookie']

	let allTokensPresent = false
	if (accessToken && refreshToken) allTokensPresent = true

	if (allTokensPresent) {
		try {
			const validAccessToken = jwt.verify(
				accessToken,
				EMPLOYEE_ACCESS_KEY
			)
			//jwt.verify returns the entire token. By accessing valid.email, we get only the payload of the token, the user's email
			res.locals.accessT = accessToken
			res.locals.refreshT = refreshToken

			const isAnAdmin = validAccessToken?.adminId
			const isAPractitioner = validAccessToken?.practitionerId
			if (isAnAdmin) {
				req.adminId = validAccessToken.adminId
			} else if (isAPractitioner) {
				req.practitionerId = validAccessToken.practitionerId
			} else {
				return res.status(401).json({ message: 'Verification Failed' })
			}
			next()
		} catch (err) {
			console.log(`${new Date()}n\tError:  ${err.message}`)
			if (err.name == 'TokenExpiredError') {
				refreshEmployeeAccessToken(refreshToken, accessToken).then(
					(newAccessToken) => {
						if (newAccessToken) {
							// Get the patientId from the new access token and attach it to the request
							const { adminId, practitionerId } =
								jwt.decode(newAccessToken)
							if (adminId) {
								req.adminId = adminId
							} else if (practitionerId) {
								req.practitionerId = practitionerId
							} else {
								return res.status(401).json({
									message: 'No idea what happened here',
								})
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
							res.status(401).json({
								message: 'Authorization Failed',
							})
							return
						}
					}
				)
			} else {
				console.log(
					'Someone fiddled with the access token. No soup for you!'
				)
				console.log(`${new Date()}n\tError:  ${err.message}`)
				res.status(401).send({ message: 'Authorization Failed' })
				return
			}
		}
	} else {
		res.status(401).json({ message: 'Authorization Failed' })
		return
	}
}

/**
 * @function
 * @summary Refresh the employee access token
 *
 * @description In this method, we are passed a refreshToken. This method returns a Promise. The promise will resolve upon successful execution of the mongoose
 * query to find the refresh token in the database. If the refresh token cannot be found in the DB, the query returns a null value. We resolve the
 * promise with null. If the token is found, we verify its validity. If that passes as well, we perform a check to see if the user is an administrator
 * or a practitioner, in order to provide the proper payload. Then we generate a new access token and resolve the promise with that token. An error
 * with the query will reject the promise.
 * @param {jwt} refreshToken
 * @param {jwt} oldAccessToken
 * @returns a promise that resolves to a new access token string
 */
const refreshEmployeeAccessToken = (refreshToken, oldAccessToken) => {
	return new Promise((resolve, reject) => {
		RefToken.findOne({ token: refreshToken })
			.exec()
			.then((token) => {
				if (token) {
					const oldPayload = jwt.decode(oldAccessToken)

					jwt.verify(
						refreshToken,
						EMPLOYEE_REFRESH_KEY,
						(err, result) => {
							if (err) {
								reject()
							} else {
								const email = result
								let newAccessToken
								const isAnAdmin = oldPayload.adminId
								const isAPractitioner =
									oldPayload.practitionerId

								if (isAnAdmin) {
									newAccessToken = jwt.sign(
										{
											email: email,
											adminId: oldPayload.adminId,
										},
										EMPLOYEE_ACCESS_KEY,
										{ expiresIn: '5m' }
									)
								} else if (isAPractitioner) {
									const iDNum = oldPayload.practitionerId
									newAccessToken = jwt.sign(
										{
											email: email,
											practitionerId:
												oldPayload.practitionerId,
										},
										EMPLOYEE_ACCESS_KEY,
										{ expiresIn: '30s' }
									)
								} else {
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
				console.log(`${new Date()}n\tError:  ${err.message}`)
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
export const invalidateEmployeeRefToken = (req, res, next) => {
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
				console.log(`${new Date()}n\tError:  ${err.message}`)
				return res.status(401).json({
					message: 'Something weird happened on logout attempt',
				})
			})
	}
}
