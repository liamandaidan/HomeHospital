import dotenv from 'dotenv'
dotenv.config()

// Create an ENV variable to reference
const ENV: NodeJS.ProcessEnv = process.env

// Export access to ENV variables
export default ENV
