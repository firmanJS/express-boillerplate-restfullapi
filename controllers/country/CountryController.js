'use strict'
const Country = require('../../models/CountryModel')
const msg = require('../../helpers/exceptions')
const { _paging } = require('../../helpers/pagination')
const { resultValidation } = require('../../helpers/validation')
const { deletes } = require('../../utils/crud')

const index = async (req, res) => {
  const paginations = _paging(req)
  try {
    const result = await Country.find(paginations.where)
      .sort(paginations.sort)
      .limit(paginations.limit)
      .skip((paginations.limit * paginations.page) - paginations.limit)
    const count = await Country.estimatedDocumentCount()
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
    const storeItem = await Country.create(req.body)
    msg.successResponse(res, 'Create', storeItem)
  } catch (error) {
    const cek = resultValidation(req)
    if (!cek) {
      msg.errorResponse(res, error, 500)
    } else {
      msg.errorResponse(res, cek, 500)
    }
  }
}

const show = async (req, res, next) => {
  try {
    const { id } = req.params
    const showItem = await Country.findById(id)
    if (!showItem) return next()
    msg.successResponse(res, 'Get', showItem)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const update = async (req, res, next) => {
  try {
    const updateItem = await Country.findByIdAndUpdate(req.params.id,
      { $set: req.body }, { new: true })
    if (!updateItem) return next()
    msg.successResponse(res, 'Update', updateItem)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const destroy = async (req, res, next) => {
  await deletes(res, Country, req.params.id, msg, next)
}

module.exports = {
  index, store, show, update, destroy
}
