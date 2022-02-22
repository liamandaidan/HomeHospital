import mongoose from 'mongoose'
import UserSchema from './user.Schema.js'
import HCPRole from './hcpRole.Model'

const practitionerSchema = new mongoose.Schema({
	practitionerID: {
		type: Number,
		required: true,
	},
	role: {
		type: HCPRole,
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
