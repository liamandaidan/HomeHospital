import { firefox } from 'playwright'
import MedicalFacility from './models/medicalFacility.model.js'

export const webScraper = async () => {
	console.log('About to WebScrape')
	// Launch browser;
	const browser = await firefox.launch()

	// Create pages, interact with UI elements, assert values
	const page = await browser.newPage()
	await page.goto(
		'https://www.albertahealthservices.ca/waittimes/waittimes.aspx'
	)

	// Store array of names and wait times of elements which are apart of a class.

	// just checking Calgary hospitals for now
	const hospitals = {
		name: await page
			.locator('.cityContent-calgary .hospitalName')
			.allInnerTexts(),
		time: await page
			.locator('.cityContent-calgary .wt-times')
			.allInnerTexts(),
	}

	const fullList = []

	for (let i = 0; i < hospitals.name.length; i++) {
		fullList.push({ name: hospitals.name[i], waitTime: hospitals.time[i] })
	}

	// Update the DB with new wait times
	fullList.forEach(async (hospitalObj) => {
		// Set the Name to filter on, and the value to update
		const filter = { hospitalName: hospitalObj.name }
		const update = { waitTime: hospitalObj.waitTime }
		const updatedFacilityTime = await MedicalFacility.findOneAndUpdate(
			filter,
			update,
			{ new: true }
		).exec()

		// If there is an error print a message to the Console for now
		if (updatedFacilityTime == null) {
			console.log('HUGE ERROR!')
			console.log(filter)
			console.log(update)
		} else {
			//console.log(updatedFacilityTime)
		}
	})

	await browser.close()

	console.log('🔪 Web was scraped')
}
