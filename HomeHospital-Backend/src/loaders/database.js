import mongoose from 'mongoose'
import ENV from '../configure/configure.js'
import refreshTokensSchema from '../models/refreshTokens.Schema.js'

// Function used to connect to the Database
/**
 * @function
 * @summary Starts up the DB
 *
 * @description Starts the DB and prints out a message to let the user know it was successful, or informs them on an error and safely
 * closes the DB connection.
 */
const DBConnect = async () => {
	try {
		// Connect to the database with the connection string from the .env file
		await mongoose.connect(ENV.MONGO_URI)
		console.log('🗄  DB Connect was was a success!')
		console.log(`Start time: ${new Date()}`)
		// Clear out old Ref tokens When the server starts
		await refreshTokensSchema.find().deleteMany()
	} catch (error) {
		console.log(`${new Date()}n\tError:  ${error.message}`)
		console.error(
			`THE DB FAILED 🤯 :\n.\n..\n...\n....\n.....\nPlease Check Your DB Connection... \n${error.message}`
		)
		await mongoose.connection.close()
		// Close the application if an error occurred.
		process.exit(1)
	}
}

export default DBConnect
