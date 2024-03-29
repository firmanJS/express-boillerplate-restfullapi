const moment = require('moment')
const { successResponse, notFoundHandler } = require('./index')

const convertDate = (result) => {
  const createdAt = result?.createdAt || Date.now()
  const updatedAt = result?.updatedAt || Date.now() // optional chaining
  result.createdAt = moment(new Date(createdAt)
    .getTime()).format('DD-MM-YYYY h:mm:ss')
  result.updatedAt = moment(new Date(updatedAt)
    .getTime()).format('DD-MM-YYYY h:mm:ss')
  return result
}

const validateData = (req, res, message, result) => {
  let msg
  if (result) {
    msg = successResponse(res, message, result)
  } else {
    msg = notFoundHandler(req, res)
  }

  return msg
}

module.exports = {
  convertDate, validateData
}
