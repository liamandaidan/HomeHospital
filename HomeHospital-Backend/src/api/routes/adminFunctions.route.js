import express from 'express'
import administratorModel from '../../models/administrator.Model.js'
import patientModel from '../../models/patient.Model.js'
import practitionerModel from '../../models/practitioner.Model.js'

const route = express()

//  view all patients
route.get('/patientList', async (req, res) => {
	try {
		const patientList = await patientModel.find().select({
			password: 0,
			__v: 0,
			currentHospital: 0,
			currentRequest: 0,
			pastRequests: 0,
		})
		res.status(200).send(patientList)
	} catch (error) {
		console.log(error.message)
		res.status(404).send({ message: 'Error finding patients' })
	}
})

// view all practitioners
route.get('/practitionerList', async (req, res) => {
	try {
		const practitioners = await practitionerModel.find().select({
			password: 0,
			__v: 0,
		})
		if (practitioners.length <= 0) {
			res.status(406).send({ message: 'No practitioners found' })
		}
		console.log('List of practitioners retrieved and sent.')
		res.status(201).send(practitioners)
	} catch (err) {
		res.status(404).send({ message: 'Error in retrieving records' })
	}
})
// view all admin
route.get('/adminList', async (req, res) => {
	try {
		const adminList = await administratorModel.find().select({
			password: 0,
			__v: 0,
		})
		console.log('List of Admins retrieved and sent.')
		res.status(200).send(adminList)
	} catch (error) {
		console.log(error.message)
		res.status(400).send({ message: 'Error retrieving Admin List' })
	}
})

export default route
