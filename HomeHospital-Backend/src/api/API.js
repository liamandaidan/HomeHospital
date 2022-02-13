import { Router } from 'express'
import test from './routes/test.route.js'
import register from './routes/register.route.js'
import login from './routes/login.route.js'
import logout from './routes/logout.route.js'

// Create the Router App
const app = Router()

// Registers the app routes
app.use('/test', test)
app.use('/register',register)
app.use('/login', login)
app.use('/logout', logout)

// exports the router application
export default app
