const hash = require('password-hash')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
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

const schemas = {
  userLogin: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}

module.exports = { inputValidationUser, verifyLoginPassword, schemas }
