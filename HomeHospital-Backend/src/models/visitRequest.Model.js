import mongoose from 'mongoose'
import addressSchema from './address.Schema.js'
import vitalsSchema from './vitals.Schema.js'
import symptomSchema from './symptom.Schema.js'

const visitRequestSchema = new mongoose.Schema({
	patient: Patient,
	requestHospitalID: {
		type: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalFacility' },
		default: null,
	},
	startAddress: addressSchema,
	vitals: {
		type: vitalsSchema,
		default: null,
	},
	symptoms: [symptomSchema],
	additionalInfo: {
		type: String,
		maxlength: 200,
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
