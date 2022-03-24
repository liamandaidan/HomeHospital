import bcrypt from 'bcryptjs'
import PatientModel from '../../models/patient.Model.js'
import PractitionerModel from '../../models/practitioner.Model.js'
import AdministratorModel from '../../models/administrator.Model.js'
import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
import RefToken from '../../models/refreshTokens.Schema.js'

export const checkMayAccessAdminPage = async (req, res, next) => {
    const accessToken = jwt.decode(req.cookies['accessTokenCookie'])
    const adminId = accessToken.adminId
    if(adminId) {
        console.log("User is an admin, they may proceed");
        next()
    } else {
        console.log("User is not an admin, they may not proceed");
        res.status(401).json({ message: 'Authorization Failed' })
    }
}

export const checkMayAccessPractitionerPage = async (req, res, next) => {
    const accessToken = jwt.decode(req.cookies['accessTokenCookie'])
    const practitionerId = accessToken.practitionerId
    if(practitionerId) {
        console.log("User is a practitioner, they may proceed");
        next()
    } else {
        console.log("User is not a practitioner, they may not proceed");
        res.status(401).json({ message: 'Authorization Failed' })
    }
}