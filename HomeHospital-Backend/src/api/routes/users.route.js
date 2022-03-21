import express from 'express'
import patientModel from '../../models/patient.Model.js'
import mongoose from 'mongoose'

// Creates Router
const route = express.Router()

// Register Route
route.post('/PatientInfoVisitRequest', async (req, res) => {

	const  patientId  = req.patientId
	// Check to see that the patient exists. If so send the appropriate info, if not send error code.
	try {
		const validUserId = mongoose.Types.ObjectId.isValid(patientId)
		if (validUserId) {

			if (await patientModel.exists({_id: patientId})) {
				const patient = await patientModel.findById(patientId)
				const patientOut = patient.getPatientRequestInfo()
				res.status(200).send({ data: patientOut })
			} else {
				res.status(406).send({
					status: 'Error',
					message: 'Cannot find patient',
				})
			}
		}
	} catch (error) {
		console.error(error.message)
		res.status(406).send({
			status: 'Error',
			message: 'Cannot find patient',
		})
	}
})

export default route
