import mongoose from 'mongoose'

/**
 * @constructor refresh
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
