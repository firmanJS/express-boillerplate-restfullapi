const Country = require('../../models/CountryModel')
const { SEARCH } = require('../../helpers/constant')
const {
  pages, save, read, updated, deletes, cleanAll
} = require('../../utils/crud')

const index = (req, res) => pages(req, res, Country, SEARCH)
const store = (req, res) => save(req, res, Country)
const show = (req, res, next) => read(req, res, Country, next)
const update = (req, res, next) => updated(req, res, Country, { new: true }, next)
const destroy = (req, res, next) => deletes(res, Country, req.params.id, next)
const clean = (_req, res) => cleanAll(res, Country)

module.exports = {
  index, store, show, update, destroy, clean
}
