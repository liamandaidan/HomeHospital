import nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, URL } from 'url'

const sendEmail = (email, mailsubject, payload) => {
	console.log('Enter function')
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	})

	let mailOptions = {
		from: process.env.FROM_EMAIL,
		to: email,
		subject: mailsubject,
		text: payload,
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error)
		} else {
			console.log(info)
			console.log('mail success')
			return
		}
	})
}

export default sendEmail
