'use strict'
const Items = require('../../models/ItemModel')
const msg = require('../../helpers/exceptions')
const { _paging } = require('../../helpers/pagination')

const index = async (req, res) => {
  const paginate = _paging(req)
  try {
    const result = await Items.find(paginate.where)
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
    const storeItem = await Items.create(input)
    msg.successResponse(res, 'Create', storeItem)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const show = async (req, res) => {
  try {
    const showItem = await Items.findById(req.params.id)
    msg.successResponse(res, 'Get', showItem)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const update = async (req, res) => {
  try {
    const updateItem = await Items.findByIdAndUpdate(req.params.id,
      { $set: req.body }, { new: true })
    msg.successResponse(res, 'Update', updateItem)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const destroy = async (req, res) => {
  try {
    const id = req.params.id
    const destroyItem = await Items.findByIdAndRemove(id)
    msg.successResponse(res, 'Delete', destroyItem)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

module.exports = {
  index, storeItem, show, update, destroy
}
