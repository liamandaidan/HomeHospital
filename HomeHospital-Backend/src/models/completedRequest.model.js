import mongoose from 'mongoose'
import VisitRequest from './visitRequest.Model.js'

/**
 * @constructor completedRequest
 * 
 */
const completedRequest = new mongoose.Schema(
	{
		_id: mongoose.Types.ObjectId,
		request: {
			type: VisitRequest.schema,
			required: true,
		},
		completionDate: {
			type: Date,
			immutable: true,
			default: () => Date.now(),
		},
	},
	{ _id: false }
)

export default mongoose.model('CompletedRequest', completedRequest)
