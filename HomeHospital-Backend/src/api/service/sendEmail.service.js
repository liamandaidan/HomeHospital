import nodemailer from 'nodemailer'

const sendEmailAlt = async (email, subject, payload) => {
	try {
		console.log('Reached line 13')
		let transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: 587,
			secure: false,
			host: 'smtp.gmail.com',
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false,
			},
		})

		const payloadName = payload.name
		const payloadLink = payload.link

		const options = {
			from: process.env.FROM_EMAIL,
			to: email,
			subject: subject,
			html: `<html><head><style></style></head><body><p>Hi ${payloadName},</p><p>You requested to reset your password.</p><p> Please, click the link below to reset your password</p><a href=${payloadLink}>Reset Password</a></body></html>`,
		}
		console.log('Reached line 42')
		console.log(options)
		// Send email
		transporter.sendMail(options, (err, success) => {
			if (err) {
				console.log(err)
				return err
			} else {
				return res.status(200).json({
					success: true,
				})
			}
		})
	} catch (error) {
		console.log(error)
		return error
	}
}

export default sendEmailAlt
