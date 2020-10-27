'use strict'
const Items = require('../../models/ItemModel')
const msg = require('../../helpers/exceptions')
const { _paging } = require('../../helpers/pagination')
const { resultValidation } = require('../../helpers/validation')

const index = async (req, res) => {
  const paginations = _paging(req)
  try {
    const result = await Items.find(paginations.where)
      .sort(paginations.sort)
      .limit(paginations.limit)
      .skip((paginations.limit * paginations.page) - paginations.limit)
    const count = await Items.estimatedDocumentCount()
    const countPerPage = Math.ceil(count / paginations.limit)
    const dataMapping = {
      result: result,
      page: paginations.page,
      countPerPage: countPerPage,
      count: count,
      limit: paginations.limit
    }
    msg.getResponse(req, res, dataMapping)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const store = async (req, res) => {
  try {
    const storeItem = await Items.create(req.body)
    msg.successResponse(res, 'Create', storeItem)
  } catch (error) {
    const cek = resultValidation(req)
    if (cek === 0) {
      msg.errorResponse(res, error, 500)
    } else {
      msg.errorResponse(res, cek, 500)
    }
  }
}

const show = async (req, res, next) => {
  try {
    const { id } = req.params
    const showItem = await Items.findById(id)
    if (!showItem) return next()
    msg.successResponse(res, 'Get', showItem)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const update = async (req, res, next) => {
  try {
    const updateItem = await Items.findByIdAndUpdate(req.params.id,
      { $set: req.body }, { new: true })
    if (!updateItem) return next()
    msg.successResponse(res, 'Update', updateItem)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const destroy = async (req, res, next) => {
  try {
    const id = req.params.id
    const destroyItem = await Items.findByIdAndRemove(id)
    if (!destroyItem) return next()
    msg.successResponse(res, 'Delete', destroyItem)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

module.exports = {
  index, store, show, update, destroy
}
