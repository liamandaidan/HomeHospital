import { Router } from 'express'
import test from './routes/test.route.js'
import register from './routes/register.route.js'
import login from './routes/login.route.js'
import logout from './routes/logout.route.js'
import reset from './routes/passReset.route.js'
import facilityActions from './routes/medicalFacility.route.js'
import { checkAccessToken } from './service/token.service.js'
import updateWaitTimesTemp from './routes/updateWaitTimeTemp.route.js'
import users from './routes/users.route.js'
import requestActions from './routes/request.route.js'

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
app.use('/forget', reset)

// Add a facility, view list of all facilities
app.use('/medicalFacility', checkAccessToken)
app.use('/medicalFacility', facilityActions)

//TODO: remove manual waitlist update  route
// app.use('/updateWaitTimesTemp', checkAccessToken)
// app.use('/updateWaitTimesTemp', updateWaitTimesTemp)

// add routes for 'manageRequests'
// put middleware to check for practitioner

// Get patient details
app.use('/users', checkAccessToken)
app.use('/users', users)

// Patient hits these endpoints to perform actions on their requests
app.use('/visitRequest', checkAccessToken)
app.use('/visitRequest', requestActions)

// exports the router application
export default app
