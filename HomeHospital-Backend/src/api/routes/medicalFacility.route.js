import express from 'express' // Creates Router
import  MedicalFacility from '../../models/medicalFacility.Model.js'


const app = express.Router();

app.post('/newFacility', async (req, res) => {

    const { hospitalName, streetAddress, cityName, provName, postalCode,phoneNumber } = req.body

    try {

        // Check to make sure we don't have a duplicate hospital
        const result = await MedicalFacility.exists({
			hospitalName: hospitalName,
		})

        if(result?._id){
            console.log('Hospital All Ready exists!!')
            res.status(400).send({ message: 'Error' })

            return 
        }

        // create the new hospital in the DB if its all good
        const facility = await MedicalFacility.create({
			hospitalName: hospitalName,
			address: {
				streetAddress: streetAddress,
				cityName: cityName,
				provName: provName,
				postalCode: postalCode,
			},
			phoneNumber: phoneNumber
		})
        facility.save()
        console.log('hospital created: '+ facility)
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
