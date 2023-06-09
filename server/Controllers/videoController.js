const Video = require('../Models/videoModel')
const multer = require('multer')

const getAllVideos = (req, res) => {}

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './media/uploads')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
  },
})
const videoFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('video') &&
    file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)
  ) {
    cb(null, true)
  } else {
    res
      .status(400)
      .json({ message: 'only mp4, MPEG-4 or mkv formats are allowed' })
  }
}
const upload = multer({
  storage: videoStorage,
  fileFilter: videoFilter,
})
const uploadVideo = upload.single('video')

const saveVideoData = async (req, res) => {
  const { title, description } = req.body
  const videoUrl = req.file.filename
  const user = req.user
  if (!title) {
    res.status(400).json({ message: 'title is required to upload a video' })
  }

  let uploadObj
  if (description) {
    uploadObj = { title, description, videoUrl, uploader: user }
  } else {
    uploadObj = { title, videoUrl, uploader: user }
  }

  const videoUploded = await Video.create(uploadObj)

  res.status(200).json({
    status: 'success',
    message: 'video uploaded successful',
    data: videoUploded,
  })
}

module.exports = { getAllVideos, saveVideoData, uploadVideo }
