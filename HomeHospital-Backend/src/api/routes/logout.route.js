import express, { application } from 'express'
import jwt from 'jsonwebtoken'

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

export default route
