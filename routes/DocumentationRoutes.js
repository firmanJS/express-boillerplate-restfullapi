const swaggerUi = require('swagger-ui-express')
const express = require('express')
const { API_PATH } = require('../helpers/constant')
const { successResponse } = require('../helpers/exceptions')
const { index } = require('../static')

const router = express.Router()

router.use(`${API_PATH}/documentation`, swaggerUi.serve)
router.get(`${API_PATH}/documentation`, swaggerUi.setup(index))
router.get('/', (req, res) => {
  successResponse(res, 'Show api', {
    welcome: 'Welcome to Boilerplate API.',
    documentation: `http://${req.get('host')}/api/v1/documentation`
  })
})
module.exports = router
