import mongoose from 'mongoose'
import addressSchema from './address.Schema.js'
import validator from 'validator'

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		validate:[validator.isAlpha, 'Please enter a Valid First Name, Letters Only']
	},
	lastName: {
		type: String,
		required: true,
		validate:[validator.isAlpha, 'Please enter a Valid Last Name, Letters Only']
	},
	address: {
		type: addressSchema,
		required: true
	},
	phoneNumber: {
		type: String,
		default: null,
		validate:[validator.isMobilePhone, 'Please enter a Valid Phone Number']
	},
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now(),
	},
	updatedAt: {
		type: Date,
		default: () => Date.now(),
	},
	_id: false
})

export default userSchema
