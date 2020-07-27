'use strict'
const handler404 = (req, res) => {
  const err = process.env.APP_ENV === 'development' ? new Error() : {}
  return res.status(404).json({
    error: err.stack,
    status: 404,
    msg: `Route : ${req.url} Not found.`
  })
}

const handler500 = (_req, res) => {
  const err = process.env.APP_ENV === 'development' ? new Error() : {}
  res.status(500).json({
    error: JSON.parse(err),
    status: 500
  })
}

const successResponse = (req, res, data, current = null, pages = null, count = null) => {
  return res.status(200).json({
    code: 200,
    message: 'Get data successfull',
    status: 'success',
    data: data,
    _links: req.url,
    _meta: {
      currentPage: 1,
      page: current,
      totalPages: pages,
      countPerPage: data.length,
      countTotal: count
    }
  })
}

const createResponse = (res, data) => {
  return res.status(200).json({
    code: 200,
    message: 'Create data successfull',
    status: 'success',
    data: data
  })
}

const getResponse = (res, data) => {
  return res.status(200).json({
    code: 200,
    message: 'Get detail data successfull',
    status: 'success',
    data: data
  })
}

const updateResponse = (res, data) => {
  return res.status(200).json({
    code: 200,
    message: 'Update data successfull',
    status: 'success',
    data: data
  })
}

const deleteResponse = (res, data) => {
  return res.status(200).json({
    code: 200,
    message: 'Delete data successfull',
    status: 'success',
    data: data
  })
}

const notFoundResponse = (res) => {
  return res.status(404).json({
    code: 404,
    message: 'Content not found',
    status: 'empty',
    data: []
  })
}

const errorResponse = (res, msg, code) => {
  return res.status(code).json({
    message: `Error. ${msg}`,
    status: 'bad request',
    data: []
  })
}

module.exports = {
  handler404,
  handler500,
  successResponse,
  createResponse,
  getResponse,
  updateResponse,
  deleteResponse,
  notFoundResponse,
  errorResponse
}
