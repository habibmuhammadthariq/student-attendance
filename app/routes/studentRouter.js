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
studentRouter.get('/:uuid', findOne)
studentRouter.put('/:uuid', validate(updateValidation), update)
studentRouter.delete('/:uuid', destroy)

module.exports = studentRouter