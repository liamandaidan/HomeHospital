import express from 'express'
import ENV from './configure/configure.js'
import { RunApp } from './loaders/loaders.js'
import { populateWaitlists } from './api/service/populateWaitlists.service.js'

// Create Express App Instance
const app = express()

// Run the application
await RunApp(app)
populateWaitlists();

// Set the app to listen on environment Port
app.listen(ENV.APP_PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${ENV.APP_PORT}`)
})
