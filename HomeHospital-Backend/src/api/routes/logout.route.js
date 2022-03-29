import express from 'express'
import { invalidateRefToken } from '../service/token.service.js'
import {
	accessOptions,
	refreshOptions,
} from '../../configure/cookie.configure.js'

const route = express.Router()

// Logs out the user byu hitting the invalidate service by remove the toke from the DB
// And then clearing the cookies
route.post('/', invalidateRefToken, (req, res) => {
	res.clearCookie('accessTokenCookie', accessOptions)
	res.clearCookie('refreshTokenCookie', refreshOptions)
	res.status(200).send({ message: 'User successfully logged out.' })
})

export default route
