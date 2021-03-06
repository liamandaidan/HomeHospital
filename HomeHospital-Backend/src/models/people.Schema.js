import mongoose from 'mongoose'
import addressSchema from './address.Schema.js'
import validator from 'validator'

/**
 * @constructor people
 * @summary creates a new person
 *
 * @description takes in input, validates it, and creates a new person
 * to be used with admin patient, practitioner.
 */
const peopleSchema = new mongoose.Schema({
	firstName: {
		type: String,
		minlength: 1,
		maxlength: 35,
		required: [true, 'Please enter a First Name'],
		validate: [
			validator.isAlpha,
			'Please enter a Valid First Name, Letters Only',
		],
	},
	lastName: {
		type: String,
		minlength: 1,
		maxlength: 35,
		required: [true, 'Please enter a Last Name'],
		validate: [
			validator.isAlpha,
			'Please enter a Valid Last Name, Letters Only',
		],
	},
	address: {
		type: addressSchema,
		required: [true, 'Address is Required'],
	},
	phoneNumber: {
		type: String,
		default: null,
		validate: [
			{
				validator: (value) => validator.isMobilePhone(value, ['en-CA']),
				msg: 'Please Enter A Canadian Number',
			},
		],
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

export default peopleSchema
