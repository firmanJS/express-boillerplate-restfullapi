const { check } = require('express-validator')
require('dotenv').config()

const customerValidation = [
  check('name').isAlphanumeric().not().isEmpty()
    .withMessage('required value'),
  check('nip').isNumeric().not().isEmpty()
    .withMessage('required value')
]

module.exports = { customerValidation }
