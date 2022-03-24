import mongoose from 'mongoose'
import UserSchema from './user.Schema.js'
import validator from 'validator'

const patientSchema = new mongoose.Schema({
	email: {
		type: String,
		minlength: [8,'Minimum Email Length is 8'],
		required: [true, 'Please enter an Email'],
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
	HCnumber: {
		type: String,
		required: [true, 'Please enter a Health Care Number'], 
		unique: [true, 'This Health Care Number is already in use'], 
		},
	gender: {
		type: String,
		required: [true, 'Please Enter your Gender'], 
	},
	dateOfBirth: {
		type: Date,
		required: [true, 'Please enter your Date of Birth'], 
		validate:[validator.isDate, 'This amazingly was not a date'],
	},
	user: {
		type: UserSchema,
	},
	emergencyContact: {
		firstName: {
			type: String,
			default: null,
			//validate:[validator.isAlpha, 'Only Letters allowed'],
		},
		lastName: {
			type: String,
			default: null,
			//validate:[validator.isAlpha, 'Only Letters allowed'],
		},
		phoneNumber: {
			type: String,
			default: null,
			//validate:[validator.isMobilePhone, 'We need a real canadian phone number'],
		},
	},
	currentRequest: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'VisitRequest',
		default: null,
	},
	pastRequests: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'CompletedRequest',
		default: null,
	},
})

// Adds the new request to the Patients currentRequest spot
patientSchema.methods.newRequest = function (requestId) {
	try {
		if (this.currentRequest != null) {
			throw new Error('Patient already has an active request!!')
		} else {
			if (mongoose.Types.ObjectId.isValid(requestId)) {
				this.currentRequest = requestId
				return
			} else {
				throw new Error(
					'Invalid RequestId for the patients new Request'
				)
			}
		}
	} catch (error) {
		console.log(error.message)
	}
}

// moves the current request from the patients curret request spot and puts it in the list of past requests
patientSchema.methods.completeRequest = function () {
	try {
		if (this.currentRequest == null) {
			throw new Error('Patient has no request to move to be completed')
		} else {
			this.pastRequests.push(this.currentRequest)
			this.currentRequest = null
		}
	} catch (error) {
		console.log(error.message)
	}
}

// Cancel the current request
// Adds the new request to the Patients currentRequest spot
patientSchema.methods.cancelRequest = function () {
	try {
		if (this.currentRequest) {
			this.currentRequest = null
		} else {
			throw new Error('Patient Does not have an active request to cancel')
		}
	} catch (error) {
		console.log(error.message)
	}
}

// gets Details about the patient to be displayed on the site and returns them to the front end
patientSchema.methods.getPatientRequestInfo = function () {
	return {
		user: this.user,
		HCnumber: this.HCnumber,
		emergencyContact: this.emergencyContact,
		id: this._id,
		email: this.email,
	}
}

export default mongoose.model('Patient', patientSchema)
