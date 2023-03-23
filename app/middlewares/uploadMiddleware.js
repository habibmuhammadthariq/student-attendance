const util = require('util')
const multer = require('multer')
const path = require('path')
const baseUrl = 'localhost:8080'

const maxSize = 10 * 1024 * 1024   // 10 MB
let storage = multer.diskStorage({
  // destination: (req, file, cb) => { cb(null, path.join(__dirname, '..', '..', '/files')) },
  destination: (req, file, cb) => { cb(null, './assets/') },
  filename: (req, file, cb) => { cb(null, Math.random() + file.originalname) }
})

exports.uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).any()

// let uploadFileMiddleware = util.promisify(uploadFile)
// module.exports = uploadFileMiddleware