import UserSchema from './user.Schema.js'

const administratorSchema = new mongoose.Schema({
	adminId: {
		type: Number,
		required: true,
	},
	permissions: {
		type: Number,
		required: true,
	},
	user: {
		type: UserSchema,
	},
})

export default mongoose.model('Administrator', administratorSchema)
