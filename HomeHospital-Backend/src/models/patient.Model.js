import mongoose from 'mongoose'
import UserSchema from './user.Schema.js'

const patientSchema = new mongoose.Schema({
	email: {
		type: String,
		minlength: 8,
		required: true,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 10,
	},
	HCnumber: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
	user: {
		type: UserSchema,
	},
	emergencyContact: {
		firstName: {
			type: String,
			default: null,
		},
		lastName: {
			type: String,
			default: null,
		},
		phoneNumber: {
			type: String,
			default: null,
		},
	},
	requests: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'VisitRequest',
		default: null,
	},
})

patientSchema.methods.getPatientRequestInfo = function () {
	return {user: this.user,
		HCnumber: this.HCnumber,
		emergencyContact: this.emergencyContact,
		id: this._id,
		email: this.email}
		//HCnumber: HCNum,
		//emergencyContact: { firstName: first, lastName: last }
	

};

export default mongoose.model('Patient', patientSchema)