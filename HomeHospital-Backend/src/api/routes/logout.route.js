import express from 'express'
import { invalidateRefToken } from '../service/token.service.js'

const options = {
	maxAge: 1000 * 60 * 2, // valid for 2 minutes,
	httpOnly: true,
}

const route = express.Router()

route.post('/', invalidateRefToken, (req, res) => {
	res.clearCookie('accessTokenCookie', options)
	res.clearCookie('refreshTokenCookie', options)
	res.status(200).json({ message: 'User successfully logged out.' })
})

export default route
