const Items = require('../../models/ItemModel')
const { SEARCH } = require('../../helpers/constant')
const {
  pages, save, read, updated, deletes
} = require('../../utils/crud')

const index = (req, res) => pages(req, res, Items, SEARCH)
const store = (req, res) => save(req, res, Items)
const show = (req, res) => read(req, res, Items)
const update = (req, res) => updated(req, res, Items, { new: true })
const destroy = (req, res) => deletes(req, res, Items, req.params.id)

module.exports = {
  index, store, show, update, destroy
}
