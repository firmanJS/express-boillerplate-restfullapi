'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  name: { type: String, index: true, required: true },
  nip: { type: String },
  kantor: [{
    nama_kantor: { type: String, index: true, default: null },
    alamat: { type: String, index: true, default: null },
    tlp: { type: String, index: true, default: null }
  }],
  pelanggan: {
    nama: { type: String, default: null }
  }
}, { timestamps: true })

module.exports = mongoose.model('Customer', CustomerSchema)
