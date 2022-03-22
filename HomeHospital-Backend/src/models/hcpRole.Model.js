import UserSchema from './user.Schema.js'
import mongoose from 'mongoose'
import validator from 'validator'

const hcpRoleSchema = new mongoose.Schema({
	Doctor: {
		type: Number=0,
		required: true,
		validate:[validator.isNumeric, 'Please enter a Valid Number'],

	},
    Nurse: {
        type: Number=1,
		required: true,
		validate:[validator.isNumeric, 'Please enter a Valid Number'],
    },
    Clerk: {
        type: Number=2,
		required: true,
		validate:[validator.isNumeric, 'Please enter a Valid Number'],

    },
	user: {
		type: UserSchema
	}
})

export default mongoose.model('HCPRole', hcpRoleSchema)
