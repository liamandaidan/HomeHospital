/**
 *  TODO
 * validate province code (ab,mb,bc etc)
 * JUST TESTING MY VSCODE
 */
import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
	streetAddress: {
		type: String,
		required: true,
		maxlength: 30,
	},
	cityName: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 30,
	},
	provName: {
		type: String,
		maxlength: 3,
		required: true,
		uppercase: true,
	},
	postalCode: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 6,
	},
	country: {
		type: String,
		default: 'Canada',
		required: true,
	},
	_id: false,
})

export default addressSchema
