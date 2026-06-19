const express = require('express')
const router = express.Router()
const { upload } = require('../config/cloudinary')

/**
 * POST /api/upload
 * Accepts a single image file (field name: "image"),
 * uploads it to Cloudinary, and returns the URL.
 */
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' })
    }

    res.json({
      url: req.file.path,
      public_id: req.file.filename
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ message: 'Image upload failed', error: error.message })
  }
})

module.exports = router
