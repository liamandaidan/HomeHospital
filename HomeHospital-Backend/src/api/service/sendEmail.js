/**
 * This code in its entirety was acquired from open source:
 * https://github.com/ezesundayeze/forgotpassword/blob/master/utils/email/sendEmail.js
 */

// const nodemailer = require("nodemailer");
// const handlebars = require("handlebars");
// const fs = require("fs");
// const path = require("path");

import nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, URL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (email, subject, payload, template) => {
try {
    // create reusable transporter object using the default SMTP transport
    console.log("Reached line 24");
    const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
    },
    });
    console.log("Reached line 33");
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    //const sauce = fs.readFileSync(new URL())
    console.log("Reached line 35");
    const compiledTemplate = handlebars.compile(source);
    console.log("Reached line 37");
    const options = () => {
    return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
    };
    };
    console.log("Reached line 44");
    // Send email
    transporter.sendMail(options(), (error, info) => {
    if (error) {
        return error;
    } else {
        return res.status(200).json({
        success: true,
        });
    }
    });
} catch (error) {
    return error;
}
};

/*
Example:
sendEmail(
"youremail@gmail.com,
"Email subject",
{ name: "Eze" },
"./templates/layouts/main.handlebars"
);
*/

export default sendEmail;