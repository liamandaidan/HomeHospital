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
			const isAlreadyLoggedIn = await checkAlreadyLoggedIn(req)
			// console.log('Return from function is ' + isAlreadyLoggedIn)
			if (isAlreadyLoggedIn === email) {
				console.log('User is already logged in!')
				res.status(401).send({ message: 'Already Logged in' })
				return
			}
			req.patientId = patient._id
			
		} else {
			res.status(403).send({ message: 'Login Failed!!!' })
			console.log('Bad password')
			return
		}
		next()
	} else {
		res.status(403).send({ message: 'Login Failed!!!' })
		console.log('No User found')
		return
	}
}

const checkAlreadyLoggedIn = async (req) => {
	const refT = req.cookies['refreshTokenCookie']
	// console.log(`______________________ ${refT}`)
	if (refT) {
		try {
			const email = jwt.verify(refT, ENV.REFRESHTOKEN_TEST_SECRET)
			// console.log(`----------------Check the verify value: ${email}`)
			const isLoggedIn = await RefToken.findOne({ token: refT })
			if (isLoggedIn != null) {
				if (isLoggedIn.email === email) {
					// console.log('Email in function is ' + email)
					return email
				} else {
					return null
				}
			} else {
				return null
			}
		} catch (err) {
			return null
		}
	} else {
		// console.log(`No Ref Token`)
		return null
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
			const isAlreadyLoggedIn = await checkAlreadyLoggedIn(req)//should still work?
			// console.log('Return from function is ' + isAlreadyLoggedIn)
			if (isAlreadyLoggedIn === email) {
				console.log('User is already logged in!')
				res.status(401).send({ message: 'Already Logged in' })
				return
			}
			req.adminId = administrator.adminId
			
		} else {
			res.status(403).send({ message: 'Login Failed!!!' })
			console.log('Bad password')
			return
		}
		next()
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
			const isAlreadyLoggedIn = await checkAlreadyLoggedIn(req)//should still work?
			// console.log('Return from function is ' + isAlreadyLoggedIn)
			if (isAlreadyLoggedIn === email) {
				console.log('User is already logged in!')
				res.status(401).send({ message: 'Already Logged in' })
				return
			}
			req.practitionerId = practitioner.practitionerId
			
		} else {
			res.status(403).send({ message: 'Login Failed!!!' })
			console.log('Bad password')
			return
		}
		next()
	} else {
		res.status(403).send({ message: 'Login Failed!!!' })
		console.log('No User found')
		return
	}
}