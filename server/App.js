const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('express-async-errors')

const userRoutes = require('./Routes/userRoutes')
const videoRoutes = require('./Routes/videoRoutes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/videos', videoRoutes)

module.exports = app
