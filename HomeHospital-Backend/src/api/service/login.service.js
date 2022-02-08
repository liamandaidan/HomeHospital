import bcrypt from 'bcryptjs'
import UserSchema from '../../models/User.Schema.js'

const { compare } = bcrypt

export async function logUserIn(req) {
	const { email, password } = req.body

	const storedPassword = await UserSchema.findOne(
		{ email: email },
		'password'
	)
   
	// Compare the password with one in the DB
	const isAuthorized = await compare(password, storedPassword.password)

	return isAuthorized
}
