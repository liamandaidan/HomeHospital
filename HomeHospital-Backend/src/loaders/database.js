import mongoose from 'mongoose'
import ENV from '../configure/configure.js'
import refreshTokensSchema from '../models/refreshTokens.Schema.js'

// Function used to connect to the Database
const DBConnect = async () => {
	try {
		// Connect to the database with the connection string from the .env file
		await mongoose.connect(ENV.MONGO_URI)
		console.log('🗄  DB Connect was was a success!')
		// Clear out old Ref tokens When the server starts
		await refreshTokensSchema.find().deleteMany();
	} catch (error) {
		console.error(
			`THE DB FAILED 🤯 :\n.\n..\n...\n....\n.....\nPlease Check Your DB Connection... \n${error.message}`
		)
		await mongoose.connection.close()
		// Close the application if an error occurred.
		process.exit(1)
	}
}

export default DBConnect
