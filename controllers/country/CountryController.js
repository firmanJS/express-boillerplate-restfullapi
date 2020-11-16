'use strict'
const Country = require('../../models/CountryModel')
const msg = require('../../helpers/exceptions')
const { _paging } = require('../../helpers/pagination')
const { save, deletes } = require('../../utils/crud')

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
  await save(req, res, Country)
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
  await deletes(res, Country, req.params.id, next)
}

module.exports = {
  index, store, show, update, destroy
}
