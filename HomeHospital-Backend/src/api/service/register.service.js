import PatientModel from '../../models/patient.Model.js'
import PractitionerModel from '../../models/practitioner.Model.js'
import AdministratorModel from '../../models/administrator.Model.js'
import bcrypt from 'bcryptjs'

const regStatus = {
	status: false,
}
export const registerUser = async (req) => {
	const { genSalt, hash } = bcrypt

	// Destructure values from client request
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

	let valsFromBody = [firstName, lastName, email, password, streetAddress, cityName, provName, postalCode, HCnumber, gender, dateOfBirth, phoneNumber, contactFirstName, contactLastName, contactPhoneNumber];
	if(valsFromBody.includes(undefined) || valsFromBody.includes(null) || valsFromBody.includes("")) {
		console.log("Detected a missing field in registerUser");
		return -1;
	}


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

/**
 * This function is mostly identical to the above function for registering a patient
 * @param {} req 
 */
export const registerPractitioner = async (req) => {
	const { genSalt, hash } = bcrypt

	// Destructure values from client request
	const {
		firstName,
		lastName,
		email,
		password,
		streetAddress,
		cityName,
		provName,
		postalCode,
		employeeNum,
		role,
		phoneNumber
	} = req.body

	let valsFromBody = [firstName, lastName, email, password, streetAddress, cityName, provName, postalCode, employeeNum, role, phoneNumber];
	if(valsFromBody.includes(undefined) || valsFromBody.includes(null) || valsFromBody.includes("")) {
		console.log("Detected a missing field in registerPractitioner");
		return -1;
	}


	// check if practitioner exists
	const result = await PractitionerModel.exists({ employeeNum: employeeNum })
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

	// verify practitioner object
	const newPractitioner = await PractitionerModel.create({
		employeeNum: employeeNum,
		role: role,
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
	})
	newPractitioner.save()

	// Set Registration status and attach the user
	regStatus.status = true
	regStatus.user = newPractitioner

	return regStatus
}

export const registerAdministrator = async (req) => {
	const { genSalt, hash } = bcrypt

	// Destructure values from client request
	const {
		firstName,
		lastName,
		email,
		password,
		streetAddress,
		cityName,
		provName,
		postalCode,
		phoneNumber,
		adminId,
		permissionLevel
	} = req.body

	let valsFromBody = [firstName, lastName, email, password, streetAddress, cityName, provName, postalCode, adminId, permissionLevel, phoneNumber];
	if(valsFromBody.includes(undefined) || valsFromBody.includes(null) || valsFromBody.includes("")) {
		console.log("Detected a missing field in registerPractitioner");
		return -1;
	}


	// check if administrator exists
	const result = await AdministratorModel.exists({ adminId: adminId })
	// If they exist return an error status code
	if (result?.adminId) {
		console.log('Admin Id: ' + result?.adminId)
		return (regStatus.status = false)
	}

	// Salt and Hash password

	// generate salt
	const salt = await genSalt(10)

	// hash with salt
	const hashedPassword = await hash(password, salt)

	// verify practitioner object
	const newAdministrator = await AdministratorModel.create({
		adminId: adminId,
		permissions: permissionLevel,
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
	})
	newAdministrator.save()

	// Set Registration status and attach the user
	regStatus.status = true
	regStatus.user = newAdministrator

	return regStatus
}
