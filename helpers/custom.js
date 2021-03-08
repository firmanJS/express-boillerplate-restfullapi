const moment = require('moment')

const convertDate = (result) => {
  result.createdAt = moment(new Date(result.createdAt)
    .getTime()).format('DD-MM-YYYY h:mm:ss')
  result.updatedAt = moment(new Date(result.updatedAt)
    .getTime()).format('DD-MM-YYYY h:mm:ss')
  return result
}

const validateData = (req, res, msg, message, result) => {
  if (result) {
    msg.successResponse(res, message, result)
  } else {
    msg.notFoundHandler(req, res)
  }
}

module.exports = {
  convertDate, validateData
}
