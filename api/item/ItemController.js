const Items = require('../../models/ItemModel')
const { SEARCH } = require('../../utils')
const {
  pages, save, readById, updateById, deletes
} = require('../../utils/crud')

const index = (req, res) => pages(req, res, Items, SEARCH)
const store = (req, res) => save(req, res, Items)
const show = (req, res) => readById(req, res, Items)
const update = (req, res) => updateById(req, res, Items, { new: true })
const destroy = (req, res) => deletes(req, res, Items, req.params.id)

module.exports = {
  index, store, show, update, destroy
}
