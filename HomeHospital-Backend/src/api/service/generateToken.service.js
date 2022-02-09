import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
const JWT_KEY = ENV.JWT_KEY

function generateToken(userID) {
	//route to get a token
	let id = Math.random().toString(36).substring(2, 8)
	let limit = 60 * 3 // 180 seconds
	let expires = Math.floor(Date.now() / 1000) + limit
	const payload = {
		_id: userID,
		exp: expires,
		name: 'Mike Cann!'
	}
	const token = jwt.sign(payload, JWT_KEY)

	return token
}
export { generateToken }
