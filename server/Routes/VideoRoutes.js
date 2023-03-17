const express = require('express')
const router = require('./userRoutes')
router = express.Router()

router.route('/getAllVideos').get(res.send('This is get all videos route'))
router.route('/upload').post(res.send('This is upload route'))
