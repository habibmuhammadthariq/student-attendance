const express = require('express')
const studentRouter = require('./studentRouter')
const transactionRouter = require('./transactionRouter')
const { upload } = require('../controllers/fileController')

const router = express.Router()

router.use('/student', studentRouter)
router.use('/transaction', transactionRouter)
// router.post('/files', upload)

module.exports = router