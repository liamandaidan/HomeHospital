import express from 'express'
import administratorModel from '../../models/administrator.Model.js'
import patientModel from '../../models/patient.Model.js'
import practitionerModel from '../../models/practitioner.Model.js'
import mongoose from 'mongoose'

const route = express()

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


route.get('/patientInfo/:patientId', async (req, res) => {
	try {
		const { patientId } = req.params;
		if (!mongoose.Types.ObjectId.isValid(patientId))
		{
			throw new Error("Patient Id is not valid or doesnt exist!")			
		}

		const patient = await patientModel.findById(patientId)
		res.status(200).send(patient.getInfoForAdmin())
	} catch (error) {
		console.error("Error: " + error.message)
		res.status(400).send( {message: "Patient Id is not valid or doesnt exist!"} )
	}
})

route.get('/practitionerInfo/:practitionerId', async (req, res) => {
	const { practitionerId } = req.params;

	try {
		if(mongoose.Types.ObjectId.isValid(practitionerId) && 
			await practitionerModel.exists({_id: practitionerId})) {

			const practitioner = await practitionerModel.findById(practitionerId);		
			res.status(200).send(practitioner.getPractitionerInfo())
		} else {
			throw new Error("Invalid PractionerId!")
		}
	}catch(error) {
		console.error('Error: ' + error.message)
		res.status(406).send({message: "Failed to edit Practioner!"})
	}
})

route.post('/modifyPractitioner', async (req, res) => {
	const practitionerInfo = req.body;

	try {
		if(mongoose.Types.ObjectId.isValid(practitionerInfo.id) && 
			await practitionerModel.exists({_id: practitionerInfo.id})) {

			const practitioner = await practitionerModel.findById(practitionerInfo.id);
			practitioner.modifyPractitioner(practitionerInfo)
			await practitioner.save()
			res.status(200).send({message: "Edit Complete!"})
		} else {
			throw new Error("Invalid PractionerId!")
		}
	}catch(error) {
		console.error('Error: ' + error.message)
		res.status(406).send({message: "Failed to edit Practioner!"})
	}
})

route.get('/adminInfo/:adminId', async (req, res) => {
	const { adminId } = req.params;

	try {
		if(mongoose.Types.ObjectId.isValid(adminId) && 
			await administratorModel.exists({_id: adminId})) {

			const admin = await administratorModel.findById(adminId);		
			res.status(200).send(admin.getAdminInfo())
		} else {
			throw new Error("Invalid PractionerId!")
		}
	}catch(error) {
		console.error('Error: ' + error.message)
		res.status(406).send({message: "Failed to get admin!"})
	}
})

route.post('/modifyAdmin', async (req, res) => {
	const adminInfo = req.body;

	try {
		if(mongoose.Types.ObjectId.isValid(adminInfo.id) && 
			await administratorModel.exists({_id: adminInfo.id})) {

			const admin = await administratorModel.findById(adminInfo.id);
			admin.modifyAdmin(adminInfo)
			await admin.save()
			res.status(200).send({message: "Edit Complete!"})
		} else {
			throw new Error("Invalid adminId!")
		}
	}catch(error) {
		console.error('Error: ' + error.message)
		res.status(406).send({message: "Failed to edit admin!"})
	}
})

// delete patient
route.delete('/patient', async (req, res) => {
	try {
		const { patientId } = req.body
		const validId = mongoose.Types.ObjectId.isValid(patientId)
		if (validId) {
			await patientModel.findByIdAndDelete(patientId)
			res.send('This worked')
		} else {
			throw new Error('There was an error deleting the patient')
		}
	} catch (error) {
		console.log(error.message)
		res.status(400).send({ message: 'Error deleting the patient.' })
	}
})

// delete practitioner
route.delete('/practitioner', async (req, res) => {
	//TODO: check for admin level 2
	try {
		const { practitionerId } = req.body
		const validId = mongoose.Types.ObjectId.isValid(practitionerId)
		if (validId) {
			await practitionerId.findByIdAndDelete(practitionerId)
			res.send('This worked')
		} else {
			throw new Error('There was an error deleting the practitioner')
		}
	} catch (error) {
		console.log(error.message)
		res.status(400).send({ message: 'Error deleting the practitioner.' })
	}
})
// delete admin
route.delete('/admin', async (req, res) => {
	//TODO: check for admin level 3
	try {
		const { adminId } = req.body
		const validId = mongoose.Types.ObjectId.isValid(adminId)
		if (validId) {
			await administratorModel.findByIdAndDelete(adminId)
			res.send('This worked')
		} else {
			throw new Error('There was an error deleting the admin')
		}
	} catch (error) {
		console.log(error.message)
		res.status(400).send({
			message: 'Error deleting the admin.',
		})
	}
})

export default route
