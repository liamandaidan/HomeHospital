import { Router } from 'express'
import test from './routes/test.route'

// Create the Router App
const app = Router()

// Registers the app routes
app.use('/test', test)

// exports the router application
export default app
