const hash = require('password-hash')
const jwt = require('jsonwebtoken')
const { check } = require('express-validator')
require('dotenv').config()

const inputValidationUser = (req) => {
  const input = req.body
  try {
    input.password = hash.generate(input.password)
  } catch (error) {
    return error
  }
  return input
}

const verifyLoginPassword = (param, verify) => {
  let resultLogin
  const verifyData = hash.verify(param, verify.password)
  if (verifyData !== true) {
    resultLogin = {
      msg: 'Password incorect',
      code: 422,
      data: null
    }
  } else {
    const userToken = {
      id: verify._id,
      username: verify.username,
      fullname: verify.fullname
    }
    const token = jwt.sign(userToken, process.env.SECRET_KEY, { expiresIn: '8h' })
    resultLogin = {
      msg: 'Authenticate success',
      code: 200,
      data: { token }
    }
  }
  return resultLogin
}

const loginValidation = [
  check('username').not().isEmpty().withMessage('required value'),
  check('password').not().isEmpty().withMessage('required value')
]

module.exports = { inputValidationUser, verifyLoginPassword, loginValidation }
