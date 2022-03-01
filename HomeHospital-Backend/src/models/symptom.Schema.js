import mongoose from 'mongoose'

const symptomSchema = new mongoose.Schema({
	Severity: Number,
	Description: String,
	_id: false
})

export default symptomSchema
