'use strict'
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

const verifyLoginPassword = (param, check) => {
  let resultLogin
  const verify = hash.verify(param, check.password)
  if (verify !== true) {
    resultLogin = {
      msg: 'Password incorect',
      code: 422,
      data: null
    }
  } else {
    const userToken = {
      id: check.id,
      username: check.username,
      fullname: check.fullname
    }
    const token = jwt.sign({ userToken }, process.env.SECRET_KEY, {
      expiresIn: '3h'
    })
    resultLogin = {
      msg: 'Authenticate success',
      code: 200,
      data: { token: token }
    }
  }
  return resultLogin
}

const loginValidation = [
  check('username').not().isEmpty().withMessage('required value'),
  check('password').not().isEmpty().withMessage('required value')
]

module.exports = { inputValidationUser, verifyLoginPassword, loginValidation }
