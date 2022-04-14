import mongoose from 'mongoose'

/**
 * @constructor symptom
 */
const symptomSchema = new mongoose.Schema({
	description: {
		type: String,
		minlength:[1,'Minimum Length for Description is 1'],
		maxlength: [280,'Maximum Length for Description is 280'], // tweet length
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
