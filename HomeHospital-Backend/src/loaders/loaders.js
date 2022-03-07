import { ExpressLoader } from './expressLoad.js'
import DBConnect from './database.js'
import { webScraper } from '../webScraper/webScraper.js'
import { refreshTime } from '../configure/cookie.configure.js'

/**
 * Takes in an express App object
 * Starts the DB and then runs the server. Once both are running the Web Scrapper will start up and run every X amount
 * of time. The refresh time that is imported from the configure file, and this can be changed to set up the scrapper to
 * run repeatedly on a set interval.
 */
const RunApp = async (app) => {
	try {
		await DBConnect()
		new ExpressLoader(app)
		setInterval(webScraper, refreshTime)
	} catch (error) {
		console.error(error.message)
	}
}

export { RunApp }
