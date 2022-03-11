import express from 'express'
import patientModel from '../../models/patient.Model.js';

// Creates Router
const route = express.Router()



// Register Route
route.post('/PatientInfoVisitRequest', async (req, res) => {
	// Check to see that the patient exists. If so send the appropriate info, if not send error code.
	try {
		if (await patientModel.exists(req.body)) {
			const patient = await patientModel.findOne(req.body)
			const patientOut = patient.getPatientRequestInfo()
			res.status(200).send({ data: patientOut })
		} else {
			res.status(406).send({
				status: 'Error',
				message: 'Cannot find patient',
			})
		}
	} catch (error) {
		console.error(error.message)
	}
})

export default route
