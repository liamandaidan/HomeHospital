import mongoose from 'mongoose'
import peopleSchema from './people.Schema.js'
/**
 * Admin Levels
 *  3 = senior admin, can affect any admin/practitioner/patient
 *  2 = admin, can affect practitioner/patient
 *  1 = jr admin, can affect patient
 * 
 */
const administratorSchema = new mongoose.Schema({
	adminId: {
		type: Number,
		required: [true, 'Please enter an Admin ID'],
	},
	permissions: {
		type: Number,
		enum: [1, 2, 3] /*Permission levels increase in privilege from 1 to 3 */,
		required: true,
	},
	user: {
		type: peopleSchema,
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
})

export default mongoose.model('Administrator', administratorSchema)
