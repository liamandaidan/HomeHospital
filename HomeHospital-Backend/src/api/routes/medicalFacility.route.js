import express from 'express' // Creates Router
import MedicalFacility from '../../models/medicalFacility.Model.js'

const route = express.Router()

// Used to created a new medical facility
// This was just used to manually enter a new facility
route.post('/newFacility', async (req, res) => {
	const {
		hospitalName,
		streetAddress,
		cityName,
		provName,
		postalCode,
		phoneNumber,
	} = req.body

	let valsFromBody = [
		hospitalName,
		streetAddress,
		cityName,
		provName,
		postalCode,
		phoneNumber,
	]
	if (
		valsFromBody.includes(undefined) ||
		valsFromBody.includes(null) ||
		valsFromBody.includes('')
	) {
		console.log(
			'Detected a missing field in registering new medical facility'
		)
		res.status(400).send({ message: 'Error' })
	}

	try {
		// Check to make sure we don't have a duplicate hospital
		const result = await MedicalFacility.exists({
			hospitalName: hospitalName,
		})

		if (result?._id) {
			console.log('Hospital All Ready exists!!')
			res.status(400).send({ message: 'Error' })

			return
		}

		// create the new hospital in the DB if its all good
		const facility = await MedicalFacility.create({
			hospitalName: hospitalName,
			address: {
				streetAddress: streetAddress,
				cityName: cityName,
				provName: provName,
				postalCode: postalCode,
			},
			phoneNumber: phoneNumber,
		})
		facility.save()
		console.log('hospital created: ' + facility)
		res.status(201).send({ message: 'Hospital Created' })
	} catch (error) {
		res.status(400).send({ message: 'Error' })
	}
})

// Get a list of all of the hospitals with their wait times
route.get('/viewFacilities', async (req, res) => {
	try {
		// Fetch the list of hospitals from the database without the list of practitioners or V number
		const hospitalList = await MedicalFacility.find()
			.select({
				practitioners: 0,
				__v: 0,
				waitList: 0,
			})
			.exec()

		// console.log(hospitalList)
		// Sent the user an array of objects containing the hospitals and info
		res.status(200).send({
			message: 'Successful Request',
			hospitalList: hospitalList,
		})
	} catch (error) {
		console.log(error)
		res.status(400).send({ message: 'Error in the request' })
	}
})

// export this route
export default route
