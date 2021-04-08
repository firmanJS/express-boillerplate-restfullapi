const request = require('supertest');
const app = require('../app');

// eslint-disable-next-line no-undef
describe('api/v1/user ', () => {
  // eslint-disable-next-line no-undef
  it('not found page', (done) => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
