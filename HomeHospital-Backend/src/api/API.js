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
import empReset from './routes/passReset.employee.route.js'
import facilityActions from './routes/medicalFacility.route.js'
import { checkAccessToken } from './service/token.service.js'
import { checkEmployeeAccessToken } from './service/employee.token.service.js'
import { checkMayAccessAdminPage, checkMayAccessPractitionerPage} from './service/authorization.service.js'
import users from './routes/users.route.js'
import requestActions from './routes/request.route.js'
import requestManager from './routes/requestManager.route.js'
import adminFunctions from './routes/adminFunctions.route.js'

// Create the Router App
const app = Router()

// Registers the app routes

// Register validation of tokens FIRST, then router middleware
app.use('/test', checkAccessToken)
app.use('/test', test)
app.use('/testA', checkEmployeeAccessToken, checkMayAccessAdminPage)
app.use('/testA', test)
app.use('/testP', checkEmployeeAccessToken, checkMayAccessPractitionerPage)
app.use('/testP', test)

// NO validation needed for tokens on these 3 routes
app.use('/register', register)
app.use('/registerP', checkMayAccessAdminPage)
app.use('/registerP', registerP)
app.use('/registerA',checkMayAccessAdminPage, registerA)
// Patient login
app.use('/login', login)
//practitioner/admin login
app.use('/loginP', loginP)
app.use('/loginA', loginA)
// lout works for all users
app.use('/logout', logout)
// 
app.use('/forget', reset)

// Add a facility, view list of all facilities
app.use('/medicalFacility', facilityActions)

// Get patient details
app.use('/users', checkAccessToken)
app.use('/users', users)

// Patient hits these endpoints to perform actions on their requests
app.use('/visitRequest', checkAccessToken)
app.use('/visitRequest', requestActions)

// add routes for 'manageRequests'
// put middleware to check for practitioner
app.use('/requestManager', checkEmployeeAccessToken, checkMayAccessPractitionerPage, requestManager)

// admin functions
app.use('/admin', checkMayAccessAdminPage, adminFunctions)
//route for admins to reset passwords
app.use('/admin/password', checkEmployeeAccessToken, checkMayAccessAdminPage, empReset)

// exports the router application
export default app
