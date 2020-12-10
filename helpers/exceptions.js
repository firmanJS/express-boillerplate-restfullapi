const notFoundHandler = (req, res) => {
  const err = new Error('Not Found');
  res.status(404).json({
    error: err.toString(),
    status: 404,
    msg: `Route : ${req.url} Not found.`,
  })
}

const errorHandler = (error, res) => {
  if (!error.statusCode) error.statusCode = 500
  res.status(error.statusCode).json({
    error,
    status: error.statusCode,
    msg: error.toString()
  })
}

const getResponse = (req, res, data) => res.status(200).json({
  code: 200,
  message: 'Get data successfull',
  status: 'success',
  data: data.result,
  _links: req.url,
  _meta: {
    currentPage: 1,
    page: data.page,
    limitPerPage: data.limit,
    totalPages: data.countPerPage,
    countPerPage: data.result.length,
    countTotal: data.count
  }
})

const successResponse = (res, msg, data) => res.status(200).json({
  code: 200,
  message: `${msg} data successfull`,
  status: 'success',
  data
})

const customResponse = (res, code, msg, data) => res.status(code).json({
  code,
  message: msg,
  data
})

const notFoundResponse = (res) => res.status(404).json({
  code: 404,
  message: 'Content not found',
  status: 'empty',
  data: []
})

const errorResponse = (res, msg, code) => {
  let message
  if (msg.errmsg) {
    message = {
      message: msg.errmsg,
      status: 'bad request',
      data: []
    }
  } else if (typeof msg === 'object') {
    message = {
      msg,
      status: 'bad request',
      data: []
    }
  } else {
    message = {
      message: `Error. ${msg}`,
      status: 'bad request',
      data: []
    }
  }
  res.status(code).json(message)
}

module.exports = {
  notFoundHandler,
  errorHandler,
  successResponse,
  getResponse,
  notFoundResponse,
  errorResponse,
  customResponse
}
