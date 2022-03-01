import mongoose from 'mongoose'

const symptomSchema = {
	Severity: Number,
	Description: String,
    _id: false
}

export default symptomSchema
