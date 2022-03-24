import { Router } from 'express'
import test from './routes/test.route.js'
import register from './routes/register.route.js'
import registerP from './routes/register.practitioner.route.js'
import registerA from './routes/register.administrator.route.js'
import login from './routes/login.route.js'
import loginP from './routes/login.practitioner.route.js'
import loginA from './routes/login.administrator.route.js'
import logout from './routes/logout.route.js'
import reset from './routes/passReset.route.js'
import facilityActions from './routes/medicalFacility.route.js'
import { checkAccessToken } from './service/token.service.js'
import { checkEmployeeAccessToken } from './service/employee.token.service.js'
import updateWaitTimesTemp from './routes/updateWaitTimeTemp.route.js'
import users from './routes/users.route.js'
import requestActions from './routes/request.route.js'

// Create the Router App
const app = Router()

// Registers the app routes

// Register validation of tokens FIRST, then router middleware
app.use('/test', checkAccessToken)
app.use('/test', test)
app.use('/testA', checkEmployeeAccessToken)
app.use('/testA', test)
app.use('/testP', checkEmployeeAccessToken)
app.use('/testP', test)

// NO validation needed for tokens on these 3 routes
app.use('/register', register)
app.use('/registerP', registerP)
app.use('/registerA', registerA)
app.use('/login', login)
app.use('/loginP', loginP)
app.use('/loginA', loginA)
app.use('/logout', logout)
app.use('/forget', reset)

// Add a facility, view list of all facilities
app.use('/medicalFacility', checkAccessToken)
app.use('/updateWaitTimesTemp', checkAccessToken)
app.use('/medicalFacility', facilityActions)
app.use('/updateWaitTimesTemp', updateWaitTimesTemp)

app.use('/users', checkAccessToken)
app.use('/visitRequest', checkAccessToken)
app.use('/users', users)
// Request endpoint
app.use('/visitRequest', requestActions)

// exports the router application
export default app
