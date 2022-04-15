import mongoose from 'mongoose'

/**
 * @constructor vitals
 * @summary the vitals schema
 *
 * @description creates a vitals object to be used with patient
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
