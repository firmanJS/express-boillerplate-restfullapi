//apiTest.js
const request = require('supertest');
const app = require('../app');

describe('GET /users', function () {
  it('respond with json containing a list of all users', function (done) {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
