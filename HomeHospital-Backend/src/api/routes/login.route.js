import express from 'express'
import { logUserIn } from '../service/login.service.js'
import { generateAccessToken } from '../service/token.service.js'

// Creates Router
const route = express.Router()

/**
 * @route
 * @url /api/login
 * @summary login route for patients
 * 
 * @description Calls middleware to log the patient in and generate access and refresh tokens, 
 * then returns them in the response to the user. 
 */
route.post('/', logUserIn, generateAccessToken, (req, res) => {
	// attaches JWT token values to the request
	const accessT = req.tokens.accessT
	const refreshT = req.tokens.refreshT
	res.status(201).json({
		message: 'Login successful',
		patientId: req.patientId,
		accessT: accessT,
		refreshT: refreshT,
	})
})

export default route
