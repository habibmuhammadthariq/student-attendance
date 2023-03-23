require('dotenv').config()
const fs = require('fs')
const { uploadFile } = require('../middlewares/uploadMiddleware')
const { sequelize, Student } = require('../models')

const { APP_URL } = process.env

exports.create = async (req, res) => {
  const { body, errors } = req
  const t = await sequelize.transaction()
  try {
    if (errors) throw new Error('Validation Error')

    const student = await Student.create(body, {transaction: t})
    await t.commit()

    if (!student) return res.status(409).send({ message: "Failed to insert data" })
    return res.send({ message: "Successfully insert new data", data: student })
  } catch (error) {
    console.error(error)
    await t.rollback()
    if (error.message === 'Validation Error') return res.send(errors)

    res.status(500).send({
      message: error.message || "Some error occured while creating student data"
    })   
  }
}

exports.update = async (req, res) => {
  const { body, params, errors } = req
  const t = await sequelize.transaction()
  try {
    if (errors) {
      // if (files.length) fs.unlinkSync(files[0].path)
      throw new Error('Validation Error')
    }

    // if (files.length) body.image_url = `${APP_URL}/assets/${files[0].filename}`
    const student = await Student.update(body, { where: { uuid: params.uuid }, transaction: t})
    await t.commit()  
    
    if (!student)  return res.status(409).send({ message: "Failed to update data" })

    return res.send({ message: "Successfully update data" })
  } catch (error) {
    console.error(error)
    await t.rollback()
    if (error.message === 'Validation Error') return res.send(errors)

    res.status(500).send({
      message: error.message || "Some error occured while updating student data"
    })   
  }
}

exports.findAll = async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes: Student.getBasicAttribute()
    })

    if (students) {
      return res.send({
        message: "Successfully retrieving all students",
        data: students
      })
    }

    return res.send({ message: "There is no students" })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: error.message || "Some error occured while retrieving all students"
    })
  }
}

exports.findOne = async (req, res) => {
  try {
    const { uuid } = req.params

    const student = await Student.findOne({
      where: { uuid },
      attributes: Student.getBasicAttribute()
    })

    if (!student) return res.status(404).send({ message: "student not found" })
    
    return res.send({
      message: `Successfully retrieve data ${student.name}`,
      data: student
    })
  } catch (error) {
    console.error(error)
    return res.status(401).send({
    message: error.message || "Some error occured while retrieving student data"
   }) 
  }
}

exports.destroy = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const { uuid } = req.params
    let student = await Student.findOne({ where: { uuid } })

    if (!student) return res.send({ message: "student not found "})

    await student.destroy({ transaction: t })
    await t.commit()

    return res.send({ message: "Successfully delete student" })
  } catch (error) {
    console.error(error)
    await t.rollback()

    return res.status(401).send({
      message: error.message || "Some error occured while deleting student data"
     }) 
  }
}