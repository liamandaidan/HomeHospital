import fs from 'fs'
import VisitRequest from '../../models/visitRequest.Model.js';

export async function populateWaitlists() {
    let allRequests = await VisitRequest.find();
    if(allRequests.length === 0) {
        fs.readFile('../HomeHospital-Backend/src/requestOrder.txt', 'utf8', (err, data) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log(data);
        })
    } else {
        //console.log(allRequests);
        allRequests.forEach(element => {
            console.log(element);
        })
    }
    
}