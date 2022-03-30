import fs from 'fs'
import VisitRequest from '../../models/visitRequest.Model.js'
import medicalFacilityModel from '../../models/medicalFacility.Model.js'
import { Waitlist } from '../../models/waitlist.class.js'

/**
 * This will be used to populate the list of requests
 * Right now, it is just checking to see requests in the DB, and also set up to be able to read requestId's
 * that will be used in the development process to set the rough order
 */
export async function populateWaitlists() {
	let allFacilities = await medicalFacilityModel.find()
	let allWaitlists = []
	allFacilities.forEach((element) => {
		allWaitlists.push(
			new Waitlist({ _id: element._id, name: element.hospitalName })
		)
	})
	let allRequests = await VisitRequest.find()
	if (allRequests.length === 0) {
		fs.readFile(
			'../HomeHospital-Backend/src/requestOrder.txt',
			'utf8',
			(err, data) => {
				if (err) {
					console.error(err)
					return
				}
				console.log(data.split('\r\n'))
			}
		)
	} else {
		let dataFromFile = await fs.promises.readFile(
			'../HomeHospital-Backend/src/requestOrder.txt',
			'utf8'
		)
		// Split into array items and clean up an blank returns
		dataFromFile = dataFromFile.split('\r\n')

		if (dataFromFile[dataFromFile.length - 1] === '') {
			dataFromFile.pop()
		}
		//console.table(dataFromFile)

		let requestIdsRandom = []
		allRequests.forEach((element) => {
			requestIdsRandom.push(element._id.toHexString())
		})

		/*For each request, I need to check the hospital, and check the requestId against the text file's list, and put the request into the waitlist in the same order as in the text file */

		allRequests.forEach((element) => {
			//console.log(element._id.toHexString());
			let elementIndex = allRequests.indexOf(element)
			let requestedHospital = element.requestHospitalId
			let requestOrderIndex = dataFromFile.indexOf(
				element._id.toHexString()
			) //get the position of the current request as it stands in the file
			//console.log(requestOrderIndex);
			let hospitalIndex = allWaitlists.findIndex((object) => {
				return object.hospital._id.equals(requestedHospital)
			})
			if (hospitalIndex >= 0) {
				console.log(
					`Placing ${element._id.toHexString()} into the waitlist at position ${requestOrderIndex}`
				)
				allWaitlists[hospitalIndex].initInsert(
					element,
					requestOrderIndex
				)
			}
		})

		allWaitlists.forEach((element) => {
			//console.log(element.hospital);
			/*Insert functionality to send each waitlist to its hospital here */
			if (element.queueSize > 0) {
				console.log(
					`Hospital: ${element.hospital.name} has a queue size of ${element.queueSize}`
				)
				element.printAll()
			} else {
				console.log(
					`Hospital: ${element.hospital.name} has a queue size of ${element.queueSize}`
				)
			}
		})
	}
}
