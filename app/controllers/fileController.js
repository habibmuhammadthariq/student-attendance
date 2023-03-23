const uploadFile = require('../middlewares/uploadMiddleware')

exports.upload = async (req, res, next) => {
  try {
    uploadFile(req, res)
    if (req.file === undefined) return res.status(400).send({ message: "Upload a file please!" })

    return next()
  } catch (error) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File larger than 2 MB cannot be uploaded!"
      })
    }
    console.error(error)
    res.status(500).send({
      message: `Unable to upload the file. ${error}`
    })
  }
}

exports.removeFile = (filePath) => {}