import { Router } from 'express'
import test from './routes/test.route.js'
import register from './routes/register.route.js'
import login from './routes/login.route.js'
import logout from './routes/logout.route.js'
import reset from './routes/passReset.route.js'
import { checkAccessToken } from './service/token.service.js'

// Create the Router App
const app = Router()

// Registers the app routes

// Register validation of tokens FIRST, then router middleware
app.use('/test', checkAccessToken)
app.use('/test', test)

// NO validation needed for tokens on these 3 routes
app.use('/register',register)
app.use('/login', login)
app.use('/logout', logout)
app.use('/reset', reset)

// exports the router application
export default app
