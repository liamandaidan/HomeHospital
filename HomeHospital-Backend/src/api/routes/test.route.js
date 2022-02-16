import express from 'express'
import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
import { checkAccessToken } from '../service/generateToken.service.js'

// Creates Router
const route = express.Router()

// Get route for test request
/*route.get('/', async (req, res) => {
	
	if(req?.cookies?.JWT){
		console.log('received a request!')

		const jwtValue = jwt.verify(req.cookies.JWT,ENV.JWT_KEY )
		res.send({ data: 'This was a success!', jwtValue:jwtValue })

	} else {
		res.status(404).send({data: 'JWT NOT FOUND OR VALID'})
	}
})*/

route.get('/', checkAccessToken, (req, res) => {
	const accessT = res.locals.accessT;
    const refreshT = res.locals.refreshT;
    console.log("accessT: " + accessT);
    console.log("refreshT: " + refreshT);
    res.status(201).json({message: "You are authorized to reach this page!", user: req.authUser, accessT: accessT, refreshT: refreshT});
})

// export this route
export default route
