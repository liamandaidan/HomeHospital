import mongoose from 'mongoose'
import UserSchema from './user.Schema.js'

const administratorSchema = new mongoose.Schema({
	adminId: {
		type: Number,
		required: true
	},
    permissions: {
        type: Number,
		enum: [1, 2, 3],/*Permission levels increase in privilege from 1 to 3 */
		required: true
    },
	user: {
		type: UserSchema
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
