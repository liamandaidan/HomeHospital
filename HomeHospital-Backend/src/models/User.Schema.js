import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 10,
	},
	age: {
		type: Number,
		min: 1,
		max: 100,
		required: true,
	},
	email: {
		type: String,
		minlength: 10,
		required: true,
		lowercase: true,
	},
	address: {
		type: String,
		required: true,
	},
	postal: {
		type: String,
		minlength: 6,
		maxlength: 6,
		default: null,
	},
	phoneNumber: {
		type: String,
		default: null,
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
	_id: false,
})

export default userSchema
