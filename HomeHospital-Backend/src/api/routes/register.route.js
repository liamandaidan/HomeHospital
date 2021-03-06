import express from 'express'
import { registerUser } from '../service/register.service.js'

// Creates Router
const route = express.Router()

// Register Route
route.post('/', async (req, res) => {
	try {
		const result = await registerUser(req)

		if (result == -1) {
			res.status(422).send({
				status: 'Error',
				message:
					'Something went wrong with the registration, please try again.',
			})
			return
		}

		if (!result.status) {
			console.log('Error: User already exists')
			res.status(422).send({
				status: 'Error',
				message:
					'Something went wrong with the registration, please try again.',
			})
			return
		}

		if (result?.user) {
			console.log('Registration Successful')
			res.send({ message: 'Patient Registered' })
		}
	} catch (e) {
		console.error(`${new Date()}\tError:  ${e.message}`)
		res.status(406).send({ message: e.message })
	}
})

export default route
