import mongoose from 'mongoose'
import UserSchema from './user.Schema.js'
import HCPRole from './hcpRole.Model.js'

const practitionerSchema = new mongoose.Schema({
	practitionerId: {
		type: Number,
		required: [true, 'You must enter a Practitioner ID'],
		validate:[validator.isNumeric, 'Please enter a Number'],
	},
	role: {
		type: HCPRole,
	},
	email: {
		type: String,
		minlength: [8,'Minimum Email Length is 8'],
		required: [true,'Please enter an Email'],
		lowercase: true,
		unique: [true, 'This Email is already in use'], 
		validate:[validator.isEmail, 'Please enter a Valid Email'],
	},
	password: {
		type: String,
		required: [true,'Please enter a Password'],                                                     
		minlength: [10, 'Password must be at least a length of 10'],
		//validate:[isStrongPassword, 'This password is weaksauce bruh, take it to the gym n strengthen it up'],
	},
	user: {
		type: UserSchema,
	},
})

export default mongoose.model('Practitioner', practitionerSchema)
