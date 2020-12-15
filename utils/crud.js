const msg = require('../helpers/exceptions')
const { paging } = require('../helpers/pagination')
const { resultValidation } = require('../helpers/validation')

const pages = async (req, res, schema, search, select = [], indexing = {}) => {
  const paginations = paging(req)
  let searching
  if (search.status) {
    searching = paginations.search
  } else {
    searching = search.condition
  }
  try {
    const result = await schema.find(paginations.where)
      .select(select)
      .or(searching)
      .sort(paginations.sort)
      .limit(paginations.limit)
      .skip((paginations.limit * paginations.page) - paginations.limit)
      .lean()
      .hint(indexing)
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
    } else {
      msg.errorResponse(res, error, 500)
    }
  }
}

const read = async (req, res, schema, next) => {
  try {
    const { id } = req.params
    const showData = await schema.findById(id).lean()
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
