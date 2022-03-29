import express from 'express'
import patientModel from '../../models/patient.Model.js'
import medicalFacilityModel from '../../models/medicalFacility.Model.js'
import mongoose from 'mongoose'
import visitRequestModel from '../../models/visitRequest.Model.js'
import {
	completeCurrentRequest,
	getHospitalWaitList,
} from '../service/request.service.js'

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
// route.get('/hospitalWaitList/:hospitalId', async (req, res) => {
// 	const { hospitalId } = req?.params

// 	try {
// 		const validId = mongoose.Types.ObjectId.isValid(hospitalId)

// 		if (validId) {
// 			const hospitalWaitList = await medicalFacilityModel
// 				.findById(hospitalId)
// 				.select({
// 					hospitalName: 1,
// 					waitList: 1,
// 				})

// 			res.status(200).send(hospitalWaitList)
// 		} else {
// 			throw new Error('Issue finding the hospital')
// 		}
// 	} catch (error) {
// 		console.log(error.message)
// 		res.status(400).send({ message: 'There was an error' })
// 	}
// })

route.get('/viewAllLists', (req, res) => {
	// view the lists from all hospitals
})

route.get('/hospitalWaitList/:hospitalId', async (req, res) => {
	const { hospitalId } = req.params

	const validHospitalId = mongoose.Types.ObjectId.isValid(hospitalId)
	console.log(`Valid Id status: ${validHospitalId}`)
	try {
		if (validHospitalId) {
			const waitList = await getHospitalWaitList(hospitalId)
			if(waitList.length == 0){
				res.status(404).send({message: 'The wait list is currently empty.'})
			} else {
				res.status(200).send(waitList)

			}
		} else {
			throw new Error(
				'Hospital Id passed into the hospital waitList is invalid'
			)
		}
	} catch (error) {
		console.log(error.message)
		res.status(400).send({ message: 'Error getting hospital wait list' })
	}
})
export default route