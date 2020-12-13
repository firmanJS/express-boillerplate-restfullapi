const jsonParse = (str) => {
  let parsing
  try {
    parsing = JSON.parse(str)
  } catch (e) {
    parsing = e
  }

  return parsing
}

const paging = (req) => {
  let search
  try {
    if (req.query.search) {
      const searching = jsonParse(req.query.search)
      let push = {}
      let value

      for (prop in searching) {
        if (searching[prop] instanceof String) {
          value = { $regex: '' }
        } else {
          value = searching[prop]
        }
        push[prop] = value
      }

      search = push
    } else {
      search = {}
    }
  } catch (error) {
    return error
  }
  const sort = (req.query.sort ? jsonParse(req.query.sort) : { _id: -1 })
  const where = (req.query.where ? jsonParse(req.query.where) : {})
  const page = req.query.page || 1
  const limit = req.query.limit || 5

  return {
    search, sort, where, page, limit
  }
}

module.exports = {
  paging
}
