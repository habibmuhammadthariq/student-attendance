const express = require('express')
const { create, findAll, findOne, destroy, report, update } = require('../controllers/transactionController')
const { validate } = require('../validator')
const { insertValidation, updateValidation } = require('../validator/transactionValidator')

const transactionRouter = express.Router()

transactionRouter.post('/create', validate(insertValidation), create)
transactionRouter.get('/report', report)
transactionRouter.get('/', findAll)
transactionRouter.get('/:uuid', findOne)
transactionRouter.put('/:uuid', validate(updateValidation), update)
transactionRouter.delete('/:uuid', destroy)

module.exports = transactionRouter