const express = require('express')
router = express.Router()
const authControllers = require('../Controllers/authController')
const videoControllers = require('../Controllers/videoController')

router.route('/getAllVideos').get((req, res) => {
  res.send('This is get all videos route')
})
router
  .route('/upload')
  .post(
    authControllers.verifyToken,
    videoControllers.uploadVideo,
    videoControllers.saveVideoData
  )
module.exports = router
