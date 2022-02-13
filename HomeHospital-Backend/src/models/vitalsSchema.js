const mongoose = require('mongoose');


const vitalsSchema = {
    vitalsId: mongoose.Schema.Types.ObjectId,
    BloodPressure: Number,
    Temperature: Number,
    BloodO2: Number,
    HeartRate: Number,
    RespRate: Number,
    Height: Number,
    Weight: Number
}

export default mongoose.model('Vitals', vitalsSchema)