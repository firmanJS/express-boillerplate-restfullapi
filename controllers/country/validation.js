'use strict'
const { check } = require('express-validator')
require('dotenv').config()

const countryValidation = [
  check('name').isAlphanumeric().not().isEmpty().withMessage('required value'),
  check('code').isAlphanumeric().not().isEmpty().withMessage('required value')
]

module.exports = { countryValidation }
