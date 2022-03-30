import mongoose from 'mongoose'
import addressSchema from './address.Schema.js'
import vitalsSchema from './vitals.Schema.js'
import symptomSchema from './symptom.Schema.js'

const visitRequestSchema = new mongoose.Schema({
	requestHospitalID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MedicalFacility',
		required: true,
	},
	requestHospitalName: {
		type: String,
		required: true,
	},
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Patient',
		required: true,
	},
	patientFirstName: {
		type: String,
		required: true,
	},
	patientLastName: {
		type: String,
		required: true,
	},
	symptoms: {
		type: [symptomSchema],
		required: true,
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
