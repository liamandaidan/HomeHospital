import express from 'express'
import patientModel from '../../models/patient.Model.js'
import medicalFacilityModel from '../../models/medicalFacility.Model.js'
import mongoose from 'mongoose'
import visitRequest from '../../models/visitRequest.Model.js'

const app = express.Router()

/*
	This route creates a new request in the DB. The user must supply their user ID, the selected hospital ID,
	along with the list of symptoms and any additional information about their request. 

*/
app.post('/newRequest', async (req, res) => {
	// get the HospitalID
	// get patient ID
	// get list of symptom's (array) and additional info
	const { hospitalID, patientID, symptomList, additionalInfo } = req.body

	// Validates that the ID's for the hospital and patient are valid Mongo IDs
	const validFacilityID = mongoose.Types.ObjectId.isValid(hospitalID)
	const validUserID = mongoose.Types.ObjectId.isValid(patientID)

	if (validFacilityID && validUserID) {
		// Fetch the patients address
		const patient = await patientModel.findById(patientID)
		const hospital = await medicalFacilityModel.findById(hospitalID)
		const { address } = patient.user

		if (patient && hospital) {
			try {
				// Create the new request
				const request = await visitRequest.create({
					patient: patient._id, //patientOID
					requestHospitalID: hospital._id, //hospitalID,
					// sets the patients address by default to the starting address
					startAddress: {
						streetAddress: address.streetAddress,
						cityName: address.cityName,
						provName: address.provName,
						postalCode: address.postalCode,
					},
					symptoms: symptomList,
					additionalInfo: additionalInfo,
				})

				// Save the request to the DB if all is OK
				request.save()

				console.log(
					`New Patient request added to the DB: ${request._id}`
				)
				res.send({ message: 'this worked', data: symptomList })
			} catch (error) {
				console.log(`Error: ${error.message}`)
				res.status(400).send({ message: 'you fucked up:' })
			}
		} else {
			console.log('Patient or hospital Do no exist')
			res.status(400).send({ message: 'you fucked up:' })
		}
	} else {
		console.log("Object ID's are Not valid")
		res.status(400).send({ message: 'you fucked up' })
	}
})

export default app
