import bcrypt from 'bcryptjs'
import PatientModel from '../../models/patient.Model.js'
import PractitionerModel from '../../models/practitioner.Model.js'
import AdministratorModel from '../../models/administrator.Model.js'
import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
import RefToken from '../../models/refreshTokens.Schema.js'

const { compare } = bcrypt

export const logUserIn = async (req, res, next) => {
	const { email, password } = req.body

	if(email == null || email == undefined || password == null || password == undefined) {
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

	if(email == null || email == undefined || password == null || password == undefined) {
		res.status(403).send({ message: 'Login Failed!!!' })
		console.log('One or more fields are missing')
		return
	}

	const practitioner = await PractitionerModel.findOne({ email: email })//returns null if not found

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