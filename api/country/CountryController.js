const Country = require('../../models/CountryModel')
const { SEARCH } = require('../../utils')
const {
  pages, save, readById, updateById, deletes, cleanAll
} = require('../../utils/crud')

const index = (req, res) => pages(req, res, Country, SEARCH)
const store = (req, res) => save(req, res, Country)
const show = (req, res) => readById(req, res, Country)
const update = (req, res) => updateById(req, res, Country, { new: true })
const destroy = (req, res) => deletes(res, res, Country, req.params.id)
const clean = (req, res) => cleanAll(req, res, Country)

module.exports = {
  index, store, show, update, destroy, clean
}
