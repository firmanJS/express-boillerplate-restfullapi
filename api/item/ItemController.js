const Items = require('../../models/ItemModel')
const {
  pages, save, read, updated, deletes
} = require('../../utils/crud')

const index = (req, res) => pages(req, res, Items)
const store = (req, res) => save(req, res, Items)
const show = (req, res, next) => read(req, res, Items, next)
const update = (req, res, next) => updated(req, res, Items, { new: true }, next)
const destroy = (req, res, next) => deletes(res, Items, req.params.id, next)

module.exports = {
  index, store, show, update, destroy
}
