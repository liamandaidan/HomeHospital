import express from 'express'
import {invalidateRefToken} from '../service/token.service.js';

const options = {
	maxAge: 1000 * 60 * 2, // valid for 2 minutes,
	httpOnly: true
}


const route = express.Router()

route.get('/', async (req, res) => {
	// Check for token

    //TODO 
	if (res.cookies?.JWT) {
		// invalidate the token
		res.cookies.set('JWT', { expires: Date.now() })
		//send message
		res.send({ data: 'COOKIE DELETED: maybe' })
	} else {
        res.send({data: 'delete didnt work!'})
    }
})

route.post('/', invalidateRefToken, (req, res) => {
	res.clearCookie('accessTokenCookie', options)
	res.clearCookie('refreshTokenCookie', options)
	res.status(200).json({message: "User successfully logged out."});
})

export default route
