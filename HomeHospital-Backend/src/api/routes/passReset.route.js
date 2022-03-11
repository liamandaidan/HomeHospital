import express from 'express'
import jwt from 'jsonwebtoken'
import ENV from '../../configure/configure.js'
import sendEmailAlt from '../service/sendEmail.service.js'
import { updatePassword } from '../service/resetPass.service.js'


import PatientModel from '../../models/patient.Model.js'

const resetKey = ENV.RESET_TOKEN_SECRET;
const clientURL = "http://localhost:3000/api/reset"
const route = express.Router()

//route for when the user clicks to reset their password
route.post('/', async (req, res, next) => {
    const {email, newPass, newPassConfirm} = req.body;
    console.log("Got email: " + email);
    if(email){
        if(newPass && newPassConfirm) {//these parameters will only exist if user has entered a new password and confirmed
            const updateResult = await updatePassword(email, newPass);
            console.log("Result: " + updateResult);
            if(updateResult === 1)
            {
                res.status(201).send({ message: "Password successfully updated" })
            } else {
                res.status(406).send({ message: "Password update failed" })
            }
        } else {
            try {
                const patient = await PatientModel.findOne({ email: email })
                console.log("Return from DB is: " + patient);
                if(patient != null) {
                    const resettoken = jwt.sign({email: email}, resetKey, {expiresIn: "24h"});//verify should return the email
                    console.log("Token is: " + resettoken);
                    const link = `${clientURL}?uemail=${email}&tokenstring=${resettoken}`;
                    console.log("Link is: " + link);
                    console.log("Name is: " + patient.user.firstName);
                    sendEmailAlt(email, "Password Reset Request", {name: patient.user.firstName, link: link});
                    res.status(201).send({ message: "Send mail complete" })
                }
            } catch(e) {
                console.error(e.message)
                res.status(406).send('Request Failed')
            }
        }
    } else {
        res.status(401).send('Information is required')
    }
    
})


route.get('/', (req, res, next) => {
    let name = req.query.uemail;
    let tokenstring = req.query.tokenstring;
    console.log("Successfully reached route");
    console.log("Name: " + name);
    console.log("Tokenstring: " + tokenstring);
    res.status(201);
})




export default route