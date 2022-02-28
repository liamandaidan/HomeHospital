import bcrypt from 'bcryptjs'
import PatientModel from '../../models/patient.Model.js'

const { compare } = bcrypt

export async function logUserIn(req, res, next) {
	const { email, password } = req.body

	const patient = await PatientModel.findOne({ email: email })
	// console.log(`from the login service: ${user}`)
	// Compare the password with one in the DB
	//console.log('User: ' + patient)
	if (patient) {
		const isAuthorized = await compare(password, patient.password)
		if (isAuthorized) {
			req.authUser = { status: isAuthorized, patient: patient }
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
