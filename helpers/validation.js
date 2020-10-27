'use strict'
const { validationResult } = require('express-validator')

const resultValidation = (request) => {
  const errValidation = validationResult(request)
  if (!errValidation.isEmpty()) {
    return errValidation
  } else {
    return 0
  }
}

module.exports = {
  resultValidation
}
