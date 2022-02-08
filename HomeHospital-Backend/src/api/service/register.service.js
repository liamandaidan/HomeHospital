import UserSchema from '../../models/User.Schema.js'
import bcrypt from 'bcryptjs'

const regStatus = {
	status: false,
}
export async function registerUser(req) {
	const { genSalt, hash } = bcrypt

	// Destructure vales from client request
	const {
		firstName,
		lastName,
		email,
		password,
		age,
		address,
		postal,
		phoneNumber,
	} = req.body

	// check if user exists
	const result = await UserSchema.exists({ email: email })
	console.log('user ID: ' + result?._id)
	// If they exist return an error status code
	if (result) {
		return (regStatus.status = false)
	}

	// Salt and Hash password

	// generate salt
	const salt = await genSalt(10)

	// hash with salt
	const hashedPassword = await hash(password, salt)

	// verify user object
	const newUser = await UserSchema.create({
		firstName: firstName,
		lastName: lastName,
		password: hashedPassword,
		age: age,
		email: email,
		phoneNumber: phoneNumber,
		address: address,
		postal: postal,
	})
	newUser.save()
    // Set Registration status and attach the user
	regStatus.status = true
	regStatus.user = newUser

	return regStatus
}
