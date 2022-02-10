import mongoose from 'mongoose'

const hospitalSchema = new mongoose.Schema({
	hospitalName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true
	},
	postal: {
		type: String,
		minlength:	6,
		maxlength: 6,
		default: null
	},
	phoneNumber: {
		type: String,
		default: null
	},
    practitioners:{
        type: ListOf(String),
        default: null
    }
})

export default mongoose.model('Hospital', hospitalSchema)
