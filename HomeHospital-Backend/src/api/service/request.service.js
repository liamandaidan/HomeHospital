import mongoose from 'mongoose'
import CompletedRequestModel from '../../models/completedRequest.model.js'
import visitRequestModel from '../../models/visitRequest.Model.js'

// Takes in a requestId, moves the request Object from the vistitRequest collection in the database
// and shifts it into the completedRequests collection in the database
// this is a function that will be called BY THE PRACTITIONER
export const completeVisitRequest = async (requestId) => {
	try {
		// Check to see that ID is valid and check that the document exists.
		if (
			mongoose.Types.ObjectId.isValid(requestId) &&
			(await visitRequestModel.exists(requestId))
		) {
			// Get the visit request and create a completed request from it.
			const visitRequest = await visitRequestModel
				.findById(requestId)
				.exec()
			const completedRequest = await CompletedRequestModel.create({
				_id: requestId._id,
				request: visitRequest,
			})

			//Finally delete the visit request and save the completed request.
			await visitRequestModel.findOneAndDelete(requestId)
			completedRequest.save()
			return true
		} else {
			console.error('Invalid Request Id. ID: ' + requestId)
			return false
		}
	} catch (error) {
		console.error('Error: ' + error.message)
		return false
	}
}

// This takes in a requestId and deletes the request from the visitRequest collection
//TODO: This still needs to remove the request from the Patients list/hospital list
//This can be called by the PATIENT OR THE PRACTITIONER
export const deleteVisitRequest = async (requestId) => {
	try {
		if (
			mongoose.Types.ObjectId.isValid(requestId) &&
			(await visitRequestModel.exists(requestId))
		) {
			await visitRequestModel.findOneAndDelete(requestId)
		}
	} catch (error) {
		console.log(error.message)
	}
}
