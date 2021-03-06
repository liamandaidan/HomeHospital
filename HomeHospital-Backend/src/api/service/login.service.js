import bcrypt from 'bcryptjs'
import PatientModel from '../../models/patient.Model.js'
import PractitionerModel from '../../models/practitioner.Model.js'
import AdministratorModel from '../../models/administrator.Model.js'
import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
import RefToken from '../../models/refreshTokens.Schema.js'

const { compare } = bcrypt

/**
 * @function
 * @summary Method to log a patient in
 *
 * @description The user's email and password are taken in and checked for null or blank values. Then
 * the patient database is checked for a user matching the provided email. Emails must be unique within a user database,
 * so this will return either one user, or null. A null return means the email didn't match, and the user is
 * denied access. If a matching user is found, the provided password is compared to the stored password. Assuming
 * that matches as well, another method call is made to check if they are already logged in (allowing a dual login
 * would present problems at logout). If they are, then the rest of the routing is cancelled with a return, which
 * allows the user to be taken to an authorized page. If not, then the route continues to the next middleware.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns a status to the response object, either on success or failure
 */
export const logUserIn = async (req, res, next) => {
	const { email, password } = req.body

	if (
		email == null ||
		email == undefined ||
		password == null ||
		password == undefined
	) {
		res.status(403).send({ message: 'Login Failed!!!' })
		console.log('One or more fields are missing')
		return
	}

	const patient = await PatientModel.findOne({ email: email })

	if (patient) {
		const isAuthorized = await compare(password, patient.password)
		if (isAuthorized) {
			const isAlreadyLoggedIn = await checkPatientAlreadyLoggedIn(req)
			if (isAlreadyLoggedIn === email) {
				console.log('User is already logged in!')
				res.status(202).send({ message: 'Already Logged in' })
				return
			} else if (isAlreadyLoggedIn === 'bad token') {
				res.status(403).send({ message: 'Login Failed!!!' })
				console.log('Bad token')
				return
			} else {
				req.patientId = patient._id
				res.locals.patientId = patient.id
				next()
			}
		} else {
			res.status(403).send({ message: 'Login Failed!!!' })
			return
		}
		//next()
	} else {
		res.status(403).send({ message: 'Login Failed!!!' })
		return
	}
}

/**
 * @function
 * @summary Method to log an administrator in
 *
 * @description The user's email and password are taken in and checked for null or blank values. Then
 * the administrator database is checked for a user matching the provided email. Emails must be unique within a user
 * database, so this will return either one user, or null. A null return means the email didn't match, and the user is
 * denied access. If a matching user is found, the provided password is compared to the stored password. Assuming
 * that matches as well, another method call is made to check if they are already logged in (allowing a dual login
 * would present problems at logout). If they are, then the rest of the routing is cancelled with a return, which
 * allows the user to be taken to an authorized page. If not, then the route continues to the next middleware.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns a status to the response object, either on success or failure
 */
export const logAdministratorIn = async (req, res, next) => {
	const { email, password } = req.body

	if (
		email == null ||
		email == undefined ||
		password == null ||
		password == undefined
	) {
		res.status(403).send({ message: 'Login Failed!!!' })
		return
	}

	const administrator = await AdministratorModel.findOne({ email: email }) //returns null if not found

	if (administrator) {
		const isAuthorized = await compare(password, administrator.password)
		if (isAuthorized) {
			const isAlreadyLoggedIn = await checkAdminAlreadyLoggedIn(req)
			if (isAlreadyLoggedIn === email) {
				res.status(202).send({ message: 'Already Logged in' })
				return
			} else if (isAlreadyLoggedIn === 'bad token') {
				res.status(403).send({ message: 'Login Failed!!!' })
				return
			} else {
				req.adminId = administrator.adminId
				res.locals.adminId = administrator.id
				next()
			}
		} else {
			res.status(403).send({ message: 'Login Failed!!!' })
			return
		}
	} else {
		res.status(403).send({ message: 'Login Failed!!!' })
		return
	}
}

/**
 * @function
 * @summary Method to log a practitioner in
 *
 * @description The user's email and password are taken in and checked for null or blank values. Then
 * the practitioner database is checked for a user matching the provided email. Emails must be unique within a user database,
 * so this will return either one user, or null. A null return means the email didn't match, and the user is
 * denied access. If a matching user is found, the provided password is compared to the stored password. Assuming
 * that matches as well, another method call is made to check if they are already logged in (allowing a dual login
 * would present problems at logout). If they are, then the rest of the routing is cancelled with a return, which
 * allows the user to be taken to an authorized page. If not, then the route continues to the next middleware.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns a status to the response object, either on success or failure
 */
export const logPractitionerIn = async (req, res, next) => {
	const { email, password } = req.body

	if (
		email == null ||
		email == undefined ||
		password == null ||
		password == undefined
	) {
		res.status(403).send({ message: 'Login Failed!!!' })
		return
	}

	const practitioner = await PractitionerModel.findOne({ email: email }) //returns null if not found

	if (practitioner) {
		const isAuthorized = await compare(password, practitioner.password)
		if (isAuthorized) {
			const isAlreadyLoggedIn = await checkPractitionerAlreadyLoggedIn(
				req
			)
			if (isAlreadyLoggedIn === email) {
				res.status(202).send({ message: 'Already Logged in' })
				return
			} else if (isAlreadyLoggedIn === 'bad token') {
				res.status(403).send({ message: 'Login Failed!!!' })
				return
			} else {
				req.practitionerId = practitioner.id
				res.locals.practitionerId = practitioner.id
				req.practitionerDetails = {
					role: practitioner.role,
					firstName: practitioner.user.firstName,
					lastName: practitioner.user.lastName,
				}
				next()
			}
		} else {
			res.status(403).send({ message: 'Login Failed!!!' })
			return
		}
		//next()
	} else {
		res.status(403).send({ message: 'Login Failed!!!' })
		return
	}
}

/**
 * @function
 * @summary check if the user attempting to log in is already registered as having logged in
 *
 * @description The method is called when the user attempts to log in. It checks if there is a refresh token held by the user's browser.
 * If there is, this is checked against the collection of logged in users AND against the collection of valid users for the email held
 * inside the token. If the token is valid, and the user is already logged in, their email is returned. If they are not logged in, null
 * is returned. And if the token is invalid in any way, an error is thrown and the string "bad token" is returned. The calling function
 * checks for the return and responds accordingly.
 * @param {request} req
 * @returns either the email if the user is already logged in, or null if they aren't
 */
const checkPatientAlreadyLoggedIn = async (req) => {
	const refT = req.cookies['refreshTokenCookie']
	if (refT) {
		try {
			const verifiedEmail = jwt.verify(
				refT,
				ENV.PATIENTREFRESHTOKEN_SECRET
			)
			const validPatient = await PatientModel.findOne({
				email: verifiedEmail,
			})
			if (validPatient) {
				const isLoggedIn = await RefToken.findOne({ token: refT })
				if (isLoggedIn) {
					return verifiedEmail
				} else {
					return null
				}
			}
		} catch (err) {
			//they gave us a bad token
			console.log(`${new Date()}\tError:  ${err.message}`)
			return 'bad token'
		}
	}
}

/**
 * @function
 * @summary check if the user attempting to log in is already registered as having logged in
 *
 * @description The method is called when the user attempts to log in. It checks if there is a refresh token held by the user's browser.
 * If there is, this is checked against the collection of logged in users AND against the collection of valid users for the email held
 * inside the token. If the token is valid, and the user is already logged in, their email is returned. If they are not logged in, null
 * is returned. And if the token is invalid in any way, an error is thrown and the string "bad token" is returned. The calling function
 * checks for the return and responds accordingly.
 * @param {request} req
 * @returns either the email if the user is already logged in, or null if they aren't
 */
const checkPractitionerAlreadyLoggedIn = async (req) => {
	const refT = req.cookies['refreshTokenCookie']
	if (refT) {
		try {
			const verifiedEmail = jwt.verify(
				refT,
				ENV.EMPLOYEEREFRESHTOKEN_SECRET
			)
			const validPractitioner = await PractitionerModel.findOne({
				email: verifiedEmail,
			})
			if (validPractitioner) {
				const isLoggedIn = await RefToken.findOne({ token: refT })
				if (isLoggedIn) {
					return verifiedEmail
				} else {
					return null
				}
			}
		} catch (err) {
			//they gave us a bad token
			console.log(`${new Date()}\tError:  ${err.message}`)
			return 'bad token'
		}
	}
}

/**
 * @function
 * @summary check if the user attempting to log in is already registered as having logged in
 *
 * @description The method is called when the user attempts to log in. It checks if there is a refresh token held by the user's browser.
 * If there is, this is checked against the collection of logged in users AND against the collection of valid users for the email held
 * inside the token. If the token is valid, and the user is already logged in, their email is returned. If they are not logged in, null
 * is returned. And if the token is invalid in any way, an error is thrown and the string "bad token" is returned. The calling function
 * checks for the return and responds accordingly.
 * @param {request} req
 * @returns either the email if the user is already logged in, or null if they aren't
 */
const checkAdminAlreadyLoggedIn = async (req) => {
	const refT = req.cookies['refreshTokenCookie']
	if (refT) {
		try {
			const verifiedEmail = jwt.verify(
				refT,
				ENV.EMPLOYEEREFRESHTOKEN_SECRET
			)
			const validAdmin = await AdministratorModel.findOne({
				email: verifiedEmail,
			})
			if (validAdmin) {
				const isLoggedIn = await RefToken.findOne({ token: refT })
				if (isLoggedIn) {
					return verifiedEmail
				} else {
					return null
				}
			}
		} catch (err) {
			//they gave us a bad token
			;`${new Date()}\tError:  ${err.message}`
			return 'bad token'
		}
	}
}
