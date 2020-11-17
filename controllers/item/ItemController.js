'use strict'
const Items = require('../../models/ItemModel')
const { pages, save, read, updated, deletes } = require('../../utils/crud')

const index = async (req, res) => {
  await pages(req, res, Items)
}

const store = async (req, res) => {
  await save(req, res, Items)
}

const show = async (req, res, next) => {
  await read(req, res, Items, next )
}

const update = async (req, res, next) => {
  await updated(req, res, Items, { new: true }, next)
}

const destroy = async (req, res, next) => {
  await deletes(res, Items, req.params.id, next)
}

module.exports = {
  index, store, show, update, destroy
}
