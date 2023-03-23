const express = require('express')
const { create, findAll, findOne, destroy, report, update } = require('../controllers/transactionController')
const { validate } = require('../validator')
const { insertValidation, updateValidation } = require('../validator/transactionValidator')

const transactionRouter = express.Router()

transactionRouter.post('/create', validate(insertValidation), create)
transactionRouter.get('/report', report)
transactionRouter.get('/', findAll)
transactionRouter.get('/:transactionId', findOne)
transactionRouter.put('/:transactionId', validate(updateValidation), update)
transactionRouter.delete('/:transactionId', destroy)

module.exports = transactionRouter