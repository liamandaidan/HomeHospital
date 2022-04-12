import express from 'express'
import jwt from 'jsonwebtoken'
import { updatePassword, updateEmployeePassword } from '../service/resetPass.service.js'
import PatientModel from '../../models/patient.Model.js'
import PractitionerModel from '../../models/practitioner.Model.js'
import AdministratorModel from '../../models/administrator.Model.js'

const route = express.Router()

/**
 * @route
 * @url /api/admin/password
 * @summary Route for resetting password for a patient, an admin, or a practitioner, accessible by admins only
 * 
 * @description This route is accessed by administrators to change the password of any user type. It does perform a check to ensure 
 * that the administrator posesses the proper permissions level to perform the action. It takes in the email of the user who's 
 * password is to be changed, as well as the new password. It checks that the new password was correctly entered both times, and that
 * the user being updated exists. Then it checks the administrator's permission levels before executing the change, or returning 
 * an error message. 
 */
route.post('/', async (req, res) => {
	const { email, newPass, newPassConfirm } = req.body
    let codedAccessToken = req.cookies['accessTokenCookie']
    if(!codedAccessToken) {
        console.log("No access token present");
        res.status(401).json({ message: 'Authorization Failed' })
        return
    }
    const accessToken = jwt.decode(codedAccessToken);
    const adminId = accessToken.adminId

    const theAdmin = await AdministratorModel.findOne({adminId: adminId});
    if(!theAdmin) {
        console.log("Administrator doesn't exist");
        res.status(401).json({ message: 'Authorization Failed' })
        return
    }
    const permissionLevel = theAdmin.permissions;

	console.log('Got email: ' + email)
    if(email && newPass && newPassConfirm) {
        if (typeof email != 'string' || typeof newPass != 'string' || typeof newPassConfirm != 'string') {
			res.status(406).send({ message: 'Password update failed' })
            return
		}
        if(newPass !== newPassConfirm) {
            res.status(406).send({ message: 'Passwords must match!' });
            return
        }
        const updatingPatient = await PatientModel.findOne({email: email});
        const updatingPractitioner = await PractitionerModel.findOne({email: email});
        const updatingAdministrator = await AdministratorModel.findOne({email: email});

        if(updatingPatient) {
            if(!permissionLevel >= 1) {
                res.status(401).send({ message: 'User is unauthorized to make that edit' })
                return
            }
            const result = await updatePassword(email, newPass);
            if(result == 1) {
                res.status(201).send({ message: 'Password updated' })
                return
            } else {
                res.status(406).send({ message: 'Password update returned 0' })
                return
            }
        } else if(updatingPractitioner) {
            if(!permissionLevel >= 2) {
                res.status(401).send({ message: 'User is unauthorized to make that edit' })
                return
            }
            const result = await updateEmployeePassword(email, newPass);
            if(result == 1) {
                res.status(201).send({ message: 'Password updated' })
                return
            } else {
                res.status(406).send({ message: 'Password update returned 0' })
                return
            }
        } else if(updatingAdministrator) {
            if(permissionLevel != 3) {
                res.status(401).send({ message: 'User is unauthorized to make that edit' })
                return
            }
            const result = await updateEmployeePassword(email, newPass);
            if(result == 1) {
                res.status(201).send({ message: 'Password updated' })
                return
            } else {
                res.status(406).send({ message: 'Password update returned 0' })
                return
            }
        } else {
            res.status(406).send({ message: 'No matching user was found in the system' })
            return
        }
    }
})


export default route
