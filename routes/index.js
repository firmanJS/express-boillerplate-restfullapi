const express = require('express')

const routing = express()
const user = require('./UserRoute')
const item = require('./ItemRoute')
const customer = require('./CustomerRoute')
const country = require('./CountryRoute')

routing.use(user)
routing.use(item)
routing.use(customer)
routing.use(country)

module.exports = routing
