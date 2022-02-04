import express, { Router, Request, Response, NextFunction } from 'express'
import ENV from '../configure/configure'
import cors from 'cors'
import routes from '../api/API'

class ExpressLoader {
	constructor(app: express.Application) {
		// use cors
		app.use(cors())

		// Accept Json
		app.use(express.json())

		// Use API router
		app.use('/api', routes)

		app.use(
			(
				err: unknown,
				req: Request,
				res: Response,
				next: NextFunction
			) => {
				if (err){
					console.log('error was caught!')
					res.status(404).send()
				}
			}
		)

		app.all('*', (req: Request, res: Response) => {
			res.status(404).send({message: 'Invalid route'})
		})
	}
}

export { ExpressLoader }
