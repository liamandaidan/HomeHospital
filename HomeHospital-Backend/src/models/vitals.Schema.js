import mongoose from 'mongoose'


/**
 * @constructor vitals
 */
const vitalsSchema = new mongoose.Schema({
	BloodPressure: Number,
	Temperature: Number,
	BloodO2: Number,
	HeartRate: Number,
	RespRate: Number,
	Height: Number,
	Weight: Number,
	_id: false,
})

export default vitalsSchema
