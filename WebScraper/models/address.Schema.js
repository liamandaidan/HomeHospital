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
		required: [true, 'Please enter a Street Address'],
		maxlength: [50, 'Please Keep the Address under 50 characters'],
	},
	cityName: {
		type: String,
		required: [true, 'Please enter a City'],
		minlength: [2, 'Minimum City Length is 2 characters'],
		maxlength: [40, 'Maximum City Length is 40 Characters'],
		validate: [
			validator.isAlpha,
			'Please enter a Valid City, Letters Only',
		],
	},
	provName: {
		type: String,
		maxlength: [3, 'Maximum length for Province Name is 3'],
		required: [true, 'Please Enter a Province Name'],
		uppercase: true,
		validate: [validator.isAlpha, 'Please enter a Province, Letters Only'],
	},
	postalCode: {
		type: String,
		required: [true, 'Please enter a Postal Code'],
		minlength: [6, 'Minimum Postal Code Length is 6  characters'],
		maxlength: [6, 'Maximum Postal Code Length is 6  characters'],
		validate: [
			{
				validator: (value) => validator.isPostalCode(value, ['CA']),
				msg: 'Invalid postal Code.',
			},
		],
	},
	country: {
		type: String,
		default: 'Canada',
		required: [true, 'Please Enter a Country'],
	},
	_id: false,
})

export default addressSchema
