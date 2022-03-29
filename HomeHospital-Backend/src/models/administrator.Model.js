import mongoose from 'mongoose'
import UserSchema from './user.Schema.js'
import validator from 'validator'

const administratorSchema = new mongoose.Schema({
	adminId: {
		type: Number,
		required: [true,'Please enter an Admin ID'],
		validate:[validator.isNumeric, 'Please enter a Valid Number'],
	},
    permissions: {
        type: Number,
		enum: [1, 2, 3],/*Permission levels increase in privilege from 1 to 3 */
		required: true,
		validate:[validator.isNumeric, 'Please enter a Valid Number'],
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
