/* eslint-disable no-console */
const express = require('express')

const app = express()
const cors = require('cors')
const compress = require('compression')
const methodOverride = require('method-override')
const helmet = require('helmet')
const morgan = require('morgan')
const { notFoundHandler, errorHandler } = require('./helpers/exceptions')
const { MORGAN_FORMAT } = require('./helpers/constant')
const dbConfig = require('./config/db')
const routing = require('./routes')
// const logger = require('./config/logger')
require('dotenv').config()

const morganFormat = MORGAN_FORMAT
app.use(compress()) // gzip compression
app.use(methodOverride()) // lets you use HTTP verbs
app.use(helmet()) // secure apps by setting various HTTP headers
app.use(cors()) // enable cors
dbConfig.connectWithRetry() // connect to mongodb
app.use(express.json({ limit: '200kb' }))
app.use(morgan(morganFormat, { stream: process.stderr }))
app.use(routing) // routing
app.use(notFoundHandler) // 404 handler
app.use(errorHandler) // error handler
// app.use(logger) // error handler

module.exports = app
