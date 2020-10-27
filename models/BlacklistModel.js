'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlacklistSchema = new Schema({
  token: { type: String, index: true, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

module.exports = mongoose.model('Blacklist', BlacklistSchema)
