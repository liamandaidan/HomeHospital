import { ExpressLoader } from './expressLoad.js'
import DBConnect from './database.js'
import { webScraper } from '../webscaper/webScraper.js'

const RunApp = async (app) => {
	try {
		await DBConnect()
		await new ExpressLoader(app)
		// setInterval(await webScraper, 120000)
	} catch (error) {
		console.error(e.message)
	}
}

export { RunApp }
