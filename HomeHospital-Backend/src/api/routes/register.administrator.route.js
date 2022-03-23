import express from 'express'
import { registerAdministrator } from '../service/register.service.js'

// Creates Router
const route = express.Router()

// Register Route
route.post('/', async (req, res) => {
	try {
		const result = await registerAdministrator(req)

		if(result == -1) {
			console.log("registerAdministrator returned -1");
			res.status(422).send({
				status: 'Error',
				message: 'Something went wrong with the registration, please try again.',
			})
			return
		}

		if (!result.status) {
			console.log('Error: Administrator already exists')
			res.status(422).send({
				status: 'Error',
				message: 'Something went wrong with the registration, please try again.',
			})
			return
		}

		if (result?.user) {
			console.log('Registration Successful')
			res.send(result.user)
		}
	} catch (e) {
		console.error(e.message)
		res.status(406).send('Request Failed')
	}
})

export default route