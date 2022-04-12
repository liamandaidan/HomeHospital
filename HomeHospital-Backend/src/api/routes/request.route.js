import express from 'express'
import patientModel from '../../models/patient.Model.js'
import medicalFacilityModel from '../../models/medicalFacility.Model.js'
import completedRequestModel from '../../models/completedRequest.model.js'
import mongoose from 'mongoose'
import visitRequestModel from '../../models/visitRequest.Model.js'
import {
	completeCurrentRequest,
	cancelCurrentRequest,
} from '../service/request.service.js'
import { ENV, whitelist_string } from '../../configure/configure.js'
import validator from 'validator'

const route = express.Router()

/*
	This route creates a new request in the DB. The user must supply their user Id, the selected hospital Id,
	along with the list of symptoms and any additional information about their request. 

*/
route.post('/newRequest', async (req, res) => {
	// get the HospitalId
	// get patient Id
	// get list of symptom's (array) and additional info
	const { hospitalId, symptomList, additionalInfo } = req.body
	const patientId = req.patientId

	//sanitize all inputs to contain only alphanumeric charcters and a few necessary punctuation marks. Validator documentation at: https://github.com/validatorjs/validator.js#sanitizers
	const sanitizedHospitalId = validator.whitelist(hospitalId, whitelist_string)
	const sanitizedAdditionalInfo = validator.whitelist(additionalInfo, whitelist_string)
	const sanitizedPatientId = validator.whitelist(patientId, whitelist_string)
	const sanitizedSymptomList = []
	symptomList.forEach(element => {
		const sanElement = validator.whitelist(element, whitelist_string)
		sanitizedSymptomList.push(sanElement)
	})

	if (
		!mongoose.Types.ObjectId.isValid(sanitizedHospitalId) &&
		!mongoose.Types.ObjectId.isValid(sanitizedPatientId)
	) {
		console.log('patientId or hospitalId not valid')
		res.status(400).send({ message: 'Error' })
	}

	if (symptomList.length < 1) {
		console.log('symptomList is not valid')
		res.status(400).send({ message: 'Error' })
	}

	// Validates that the Id's for the hospital and patient are valid Mongo Ids
	const validFacilityId = mongoose.Types.ObjectId.isValid(sanitizedHospitalId)
	const validUserId = mongoose.Types.ObjectId.isValid(sanitizedPatientId)
	console.log(`From the make request ${sanitizedPatientId}`)

	if (validFacilityId && validUserId) {
		// Fetch the patients address
		const patient = await patientModel.findById(sanitizedPatientId)
		const hospital = await medicalFacilityModel.findById(sanitizedHospitalId)
		const { address } = patient.user

		if (patient && hospital) {
			try {
				// Create the new request
				const request = await visitRequestModel.create({
					patient: sanitizedPatientId, //patientOId
					patientFirstName: patient.user.firstName,
					patientLastName: patient.user.lastName,
					requestHospitalId: hospital._id, //hospitalId,
					requestHospitalName: hospital.hospitalName,
					latitude: hospital.latitude,
					longitude: hospital.longitude,
					// sets the patients address by default to the starting address
					startAddress: {
						streetAddress: address.streetAddress,
						cityName: address.cityName,
						provName: address.provName,
						postalCode: address.postalCode,
					},
					waitListTime: hospital.waitTime,
					symptoms: sanitizedSymptomList,
					additionalInfo: sanitizedAdditionalInfo,
				})

				// Save the request to the DB if all is OK
				await request.save()

				console.log(
					`New Patient request added to the DB, RequestId: ${request._id}`
				)

				// attach the new request Id to the patients requests list
				patient.newRequest(request._id, request.requestHospitalId)
				await patient.save()

				// Add the request to the hospitals waitList
				hospital.enqueue(request._id)
				await hospital.save()

				res.send({ message: 'Request entered', RequestId: request._id })
			} catch (error) {
				console.log(`Error: ${error.message}`)
				res.status(400).send({ message: 'Error' })
			}
		} else {
			console.log('Patient or hospital Do no exist')
			res.status(400).send({ message: 'Error' })
		}
	} else {
		console.log("Object Id's are Not valid")
		res.status(400).send({ message: 'Error' })
	}
})

route.get('/currentRequest', async (req, res) => {
	// return the current users request
	const patientId = req.patientId

	if (patientId == null || patientId == undefined || patientId == '') {
		console.log('patientId is not valid')
		res.status(400).send({ message: 'Error' })
	}
	const sanitizedPatientId = validator.whitelist(patientId, whitelist_string)
	// find the patient
	try {
		// validate the users Id
		const validUserId = mongoose.Types.ObjectId.isValid(sanitizedPatientId)
		if (validUserId) {
			// console.log(validUserId)
			const patient = await patientModel.findById(sanitizedPatientId)
			// console.log(patient)

			if (patient.currentRequest == null) {
				res.status(404).send({ message: 'No Current requests' })
			} else {
				// Get the request with the matching Id
				const currentRequest = await visitRequestModel.findById(
					patient.currentRequest
				)
				console.log('Sent patient their current request')
				res.status(200).send(currentRequest)
			}
		} else {
			throw new Error('Invalid User Id')
		}
	} catch (error) {
		console.log(error.message)
		res.status(400).send({ message: 'Bad request' })
	}
})

route.get('/allRequests', async (req, res) => {
	// return the current users request
	const patientId = req.patientId

	if (patientId == null || patientId == undefined || patientId == '') {
		console.log('patientId is not valid')
		res.status(400).send({ message: 'Error' })
	}
	const sanitizedPatientId = validator.whitelist(patientId, whitelist_string)

	// find the patient
	try {
		// validate the users Id
		const validUserId = mongoose.Types.ObjectId.isValid(sanitizedPatientId)
		if (validUserId) {
			// console.log(validUserId)
			const patient = await patientModel.findById(sanitizedPatientId)
			// console.log(patient)

			if (patient.pastRequests.length == 0) {
				console.log('No registered requests')
				res.status(404).send({ message: 'No Current requests' })
			} else {
				// for each requestId attached to the patient, loop through and query all requests, attach to an array,
				// send back to client

				// find all DB entries with that patient id
				const requestList = await completedRequestModel.find({'request.patient': sanitizedPatientId})


				console.log('Sent patient list of ALL requests')
				res.status(200).send(requestList)
			}
		} else {
			throw new Error('Invalid mongo object Id')
		}
	} catch (error) {
		console.log(error.message)
		res.status(400).send({ message: 'Bad request' })
	}
})

route.get('/targetRequest/:requestId', async (req, res) => {
	// return the current users request
	const { requestId } = req.params
	const sanitizedRequestId = validator.whitelist(requestId, whitelist_string)

	// find the patient
	try {
		// validate the users Id
		const validUserId = mongoose.Types.ObjectId.isValid(sanitizedRequestId)
		if (validUserId) {
			const request = await completedRequestModel.findById(sanitizedRequestId)

			if (request) {
				console.log(
					`Sent the patient the request with the Id: ${sanitizedRequestId}`
				)
				res.status(200).send(request)
			} else {
				console.log('No registered requests')
				res.status(404).send({ message: 'Request not found' })
			}
		} else {
			throw new Error('Invalid Request Id')
		}
	} catch (error) {
		console.log(error.message)
		res.status(400).send({ message: 'Bad request' })
	}
})

route.delete('/cancel', async (req, res) => {
	// check if they have a current request
	const patientId = req.patientId
	const sanitizedPatientId = validator.whitelist(patientId, whitelist_string)

	try {
		// Ensure that the patientId is valid
		if (await cancelCurrentRequest(sanitizedPatientId)) {
			// Delete the visit request and all references to it
			console.log('request was canceled')
			res.status(200).send({ message: 'Request was canceled' })
		} else {
			res.status(400).send({ message: 'Cancel not processed' })
		}
	} catch (error) {
		console.error('Cancel Request Error: ' + error.message)
		res.status(400).send({ message: 'Cancel Request Error' })
	}
})

export default route
