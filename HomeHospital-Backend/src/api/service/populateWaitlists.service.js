import fs from 'fs'
import VisitRequest from '../../models/visitRequest.Model.js'

/**
 * This will be used to populate the list of requests
 * Right now, it is just checking to see requests in the DB, and also set up to be able to read requestID's
 * that will be used in the development process to set the rough order
 */
export async function populateWaitlists() {
	try {
		const allRequests = await VisitRequest.find()

		// Checks to see if there are any active requests in the data base, if not read from teh list of request IDS
		// Stored in a text file
		if (allRequests.length != 0) {
			// Refactored to use modern async/await
			let data = await fs.promises.readFile(
				'../HomeHospital-Backend/src/requestOrder.txt',
				'utf8'
			)
			// Split into array items and clean up an blank returns
			data = data.split('\n')

			if (data[data.length - 1] === '') {
				data.pop()
			}
            // console.log(`\nRequest Id's from the Text File `)
			// console.table(data)
		} else {
			//console.log(allRequests);
			allRequests.forEach((element) => {
				console.log(element)
			})
		}
	} catch (error) {
		console.error(error.message)
	}
}
