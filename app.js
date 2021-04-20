const express = require('express')

const app = express()
const cors = require('cors')
const compress = require('compression')
const methodOverride = require('method-override')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const morgan = require('morgan')
const { notFoundHandler, errorHandler } = require('./helpers/exceptions')
const { MORGAN_FORMAT } = require('./helpers/constant')
const dbConfig = require('./config/db')
const routing = require('./routes')
require('dotenv').config()

const morganFormat = MORGAN_FORMAT
app.use(compress()) // gzip compression
app.use(methodOverride()) // lets you use HTTP verbs
app.use(helmet()) // secure apps by setting various HTTP headers
app.use(cors()) // enable cors
app.options('*', cors()) //cors setup
dbConfig.connectWithRetry() // connect to mongodb
app.use(express.json({ limit: '200kb' }))
app.use(morgan(morganFormat, { stream: process.stderr }))
app.use(xss());
app.use(mongoSanitize());
app.use(routing) // routing
app.use(notFoundHandler) // 404 handler
app.use(errorHandler) // error handlerr

module.exports = app
