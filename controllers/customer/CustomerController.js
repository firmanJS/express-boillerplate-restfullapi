'use strict'
const Customer = require('../../models/CustomerModel')
const { pages, save, read, updated, deletes } = require('../../utils/crud')

const index = async (req, res) => {
  await pages(req, res, Customer)
}

const store = async (req, res) => {
  await save(req, res, Customer)
}

const show = async (req, res, next) => {
  await read(req, res, Customer, next )
}

const update = async (req, res, next) => {
  await updated(req, res, Customer, { new: true }, next)
}

const destroy = async (req, res, next) => {
  await deletes(res, Customer, req.params.id, next)
}

module.exports = {
  index, store, show, update, destroy
}
