import mongoose from 'mongoose'

/**
 * @constructor refresh
 * @summary refresh token creator
 * 
 * @description using email and token, it creates a unique refresh token 
 * for the user
 */
const refreshSchema = new mongoose.Schema({
	email: {
		type: String,
	},
	token: {
		type: String,
	},
	createdTime: {
		type: Date,
		immutable: true,
		default: () => Date.now(),
	},
})

export default mongoose.model('RefToken', refreshSchema)
