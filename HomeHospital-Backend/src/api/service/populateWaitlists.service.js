import fs from 'fs'
import VisitRequest from '../../models/visitRequest.Model.js';
import medicalFacilityModel from '../../models/medicalFacility.Model.js';
import { Waitlist } from '../../models/waitlist.class.js';

/**
 * This will be used to populate the list of requests
 * Right now, it is just checking to see requests in the DB, and also set up to be able to read requestID's
 * that will be used in the development process to set the rough order
 */
export async function populateWaitlists() {
    let allFacilities = await medicalFacilityModel.find();
    let allWaitlists = []; 
    allFacilities.forEach(element => {
        allWaitlists.push(new Waitlist({_id: element._id, name: element.hospitalName}));
    })
    allWaitlists.forEach(element => {
        //console.log(element.hospital);
        console.log(element.hospital._id);
    })
    let allRequests = await VisitRequest.find();
    // allRequests.forEach(element => {
    //     allWaitlists[0].enqueue(element)   //this works. all requests are enqueued to the first hospital
    // })
    // console.log(allWaitlists[0].printAll());
    if(allRequests.length === 0) {
        fs.readFile('../HomeHospital-Backend/src/requestOrder.txt', 'utf8', (err, data) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log(data.split("\r\n"));
        })
    } else {
        console.log("Entered the else");
        //generate a waitlist class for each hospital. Check the hospitalId for each request, match it to a hospital, then put it in the appropriate waitlist
        allRequests.forEach(element => {
            let requestedHospital = element.requestHospitalID;
            let hospitalIndex = allWaitlists.findIndex(object => {
                return object.hospital._id.equals(requestedHospital);
            })
            if(hospitalIndex >= 0) {
                allWaitlists[hospitalIndex].enqueue(element);
            }
        })
        allWaitlists.forEach(element => {
            if(element.queueSize > 0) {
                //element.printAll();
            } else {
                console.log(`Hospital: ${element.getHospital} has a queue size of ${element.getQueueSize}`);
            }
        })
    }
    
}
