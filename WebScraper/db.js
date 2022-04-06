import mongoose from 'mongoose'



// Function used to connect to the Database
const DBConnect = async () => {
	try {
		// Connect to the database with the connection string from the .env file
		await mongoose.connect(process.env.MONGO_URI)
		console.log('🗄  DB Connect was was a success!')
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
