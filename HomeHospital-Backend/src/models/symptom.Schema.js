import mongoose from 'mongoose'
import validator from 'validator'

const symptomSchema = new mongoose.Schema({
	description: {
		type: String,
		minlength:1,
		maxlength: 50,
		required: true,
	},
	severity: {
		type: Number,
		min: 1,
		max: 5,
		required: true,
		validate:[validator.isNumeric, 'Please enter a Number!'],

	},
	_id: false,
})

export default symptomSchema
