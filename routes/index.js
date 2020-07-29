'use strict'
const express = require('express')
const routing = express()
const user = require('./UserRoute')
const item = require('./ItemRoute')

routing.use(user)
routing.use(item)

module.exports = routing
