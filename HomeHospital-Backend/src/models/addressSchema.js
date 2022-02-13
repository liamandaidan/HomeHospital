import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
	streetNum: {
		type: String,
		required: true,
	},
	streetName: {
		type: String,
		required: true,
	},
    cityName: {
        type: String,
        required: true,
    },
    provName: {
        type: String,
        required: true,
    },
	postalCode: {
		type: String,
		required: true,
        minlength: 6,
		maxlength: 6,
	}
})

export default mongoose.model('Address', addressSchema)
