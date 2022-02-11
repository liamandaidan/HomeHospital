import mongoose from 'mongoose'

const patientSchema = new mongoose.Schema({
	patientID: {
		type: int,
		required: true,
	},
	HCnumber: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
    gender:{
        type: char,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    }
})

export default mongoose.model('Patient', patientSchema)
