import express from 'express' // Creates Router
import  medicalFacility from '../model/medicalFacility.Model.js'


const app = express.Router();

app.post('/createMedicalFacility', (req, res) => {
    let hospitals ={
        hospitalName: 'space for api call' ,
        address: 'space for api call',
        phoneNumber:'space for api call',
        waitTime:'space for api call',
        practitioners: 'Fake Doctors for now'
    }

    try {
        const facility = await medicalFacility.create(hospitals)
        facility.save()
        res.status(201).send({message: 'Hospital Created'})
    } catch (error) {
        res.status(400).send({message: "Error"})
    }
})

app.get('/test',(req, res) => {
    res.send("test")
})

// export this route
export default app;