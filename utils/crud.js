const msg = require('../helpers/exceptions')
const { resultValidation } = require('../helpers/validation')

const save = async (req, res, schema) => {
  try {
    const { body }  = req
    const storeData = await schema.create(body)
    msg.successResponse(res, 'Create', storeData)
  } catch (error) {
    const cek = resultValidation(req)
    if (!cek) {
      msg.errorResponse(res, error, 500)
    } else {
      msg.errorResponse(res, cek, 500)
    }
  }
}

const deletes = async (res, schema, id, next) => {
  try {
    const destroyItem = await schema.findByIdAndRemove(id)
    if (!destroyItem) return next()
    msg.successResponse(res, 'Delete', destroyItem)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

module.exports = {
  save, deletes
}

