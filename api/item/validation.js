const { check } = require('express-validator')
require('dotenv').config()

const itemValidation = [
  check('name').isAlphanumeric().not().isEmpty()
    .withMessage('required value'),
  check('price').isNumeric().not().isEmpty()
    .withMessage('required value'),
  check('qty').isNumeric().not().isEmpty()
    .withMessage('required value')
]

module.exports = { itemValidation }
