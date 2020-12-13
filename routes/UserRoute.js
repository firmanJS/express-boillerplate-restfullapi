const express = require('express')
const { validationResult } = require('express-validator')
const user = require('../api/user/UserController')
const auth = require('../api/user/AuthController')
const { inputValidationUser, loginValidation } = require('../api/user/validation')
const { API_PATH } = require('../helpers/constant')
const { verifyToken } = require('../helpers/token_validation')

const router = express.Router()

router.get(`${API_PATH}/user`, verifyToken, user.index)
router.post(`${API_PATH}/user`, verifyToken, (req, res) => {
  user.store(inputValidationUser(req), res)
})
router.get(`${API_PATH}/user/:id`, verifyToken, user.show)
router.put(`${API_PATH}/user/:id`, verifyToken, user.update)
router.delete(`${API_PATH}/user/:id`, verifyToken, user.destroy)

// authenticate route
router.post(`${API_PATH}/user/auth/login`, [loginValidation], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) res.status(422).json(errors)
  auth.login(req.body, res)
})
router.post(`${API_PATH}/user/auth/register`, (req, res) => {
  user.store(inputValidationUser(req), res)
})
router.get(`${API_PATH}/user/auth/logout`, verifyToken, auth.logout)

module.exports = router
