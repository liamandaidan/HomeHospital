import express from 'express' // Creates Router
import MedicalFacility from '../../models/medicalFacility.Model.js'
import { checkAccessToken } from '../service/token.service.js'
import { checkEmployeeAccessToken } from '../service/employee.token.service.js'
import {
	checkMayAccessAdminPage,
	checkMayAccessPractitionerPage,
} from '../service/authorization.service.js'
import { getHospitalList } from '../service/getHospitalList.service.js'

const route = express.Router()

// Used to created a new medical facility
// This was just used to manually enter a new facility
route.post('/newFacility', checkMayAccessAdminPage, async (req, res) => {
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
			new Date() +
				' Detected a missing field in registering new medical facility'
		)
		res.status(400).send({ message: 'Error' })
	}

	try {
		// Check to make sure we don't have a duplicate hospital
		const result = await MedicalFacility.exists({
			hospitalName: hospitalName,
		})

		if (result?._id) {
			console.log(
				'Hospital All Ready exists!! Tried to register a hospital that already exists ' +
					new Date()
			)
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
		res.status(201).send({ message: 'Hospital Created' })
	} catch (error) {
		console.log(`${new Date()}\tError:  ${error.message}`)
		res.status(400).send({ message: 'Error' })
	}
})

// Get a list of all of the hospitals with their wait times
// From the patient view
route.get('/viewFacilities', checkAccessToken, async (req, res) => {
	getHospitalList(res)
	return
})

// get the list from the practitioner view
route.get(
	'/viewFacilitiesPractitioner',
	checkEmployeeAccessToken,
	checkMayAccessPractitionerPage,
	async (req, res) => {
		getHospitalList(res)
		return
	}
)
//get the list from the admin view
route.get(
	'/viewFacilitiesAdmin',
	checkEmployeeAccessToken,
	checkMayAccessAdminPage,
	async (req, res) => {
		getHospitalList(res)
		return
	}
)

// export this route
export default route
