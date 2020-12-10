const msg = require('../helpers/exceptions')
const { paging } = require('../helpers/pagination')
const { resultValidation } = require('../helpers/validation')

const pages = async (req, res, schema) => {
  const paginations = paging(req)
  try {
    const result = await schema.find(paginations.where)
      .sort(paginations.sort)
      .limit(paginations.limit)
      .skip((paginations.limit * paginations.page) - paginations.limit)
    const count = await schema.estimatedDocumentCount()
    const countPerPage = Math.ceil(count / paginations.limit)
    const dataMapping = {
      result,
      page: paginations.page,
      countPerPage,
      count,
      limit: paginations.limit
    }
    msg.getResponse(req, res, dataMapping)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const save = async (req, res, schema) => {
  try {
    const { body } = req
    const storeData = await schema.create(body)
    msg.successResponse(res, 'Create', storeData)
  } catch (error) {
    const cek = resultValidation(req)
    if (cek) {
      msg.errorResponse(res, cek, 500)
    }
    msg.errorResponse(res, error, 500)
  }
}

const read = async (req, res, schema, next) => {
  try {
    const { id } = req.params
    const showData = await schema.findById(id)
    if (!showData) next()
    msg.successResponse(res, 'Get', showData)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const updated = async (req, res, schema, options, next) => {
  const { body } = req
  const { id } = req.params
  try {
    const updateData = await schema
      .findByIdAndUpdate(id, { $set: body }, options)
    if (!updateData) next()
    msg.successResponse(res, 'Update', updateData)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const deletes = async (res, schema, id, next) => {
  try {
    const destroyItem = await schema.findByIdAndRemove(id)
    if (!destroyItem) next()
    msg.successResponse(res, 'Delete', destroyItem)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const cleanAll = async (res, schema) => {
  try {
    const cleaning = await schema.deleteMany({})
    msg.successResponse(res, 'Delete All', cleaning)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

module.exports = {
  pages, save, read, updated, deletes, cleanAll
}
