import express from 'express'
import { logUserIn } from '../service/login.service.js'
// import UserSchema from '../../models/User.Schema.js'
import { generateToken } from '../service/generateToken.service.js'
import bcrypt from 'bcryptjs'


// Creates Router
const route = express.Router()

route.post('/', async (req, res)=>{

    const userStatus = await logUserIn(req)
    // console.log(loginStatus)

    if(userStatus.status){
    // Generate JWT
        const JWT_TOKEN = generateToken(userStatus._id)

        // create token
        const options = {
            maxAge: 1000 * 60 * 2, // valid for 2 minutes,
            httpOnly: true
        }
        // console.log(JWT_TOKEN)
        res.cookie('JWT',JWT_TOKEN, options)
        res.send({status: 'Login OK'})

    } else {
        res.status(401).send({status: "NO LOGIN FOR YOU"})
    }
})





export default route
