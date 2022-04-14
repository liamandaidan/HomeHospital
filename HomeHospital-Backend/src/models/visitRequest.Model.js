import mongoose from 'mongoose'
import addressSchema from './address.Schema.js'
import vitalsSchema from './vitals.Schema.js'
import symptomSchema from './symptom.Schema.js'
import validator from 'validator'


/**
 * @constructor visitRequest
 */
const visitRequestSchema = new mongoose.Schema({
	requestHospitalId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MedicalFacility',
		required: [true, 'A facility is Needed']
	},
	requestHospitalName: {
		type: String,
		required: [true, 'A Hospital Name is Required'],
	},
	latitude: {
		type: Number,
		immutable: true,
	},
	longitude: {
		type: Number,
		immutable: true,
	},
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Patient',
		required: [true, 'Patient is Required']
	},
	patientFirstName: {
		type: String,
		required: [true, 'Patients First Name is Required'],
		validate:[validator.isAlpha, 'Only Letters allowed'],
	},
	patientLastName: {
		type: String,
		required: [true, 'Patients Last Name is Required'],
		validate:[validator.isAlpha, 'Only Letters allowed'],
	},
	symptoms: {
		type: [symptomSchema],
		required: [true, 'Symptoms are Required'],
	},
	additionalInfo: {
		type: String,
		maxlength: 200,
		default: null,
	},
	startAddress: addressSchema,
	vitals: {
		type: vitalsSchema,
		default: null,
	},
	waitListTime: {
		type: String,
		default: null,
	},
	dateTime: {
		type: Date,
		default: () => Date.now(),
	},
	isEmergency: {
		type: Boolean,
		default: false,
	},
})

export default mongoose.model('VisitRequest', visitRequestSchema)
