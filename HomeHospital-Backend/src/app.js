import express from 'express'
import ENV from './configure/configure.js'
import { RunApp } from './loaders/loaders.js'


const PORT = process.env.PORT || ENV.APP_PORT

// Create Express App Instance
const app = express()

// Run the application
try {
	await RunApp(app)
} catch (error) {
	console.error(error.message)
  console.log('A Major error happened and the Server Stopped!')
	process.exit(1)
}

// Set the app to listen on environment Port
app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
