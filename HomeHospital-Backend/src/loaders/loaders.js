import { ExpressLoader } from './expressLoad.js'
import DBConnect from './database.js'

const RunApp = async (app) => {
	try {
		await DBConnect()
		await new ExpressLoader(app)
	} catch (error) {
		console.error(e.message)
	}
}

export { RunApp }
