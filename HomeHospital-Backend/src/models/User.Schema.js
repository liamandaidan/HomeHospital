import mongoose from 'mongoose'
import addressSchema from './address.Schema.js'

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	address: {
		type: addressSchema,
		required: true
	},
	phoneNumber: {
		type: String,
		default: null
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
