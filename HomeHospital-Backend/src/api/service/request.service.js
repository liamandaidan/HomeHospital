import CompletedRequestModel from '../../models/completedRequest.model.js'
import visitRequestModel from '../../models/visitRequest.Model.js'

export async function completeVisitRequest(requestId) {
	console.log("hit complete Request, id: " + requestId)

	try {
        // Try to retrieve the request from the database
        if (await visitRequestModel.exists(requestId)) {
            console.log("here")
            const visitRequest = await visitRequestModel.findById(requestId).exec()
            console.log(visitRequest)
            const completedRequest = await CompletedRequestModel.create({_id: requestId._id, request: visitRequest})
            await visitRequestModel.findOneAndDelete(requestId)
            completedRequest.save()
            console.log('completed Request!')
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