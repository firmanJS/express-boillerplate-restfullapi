const express = require('express')
const rateLimit = require('express-rate-limit')
const { validationResult } = require('express-validator')
const user = require('../api/user/UserController')
const auth = require('../api/user/AuthController')
const { inputValidationUser, loginValidation } = require('../api/user/validation')
const { API_PATH } = require('../helpers/constant')
const { verifyToken } = require('../helpers/token_validation')

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    code: 429,
    status: 'too many request',
    message: 'request ke endpoint ini dibatasi 3 kali dalam satu menit',
    data: []
  }
})

const router = express.Router()

router.get('/', verifyToken, limiter, user.index)
router.post('/', verifyToken, (req, res) => {
  user.store(inputValidationUser(req), res)
})
router.get('/:id', verifyToken, user.show)
router.put('/:id', verifyToken, user.update)
router.delete('/:id', verifyToken, user.destroy)

// authenticate route
router.post('/auth/login', [loginValidation], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) res.status(422).json(errors)
  auth.login(req.body, res)
})
router.post('/auth/register', (req, res) => {
  user.store(inputValidationUser(req), res)
})
router.get('/auth/logout', verifyToken, auth.logout)

module.exports = router
