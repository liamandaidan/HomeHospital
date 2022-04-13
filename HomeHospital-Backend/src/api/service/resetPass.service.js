import PatientModel from '../../models/patient.Model.js'
import PractitionerModel from '../../models/practitioner.Model.js'
import AdministratorModel from '../../models/administrator.Model.js'
import bcrypt from 'bcryptjs'
import ENV from '../../configure/configure.js'
import validator from 'validator'


export async function updatePassword(userEmail, newPassword) {
	if (typeof userEmail != 'string') {
		console.log('Update password function received bad data')
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
		//const changedPatient = await PatientModel.findOne({ email: uemail })
		if (updatedUser.password === hashedPassword) {
			return 1
		} else {
			console.log("Passwords didn't match");
			return 0
		}
	} else {
		console.log("Patient is null");
		return 0
	}
}

export async function updateEmployeePassword(userEmail, newPassword) {
	if (typeof userEmail != 'string') {
		console.log('Update password function received bad data')
		return 0
	}
	const updatingPractitioner = await PractitionerModel.findOne({email: userEmail});
    const updatingAdministrator = await AdministratorModel.findOne({email: userEmail});

	if(updatingPractitioner) {
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
			console.log("Passwords didn't match");
			return 0
		}
	} else if(updatingAdministrator) {
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
			console.log("Passwords didn't match");
			return 0
		}
	} else {
		console.log("User was null");
		return 0;
	}
}