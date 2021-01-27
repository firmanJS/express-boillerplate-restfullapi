const express = require('express')
const country = require('../api/country/CountryController')
const { countryValidation } = require('../api/country/validation')
const { verifyToken } = require('../middleware')

const router = express.Router()

router.get('/', verifyToken, country.index)
router.post('/', verifyToken, [countryValidation], (req, res) => {
  country.store(req, res)
})
router.get('/:id', verifyToken, country.show)
router.put('/:id', verifyToken, country.update)
router.delete('/:id', verifyToken, country.destroy)
router.delete('/', verifyToken, country.clean)

module.exports = router
