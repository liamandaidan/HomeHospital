import nodemailer from 'nodemailer'

/**
 * @function
 * @summary Method to send an email containing a link to a user
 *
 * @description This method is called from passReset.route.js. It is passed an email and subject line, and an object payload containing a url and the name of
 * the recipient. The method assembles the email using these components and then sends it.
 * @param {string} email the email to send to
 * @param {string} subject the email subject
 * @param {object} payload containing a name and a url
 * @returns an error if something goes wrong, otherwise returns a status to the response object
 */
const sendEmailAlt = async (email, subject, payload) => {
	try {
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
		// Send email
		transporter.sendMail(options, (err, success) => {
			if (err) {
				console.log(`${new Date()}\tError:  ${err.message}`)
				return err
			} else {
				return res.status(200).json({ success: true })
			}
		})
	} catch (error) {
		console.log(`${new Date()}\tError:  ${error.message}`)
		return error
	}
}

export default sendEmailAlt
