import PatientModel from '../../models/patient.Model.js'
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
		streetNum,
		streetName,
		cityName,
		provName,
		postalCode,
		HCnumber,
		gender,
		dateOfBirth,
		phoneNumber,
	} = req.body

	// check if user exists
	const result = await PatientModel.exists({ email: email })
	// If they exist return an error status code
	if(result?._id){
		console.log('user ID: ' + result?._id)
		return (regStatus.status = false)
	}

	// Salt and Hash password

	// generate salt
	const salt = await genSalt(10)

	// hash with salt
	const hashedPassword = await hash(password, salt)

	// verify user object
	const newUser = await PatientModel.create({
		HCnumber:HCnumber,
		gender: gender,
		dateOfBirth: new Date(dateOfBirth),
		email: email,
		password: hashedPassword,
		user: {
			firstName:firstName,
			lastName: lastName,
			age: age,
			address: {
				streetNum: streetNum,
				streetName: streetName,
				cityName: cityName,
				provName: provName,
				postalCode: postalCode,
			},
			phoneNumber: phoneNumber
		}, 

	})
	newUser.save()
	// Set Registration status and attach the user
	regStatus.status = true
	regStatus.user = newUser

	return regStatus
}
