'use strict'
const Users = require('../models/UserModel')
const msg = require('../helpers/exceptions')
const index = async (req, res) => {
  res.json('welcme').status(200)
}

const store = async (req, res) => {
  try {
    const result = await Users.create(req.body)
    msg.createResponse(res, result)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const show = async (req, res) => {
  try {
    const result = await Users.findById(req.params.id)
    res.json({
      data: result
    }).status(200)
  } catch (error) {
    res.json({
      data: [],
      msg: error
    }).status(422)
  }
}

const update = async (req, res) => {
  try {
    const result = await Users.findByIdAndUpdate(req.params.id,
      { $set: req.body }, { new: true })
    res.json({
      data: result
    }).status(200)
  } catch (error) {
    res.json({
      data: [],
      msg: error
    }).status(422)
  }
}

const destroy = async (req, res) => {
  try {
    const result = await Users.findByIdAndRemove(req.params.id)
    res.json({
      data: result
    }).status(200)
  } catch (error) {
    res.json({
      data: [],
      msg: error
    }).status(422)
  }
}

module.exports = {
  index, store, show, update, destroy
}
