'use strict'
const Users = require('../../models/UserModel')
const msg = require('../../helpers/exceptions')
const { _paging } = require('../../helpers/pagination')

const index = async (req, res) => {
  const paginate = _paging(req)
  try {
    const result = await Users.find(paginate.where)
      .skip((paginate.limit * paginate.page) - paginate.limit)
      .limit(paginate.limit).sort(paginate.sort)
    const count = await Users.estimatedDocumentCount()
    const countPerPage = Math.ceil(count / paginate.limit)
    const dataMapping = {
      result: result,
      page: paginate.page,
      countPerPage: countPerPage,
      count: count,
      limit: paginate.limit
    }
    msg.getResponse(req, res, dataMapping)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const store = async (input, res) => {
  try {
    const result = await Users.create(input)
    msg.successResponse(res, 'Create', result)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const show = async (req, res) => {
  try {
    const result = await Users.findById(req.params.id)
    msg.successResponse(res, 'Get', result)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const update = async (req, res) => {
  try {
    const result = await Users.findByIdAndUpdate(req.params.id,
      { $set: req.body }, { new: true })
    msg.successResponse(res, 'Update', result)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const destroy = async (req, res) => {
  try {
    const id = req.params.id
    const resultDestory = await Users.findByIdAndRemove(id)
    msg.successResponse(res, 'Delete', resultDestory)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

module.exports = {
  index, store, show, update, destroy
}
