/**
 *  TODO
 * validate province code (ab,mb,bc etc)
 * JUST TESTING MY VSCODE
 */
import mongoose from 'mongoose'
import validator from 'validator'

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
		validate:[validator.isAlpha, 'Please enter a Valid City, Letters Only']

	},
	provName: {
		type: String,
		maxlength: 3,
		required: true,
		uppercase: true,
		validate:[validator.isAlpha, 'Please enter a Province, Letters Only']

	},
	postalCode: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 6,
		validate:[validator.isPostalCode, 'Please enter a Valid Postal Code']
	},
	country: {
		type: String,
		default: 'Canada',
		required: true,
		validate:[validator.isAlpha, 'Please enter a Valid Country, Letters Only']
	},
	_id: false,
})

export default addressSchema
