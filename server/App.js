const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('express-async-errors')

const userRoutes = require('./Routes/userRoutes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)
app.use(express.json())

app.use('/api/users', userRoutes)

module.exports = app
