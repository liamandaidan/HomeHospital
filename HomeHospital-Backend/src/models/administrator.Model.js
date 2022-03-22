import UserSchema from './user.Schema.js'
import validator from 'validator'

const administratorSchema = new mongoose.Schema({
	adminId: {
		type: Number,
		required: true,
		validate:[validator.isNumeric, 'Please enter a Valid Number'],
	},
    permissions: {
        type: Number,
		required: true,
		validate:[validator.isNumeric, 'Please enter a Valid Number'],
    },
	user: {
		type: UserSchema
	}
    
})

export default mongoose.model('Administrator', administratorSchema)
