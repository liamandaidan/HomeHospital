import mongoose from 'mongoose'
import addressSchema from './address.Schema.js'
import validator from 'validator'
const medicalFacility = new mongoose.Schema({
	hospitalName: {
		type: String,
		required: [true, 'Hospital Name is required'],
	},
	address: {
		type: addressSchema,
		required: [true,'An Address is required'],
	},
	phoneNumber: {
		type: String,
		default: null,
		validate:[validator.isMobilePhone, 'Please enter a Valid Phone Number']
	},
	waitTime: {
		type: String,
		default: null,
	},
	hospitalDesc: {
		type: String,
		maxlength: [100,'Maximum Length is 100'],
		defult: null,
	},
	practitioners: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Practitioner',
		default: null,
	},
})

export default mongoose.model('MedicalFacility', medicalFacility)
