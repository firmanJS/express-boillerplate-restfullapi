/* eslint-disable no-restricted-syntax */
const jsonParse = (str) => {
  let parsing
  try {
    parsing = JSON.parse(str)
  } catch (e) {
    parsing = e
  }

  return parsing
}

const extractSearch = (req) => {
  let search
  if (req.query.search) {
    const searching = jsonParse(req.query.search)
    const push = {}
    let value
    let prop

    // eslint-disable-next-line guard-for-in
    for (prop in searching) {
      if (typeof searching[prop] === 'string' || searching[prop] instanceof String) {
        value = new RegExp(searching[prop], 'i')
      } else {
        value = searching[prop]
      }
      push[prop] = value
    }

    search = push
  } else {
    search = {}
  }

  return search
}

const paging = (req) => {
  let search
  try {
    search = extractSearch(req)
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
