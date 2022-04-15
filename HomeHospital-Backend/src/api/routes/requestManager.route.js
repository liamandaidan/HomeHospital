import express from 'express'
import patientModel from '../../models/patient.Model.js'
import mongoose from 'mongoose'
import {
	completeCurrentRequest,
	getHospitalWaitList,
} from '../service/request.service.js'

const route = express.Router()

route.post('/completeRequest', async (req, res) => {
	const { patientId } = req.body

	if (await completeCurrentRequest(patientId)) {
		res.status(200).send({ message: 'Request Completed' })
	} else {
		res.status(400).send({ message: 'Failed to complete visit request!' })
	}
})

route.get('/hospitalWaitList/:hospitalId', async (req, res) => {
	const { hospitalId } = req.params

	const validHospitalId = mongoose.Types.ObjectId.isValid(hospitalId)
	try {
		if (validHospitalId) {
			const waitList = await getHospitalWaitList(hospitalId)
			if (waitList.length == 0) {
				res.status(404).send({
					message: 'The wait list is currently empty.',
				})
			} else {
				res.status(200).send(waitList)
			}
		} else {
			throw new Error(
				'Hospital Id passed into the hospital waitList is invalid'
			)
		}
	} catch (error) {
		console.log(`${new Date()}n\tError:  ${error.message}`)
		res.status(400).send({ message: 'Error getting hospital wait list' })
	}
})

route.get('/patientInfo/:patientId', async (req, res) => {
	// return the current users request
	const { patientId } = req.params

	if (patientId == null || patientId == undefined || patientId == '') {
		res.status(400).send({ message: 'Error' })
		return
	}

	// find the patient
	try {
		// validate the users Id
		const validUserId = mongoose.Types.ObjectId.isValid(patientId)
		if (validUserId) {
			const patient = await patientModel.findById(patientId).select({
				password: 0,
				__v: 0,
			})
			res.status(200).send(patient)
		} else {
			throw new Error('Invalid mongo object Id')
		}
	} catch (error) {
		console.log(`${new Date()}n\tError:  ${error.message}`)
		res.status(400).send({ message: 'Bad request' })
	}
})

export default route
