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
			/* validate:[
			{			
				validator: (value) => validator.isMobilePhone(value, ['en-CA']),	
				msg: 'Please Enter A Canadian Number',	
				},
			], */
		},
	},
	currentHospital: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MedicalFacility',
		default: null,
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
patientSchema.methods.newRequest = function (requestId, requestHospitalId) {
	try {
		if (this.currentRequest != null) {
			throw new Error('Patient already has an active request!!')
		} else {
			if (
				mongoose.Types.ObjectId.isValid(requestId) &&
				mongoose.Types.ObjectId.isValid(requestHospitalId)
			) {
				this.currentRequest = requestId
				this.currentHospital = requestHospitalId
				return
			} else {
				throw new Error(
					'Invalid RequestId or HospitalId for the patients new Request'
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
		if (this.currentRequest) {
			this.pastRequests.push(this.currentRequest)
			this.currentRequest = null
			this.currentHospital = null
		} else {
			throw new Error('Patient has no request to move to be completed')
		}
	} catch (error) {
		console.log('completed Request from patient model')
		console.log(error.message)
	}
}

// Cancel the current request
// Adds the new request to the Patients currentRequest spot
patientSchema.methods.cancelRequest = function () {
	try {
		if (this.currentRequest) {
			this.currentRequest = null
			this.currentHospital = null
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

patientSchema.methods.getPatientInfo = function () {
	return {
		user: this.user,
		HCnumber: this.HCnumber,
		emergencyContact: this.emergencyContact,
		id: this._id,
		email: this.email,
		gender: this.gender,
		dateOfBirth: this.dateOfBirth
	}
}

patientSchema.methods.getInfoForAdmin = function () {
	return {
		firstName: this.user.firstName,
		lastName: this.user.lastName,
		email: this.email,
		_id: this.id
	}
}

patientSchema.methods.modifyPatient = function (patientInfo) {
	this.user.firstName 	= patientInfo.user.firstName
	this.user.lastName 		= patientInfo.user.lastName
	this.user.address 		= patientInfo.user.address
	this.user.phoneNumber 	= patientInfo.user.phoneNumber
	this.email 				= patientInfo.email
	this.emergencyContact 	= patientInfo.emergencyContact
	this.gender 			= patientInfo.gender
	this.HCnumber 			= patientInfo.HCnumber
}

export default mongoose.model('Patient', patientSchema)
