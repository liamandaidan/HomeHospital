import express from 'express'
import { registerUser } from '../../controllers/register.controller.js'
import UserSchema from '../../models/User.Schema.js'

// Creates Router
const route = express.Router()

route.post('/', async (req, res)=> {
    try {
        // verify user object
        const newUser = await UserSchema.create({firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password})
        newUser.save()
        console.log(newUser)
        res.send(newUser)
        
    } catch (e) {
        console.error(e.message)
        res.status(406).send('Request Failed')

    }

    // check if user already exists
    // if yes, response
    // const result = await registerUser(req.body.email, req.body.password)
    // if no, encrypt password and enter user in database
    // console.log('from reg route: ' + result)
    // res.send({"Registration Status": result})
})


export default route
