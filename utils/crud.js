const save = async (schema, body) => {
  return await [schema].create(body)
}

const deletes = async (res, schema, id, msg, next) => {
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

