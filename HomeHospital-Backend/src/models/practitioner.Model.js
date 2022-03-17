import mongoose from 'mongoose'
import UserSchema from './user.Schema.js'
import HCPRole from './hcpRole.Model.js'

const practitionerSchema = new mongoose.Schema({
	practitionerID: {
		type: Number,
		required: true,
	},
	role: {
		type: String,
		enum: ['Doctor', 'Nurse', 'Clerk'],
		required: true
	},
	email: {
		type: String,
		minlength: 8,
		required: true,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 10,
	},
	user: {
		type: UserSchema,
	},
})

export default mongoose.model('Practitioner', practitionerSchema)
