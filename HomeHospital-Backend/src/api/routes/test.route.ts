import { Router, Request, Response } from 'express'
import { insertValue } from '../../models/models'

const route = Router()
type person = {
    name:string,
    age: number
}
route.get('/', (req: Request, res: Response) => {
	console.log('received a request!')
	res.send({ data: 'This was a success!' })
})

route.get('/load', (req:Request, res: Response) => {
	const p:person = {name: <string>req.body.name, age:<number>req.body.age}
	if (p.age ==null || p.name == null){
		throw new Error('There was an error!')
	}
	insertValue(p)
	res.send("sucecss!")
})

export default route
