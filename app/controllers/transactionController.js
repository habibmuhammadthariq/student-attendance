const { Transaction, sequelize, Student } = require('../models')
const { Op } = require('sequelize')
const { transactionType } = require('../helpers/constant')

exports.create = async (req, res) => {
  const { body, errors } = req
  const t = await sequelize.transaction()
  try {
    if (errors) throw new Error('Validation Error')

    const now = new Date()
    if (body.type === transactionType.present && (now.getHours() > 8) && now.getMinutes() > 0) body.notes = 'terlambat'

    const isAlreadyInput = await Transaction.findOne({ 
      where: { 
        studentId: body.studentId,
        createdAt: sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '=', now.toISOString().split('T')[0])
      }
    })
    if (isAlreadyInput) return res.send({ message: 'Student can only fill in the absence once' })

    const transaction = await Transaction.create(body, { transaction: t })
    await t.commit()

    if (!transaction) return res.status(409).send({ message: "Failed to insert data" })
    return res.send({
      message: "Successfully insert new transaction data",
      data: transaction
    })
  } catch (error) {
    console.error(error)
    await t.rollback()
    if (error.message === 'Validation Error') return res.send(errors)
    
    return res.status(500).send({
      message: error.message || "Some error occured while inserting new transaction"
    })
  }
}

exports.update = async (req, res) => {
  const { body, params, errors } = req
  const t = await sequelize.transaction()
  try {
    if (errors) { throw new Error('Validation Error') }

    const transaction = await Transaction.update(body, { where: { uuid: params.uuid }, transaction: t})
    await t.commit()  
    
    if (!transaction)  return res.status(409).send({ message: "Failed to update data" })

    return res.send({ message: "Successfully update data" })
  } catch (error) {
    console.error(error)
    await t.rollback()
    if (error.message === 'Validation Error') return res.send(errors)

    res.status(500).send({
      message: error.message || "Some error occured while updating transaction data"
    })   
  }
}

exports.findAll = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ attributes: Transaction.getBasicAttribute() })
    return res.send({
      message: "Successfully retrieving all transactions data",
      data: transactions
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: error.message || "Some error occured while retrieving all transactions data"
    })
  }
}

exports.findOne = async (req, res) => {
  try {
    const { uuid } = req.params
    const transaction = await Transaction.findOne({
      where: { uuid },
      attributes: Transaction.getBasicAttribute()
    })
    
    if (!transaction) {
      return res.status(404).send({ message: "transaction not found" })
    }
    return res.send({
      message: "Successfully retrieving transaction data",
      data: transaction
    })
  } catch (error) {
    console.error(error)
    return res.status(401).send({
      message: error.message || "Some error occured while retrieving transaction data"
    })
  }
}

exports.destroy = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const { uuid } = req.params
    
    const transaction = await Transaction.destroy({
      where: { uuid },
      transaction: t
    })
    await t.commit()

    if(!transaction) {
      return res.status(404).send({ message: "transaction not found" })
    }
    return res.send({ message: "Successfully remove this transaction" })
  } catch (error) {
    console.error(error)
    await t.rollback()

    return res.status(400).send({
      message: "Some error occured while deleting this transaction"
    })
  }
}



exports.report = async (req, res) => {
  try {
    const { start_date, end_date } = req.query

    const report = await Student.findAll({
      attributes: [
        'ID', 'Name',
        [sequelize.literal('COUNT(CASE WHEN type = "PRESENT" THEN 1 END)'), 'Present'], 
        [sequelize.literal('COUNT(CASE WHEN type = "ABSENT" THEN 1 END)'), 'Absent'],
      ],
      include: [{
        model: Transaction,
        as: 'Transactions',
        attributes: [],
        where: { 'createdAt': { [Op.and]: { [Op.gte]: start_date, [Op.lte]: end_date } } }
      }],
      group: ['Student.id']
    })

    res.send(report)    
  } catch (error) {
    console.error(error)
    return res.status(400).send({
      message: "Some error occured while deleting this transaction"
    })
  }
}