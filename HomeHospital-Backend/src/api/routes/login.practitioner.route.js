import express from 'express'
import { logPractitionerIn } from '../service/login.service.js'
import { generateAccessToken } from '../service/token.service.js'

// Creates Router
const route = express.Router()

// Logs in the user and creates access tokens through token.service.js middleware
route.post('/', logPractitionerIn, generateAccessToken, (req, res) => {
	// attaches JWT token values to the request
	const accessT = req.tokens.accessT
	const refreshT = req.tokens.refreshT
	// console.log('accessT: ' + accessT)
	// console.log('refreshT: ' + refreshT)
	res.status(201).json({
		message: 'Login successful',
		practitioner_employeeNum: req.practitioner_employeeNum,
		accessT: accessT,
		refreshT: refreshT,
	})
})

export default route
