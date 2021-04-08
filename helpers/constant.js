module.exports = {
  API_PATH: '/api/v1',
  SEARCH: {
    status: true
  },
  LIMIT: 5,
  PAGE: 1,
  MONGO: {
    SORT: [1, -1] // 1 = ASC -1 = DESC
  },
  MORGAN_FORMAT: '[:date[clf]] :remote-addr :remote-user :method :url :status :res[content-length] - :response-time ms'
}
