import PatientModel from '../../models/patient.Model.js'
import PractitionerModel from '../../models/practitioner.Model.js'
import AdministratorModel from '../../models/administrator.Model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const regStatus = {
	status: false,
}

/**
 * Function for registering a user, specifically a patient. Takes in all relevant fields from the body and checks for blank, null, or undefined values. then it checks 
 * if a user with that Id already exists. Assuming no issues, it creates a new patient (with a user nested inside) and returns true. If 
 * any checks fail, it returns false. 
 * @param {request} req 
 * @returns 
 */
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
		return (regStatus.status = false);
	}


	// check if user exists
	const result = await PatientModel.exists({ email: email })
	// If they exist return an error status code
	if (result?._id) {
		console.log("User already exists!");
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
 * Function for registering a practitioner. Takes in all relevant fields from the body and checks for blank, null, or undefined values. then it checks 
 * if a practitioner with that Id already exists. Assuming no issues, it creates a new practitioner (with a user nested inside) and returns true. If 
 * any checks fail, it returns false. Notably, this method can only be executed by a user who is an administrator. This is ensured by checking the caller's 
 * access token, which should contain their adminId. This adminId is checked against the database before the registration is allowed to proceed. 
 * @param {request} req 
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
		practitionerId,
		role,
		phoneNumber,
		facilityId
	} = req.body
	
	const adminAccessToken = req.cookies['accessTokenCookie']
	
	if(adminAccessToken) {
		const payload = jwt.decode(adminAccessToken);
		if(!payload) {
			console.log("A non-administrator attempted to register a practitioner");
			return (regStatus.status = false)
		}
		const adminId = payload.adminId
		console.log(adminId);
		const validAdmin = await AdministratorModel.exists({adminId: adminId})
		if(!adminId || !validAdmin) {
			console.log("A non-administrator attempted to register a practitioner");
			return (regStatus.status = false)
		}
	} else {
		console.log("Access token not present");
		return (regStatus.status = false)
	}

	let valsFromBody = [firstName, lastName, email, password, streetAddress, cityName, provName, postalCode, practitionerId, role, phoneNumber];
	if(valsFromBody.includes(undefined) || valsFromBody.includes(null) || valsFromBody.includes("")) {
		valsFromBody.forEach(element => console.log(element))
		console.log("Detected a missing field in registerPractitioner");
		return (regStatus.status = false)
	}


	// check if practitioner exists
	const result = await PractitionerModel.exists({ practitionerId })
	// If they exist return an error status code
	if (result?._id) {
		console.log("User already exists!");
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
		practitionerId: practitionerId,
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
		facilityId: facilityId
	})
	newPractitioner.save()

	// Set Registration status and attach the user
	regStatus.status = true
	regStatus.user = newPractitioner

	return regStatus
}

/**
 * Function for registering an administrator. Takes in all relevant fields from the body and checks for blank, null, or undefined values. then it checks 
 * if an administrator with that Id already exists. Assuming no issues, it creates a new administrator (with a user nested inside) and returns true. If 
 * any checks fail, it returns false. 
 * @param {request} req 
 * @returns 
 */
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
		return (regStatus.status = false)
	}


	// check if administrator exists
	const result = await AdministratorModel.exists({ adminId: adminId })
	console.log("Check exist result is: " + result);
	// If they exist return an error status code
	if (result?._id) {
		console.log("User already exists!");
		console.log('Admin already exists: ' + result?._id)
		return (regStatus.status = false)
	}

	// Salt and Hash password

	// generate salt
	const salt = await genSalt(10)

	// hash with salt
	const hashedPassword = await hash(password, salt)

	let newAdministrator
	// verify practitioner object
	try {
		newAdministrator = await AdministratorModel.create({
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
	} catch (err) {
		console.log("Error was: " + err);
		return (regStatus.status = false)
	}
	

	// Set Registration status and attach the user
	regStatus.status = true
	regStatus.user = newAdministrator

	return regStatus
}
