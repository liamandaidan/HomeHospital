import express from 'express'
import { webScraper } from '../../webscaper/webScraper.js'

// Creates Router
const route = express.Router()

// Register Route
route.get('/', async (req, res) => {
	console.log('Updating Times')
	try {
		webScraper()
	} catch (error) {
		console.log(error)
	}
	res.status(200).send({
		status: 'Success',
		message: 'Times are updated',
	})
	return
})

export default route
