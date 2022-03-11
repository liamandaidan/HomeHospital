import express from 'express'
import patientModel from '../../models/patient.Model.js';

// Creates Router
const route = express.Router()


// Register Route
route.post('/PatientInfoVisitRequest', async (req, res) => {
	// Get the patient.
	const { email } = req.body
	try {
		const patient = await getPatientInfoVisitRequest(email)

		// Check to see that the patient exists.
		if (patient == null) {
			res.status(406).send({
				status: 'Error',
				message: 'Cannot find patient',
			})
		} else {
			res.status(200).send({ data: patient })
		}
	} catch (error) {}

})

export default route
