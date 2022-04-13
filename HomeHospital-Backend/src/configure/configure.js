import dotenv from 'dotenv'
dotenv.config()

// Create an ENV variable to reference
export const ENV = process.env
export const whitelist_string="[0-9a-zA-Z!.,'\- ]{0,}" 
// Export access to ENV variables
export default ENV
