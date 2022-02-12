import bcrypt from 'bcryptjs'
import PatientModel from '../../models/patient.Model.js'

const { compare } = bcrypt

export  async function logUserIn(req) {
	const { email, password } = req.body

	const user = await PatientModel.findOne({ email: email })
	// console.log(`from the login service: ${user}`)
	// Compare the password with one in the DB
	const isAuthorized = await compare(password, user.password)

	return { status: isAuthorized, user: user }
}

