import express from 'express' // Creates Router
import SymptomSchema from '../../models/symptom.Schema.js'
import visitRequestModel from '../../models/visitRequest.Model.js'

const app = express.Router()

app.post('/newSymptom', async (req, res) => {
    const {
        symptomList,
        generalDescription,
    } = req.body

    try {

        // Loop over symptom list and add 
        
        // add general description
        // Check to make sure we don't have the symptom already created
        const result = await VisitRequest.exists({
            symptom: symptom,
        })

        if (result?._id) {
            console.log('Symptoms were already added!!')
            res.status(400).send({
                message: 'Error'
            })

            return
        }

        // create the new symptom and severity
        const symptoms = await Symptom.create({
            severity: severity,

            description: description,
        })
        symptoms.save()
        console.log('Symptom added: ' + symptoms)
        res.status(201).send({
            message: 'Symptom Added'
        })
    } catch (error) {
        res.status(400).send({
            message: 'Error'
        })
    }
})

app.get('/test', (req, res) => {
    res.send('test')
})

// export this route
export default app