import PatientModel from '../../models/patient.Model.js'
import PractitionerModel from '../../models/practitioner.Model.js'
import AdministratorModel from '../../models/administrator.Model.js'
import { whitelist_string } from '../../configure/configure.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'



const regStatus = {
	status: false,
}

/**
 * @summary Registers a new patient user with the system. All patient details need to be in the HTTP body.
 * 
 * @description Function for registering a user, specifically a patient. Takes in all relevant fields from 
 * the body and checks for blank, null, or undefined values. then it checks if a user with that Id 
 * already exists. Assuming no issues, it creates a new patient (with a user nested inside) and returns true. 
 * If any checks fail, it returns false. 
 * 
 * @param {request} req The HTTP request object from the route.
 * @returns {Boolean} True if success, false for failure.
 */
export const registerUser = async (req) => {
	const { genSalt, hash } = bcrypt
console.log(whitelist_string);
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

	const valsFromBody = [firstName, lastName, email, password, streetAddress, cityName, provName, postalCode, 
		HCnumber, gender, dateOfBirth, phoneNumber];
	if(valsFromBody.includes(undefined) || valsFromBody.includes(null) || valsFromBody.includes("")) {
		console.log("Detected a missing field in registerUser");
		return (regStatus.status = false);
	}

	//these get added here because we don't want them to be mandatory
	if(contactFirstName)valsFromBody.push(contactFirstName);
	if(contactLastName)valsFromBody.push(contactLastName);
	if(contactPhoneNumber)valsFromBody.push(contactPhoneNumber);
	
	//sanitize all inputs to contain only alphanumeric charcters and a few necessary punctuation marks. 
	//Validator documentation at: https://github.com/validatorjs/validator.js#sanitizers
	const sanitizedVals = []
	valsFromBody.forEach(element => {
		if(valsFromBody[2] === element || valsFromBody[3] === element) {
			console.log("Found email or password");
			console.log(element);
			sanitizedVals.push(element);
			return;
		}
		if(valsFromBody[10] === element) {
			if(validator.isDate(element)) {
				sanitizedVals.push(element);
				return;
			}
		}
		const sanElement = validator.whitelist(element, whitelist_string);
		sanitizedVals.push(sanElement);
	})

	// check if user exists
	const result = await PatientModel.exists({ email: sanitizedVals[2] })
	// If they exist return an error status code
	if (result?._id) {
		console.log("User already exists!");
		console.log('user Id: ' + result?._id)
		return (regStatus.status = false)
	}

	// Salt and Hash password
	const salt = await genSalt(10)
	const hashedPassword = await hash(sanitizedVals[3], salt)

	// verify user object
	const newUser = await PatientModel.create({
		HCnumber: sanitizedVals[8],
		gender: sanitizedVals[9],
		dateOfBirth: new Date(sanitizedVals[10]),
		email: sanitizedVals[2],
		password: hashedPassword,
		user: {
			firstName: sanitizedVals[0],
			lastName: sanitizedVals[1],
			address: {
				streetAddress: sanitizedVals[4],
				cityName: sanitizedVals[5],
				provName: sanitizedVals[6],
				postalCode: sanitizedVals[7],
			},
			phoneNumber: sanitizedVals[11],
		},
		emergencyContact: {
			firstName: sanitizedVals[12],
			lastName: sanitizedVals[13],
			phoneNumber: sanitizedVals[14],
		},
	})
	newUser.save()

	// Set Registration status and attach the user
	regStatus.status = true
	regStatus.user = newUser

	return regStatus
}

/**
 * @summary A function for admins to register a new practitioner with the system. All practitioner details
 * should be in the body.
 * 
 * @description Function for registering a practitioner. Takes in all relevant fields from the body and 
 * checks for blank, null, or undefined values. Then it checks if a practitioner with that Id already exists. 
 * Assuming no issues, it creates a new practitioner (with a user nested inside) and returns true. 
 * If any checks fail, it returns false. Notably, this method can only be executed by a user who is an 
 * administrator. This is ensured by checking the caller's access token, which should contain their adminId. 
 * This adminId is checked against the database before the registration is allowed to proceed.
 *  
 * @param {request} req An HTTP request object from the route.
 * @returns {Boolean} True for success, false for failure
 */
export const registerPractitioner = async (req) => {
	const { genSalt, hash } = bcrypt

	// Destructure values from client request
	const {
		firstName,
		lastName,
		password,
		email,
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
	const salt = await genSalt(10)
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
 * @summary Allows an admin to register another admin. Takes all relevant fields in the body.
 * 
 * @description Function for registering an administrator. Takes in all relevant fields from the body and 
 * checks for blank, null, or undefined values. then it checks if an administrator with that Id already exists. 
 * Assuming no issues, it creates a new administrator (with a user nested inside) and returns true. 
 * If any checks fail, it returns false. 
 * 
 * @param {request} req A HTTP request object from the route.
 * @returns {Boolean} True for success, false for failure.
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
	console.log('adminId Type: ' + typeof adminId)
		console.log('permission Type: ' + typeof permissionLevel)
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
	const salt = await genSalt(10)
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
