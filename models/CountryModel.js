const mongoose = require('mongoose')

const { Schema } = mongoose

const CountrySchema = new Schema({
  name: {
    type: String, index: true, required: true, unique: true
  },
  code: {
    type: String, index: true, required: true, unique: true, uppercase: true
  },
  region: {
    type: String, index: true, default: null
  },
}, { timestamps: true })

module.exports = mongoose.model('Country', CountrySchema)
