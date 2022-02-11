const mongoose = require('mongoose');


const visitRequestSchema = {
    patient: Patient,
    requestHospitalID: Number,
    position: Number,
    startAddress: Address,
    vitals: PatientVitals,
    symptoms: ListOf(Array),
    dateTime: LocalDateTime,
    isEmergency: Boolean
}

export default mongoose.model('VisitRequest', visitRequestSchema)