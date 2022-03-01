import { ExpressLoader } from './expressLoad.js'
import DBConnect from './database.js'
import { webscrape } from '../webscaper/webscaper.js'

const RunApp = async (app) => {
	try {
		await DBConnect()
		await new ExpressLoader(app)
		// setInterval(await webscrape, 120000)

	} catch (error) {
		console.error(e.message)
	}
}

export { RunApp }
