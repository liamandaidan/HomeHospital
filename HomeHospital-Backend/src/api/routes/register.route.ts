import { Router, Request, Response } from 'express'
import { registerUser } from '../../controllers/register.controller'

// Creates Router
const route = Router()

route.post('/', async (req:Request, res:Response)=> {

    // verify user object

    // check if user already exists
    // if yes, response
    const result = await registerUser(req.body.email, req.body.password)
    // if no, encrypt password and enter user in database
    console.log('from reg route: ' + result)
    res.send({"Registration Status": result})
})


export default route
