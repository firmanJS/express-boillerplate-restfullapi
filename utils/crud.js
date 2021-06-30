const {
  errorResponse, successResponse, paging, validateData, resultValidation, countValidation
} = require('./index')

const searchCondition = (req, search) => {
  const paginations = paging(req)
  let searching
  if (search.status) {
    searching = paginations.search
  } else {
    searching = search.condition
  }

  return searching
}

const pages = async (req, res, schema, search, select = [], indexing = {}) => {
  const paginations = paging(req)
  const searching = searchCondition(req, search) || [{}]
  try {
    const result = await schema.find(paginations.where)
      .select(select).or(searching)
      .sort(paginations.sort)
      .limit(paginations.limit)
      .skip((paginations.limit * paginations.page) - paginations.limit)
      .lean()
      .hint(indexing)
    const filterCount = { ...paginations.where, ...{ $or: [searching] } }
    const count = await schema.countDocuments(filterCount)
    const countPerPage = Math.ceil(count / paginations.limit)
    const dataMapping = {
      result,
      page: paginations.page,
      countPerPage,
      count,
      limit: paginations.limit
    }
    countValidation(req, res, dataMapping, msg)
  } catch (error) {
    errorResponse(res, error, 500)
  }
}

const save = async (req, res, schema) => {
  try {
    const { body } = req
    const storeData = await schema.create(body)
    successResponse(res, 'Create', storeData)
  } catch (error) {
    const cek = resultValidation(req)
    if (cek) {
      errorResponse(res, cek, 500)
    } else {
      errorResponse(res, error, 500)
    }
  }
}

const read = async (req, res, schema) => {
  try {
    const { id } = req.params
    const showData = await schema.findById(id).lean()
    validateData(req, res, msg, 'Get', showData)
  } catch (error) {
    errorResponse(res, error, 500)
  }
}

const updated = async (req, res, schema, options) => {
  const { body } = req
  const { id } = req.params
  try {
    const updateData = await schema
      .findByIdAndUpdate(id, { $set: body }, options)
    validateData(req, res, msg, 'Update', updateData)
  } catch (error) {
    errorResponse(res, error, 500)
  }
}

const deletes = async (req, res, schema, id) => {
  try {
    const destroyItem = await schema.findByIdAndRemove(id)
    validateData(req, res, msg, 'Delete', destroyItem)
  } catch (error) {
    errorResponse(res, error, 500)
  }
}

const cleanAll = async (res, schema) => {
  try {
    const cleaning = await schema.deleteMany({})
    successResponse(res, 'Delete All', cleaning)
  } catch (error) {
    errorResponse(res, error, 500)
  }
}

module.exports = {
  pages, save, read, updated, deletes, cleanAll
}
