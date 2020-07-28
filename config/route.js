'use strict'
const express = require('express')
const routing = express()
const user = require('../routes/UserRoute')

routing.use(user)

module.exports = routing
