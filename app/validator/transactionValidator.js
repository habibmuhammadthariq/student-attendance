const { body } = require("express-validator")
const { checkTransactionType } = require("./customValidator")

const general = [
  body('studentId').notEmpty().withMessage('Field student id harus diisi'),
  body('type').custom(checkTransactionType()),
]

exports.insertValidation = general

exports.updateValidation = [
  body('type').custom(checkTransactionType(false))
]