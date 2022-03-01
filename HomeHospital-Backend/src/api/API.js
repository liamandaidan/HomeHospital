import { Router } from 'express'
import test from './routes/test.route.js'
import register from './routes/register.route.js'
import login from './routes/login.route.js'
import logout from './routes/logout.route.js'
import createFacility from './routes/medicalFacility.route.js'
import add from './routes/symptoms.route.js'
import { checkAccessToken } from './service/token.service.js'
import updateWaitTimesTemp from './routes/updateWaitTimeTemp.route.js'

// Create the Router App
const app = Router()

// Registers the app routes

// Register validation of tokens FIRST, then router middleware
app.use('/test', checkAccessToken)
app.use('/test', test)

// NO validation needed for tokens on these 3 routes
app.use('/register', register)
app.use('/login', login)
app.use('/logout', logout)
app.use('/medicalFacility', createFacility)
app.use('/updateWaitTimesTemp', updateWaitTimesTemp)
app.use('/symptoms', add)
// exports the router application
export default app
