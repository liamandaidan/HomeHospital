import MedicalFacility from '../../models/medicalFacility.Model.js'
/**
 * @function
 * @summary Gets a list of all of the medical facilities.
 * @param {*} res
 */
export const getHospitalList = async (res) => {
	try {
		// Fetch the list of hospitals from the database without the list of practitioners or V number
		const hospitalList = await MedicalFacility.find()
			.select({
				practitioners: 0,
				__v: 0,
				waitList: 0,
			})
			.exec()

		// Sent the user an array of objects containing the hospitals and info
		res.status(200).send({
			message: 'Successful Request',
			hospitalList: hospitalList,
		})
	} catch (error) {
		console.log(`${new Date()}\tError:  ${error.message}`)
		res.status(400).send({ message: 'Error in the request' })
	}
}
