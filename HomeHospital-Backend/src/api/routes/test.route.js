import express from 'express'

// Creates Router
const route = express.Router()

// Get route for test request
route.get('/', (req, res) => {
	console.log('received a request!')
	res.send({ data: 'This was a success!' })
})

// export this route
export default route
