import patientModel from "../../models/patient.Model.js";

export async function getPatientInfoVisitRequest(patientEmail) {
    const patientQuery = { email: patientEmail }
    const fields = { user: { firstName: 1, lastName: 1, phoneNumber: 1 }, HCNumber: 1, 
                    emergencyContact: {firstName: 1, phoneNumber: 1} }

    // Check if patient exists and if so retrieve it. If not return null.
    if(await patientModel.exists(patientQuery)) {
        return await patientModel.findOne(patientQuery, fields)
    } else {
        return null
    }
}   