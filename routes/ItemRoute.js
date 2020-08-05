'use strict'
const express = require('express')
const item = require('../controllers/item/ItemController')
const { itemValidation } = require('../controllers/item/validation')
const { API_PATH } = require('../helpers/constant')
const { verifyToken } = require('../helpers/token_validation')
const router = express.Router()

router.get(`${API_PATH}/item`, verifyToken, item.index)
router.post(`${API_PATH}/item`, verifyToken, [itemValidation], (req, res) => {
  item.store(req, res)
})
router.get(`${API_PATH}/item/:id`, verifyToken, item.show)
router.put(`${API_PATH}/item/:id`, verifyToken, item.update)
router.delete(`${API_PATH}/item/:id`, verifyToken, item.destroy)

module.exports = router
