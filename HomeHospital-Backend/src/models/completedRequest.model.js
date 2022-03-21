import mongoose from 'mongoose';
import VisitRequest from './visitRequest.Model.js'
import Patient from './patient.Model.js'

const completedRequest = new mongoose.Schema({
    id_: false,
    request: {
        type: VisitRequest,
        required: true
    },
    completitionDate: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }
})

export default mongoose.model('CompletedRequest', completedRequest)