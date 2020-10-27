'use strict'
const express = require('express')
const routing = express()
const user = require('./UserRoute')
const item = require('./ItemRoute')
const customer = require('./CustomerRoute')

routing.use(user)
routing.use(item)
routing.use(customer)

module.exports = routing
