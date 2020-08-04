'use strict'
const Items = require('../../models/ItemModel')
const msg = require('../../helpers/exceptions')
const { _paging } = require('../../helpers/pagination')

const index = async (req, res) => {
  const paginate = _paging(req)
  try {
    const result = await Items.find(paginate.where)
      .select('_id, name')
      .skip((paginate.limit * paginate.page) - paginate.limit)
      .limit(paginate.limit).sort(paginate.sort)
    const count = await Items.estimatedDocumentCount()
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

const storeItem = async (input, res) => {
  try {
    const result = await Items.create(input)
    msg.successResponse(res, 'Create', result)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const showItem = async (req, res) => {
  try {
    const result = await Items.findById(req.params.id)
    msg.successResponse(res, 'Get', result)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const updateItem = async (req, res) => {
  try {
    const result = await Items.findByIdAndUpdate(req.params.id,
      { $set: req.body }, { new: true })
    msg.successResponse(res, 'Update', result)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const destroyItem = async (req, res) => {
  try {
    const id = req.params.id
    const resultDestory = await Items.findByIdAndRemove(id)
    msg.successResponse(res, 'Delete', resultDestory)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

module.exports = {
  index, storeItem, showItem, updateItem, destroyItem
}
