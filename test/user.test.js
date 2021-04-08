const request = require('supertest')
const app = require('../app')

// eslint-disable-next-line no-undef
describe('GET /users', () => {
  // eslint-disable-next-line no-undef
  it('respond with json containing a list of all users', async (done) => {
    const res = await request(app).get('/api/v1/user')
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toEqual(401)
    done()
  });
});
