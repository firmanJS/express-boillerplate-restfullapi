const Customer = require('../../models/CustomerModel')
const {
  pages, save, read, updated, deletes
} = require('../../utils/crud')

const index = (req, res) => pages(req, res, Customer)
const store = (req, res) => save(req, res, Customer)
const show = (req, res, next) => read(req, res, Customer, next)
const update = (req, res, next) => updated(req, res, Customer, { new: true }, next)
const destroy = (req, res, next) => deletes(res, Customer, req.params.id, next)

module.exports = {
  index, store, show, update, destroy
}
