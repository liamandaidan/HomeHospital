import express from 'express'
import ENV from '../configure/configure.js'
import cors from 'cors'
import routes from '../api/API.js'


class ExpressLoader {
	constructor(app) {
		// use cors
		app.use(cors())

		// Accept Json
		app.use(express.json())

		// Use API router
		app.use('/api', routes)

		// Catches errors or something?
		app.use(
			(err, req, res, next) => {
				if (err) {
					console.log('error was caught!')
					res.status(404).send()
				}
			}
		)

		// Handle all unregistered HTTP request routes
		app.all('*', (req, res) => {
			res.status(404).send({ message: 'Invalid route' })
		})
	}
}

export { ExpressLoader }
