import PatientModel from '../../models/patient.Model.js'
import bcrypt from 'bcryptjs'

const regStatus = {
	status: false,
}
export const registerUser = async (req) => {
	const { genSalt, hash } = bcrypt

	// Destructure vales from client request
	const {
		firstName,
		lastName,
		email,
		password,
		streetAddress,
		cityName,
		provName,
		postalCode,
		HCnumber,
		gender,
		dateOfBirth,
		phoneNumber,
		contactFirstName,
		contactLastName,
		contactPhoneNumber,
	} = req.body

	// check if user exists
	const result = await PatientModel.exists({ email: email })
	// If they exist return an error status code
	if (result?._id) {
		console.log('user Id: ' + result?._id)
		return (regStatus.status = false)
	}

	// Salt and Hash password

	// generate salt
	const salt = await genSalt(10)

	// hash with salt
	const hashedPassword = await hash(password, salt)

	// verify user object
	const newUser = await PatientModel.create({
		HCnumber: HCnumber,
		gender: gender,
		dateOfBirth: new Date(dateOfBirth),
		email: email,
		password: hashedPassword,
		user: {
			firstName: firstName,
			lastName: lastName,
			address: {
				streetAddress: streetAddress,
				cityName: cityName,
				provName: provName,
				postalCode: postalCode,
			},
			phoneNumber: phoneNumber,
		},
		emergencyContact: {
			firstName: contactFirstName,
			lastName: contactLastName,
			phoneNumber: contactPhoneNumber,
		},
	})
	newUser.save()

	// Set Registration status and attach the user
	regStatus.status = true
	regStatus.user = newUser

	return regStatus
}
