import CompletedRequestModel from '../../models/completedRequest.model.js'
import patientModel from '../../models/patient.Model.js'
import visitRequestModel from '../../models/visitRequest.Model.js'
import hospitalModel from '../../models/medicalFacility.Model.js'
import { whitelist_string } from '../../configure/configure.js'
import validator from 'validator'

/**
 * @summary Completes a patients active visit request moving it to history. Activated by the Practitioner.
 * 
 * @description Takes in the id of a patient with an active visit request, moves that request to the 
 * completed requests collection (history). Also removes all references to that request from the hospital 
 * and patient documents.
 * 
 * @param {String} patientId The ID of a patient with an active visit request.
 */
export const completeCurrentRequest = async (patientId) => {
	try {
		const sanitizedPatientId = validator.whitelist(patientId, whitelist_string)

		const patient = await patientModel.findById(sanitizedPatientId)

		if (patient.currentRequest && patient.currentHospital) {

			// Get the visit request and create a completed request from it.
			const visitRequest = await visitRequestModel.findById(
				patient.currentRequest
			)

			const completedRequest = await CompletedRequestModel.create({
				_id: patient.currentRequest,
				request: visitRequest,
			})

			// Get the hospital and patient so that we can remove the visit request references from then.
			const hospital = await hospitalModel.findById(
				visitRequest.requestHospitalId
			)

			//Finally delete the visit request and save the completed request.
			await visitRequestModel.findByIdAndDelete(patient.currentRequest)
			
			// Remove the visit request and move it into history
			hospital.removeRequest(patient.currentRequest)
			patient.completeRequest()

			// Save these new object states.
			completedRequest.save()
			hospital.save()
			patient.save()

			return true
		} else {
			console.log('in the else')
			throw new Error('patient does not possess current request')
		}
	} catch (error) {
		console.error('Error: ' + error.message)
		return false
	}
}

/**
 * 
 * @summary Cancels a patients request deleting it from the database.
 * 
 * @description Takes in a patient id, checks for an active request and if so deletes that request. 
 * Also removes references to the request from the hospital and patient documents.
 * 
 * @param {String} patientId ID of the patient that is having the request cancelled.
 * 
 */
export const cancelCurrentRequest = async (patientId) => {
	try {
		const sanitizedPatientId = validator.whitelist(patientId, whitelist_string)

		const patient = await patientModel.findById(sanitizedPatientId)
		if (patient.currentRequest && patient.currentHospital) {
			// Delete the visit request
			await visitRequestModel.findByIdAndDelete(patient.currentRequest)

			const hospital = await hospitalModel.findById(
				patient.currentHospital
			)

			// Remove the references to the visit request from the patient and the hospital.
			hospital.removeRequest(patient.currentRequest)
			patient.cancelRequest()

			hospital.save()
			patient.save()

			return true
		} else {
			throw new Error('patient does not possess current request')
		}
	} catch (error) {
		console.log('Error: ' + error.message)
		return false
	}
}

/**
 * @summary Returns the waitlist of vist request IDs from the desired Hospital
 * 
 * @description Needs a valid hospital ID. If the ID is valid it will return an array of request IDs that
 * represent the waitlist of the hospital. Array can be empty if there are no requests.
 * 
 * @param {String} hospitalId The ID of the hospital that we need the waitlist from.
 * @returns {String Array} The waitlist of request IDs for the hospital
 */
export const getHospitalWaitList = async (hospitalId) => {
	
	try {
		const sanitizedHospitalId = validator.whitelist(hospitalId, whitelist_string)

		const hospital = await hospitalModel.findById(sanitizedHospitalId)
		// console.log(hospital)

		if(!hospital){
			throw new Error('Hospital Not found.')
		}
		const { waitList } = hospital
		const visitRequests = await visitRequestModel.find({ '_id': { $in: waitList }})
		console.log(visitRequests)

		return visitRequests
	} catch(error) {
		console.error(error.message)
	}
}
