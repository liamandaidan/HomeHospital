import express from 'express'
import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
import sendEmailAlt from '../service/sendEmail.service.js'
import { updatePassword } from '../service/resetPass.service.js'
import PatientModel from '../../models/patient.Model.js'

const resetKey = ENV.RESET_TOKEN_SECRET
const clientURL = 'http://localhost:3000/reset'

const route = express.Router()

route.post('/', async (req, res) => {
	const { email, token, newPass, newPassConfirm } = req.body

	console.log('Got email: ' + email)
	if (email) {
		if (typeof email != 'string') {
			res.status(406).send({ message: 'Password update failed' })
            return
		}
		if (newPass && newPassConfirm) {
			//these parameters will only exist if user has entered a new password and confirmed
			if (
				typeof newPass != 'string' ||
				typeof newPassConfirm != 'string' ||
				typeof token != 'string'
			) {
				console.log("One or more fields isn't a string")
				res.status(406).send({ message: 'Password update failed' })
				return
			}
			let tokenEmail = jwt.verify(token, resetKey)
			if (tokenEmail.email === email) {
				console.log('Emails match!' + tokenEmail.email + ' and ' + email)
				const updateResult = await updatePassword(email, newPass)
				console.log('Result: ' + updateResult)
				if (updateResult === 1) {
					res.status(201).send({
						message: 'Password successfully updated',
					})
				} else {
					res.status(406).send({ message: 'Password update failed' })
					return
				}
			} else {
				console.log("they don't match")
				res.status(406).send({ message: 'Password update failed' })
				return
			}
		} else {
			try {
				const patient = await PatientModel.findOne({ email: email })
				console.log('Return from DB is: ' + patient)
				if (patient != null) {
					const resettoken = jwt.sign({ email: email }, resetKey, {
						expiresIn: '24h',
					}) //verify should return the email
					const link = `${clientURL}?uemail=${email}&tokenstring=${resettoken}`
					sendEmailAlt(email, 'Password Reset Request', {
						name: patient.user.firstName,
						link: link,
					})
					res.status(201).send({ message: 'Send mail complete' })
				}
			} catch (e) {
				console.error(e.message)
				res.status(406).send('Request Failed')
				return
			}
		}
	} else {
		res.status(401).send('Information is required')
		return
	}
})

route.get('/', (req, res, next) => {
	let name = req.query.uemail
	let tokenstring = req.query.tokenstring
	res.status(201)
})

export default route
