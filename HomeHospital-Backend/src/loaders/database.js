import mongoose from 'mongoose'
import ENV from '../configure/configure.js'

// A client to use when connection to the database
//  export const connection = mongoose.co

// Function used to connect to the Database
export default async function DBConnect() {
	try {
		await mongoose.connect(ENV.MONGO_URI)
		console.log('🗄 DB Connect was was a success!')
	} catch (error) {
		console.error(
			'THE DB FAILED 🤯 :\n.\n..\n...\n....\n.....\nPlease Check Your DB Connection... '
		)
		await mongoose.connection.close()
		process.exit(1)
	}
}
