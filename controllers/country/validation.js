const { check } = require('express-validator')
require('dotenv').config()

const countryValidation = [
  check('zone').optional().isAlphanumeric(),
  check('code').isAlphanumeric().not().isEmpty()
    .withMessage('required value'),
  check('name').isAlphanumeric().not().isEmpty()
    .withMessage('required value')
]

module.exports = { countryValidation }
