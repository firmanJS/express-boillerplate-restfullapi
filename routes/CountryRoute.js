'use strict'
const express = require('express')
const country = require('../controllers/country/CountryController')
const { countryValidation } = require('../controllers/country/validation')
const { API_PATH } = require('../helpers/constant')
const { verifyToken } = require('../helpers/token_validation')
const router = express.Router()

router.get(`${API_PATH}/country`, verifyToken, country.index)
router.post(`${API_PATH}/country`, verifyToken, [countryValidation], (req, res) => {
  country.store(req, res)
})
router.get(`${API_PATH}/country/:id`, verifyToken, country.show)
router.put(`${API_PATH}/country/:id`, verifyToken, country.update)
router.delete(`${API_PATH}/country/:id`, verifyToken, country.destroy)

module.exports = router
