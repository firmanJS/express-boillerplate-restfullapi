'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ItemSchema = new Schema({
  name: { type: String, upercase: true, index: true },
  price: { type: Number, index: true, required: 0 },
  qty: { type: Number, index: true, default: 0 }
}, { timestamps: true })

ItemSchema.index({ price: 1 })
ItemSchema.index({ qty: 1 })
module.exports = mongoose.model('Item', ItemSchema)
