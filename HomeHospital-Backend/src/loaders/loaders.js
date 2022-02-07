import { ExpressLoader } from './expressLoad.js'
import DBConnect from './database.js'
import express from 'express'
//import ENV from '../configure/configure'

/**
 * @param app Takes in an express application
 * When created, this application loads the express application and
 * connects to the Mongodb Cloud database
 */
class RunApp {
	constructor(app) {
		const eLoader = new ExpressLoader(app)
		DBConnect()
	}
}

export { RunApp }
