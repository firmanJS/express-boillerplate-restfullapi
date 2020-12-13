const express = require('express')
const customer = require('../api/customer/CustomerController')
const { customerValidation } = require('../api/customer/validation')
const { API_PATH } = require('../helpers/constant')
const { verifyToken } = require('../helpers/token_validation')

const router = express.Router()

router.get(`${API_PATH}/customer`, verifyToken, customer.index)
router.post(`${API_PATH}/customer`, verifyToken, [customerValidation], (req, res) => {
  customer.store(req, res)
})
router.get(`${API_PATH}/customer/:id`, verifyToken, customer.show)
router.put(`${API_PATH}/customer/:id`, verifyToken, customer.update)
router.delete(`${API_PATH}/customer/:id`, verifyToken, customer.destroy)

module.exports = router
