import  mongoose from 'mongoose'
import addressSchema from './address.Schema.js'
import vitalsSchema from './vitals.Schema.js'
import symptomSchema from './symptom.Schema.js'

const visitRequestSchema = new mongoose.Schema({
	patient: Patient,
	requestHospitalID: mongoose.Schema.Types.ObjectId,
	position: Number,
	startAddress: addressSchema,
	vitals: vitalsSchema,
	symptoms: [symptomSchema],
	additionalInfo: {
		type: String,
		maxlength: 200,
	},
	dateTime:  {
		type: Date,
		default: () => Date.now(),
	},
	isEmergency: Boolean,
})

export default mongoose.model('VisitRequest', visitRequestSchema)
