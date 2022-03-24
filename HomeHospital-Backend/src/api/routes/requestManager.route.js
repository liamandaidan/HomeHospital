import express from 'express'
import patientModel from '../../models/patient.Model.js'
import medicalFacilityModel from '../../models/medicalFacility.Model.js'
import mongoose from 'mongoose'
import visitRequestModel from '../../models/visitRequest.Model.js'
import { completeCurrentRequest } from '../service/request.service.js'

const route = express.Router()

//
route.put('/completeRequest', async (req, res) => {
	const { patientId } = req.body

	if (await completeCurrentRequest(patientId)) {
		res.status(200).send({ message: 'Request Completed' })
	} else {
		res.status(400).send({ message: 'Failed to complete visit request!' })
	}
})

// Check the wait list for a specific hospital
route.get('/hospitalWaitList/:hospitalId', async (req, res) => {
	const { hospitalId } = req?.params

	try {
		const validId = mongoose.Types.ObjectId.isValid(hospitalId)

		if (validId) {
			const hospitalWaitList = await medicalFacilityModel
				.findById(hospitalId)
				.select({
					hospitalName: 1,
					waitList: 1,
				})

			res.status(200).send(hospitalWaitList)
		} else {
			throw new Error('Issue finding the hospital')
		}
	} catch (error) {
		console.log(error.message)
		res.status(400).send({ message: 'There was an error' })
	}
})

route.get('/viewAllLists', (req, res) => {
	// view the lists from all hospitals
})
export default route
