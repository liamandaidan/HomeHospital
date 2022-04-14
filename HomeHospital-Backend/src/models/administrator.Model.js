import mongoose from 'mongoose'
import peopleSchema from './people.Schema.js'

/**
 * @constructor administrator
 * 
 * Admin Levels
 *  3 = senior admin, can affect any admin/practitioner/patient
 *  2 = admin, can affect practitioner/patient
 *  1 = jr admin, can affect patient
 * 
 */
const administratorSchema = new mongoose.Schema({
	adminId: {
		type: Number,
		required: [true, 'Please enter an Admin ID'],
	},
	permissions: {
		type: Number,
		enum: [1, 2, 3] /*Permission levels increase in privilege from 1 to 3 */,
		required: true,
	},
	user: {
		type: peopleSchema,
	},
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
})

/**
 * @function
 * Description
 * @returns {any}
 */
administratorSchema.methods.getAdminInfo = function () {
	return {
		user: this.user,
		id: this._id,
		email: this.email,
		permissions: this.permissions
	}
}

/**
 * @function
 * Description
 * @param {any} adminInfo
 * @returns {any}
 */
administratorSchema.methods.modifyAdmin = function (adminInfo) {
	this.user.firstName 	= adminInfo.user.firstName
	this.user.lastName 		= adminInfo.user.lastName
	this.user.address 		= adminInfo.user.address
	this.user.phoneNumber 	= adminInfo.user.phoneNumber
	this.email 				= adminInfo.email
	this.permissions 		= adminInfo.permissions
}

export default mongoose.model('Administrator', administratorSchema)
