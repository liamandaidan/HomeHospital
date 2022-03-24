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
