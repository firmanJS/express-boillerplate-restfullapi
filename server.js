'use strict'
const express = require('express')
const app = express()
const routing = require('./config/route')
const dbConfig = require('./config/db')
const cors = require('cors')
const { handler404, handler500 } = require('./helpers/exceptions')
const compress = require('compression')
const methodOverride = require('method-override')
const helmet = require('helmet')
require('dotenv').config()

app.use(compress()) // gzip compression
app.use(methodOverride()) // lets you use HTTP verbs
app.use(helmet()) // secure apps by setting various HTTP headers
app.use(cors()) // enable cors
dbConfig.connectWithRetry() // connect to mongodb
app.use(express.json())
app.use(routing) // routing
app.use(handler404) // handler 404
app.use(handler500) // handler 500

app.listen(process.env.APP_PORT, () => {
  console.log(`express boillerplate app running in port ${process.env.APP_PORT}`)
})
