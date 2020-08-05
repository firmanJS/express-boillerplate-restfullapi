'use strict'
require('dotenv').config()
const jwt = require('jsonwebtoken')
const BlackList = require('../models/BlacklistModel')

const verifyToken = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const checkBlackList = await BlackList.findOne({ token: token })
    if (checkBlackList) {
      return res.status(401).send({
        auth: false,
        message: 'Your token is blacklist, please login again'
      })
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (err) => {
        if (err) {
          return res.status(500).send({
            auth: false,
            message: err
          })
        }
        next()
      })
    }
  } else {
    return res.status(401).send({
      auth: false,
      message: 'Token required'
    })
  }
}

module.exports = { verifyToken }
