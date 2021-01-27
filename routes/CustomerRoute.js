const express = require('express')
const customer = require('../api/customer/CustomerController')
const { customerValidation } = require('../api/customer/validation')
const { verifyToken } = require('../middleware')

const router = express.Router()

router.get('/', verifyToken, customer.index)
router.post('/', verifyToken, [customerValidation], (req, res) => {
  customer.store(req, res)
})
router.get('/:id', verifyToken, customer.show)
router.put('/:id', verifyToken, customer.update)
router.delete('/:id', verifyToken, customer.destroy)

module.exports = router
