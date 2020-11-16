const save = async (schema, body) => {
  return await [schema].create(body)
}

const deletes = async (schema, id) => {
  return await schema.findByIdAndRemove(id)
}

module.exports = {
  save, deletes
}

