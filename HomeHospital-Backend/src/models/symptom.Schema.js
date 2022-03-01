import mongoose from 'mongoose'

const symptomSchema = new mongoose.Schema({
	Description: String,
	Severity: Number,
    _id: false
})

export default symptomSchema
