import { MongoClient } from 'mongodb'
import { exit } from 'process'
import ENV from '../configure/configure'

// A client to use when connection to the database
export const client = new MongoClient(<string>ENV.MONGO_URI)

// Function used to connect to the Database
export default async function DBConnect() {
	try {
		await client.connect()
		await client.db('admin').command({ ping: 1 })
		console.log('🗄 DB Connect was was a success!')
	} catch (error) {
		console.error(
			'THE DB FAILED 🤯 :\n.\n..\n...\n....\n.....\nPlease Check Your DB Connection... '
		)
		await client.close()
		process.exit(1)
	}
}
