import mongoose from 'mongoose'
import UserSchema from './user.Schema.js'
import validator from 'validator'


const patientSchema = new mongoose.Schema({
	email: {
		type: String,
		minlength: [8,'Minimum Email Length is 8'],
		required: [true, 'Please enter an Email'],
		lowercase: true,
		unique: true,
		validate:[validator.isEmail, 'Please enter a Valid Email'],
	},
	password: {
		type: String,
		required: [true,'Please enter a Password'],                                                     
		minlength: [10, 'Password must be at least a length of 10'],
		//validate:[isStrongPassword, 'This password is weaksauce bruh, take it to the gym n strengthen it up'],
	},
	HCnumber: {
		type: String,
		required: true,
		unique: true,
	},
	gender: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
		validate:[validator.isDate, 'This amazingly was not a date'],
	},
	user: {
		type: UserSchema,
	},
	emergencyContact: {
		firstName: {
			type: String,
			default: null,
			validate:[validator.isAlpha, 'Only Letters allowed'],
		},
		lastName: {
			type: String,
			default: null,
			validate:[validator.isAlpha, 'Only Letters allowed'],
		},
		phoneNumber: {
			type: String,
			default: null,
			validate:[validator.isMobilePhone, 'We need a real canadian phone number'],
		},
	},
	requests: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'VisitRequest',
		default: null,
	},
})

patientSchema.methods.getPatientRequestInfo = function () {
	return {
		user: this.user,
		HCnumber: this.HCnumber,
		emergencyContact: this.emergencyContact,
		id: this._id,
		email: this.email,
	}
	//HCnumber: HCNum,
	//emergencyContact: { firstName: first, lastName: last }
}

export default mongoose.model('Patient', patientSchema)
