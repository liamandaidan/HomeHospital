import { request } from 'express'
import CompletedRequestModel from '../../models/completedRequest.model.js'
import VisitRequestModel from '../../models/visitRequest.Model.js'

export async function completeVisitRequest(requestId) {
    try {
        // Try to retrieve the request from the database
        const visitRequest = await VisitRequestModel.findOne(requestId).exec()
        // return false if the returned object is null.
        if (visitRequest == null) {
            console.error('Invalid Request Id. ID:' + requestId)
            return false
        // if valid request then move it to the completed requests and delete it from the visit requests.
        } else {
            const completedRequest = await CompletedRequestModel.create({_id: visitRequest._id, request: visitRequest})
            await VisitRequestModel.findOneAndDelete(requestId)
            completedRequest.save()
        }
    } catch (err) {
        console.error(err.error)
        return false
    }
    return true
}