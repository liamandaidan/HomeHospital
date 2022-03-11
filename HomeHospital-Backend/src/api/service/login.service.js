import bcrypt from 'bcryptjs'
import PatientModel from '../../models/patient.Model.js'
import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
import RefToken from '../../models/refreshTokens.Schema.js'

const { compare } = bcrypt

export const logUserIn = async (req, res, next) => {
	const { email, password } = req.body

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
			} else {
				req.authUser = { status: isAuthorized, patient: patient }
			}
		} else {
			res.status(403).send({ message: 'Login Failed!!!' })
			console.log('Bad password')
			return
		}
	} else {
		res.status(403).send({ message: 'Login Failed!!!' })
		console.log('No User found')
		return
	}
	next()
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
					console.log('Email in function is ' + email)
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
		console.log(`No Ref Token`)
		return null
	}
}
