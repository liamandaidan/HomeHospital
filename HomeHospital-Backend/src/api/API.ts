import { Router } from 'express'
import test from './routes/test.route'
// Create the Router App
const app = Router()

app.use('/test', test)

export default app
