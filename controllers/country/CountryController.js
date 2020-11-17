'use strict'
const Country = require('../../models/CountryModel')
const { pages, save, read, updated, deletes, cleanAll } = require('../../utils/crud')

const index = async (req, res) => {
  await pages(req, res, Country)
}

const store = async (req, res) => {
  await save(req, res, Country)
}

const show = async (req, res, next) => {
  await read(req, res, Country, next )
}

const update = async (req, res, next) => {
  await updated(req, res, Country, { new: true }, next)
}

const destroy = async (req, res, next) => {
  await deletes(res, Country, req.params.id, next)
}

const clean = async (_req, res) => {
  await cleanAll(res, Country)
}

module.exports = {
  index, store, show, update, destroy, clean
}
