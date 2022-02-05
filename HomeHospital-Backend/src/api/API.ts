import { Router } from 'express'
import test from './routes/test.route'
import register from './routes/register.route'

// Create the Router App
const app = Router()

// Registers the app routes
app.use('/test', test)
app.use('/register',register )

// exports the router application
export default app
