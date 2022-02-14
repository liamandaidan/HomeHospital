import mongoose from 'mongoose'
import UserSchema from './user.Schema.js'
import HCPRole from './hcpRole.Model'

const practitionerSchema = new mongoose.Schema({
	practitionerID:{
            type: Number,
            required: true
    },
    role: {
        type: HCPRole
    }
	
})

export default mongoose.model('Practitioner', practitionerSchema)
