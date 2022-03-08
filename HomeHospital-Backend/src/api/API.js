import { Router } from 'express'
import test from './routes/test.route.js'
import register from './routes/register.route.js'
import login from './routes/login.route.js'
import logout from './routes/logout.route.js'
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

// Add a facility, view list of all facilities
app.use('/medicalFacility', facilityActions)
app.use('/updateWaitTimesTemp', updateWaitTimesTemp)

app.use('/users', users)
// Request endpoint
app.use('/visitRequest', requestActions)

// exports the router application
export default app
