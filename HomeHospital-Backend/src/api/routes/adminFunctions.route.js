import express from 'express'
import administratorModel from '../../models/administrator.Model.js'
import patientModel from '../../models/patient.Model.js'
import completedRequestModel from '../../models/completedRequest.model.js'
import practitionerModel from '../../models/practitioner.Model.js'
import mongoose from 'mongoose'

const route = express()

route.get('/userCount', async (req, res) => {
	try {
		res.status(200).send({
			patients: await patientModel.count(),
			practitioners: await practitionerModel.count(),
			admins: await administratorModel.count(),
		})
	} catch (error) {
		console.error(`${new Date()}n\tError:  ${error.message}`)
		res.status(406).send({ message: 'Get Count Failed' })
	}
})

//  view all patients
route.get('/patientList', async (req, res) => {
	try {
		//TODO: update the return values to send Id, email, first and last
		const patientList = await patientModel.find().select({
			_id: 1,
			email: 1,
			user: {
				firstName: 1,
				lastName: 1,
			},
		})
		res.status(200).send(patientList)
	} catch (error) {
		console.log(`${new Date()}n\tError:  ${error.message}`)
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
		res.status(201).send(practitioners)
	} catch (err) {
		console.log(`${new Date()}n\tError:  ${err.message}`)
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
		res.status(200).send(adminList)
	} catch (error) {
		console.log(`${new Date()}n\tError:  ${error.message}`)
		res.status(400).send({ message: 'Error retrieving Admin List' })
	}
})

route.get('/patientInfo/:patientId', async (req, res) => {
	try {
		const { patientId } = req.params
		if (!mongoose.Types.ObjectId.isValid(patientId)) {
			throw new Error("Patient Id is not valid or doesn't exist!")
		}

		const patient = await patientModel.findById(patientId)
		res.status(200).send(patient.getInfoForAdmin())
	} catch (error) {
		console.error(`${new Date()}n\tError:  ${error.message}`)
		res.status(400).send({
			message: "Patient Id is not valid or doesn't exist!",
		})
	}
})

route.get('/practitionerInfo/:practitionerId', async (req, res) => {
	const { practitionerId } = req.params

	try {
		if (
			mongoose.Types.ObjectId.isValid(practitionerId) &&
			(await practitionerModel.exists({ _id: practitionerId }))
		) {
			const practitioner = await practitionerModel.findById(
				practitionerId
			)
			res.status(200).send(practitioner.getPractitionerInfo())
		} else {
			throw new Error('Invalid PractitionerId!')
		}
	} catch (error) {
		console.error(`${new Date()}n\tError:  ${error.message}`)
		res.status(406).send({ message: 'Failed to edit Practitioner!' })
	}
})

route.post('/modifyPractitioner', async (req, res) => {
	const practitionerInfo = req.body

	try {
		if (
			mongoose.Types.ObjectId.isValid(practitionerInfo.id) &&
			(await practitionerModel.exists({ _id: practitionerInfo.id }))
		) {
			const practitioner = await practitionerModel.findById(
				practitionerInfo.id
			)
			practitioner.modifyPractitioner(practitionerInfo)
			await practitioner.save()
			res.status(200).send({ message: 'Edit Complete!' })
		} else {
			throw new Error('Invalid PractitionerId!')
		}
	} catch (error) {
		console.error(`${new Date()}n\tError:  ${error.message}`)
		res.status(406).send({ message: 'Failed to edit Practitioner!' })
	}
})

route.get('/adminInfo/:adminId', async (req, res) => {
	const { adminId } = req.params

	try {
		if (
			mongoose.Types.ObjectId.isValid(adminId) &&
			(await administratorModel.exists({ _id: adminId }))
		) {
			const admin = await administratorModel.findById(adminId)
			res.status(200).send(admin.getAdminInfo())
		} else {
			throw new Error('Invalid PractionerId!')
		}
	} catch (error) {
		console.error('Error: ' + error.message)
		res.status(406).send({ message: 'Failed to get admin!' })
	}
})

route.post('/modifyAdmin', async (req, res) => {
	const adminInfo = req.body

	try {
		if (
			mongoose.Types.ObjectId.isValid(adminInfo.id) &&
			(await administratorModel.exists({ _id: adminInfo.id }))
		) {
			const admin = await administratorModel.findById(adminInfo.id)
			admin.modifyAdmin(adminInfo)
			await admin.save()
			res.status(200).send({ message: 'Edit Complete!' })
		} else {
			throw new Error('Invalid adminId!')
		}
	} catch (error) {
		console.error('Error: ' + error.message)
		res.status(406).send({ message: 'Failed to edit admin!' })
	}
})

// delete patient
route.delete('/patient/:patientId', async (req, res) => {
	try {
		const { patientId } = req.params
		const validId = mongoose.Types.ObjectId.isValid(patientId)
		if (validId) {
			const patient = await patientModel.findById(patientId)

			if (patient.currentRequest) {
				res.status(400).send({
					message: 'Cannot delete patient with active request',
				})
				return
			}

			// Delete Requests
			await completedRequestModel.deleteMany({
				'request.patient': patientId,
			})

			// Finally delete the patient and send a response.
			const firstName = patient.firstName
			const lastName = patient.lastName
			const _id = patient._id
			await patientModel.findByIdAndDelete(patientId)

			console.log(
				'Deleted the patient ' +
					firstName +
					' ' +
					lastName +
					' id:' +
					_id
			)
			res.status(200).send({ message: 'Patient Deleted!' })
		} else {
			throw new Error('There was an error deleting the patient')
		}
	} catch (error) {
		console.log(`${new Date()}n\tError:  ${error.message}`)
		res.status(400).send({ message: 'Error deleting the patient.' })
	}
})

// delete practitioner
route.delete('/practitioner/:practitionerId', async (req, res) => {
	//TODO: check for admin level 2
	try {
		const { practitionerId } = req.params
		const validId = mongoose.Types.ObjectId.isValid(practitionerId)
		if (validId) {
			await practitionerModel.findByIdAndDelete(practitionerId)
			res.status(200).send({ message: 'Practitioner Deleted!' })
		} else {
			throw new Error('There was an error deleting the practitioner')
		}
	} catch (error) {
		console.log(`${new Date()}n\tError:  ${error.message}`)
		res.status(400).send({ message: 'Error deleting the practitioner.' })
	}
})
// delete admin
route.delete('/admin/:adminId', async (req, res) => {
	//TODO: check for admin level 3
	try {
		const { adminId } = req.params
		const validId = mongoose.Types.ObjectId.isValid(adminId)
		if (validId) {
			await administratorModel.findByIdAndDelete(adminId)
			res.status(200).send({ message: 'Admin Deleted!' })
		} else {
			throw new Error('There was an error deleting the admin')
		}
	} catch (error) {
		console.log(`${new Date()}n\tError:  ${error.message}`)
		res.status(400).send({
			message: 'Error deleting the admin.',
		})
	}
})

export default route
