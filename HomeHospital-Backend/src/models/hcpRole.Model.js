import UserSchema from './user.Schema.js'

const hcpRoleSchema = new mongoose.Schema({
	Doctor: {
		type: Number=0,
		required: true
	},
    Nurse: {
        type: Number=1,
		required: true
    },
    Clerk: {
        type: Number=2,
		required: true
    },
	user: {
		type: UserSchema
	}
})

export default mongoose.model('HCPRole', hcpRoleSchema)
