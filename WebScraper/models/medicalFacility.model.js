import mongoose from 'mongoose'
import addressSchema from './address.Schema.js'
import validator from 'validator'

const medicalFacility = new mongoose.Schema({
	hospitalName: {
		type: String,
		required: [true, 'Hospital Name is required'],
	},
	address: {
		type: addressSchema,
		required: [true, 'An Address is required'],
	},
	latitude: {
		type: Number,
		immutable: true,
	},
	longitude: {
		type: Number,
		immutable: true,
	},
	phoneNumber: {
		type: String,
		default: null,
		validate: [
			{
				validator: (value) => validator.isMobilePhone(value, ['en-CA']),
				msg: 'Please Enter A Canadian Number',
			},
		],
	},
	waitTime: {
		type: String,
		default: null,
	},
	hospitalDesc: {
		type: String,
		maxlength: [100, 'Maximum Length is 100'],
		defult: null,
	},
	practitioners: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Practitioner',
		default: null,
	},
	waitList: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'VisitRequest',
		default: null,
	},
})

// enqueue
medicalFacility.methods.enqueue = function (requestId) {
	this.waitList.push(requestId)
}

// dequeue
medicalFacility.methods.dequeue = async function () {
	try {
		if (this.waitList.length > 0) {
			// moves request from visitRequest In DB to Completed request
			// await completeVisitRequest(this.waitList[0])
			// remove the first request in the list
			this.waitList.shift()
		} else {
			throw new Error('No Requests in the Hospital WaitList')
		}
	} catch (error) {
		console.log(error.message)
	}
}

// cancel request
medicalFacility.methods.cancelRequest = async function (requestId) {
	try {
		// removes the request from the waitList
		if (this.waitList[this.waitList.length - 1] === requestId) {
			this.waitList.pop()
		} else {
			console.log(this.findIndexInWaitList(requestId))
			this.waitList.splice(this.findIndexInWaitList(requestId), 1)
		}
	} catch (error) {
		console.log(error.message)
	}
}

// complete request from arbitrary position
medicalFacility.methods.completeRequest = async function (requestId) {
	try {
		// removes the request Id from the waitList
		// console.log('requestId: ' + requestId)
		// console.log(this.findIndexInWaitList(requestId))
		this.waitList.splice(this.findIndexInWaitList(requestId), 1)
	} catch (error) {
		console.log(error.message)
	}
}

// find index of visit request in the waitList
medicalFacility.methods.findIndexInWaitList = function (requestId) {
	try {
		// Search the waitList array for the requestId and return that index
		for (let i = 0; i < this.waitList.length; i++) {
			// console.log(
			// 	'Waitlist ' + this.waitList[i] + ' requestId ' + requestId
			// )
			// console.log('bool result ' + this.waitList[i].toString() == requestId.toString())

			//TODO: Check this out, it shouldn't work, but it does.. who knows?
			if (this.waitList[i].toString() == requestId.toString()) {
				return i
			}
		}
	} catch (error) {
		console.log(error.message)
	}
}
// move request
medicalFacility.methods.moveWaitListPosition = function (requestId, position) {
	try {
		if (position >= 0 && position < this.waitList.length) {
			// remove from current waitList Position
			this.waitList.splice(this.findIndexInWaitList(requestId), 1)
			// inserting into new waitList Position
			this.waitList.splice(position, 0, requestId)
		} else {
			throw new Error('Position outside of Index range')
		}
	} catch (error) {
		console.log(error.message)
	}
}

export default mongoose.model('MedicalFacility', medicalFacility)
