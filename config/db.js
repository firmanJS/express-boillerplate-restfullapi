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
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(`Failed to connect to mongo on startup - retrying in 5 sec ${err}`)
    setTimeout(connectWithRetry(), 5000)
  } else {
    // eslint-disable-next-line no-console
    console.log('mongoDB Connected ✅')
  }
})

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    // eslint-disable-next-line no-console
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
  });
}

module.exports = {
  connectWithRetry
}
