import PatientModel from '../../models/patient.Model.js'
import PractitionerModel from '../../models/practitioner.Model.js'
import AdministratorModel from '../../models/administrator.Model.js'
import bcrypt from 'bcryptjs'

/**
 * @function
 * @summary Method to update user password
 *
 * @description This method takes in the user's email and a new password. The new password string has already been checked to ensure
 * that the user entered it twice and it matched. It checks to ensure that the password is a valid string, then attempts to find the
 * user through their email. Assuming that passes, it encrypts the new password and inserts it into the user as a new password
 * @param {string} userEmail
 * @param {string} newPassword
 * @returns 0 on failure, 1 on success
 */
export async function updatePassword(userEmail, newPassword) {
	if (typeof userEmail != 'string') {
		console.log(new Date() + ' Update password function received bad data')
		return 0
	}

	const patient = await PatientModel.findOne({ email: userEmail })

	if (patient != null) {
		const { genSalt, hash } = bcrypt
		const salt = await genSalt(10)
		const hashedPassword = await hash(newPassword, salt)
		const filter = { email: userEmail }
		const update = { password: hashedPassword }
		const updatedUser = await PatientModel.findOneAndUpdate(
			filter,
			update,
			{ new: true }
		)
		if (updatedUser.password === hashedPassword) {
			return 1
		} else {
			return 0
		}
	} else {
		return 0
	}
}

/**
 * @function
 * @summary Method used by admins to update pratitioner or admin password
 *
 * @description This method can only be called by an administrator. It takes in the user's email and a new password. It checks
 * to ensure that the password is a valid string, then attempts to find the user through their email. Assuming that passes,
 * it encrypts the new password and inserts it into the user as a new password
 * @param {string} userEmail
 * @param {string} newPassword
 * @returns 0 on failure, 1 on success
 */
export async function updateEmployeePassword(userEmail, newPassword) {
	if (typeof userEmail != 'string') {
		console.log(new Date() + ' Update password function received bad data')
		return 0
	}
	const updatingPractitioner = await PractitionerModel.findOne({
		email: userEmail,
	})
	const updatingAdministrator = await AdministratorModel.findOne({
		email: userEmail,
	})

	if (updatingPractitioner) {
		const { genSalt, hash } = bcrypt
		const salt = await genSalt(10)
		const hashedPassword = await hash(newPassword, salt)
		const filter = { email: userEmail }
		const update = { password: hashedPassword }
		const updatedUser = await PractitionerModel.findOneAndUpdate(
			filter,
			update,
			{ new: true }
		)
		if (updatedUser.password === hashedPassword) {
			return 1
		} else {
			return 0
		}
	} else if (updatingAdministrator) {
		const { genSalt, hash } = bcrypt
		const salt = await genSalt(10)
		const hashedPassword = await hash(newPassword, salt)
		const filter = { email: userEmail }
		const update = { password: hashedPassword }
		const updatedUser = await AdministratorModel.findOneAndUpdate(
			filter,
			update,
			{ new: true }
		)
		if (updatedUser.password === hashedPassword) {
			return 1
		} else {
			return 0
		}
	} else {
		return 0
	}
}
