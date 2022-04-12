import express from 'express'
import { invalidateRefToken } from '../service/token.service.js'
import {
	accessOptions,
	refreshOptions,
} from '../../configure/cookie.configure.js'

const route = express.Router()

/**
 * @route
 * @url /api/logout
 * @summary logout route for all users
 * 
 * @description Calls middleware to invalidate the refresh token, which will prevent the access token from 
 * being refreshed, and then instructs the user's browser to clear the cookies containing both tokens
 */
route.post('/', invalidateRefToken, (req, res) => {
	res.clearCookie('accessTokenCookie', accessOptions)
	res.clearCookie('refreshTokenCookie', refreshOptions)
	res.status(200).send({ message: 'User successfully logged out.' })
})

export default route
