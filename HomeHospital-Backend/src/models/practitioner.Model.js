import mongoose from 'mongoose'
import peopleSchema from './people.Schema.js'
import validator from 'validator'

const practitionerSchema = new mongoose.Schema({
	practitionerId: {
		type: Number,
		required: [true, 'You must enter a Practitioner ID'],
		//validate:[validator.isAlphanumeric, 'Please enter a Number'],
	},
	role: {
		type: String,
		enum: ['Doctor', 'Nurse', 'Clerk'],
		required: [true, 'A valid Role must be assigned'],
	},
	email: {
		type: String,
		minlength: [8, 'Minimum Email Length is 8'],
		required: [true, 'Please enter an Email'],
		lowercase: true,
		unique: [true, 'This Email is already in use'],
		validate: [validator.isEmail, 'Please enter a Valid Email'],
	},
	password: {
		type: String,
		required: [true, 'Please enter a Password'],
		minlength: [10, 'Password must be at least a length of 10'],
		//validate:[isStrongPassword, 'This password is weaksauce bruh, take it to the gym n strengthen it up'],
	},
	user: {
		type: peopleSchema,
	},
	facilityId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MedicalFacility',
		required: [true, 'A valid Medical Facility is needed'],
	},
})

/**
 * @function
 * Description
 * @returns {any}
 */
practitionerSchema.methods.getPractitionerInfo = function () {
	return {
		user: this.user,
		id: this._id,
		email: this.email,
		role: this.role,
		facilityId: this.facilityId
	}
}

/**
 * @function
 * Description
 * @param {any} practitionerInfo
 * @returns {any}
 */
practitionerSchema.methods.modifyPractitioner = function (practitionerInfo) {
	this.user.firstName 	= practitionerInfo.user.firstName
	this.user.lastName 		= practitionerInfo.user.lastName
	this.user.address 		= practitionerInfo.user.address
	this.user.phoneNumber 	= practitionerInfo.user.phoneNumber
	this.email 				= practitionerInfo.email
	this.role 				= practitionerInfo.role
	this.facilityId 		= practitionerInfo.facilityId
}

export default mongoose.model('Practitioner', practitionerSchema)
