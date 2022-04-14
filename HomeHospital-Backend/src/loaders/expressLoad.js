import express from 'express'
import cors from 'cors'
import routes from '../api/API.js'
import cookieParser from 'cookie-parser'


/**
 * @class ExpressLoader 
 * @description When this class is created, it sets up the express app by registering all of the necessary
 * middleware, registering the routers used for API routes and catches any requests and get sent but do not have a route to handle them.
 * Takes in an express app as argument.
 */
class ExpressLoader {
	constructor(app) {
		// use cors
		app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

		// Accept Json
		app.use(express.json())

		// Cookie parser
		app.use(cookieParser())

		// Supports URL encoded bodies
		app.use(express.urlencoded({ extended: true }))

		// Use API router
		app.use('/api', routes)

		// Catches errors or something?
		app.use((err, req, res, next) => {
			if (err) {
				console.log('error was caught!')
				console.log(err)
				res.status(404).send()
			}
		})

		// Handle all unregistered HTTP request routes
		app.all('*', (req, res) => {
			res.status(404).send({ message: 'Invalid route' })
		})
	}
}

export { ExpressLoader }
