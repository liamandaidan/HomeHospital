import mongoose from 'mongoose'
import UserSchema from './user.Schema.js'

const patientSchema = new mongoose.Schema({
	HCnumber: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true,
		minlength: 7
	},
    gender:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
	user: {
		type: UserSchema
	}
})

export default mongoose.model('Patient', patientSchema)
