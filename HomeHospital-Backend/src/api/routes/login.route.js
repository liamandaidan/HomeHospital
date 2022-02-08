import express from 'express'
import { logUserIn } from '../service/login.service.js'
import UserSchema from '../../models/User.Schema.js'
import bcrypt from 'bcryptjs'


// Creates Router
const route = express.Router()

route.post('/', async (req, res)=>{

    const loginStatus = await logUserIn(req)
    // console.log(loginStatus)

    if(loginStatus){
        res.send({status: 'Login OK'})
    } else {
        res.status(401).send({status: "NO LOGIN FOR YOU"})
    }
})





export default route
