require('dotenv').config()
const mongoose = require('mongoose')

const userDB = process.env.MONGO_INITDB_ROOT_USERNAME
const passDB = process.env.MONGO_INITDB_ROOT_PASSWORD
const serviceDB = process.env.MONGO_SERVICE
const nameDB = process.env.MONGO_INITDB_DATABASE
const sources = process.env.AUTH_SOURCE
const portDB = process.env.MONGO_PORT
const dbUrl = `mongodb://${userDB}:${passDB}@${serviceDB}:${portDB}/${nameDB}?authSource=${sources}`

mongoose.Promise = global.Promise

const connectWithRetry = () => mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  keepAlive: true,
  auto_reconnect: true,
  poolSize: 10,
  useCreateIndex: true,
}, (err) => {
  if (err) {
    const msg = `Failed to connect to mongo on startup - retrying in 5 sec ${err}`
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(msg)
    } else {
      // eslint-disable-next-line no-console
      console.info(msg)
    }
    setTimeout(connectWithRetry(), 5000)
  } else {
    // eslint-disable-next-line no-console
    console.log('mongoDB Connected ✅')
  }
})

mongoose.connection.on('disconnected', (err) => {
  console.info(`Lost MongoDB connection ${err}`)
})

mongoose.connection.on('reconnected', (err) => {
  console.info(`Reconnected to MongoDB ${err}`)
})

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    // eslint-disable-next-line no-console
    console.info(`${collectionName}.${method}`, JSON.stringify(query), doc);
  });
}

module.exports = {
  connectWithRetry
}
