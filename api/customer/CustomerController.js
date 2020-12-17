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
const show = (req, res) => read(req, res, Customer)
const update = (req, res) => updated(req, res, Customer, { new: true })
const destroy = (req, res) => deletes(req, res, Customer, req.params.id)

module.exports = {
  index, store, show, update, destroy
}
