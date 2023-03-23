const express = require('express')
const { 
  create, findAll, findOne, update, destroy, 
} = require('../controllers/studentController') 
const { uploadFile } = require('../middlewares/uploadMiddleware')
const { validate } = require('../validator')
const { insertValidation, updateValidation } = require('../validator/studentValidator')
const studentRouter = express.Router()

studentRouter.post('/create', validate(insertValidation), create)
studentRouter.get('/',  findAll)
studentRouter.get('/:studentId', findOne)
studentRouter.put('/:studentId', validate(updateValidation), update)
studentRouter.delete('/:studentId', destroy)

module.exports = studentRouter