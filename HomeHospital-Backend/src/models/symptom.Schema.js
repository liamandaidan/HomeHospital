import mongoose from 'mongoose'
import validator from 'validator'

const symptomSchema = new mongoose.Schema({
	description: {
		type: String,
		minlength:[1,'Minimum Length for Description is 1'],
		maxlength: [50,'Maximum Length for Description is 50'],
		required: [true,'Description can not be empty'],
	},
	severity: {
		type: Number,
		min: [1,'Minimum Severity Level is 1'],
		max: [5,'Maximum Severity Level is 5'],
		required: [true,'Please enter a Severity level']
		},
	_id: false,
}) 

export default symptomSchema;
