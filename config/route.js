'use strict'
const express = require('express')
const routing = express()
const user = require('../routes/UserRoute')
const item = require('../routes/ItemRoute')

routing.use(user)
routing.use(item)

module.exports = routing
