import mongoose from 'mongoose'

const refreshSchema = new mongoose.Schema({
	email: {
		type: String,
	},
	token: {
		type: String,
	}
})

export default mongoose.model('RefToken', refreshSchema)