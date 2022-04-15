import express from 'express'

// Creates Router
const route = express.Router()

route.get('/', (req, res) => {
	const accessT = res.locals.accessT
	const refreshT = res.locals.refreshT

	res.status(201).json({
		message: 'You are authorized to reach this administrator page!',
		user: req.authUser,
		accessT: accessT,
		refreshT: refreshT,
	})
})

// export this route
export default route
