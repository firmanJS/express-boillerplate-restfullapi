const app = require('./app')
require('dotenv').config()

app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express boillerplate app running in port ${process.env.APP_PORT}`)
})
