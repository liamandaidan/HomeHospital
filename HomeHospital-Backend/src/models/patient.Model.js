import mongoose from 'mongoose'
import UserSchema from './user.Schema.js'

const patientSchema = new mongoose.Schema({
	email: {
		type: String,
		minlength: 8,
		required: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 10,
	},
	HCnumber: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
	user: {
		type: UserSchema,
	},
})

export default mongoose.model('Patient', patientSchema)
