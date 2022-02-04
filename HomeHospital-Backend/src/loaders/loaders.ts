import { ExpressLoader } from './expressLoad'
import DBConnect from './database'
import express from 'express'
//import ENV from '../configure/configure'

class RunApp {
	constructor(app: express.Application) {
		DBConnect()
		new ExpressLoader(app)
	}
}

export { RunApp }
