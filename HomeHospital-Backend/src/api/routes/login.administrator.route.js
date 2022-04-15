import express from 'express'
import { logAdministratorIn } from '../service/login.service.js'
import { generateEmployeeAccessToken } from '../service/employee.token.service.js'

// Creates Router
const route = express.Router()

route.post('/', logAdministratorIn, generateEmployeeAccessToken, (req, res) => {
	// attaches JWT token values to the request
	const accessT = req.tokens.accessT
	const refreshT = req.tokens.refreshT
	res.status(201).json({
		message: 'Login successful',
		adminId: req.adminId,
		accessT: accessT,
		refreshT: refreshT,
	})
})

export default route
