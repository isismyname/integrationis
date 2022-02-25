const express = require('express')
require('dotenv').config()
const router = require('./src/routes/route')
const cors = require('cors')

const app = express()

const port = 5000
app.use(cors())
app.listen(port, ()=> console.log(`${port} is Listening`))

app.use(express.json())
app.use('/api/v1', router)
app.use('/uploads', express.static('uploads'))