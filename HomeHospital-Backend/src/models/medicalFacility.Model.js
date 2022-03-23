import mongoose from 'mongoose'
import addressSchema from './address.Schema.js'
// import practitioner from './practitioner.Model.js'

const medicalFacility = new mongoose.Schema({
	hospitalName: {
		type: String,
		required: true,
	},
	address: {
		type: addressSchema,
		required: true,
	},
	latitude: {
		type: Number,
		immutable: true,
	},
	longitude: {
		type: Number,
		immutable: true,
	},
	phoneNumber: {
		type: String,
		default: null,
	},
	waitTime: {
		type: String,
		default: null,
	},
	hospitalDesc: {
		type: String,
		maxlength: 100,
		defult: null,
	},
	practitioners: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Practitioner',
		default: null,
	},
	waitList: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'VisitRequest',
		default: null,
	},
})

export default mongoose.model('MedicalFacility', medicalFacility)
