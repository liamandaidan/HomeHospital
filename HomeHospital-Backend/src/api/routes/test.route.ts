import { Router, Request, Response } from 'express'
import { insertValue } from '../../models/models'

// Creates Router
const route = Router()

// Creates a person type
type person = {
	name: string
	age: number
}

// Get route for test request
route.get('/', (req: Request, res: Response) => {
	console.log('received a request!')
	res.send({ data: 'This was a success!' })
})

// test route to load a user into the DB
route.get('/load', (req: Request, res: Response) => {
	const p: person = { name: <string>req.body.name, age: <number>req.body.age }
	if (p.age == null || p.name == null) {
		throw new Error('There was an error!')
	}
	insertValue(p)
	res.send('sucecss!')
})

// export this route
export default route
