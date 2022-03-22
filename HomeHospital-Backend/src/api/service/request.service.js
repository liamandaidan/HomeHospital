import CompletedRequestModel from '../../models/completedRequest.model.js'
import visitRequestModel from '../../models/visitRequest.Model.js'

export async function completeVisitRequest(requestId) {
    try {
        // Check to see that ID is valid and check that the document exists.
        if (mongoose.Types.ObjectId.isValid(requestId) && await visitRequestModel.exists(requestId)) {

            // Get the visit request and create a completed request from it.
            const visitRequest      = await visitRequestModel.findById(requestId).exec()
            const completedRequest  = await CompletedRequestModel.create({_id: requestId._id, request: visitRequest})

            //Finally delete the visit request and save the completed request.
            await visitRequestModel.findOneAndDelete(requestId)
            completedRequest.save()
            return true
        }
        else {
            console.error('Invalid Request Id. ID: ' + requestId)
			return false
        }
    } catch (error) {
        console.error("Error: " + error.message)
        return false
    }
}