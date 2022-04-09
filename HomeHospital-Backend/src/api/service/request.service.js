import CompletedRequestModel from '../../models/completedRequest.model.js'
import patientModel from '../../models/patient.Model.js'
import visitRequestModel from '../../models/visitRequest.Model.js'
import hospitalModel from '../../models/medicalFacility.Model.js'

// Takes in a requestId, moves the request Object from the vistitRequest collection in the database
// and shifts it into the completedRequests collection in the database
// this is a function that will be called BY THE PRACTITIONER
export const completeCurrentRequest = async (patientId) => {
	try {
		const patient = await patientModel.findById(patientId)

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
			hospital.completeRequest(patient.currentRequest)
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

// This takes in a requestId and deletes the request from the visitRequest collection
//TODO: This still needs to remove the request from the Patients list/hospital list
//This can be called by the PATIENT OR THE PRACTITIONER
export const cancelCurrentRequest = async (patientId) => {
	try {
		const patient = await patientModel.findById(patientId)
		if (patient.currentRequest && patient.currentHospital) {
			// Delete the visit request
			await visitRequestModel.findByIdAndDelete(patient.currentRequest)

			const hospital = await hospitalModel.findById(
				patient.currentHospital
			)

			// Remove the references to the visit request from the patient and the hospital.
			hospital.cancelRequest(patient.currentRequest)
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

export const getHospitalWaitList = async (hospitalId) => {
	
	try {
		const hospital = await hospitalModel.findById(hospitalId)
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
