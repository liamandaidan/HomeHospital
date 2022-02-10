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
        minlength:10
	},
	// age: {
	// 	type: Number,
	// 	min: 1,
	// 	max: 100,
	// },
	// email: {
	// 	type: String,
	// 	minlength: 10,
	// 	required: true,
	// 	lowercase: true,
	// },
	// createdAt: {
	// 	type: Date,
	// 	immutable: true,
	// 	default: () => Date.now(),
	// },
	// updatedAt: {
	// 	type: Date,
	// 	default: () => Date.now(),
	// },
})

export default mongoose.model('User', userSchema)
