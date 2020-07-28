'use strict'
const Users = require('../../models/UserModel')
const msg = require('../../helpers/exceptions')
const { verifyLoginPassword } = require('./validation')

const login = async (param, res) => {
  try {
    const check = await Users.findOne({ username: param.username })
    if (check) {
      const verify = verifyLoginPassword(param.password, check)
      msg.customResponse(res, verify.code, verify.msg, verify.data)
    } else {
      msg.customResponse(res, 401, 'Username or password not match', null)
    }
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

module.exports = {
  login
}
