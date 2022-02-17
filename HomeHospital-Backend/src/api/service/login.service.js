import bcrypt from 'bcryptjs'
import PatientModel from '../../models/patient.Model.js'

const { compare } = bcrypt

export async function logUserIn(req) {
	const { email, password } = req.body

	const user = await PatientModel.exists({ email: email })
	// console.log(`from the login service: ${user}`)
	// Compare the password with one in the DB
	// console.log(user)
	if (user?._id) {
		const patient = await PatientModel.findById(user._id)
		const isAuthorized = await compare(password, patient.password)
		return { status: isAuthorized, user: user }
	} else {
		return { status: false }
	}

}
