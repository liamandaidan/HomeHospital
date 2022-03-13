import express from "express";
import patientModel from "../../models/patient.Model.js";
import medicalFacilityModel from "../../models/medicalFacility.Model.js";
import mongoose from "mongoose";
import visitRequestModel from "../../models/visitRequest.Model.js";
// import visitRequestModel from '../../models/visitRequest.Model.js'

const app = express.Router();

/*
	This route creates a new request in the DB. The user must supply their user ID, the selected hospital ID,
	along with the list of symptoms and any additional information about their request. 

*/
app.post("/newRequest", async (req, res) => {
  // get the HospitalID
  // get patient ID
  // get list of symptom's (array) and additional info
  const { hospitalID, patientID, symptomList, additionalInfo } = req.body;

  // Validates that the ID's for the hospital and patient are valid Mongo IDs
  const validFacilityID = mongoose.Types.ObjectId.isValid(hospitalID);
  const validUserID = mongoose.Types.ObjectId.isValid(patientID);

  if (validFacilityID && validUserID) {
    // Fetch the patients address
    const patient = await patientModel.findById(patientID);
    const hospital = await medicalFacilityModel.findById(hospitalID);
    const { address } = patient.user;

    if (patient && hospital) {
      try {
        // Create the new request
        const request = await visitRequestModel.create({
          patient: patient._id, //patientOID
          patientFirstName: patient.user.firstName,
          patientLastName: patient.user.lastName,
          requestHospitalID: hospital._id, //hospitalID,
          requestHospitalName: hospital.hospitalName,
          // sets the patients address by default to the starting address
          startAddress: {
            streetAddress: address.streetAddress,
            cityName: address.cityName,
            provName: address.provName,
            postalCode: address.postalCode,
          },
          symptoms: symptomList,
          additionalInfo: additionalInfo,
        });

        // Save the request to the DB if all is OK
        await request.save();

        console.log(
          `New Patient request added to the DB, RequestID: ${request._id}`
        );

        // attach the new request ID to the patients requests list
        patient.requests.push(request._id);
        await patient.save();

        res.send({ message: "Request entered", RequestID: request._id });
      } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(400).send({ message: "Error" });
      }
    } else {
      console.log("Patient or hospital Do no exist");
      res.status(400).send({ message: "Error" });
    }
  } else {
    console.log("Object ID's are Not valid");
    res.status(400).send({ message: "Error" });
  }
});

app.get("/currentRequest/:patientId", async (req, res) => {
  // return the current users request
  const { patientId } = req.params;

  // find the patient
  try {
    // validate the users ID
    const validUserID = mongoose.Types.ObjectId.isValid(patientId);
    // console.log(validUserID)
    const patient = await patientModel.findById(patientId);
    // console.log(patient)

    if (patient.requests.length == 0) {
      console.log("No registered requests");
      res.status(404).send({ message: "No Current requests" });
    } else {
      // Get the request with the matching ID
      const currentRequest = await visitRequestModel.findById(
        patient.requests[patient.requests.length - 1]
      );
      // console.log(currentRequest)
      console.log("Sent patient their current request");
      res.status(200).send({
        request: currentRequest,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: "Bad request" });
  }
});

app.get("/allRequests/:patientId", async (req, res) => {
  // return the current users request
  const { patientId } = req.params;

  // find the patient
  try {
    // validate the users ID
    const validUserID = mongoose.Types.ObjectId.isValid(patientId);
    // console.log(validUserID)
    const patient = await patientModel.findById(patientId);
    // console.log(patient)

    if (patient.requests.length == 0) {
      console.log("No registered requests");
      res.status(404).send({ message: "No Current requests" });
    } else {
      // for each requestId attached to the patient, loop through and query all requests, attach to an array,
      // send back to client

      // find all DB entries with that patient id
      const requestList = await visitRequestModel.find({
        patient: patientId,
      });

      console.log("Sent patient list of ALL requests");
      res.status(200).send({
        numOfRequests: requestList.length,
        request: requestList,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: "Bad request" });
  }
});
export default app;
