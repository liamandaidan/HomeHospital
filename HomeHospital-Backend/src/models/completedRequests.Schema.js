import mongoose from "mongoose";
import visitRequest from "./visitRequest.Model.js";
import Patient from "./patient.Model.js";
import { request } from "express";

const completedRequestsSchema = new mongoose.Schema({
  /* Build up a schema and model for completed requests
That will take the completed request from current request,
pull it out, move it to old requests  */
  originalRequest: {
    type: visitRequest,
    required: true,
  },
  moveDAte: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  checkPatient:{
    type:Patient,
    required:true,
  }

  /*
    add date ✅

    a method that returns the patient info, symptoms, and additional details
*/

  /*
    1.check all request ids, from mongodb visitRequests
    2.see if any flag for completed
    3.move request from db Vrequests
    4.place into binary file
*/

});


/* completedRequestsSchema.method('to????', function () {
  const Vrequest = visitRequest.toObject()//???
 
  Vrequest.id = completedRequest._id// or vice versa i think 
  delete visitRequest;//???????????????????
 
  return course
 }) */

visitRequest.statics = {
  getVisitRequestId: function (visitRequest, cb) {
      this.findOne({ visitRequestID: visitRequestID }).select('_id').exec(cb);
  }
};

completedRequestsSchema.methods.viewRequestedDetails = function () {
  if (err) {
    // handle error,  https://stackoverflow.com/questions/34515071/mongoose-method-to-return-id
    return next(err);
}
  console.log(patientID);
  //return;  // returns patient data
};

export default mongoose.model("CompletedRequest", completedRequestsSchema);

//https://kb.objectrocket.com/mongo-db/simple-mongoose-and-node-js-example-1007
//https://intellipaat.com/community/43707/model-find-returns-empty-in-mongoose
//https://codesource.io/how-to-use-findoneandupdate-in-mongoose/