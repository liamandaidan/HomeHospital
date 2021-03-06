import mongoose from 'mongoose'
import addressSchema from './address.Schema.js'
import validator from 'validator'

/**
 * @constructor medicalFacility
 * @summary creates a new medical facility
 *
 * @description takes in input to create a new medical facility
 */
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

/**
 * @function
 * @summary enqueue
 * @description adds patient to the waitlist queue
 * @param {String} requestId
 * @returns {any}
 */
medicalFacility.methods.enqueue = function (requestId) {
	this.waitList.push(requestId)
}

/**
 * @function
 * @summary dequeue
 * @description removes patient from the waitlist queue
 * @returns {any}
 */
medicalFacility.methods.dequeue = async function () {
	try {
		if (this.waitList.length > 0) {
			this.waitList.shift()
		} else {
			throw new Error('No Requests in the Hospital WaitList')
		}
	} catch (error) {
		console.log(`${new Date()}\tError:  ${error.message}`)
	}
}

/**
 * @function
 * @summary removes request
 * @description removes request from the waitlist, complete request from arbitrary position
 * @param {String} requestId
 * @returns {any}
 */
medicalFacility.methods.removeRequest = async function (requestId) {
	try {
		const index = this.findIndexInWaitList(requestId)
		if (index > -1) {
			this.waitList.splice(index, 1)
		}
	} catch (error) {
		console.log(`${new Date()}\tError:  ${error.message}`)
	}
}

/**
 * @function
 * @summary finds index
 * @description find index of visit request in the waitList queue
 * @param {String} requestId
 * @returns {any}
 */
medicalFacility.methods.findIndexInWaitList = function (requestId) {
	try {
		// Search the waitList array for the requestId and return that index
		for (let i = 0; i < this.waitList.length; i++) {
			//TODO: Check this out, it shouldn't work, but it does.. who knows?
			if (this.waitList[i].toString() == requestId.toString()) {
				return i
			}
		}
		// These are not the droids you're looking for...return -1 to indicate not found.
		return -1
	} catch (error) {
		console.log(`${new Date()}\tError:  ${error.message}`)
	}
}

/**
 * @function
 * @summary moves request
 * @description moves request within the waitlist queue
 * @param {String} requestId
 * @param {Int} position
 * @returns {any}
 */
medicalFacility.methods.moveWaitListPosition = function (requestId, position) {
	try {
		if (position >= 0 && position < this.waitList.length) {
			const index = this.findIndexInWaitList(requestId)
			if (index > -1) {
				// remove from current waitList Position
				this.waitList.splice(index, 1)
				// inserting into new waitList Position
				this.waitList.splice(position, 0, requestId)
			}
		} else {
			throw new Error('Position outside of Index range')
		}
	} catch (error) {
		console.log(`${new Date()}\tError:  ${error.message}`)
	}
}

export default mongoose.model('MedicalFacility', medicalFacility)
