'use strict'
const _paging = (req) => {
  const search = (req.query.search ? JSON.parse(req.query.search) : null)
  const sort = (req.query.sort ? JSON.parse(req.query.sort) : { def_: -1 })
  const where = (req.query.where ? JSON.parse(req.query.where) : null)
  const page = req.query.page || 1
  const limit = req.query.limit || 5

  return { search: search, sort: sort, where: where, page: page, limit: limit }
}

module.exports = {
  _paging
}
