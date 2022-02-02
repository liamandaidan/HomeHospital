import express from 'express'

const app = express()
const SERVER_PORT = process.env.port || 3000

app.get('/', (req, res)=> {
    res.send({data: "app is live!"})
})

app.listen(SERVER_PORT, ()=> {
    console.log(`App is live on http://localhost:${SERVER_PORT}`)
})
