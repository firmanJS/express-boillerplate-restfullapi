const save = async (schema, body) => {
  return await [schema].create(body)
}
