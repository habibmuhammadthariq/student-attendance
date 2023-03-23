const { body, check } = require("express-validator")
const { checkImage, checkGender } = require("./customValidator")

const general = [
  body('name').notEmpty().withMessage('Field name harus diisi'),
  body('class').notEmpty().withMessage('Field class harus diisi'),
  body('gender').custom(checkGender()),
  body('birthDate').notEmpty().withMessage('Field class harus diisi'),
]

exports.insertValidation = general

exports.updateValidation = [
  body('gender').custom(checkGender(false))
  // check('image_url').custom(checkImage)
]