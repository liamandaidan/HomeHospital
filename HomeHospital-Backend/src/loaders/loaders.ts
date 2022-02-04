import { ExpressLoader } from './expressLoad'
import DBConnect from './database'
import express from 'express'
//import ENV from '../configure/configure'

/**
 * @param app Takes in an express application
 * When created, this application loads the express application and
 * connects to the Mongodb Cloud database
 */
class RunApp {
	constructor(app: express.Application) {
		const eLoader: ExpressLoader = new ExpressLoader(app)
		DBConnect()
	}
}

export { RunApp }
