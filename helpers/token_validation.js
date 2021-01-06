require('dotenv').config()
const jwt = require('jsonwebtoken')
const BlackList = require('../models/BlacklistModel')
const log = require('../config/logger')

// eslint-disable-next-line consistent-return
const verifyToken = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const checkBlackList = await BlackList.findOne({ token })
    if (checkBlackList) {
      log.info('Your token is blacklist, please login again')
      return res.status(401).send({
        auth: false,
        message: 'Your token is blacklist, please login again'
      })
    }
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (err) {
        log.info(err)
        res.status(500).send({ auth: false, message: err })
      }
      next()
    })
  } else {
    res.status(401).send({
      auth: false,
      message: 'Token required'
    })
    log.info('Token required')
  }
}

module.exports = { verifyToken }
