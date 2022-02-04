import { MongoClient } from 'mongodb'
import ENV from '../configure/configure'

export const client = new MongoClient(<string>ENV.MONGO_URI)

export default async function DBConnect() {
	try {
		await client.connect()

		await client.db('admin').command({ ping: 1 })
		console.log('🗄 DB Connect was was a success!')
	} catch (error) {
		console.error('THE DB FAILED')
		await client.close()
	}
}
