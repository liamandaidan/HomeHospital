import express from 'express'
import patientModel from '../../models/patient.Model.js'
import medicalFacilityModel from '../../models/medicalFacility.Model.js'
import mongoose from 'mongoose'
import visitRequestModel from '../../models/visitRequest.Model.js'
import { completeVisitRequest } from '../service/request.service.js'

const route = express.Router()


route.put('/completeRequest/:requestId', async (req, res) => {
	const { requestId } = req.params

	if (completeVisitRequest({ _id: requestId })) {
		res.status(200).send()
	} else {
		res.status(400).send({ message: 'Failed to complete visit request!' })
	}
})

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
 
export  default route
