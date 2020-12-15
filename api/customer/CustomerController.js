const Customer = require('../../models/CustomerModel')
const {
  pages, save, read, updated, deletes
} = require('../../utils/crud')

const searching = (req) => {
  let nama_kantor = { kantor: {} }
  let nama_search = { pelanggan : {}}
  const search = {}

  if (req.query.namakantor) {
    nama_kantor.kantor = { $elemMatch: { nama_kantor: req.query.namakantor }}
  } else {
    nama_kantor = {}
  }

  if (req.query.nama) {
    nama_search.pelanggan.nama = req.query.nama
  } else {
    nama_search = {}
  }

  if (req.query.search) {
    search.name = new RegExp(req.query.search, 'i')
  }

  return {
    status: false,
    condition: { ...search, ...nama_search, ...nama_kantor }
  }
}

const index = (req, res) => pages(req, res, Customer, searching(req))
const store = (req, res) => save(req, res, Customer)
const show = (req, res, next) => read(req, res, Customer, next)
const update = (req, res, next) => updated(req, res, Customer, { new: true }, next)
const destroy = (req, res, next) => deletes(res, Customer, req.params.id, next)

module.exports = {
  index, store, show, update, destroy
}
