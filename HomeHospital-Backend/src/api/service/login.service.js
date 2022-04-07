import bcrypt from 'bcryptjs'
import PatientModel from '../../models/patient.Model.js'
import PractitionerModel from '../../models/practitioner.Model.js'
import AdministratorModel from '../../models/administrator.Model.js'
import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
import RefToken from '../../models/refreshTokens.Schema.js'

const { compare } = bcrypt

/**
 * The three login methods are functionally identical, differing only in the type of user they are designed to 
 * service. In each case, the user's email and password are taken in and checked for null or blank values. Then 
 * the database is checked for a user matching the provided email. Emails must be unique within a user database, 
 * so this will return either one user, or null. A null return means the email didn't match, and the user is 
 * denied access. If a matching user is found, the provided password is compared to the stored password. Assuming 
 * that matches as well, another method call is made to check if they are already logged in (allowing a dual login 
 * would present problems at logout). If they are, then the rest of the routing is cancelled with a return, which 
 * allows the user to be taken to an authorized page. If not, then the route continues to the next middleware.
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 * @returns 
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
			// console.log('Return from function is ' + isAlreadyLoggedIn)
			if (isAlreadyLoggedIn === email) {
				console.log('User is already logged in!')
				res.status(202).send({ message: 'Already Logged in' })
				return
			} else if(isAlreadyLoggedIn === "bad token") {
				res.status(403).send({ message: 'Login Failed!!!' })
				console.log('Bad token')
				return
			} else {
				req.patientId = patient._id
				res.locals.patientId = patient.id
				next();
			}
			
		} else {
			res.status(403).send({ message: 'Login Failed!!!' })
			console.log('Bad password')
			return
		}
		//next()
	} else {
		res.status(403).send({ message: 'Login Failed!!!' })
		console.log('No User found')
		return
	}
}

export const logAdministratorIn = async (req, res, next) => {
	const { email, password } = req.body

	if(email == null || email == undefined || password == null || password == undefined) {
		res.status(403).send({ message: 'Login Failed!!!' })
		console.log('One or more fields are missing')
		return
	}

	const administrator = await AdministratorModel.findOne({ email: email })//returns null if not found

	if (administrator) {
		const isAuthorized = await compare(password, administrator.password)
		if (isAuthorized) {
			const isAlreadyLoggedIn = await checkAdminAlreadyLoggedIn(req)
			if (isAlreadyLoggedIn === email) {
				console.log('User is already logged in!')
				res.status(202).send({ message: 'Already Logged in' })
				return
			} else if(isAlreadyLoggedIn === "bad token") {
				res.status(403).send({ message: 'Login Failed!!!' })
				console.log('Bad token')
				return
			} else {
				req.adminId = administrator.adminId
				res.locals.adminId = administrator.id
				console.log('From the login '  + req.adminPermission)
				next();
			}
			
		} else {
			res.status(403).send({ message: 'Login Failed!!!' })
			console.log('Bad password')
			return
		}
		//next()
	} else {
		res.status(403).send({ message: 'Login Failed!!!' })
		console.log('No User found')
		return
	}
}


export const logPractitionerIn = async (req, res, next) => {
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

	const practitioner = await PractitionerModel.findOne({ email: email }) //returns null if not found

	if (practitioner) {
		const isAuthorized = await compare(password, practitioner.password)
		if (isAuthorized) {
			const isAlreadyLoggedIn = await checkPractitionerAlreadyLoggedIn(req)
			if (isAlreadyLoggedIn === email) {
				console.log('User is already logged in!')
				res.status(202).send({ message: 'Already Logged in' })
				return
			} else if(isAlreadyLoggedIn === "bad token") {
				res.status(403).send({ message: 'Login Failed!!!' })
				console.log('Bad token')
				return
			} else {
				req.practitionerId = practitioner.id
				res.locals.practitionerId = practitioner.id
				next();
			}
			
		} else {
			res.status(403).send({ message: 'Login Failed!!!' })
			console.log('Bad password')
			return
		}
		//next()
	} else {
		res.status(403).send({ message: 'Login Failed!!!' })
		console.log('No User found')
		return
	}
}

/**
 * The next three methods are functionally identical, but are separated into patient, practitioner, and administrator, since those 
 * three user types are separated into three different database collections. The method is called when the user attempts to log in. 
 * It checks if there is a refresh token held by the user's browser. If there is, this is checked against the collection of logged in 
 * users AND against the collection of valid users for the email held inside the token. If the token is valid, and the user is already 
 * logged in, their email is returned. If they are not logged in, null is returned. And if the token is invalid in any way, an error 
 * is thrown and the string "bad token" is returned. The calling function checks for the return and responds accordingly. 
 * @param {request} req 
 * @returns 
 */
const checkPatientAlreadyLoggedIn = async (req) => {
	const refT = req.cookies['refreshTokenCookie']
	if(refT) {
		try {
			const verifiedEmail = jwt.verify(refT, ENV.PATIENTREFRESHTOKEN_SECRET);
			const validPatient = await PatientModel.findOne({ email: verifiedEmail });
			if(validPatient) {
				const isLoggedIn = await RefToken.findOne({ token: refT });
				if(isLoggedIn) {
					return verifiedEmail;
				} else {
					return null;
				}
			}
		} catch (err) {//they gave us a bad token
			return "bad token";
		}
	} 
}

const checkPractitionerAlreadyLoggedIn = async (req) => {
	const refT = req.cookies['refreshTokenCookie']
	if(refT) {
		try {
			const verifiedEmail = jwt.verify(refT, ENV.EMPLOYEEREFRESHTOKEN_SECRET);
			const validPractitioner = await PractitionerModel.findOne({ email: verifiedEmail });
			if(validPractitioner) {
				const isLoggedIn = await RefToken.findOne({ token: refT });
				if(isLoggedIn) {
					return verifiedEmail;
				} else {
					return null;
				}
			}
		} catch (err) {//they gave us a bad token
			return "bad token";
		}
	} 
}

const checkAdminAlreadyLoggedIn = async (req) => {
	const refT = req.cookies['refreshTokenCookie']
	if(refT) {
		try {
			const verifiedEmail = jwt.verify(refT, ENV.EMPLOYEEREFRESHTOKEN_SECRET);
			const validAdmin = await AdministratorModel.findOne({ email: verifiedEmail });
			if(validAdmin) {
				const isLoggedIn = await RefToken.findOne({ token: refT });
				if(isLoggedIn) {
					return verifiedEmail;
				} else {
					return null;
				}
			}
		} catch (err) {//they gave us a bad token
			return "bad token";
		}
	} 
}
