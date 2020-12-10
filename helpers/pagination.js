const paging = (req) => {
  const search = (req.query.search ? JSON.parse(req.query.search) : null)
  const sort = (req.query.sort ? JSON.parse(req.query.sort) : { _id: -1 })
  const where = (req.query.where ? JSON.parse(req.query.where) : null)
  const page = req.query.page || 1
  const limit = req.query.limit || 5

  return {
    search, sort, where, page, limit
  }
}

module.exports = {
  paging
}
