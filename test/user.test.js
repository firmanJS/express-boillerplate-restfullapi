/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../app');

describe('api/v1/user ', () => {
  it('not found page', (done) => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  // it('invalid login user', async () => {
  //   const result = await request(app).post('api/v1/user/auth/login').send({
  //     username: 'dummyuser',
  //     passwod: 'dummyuser',
  //   })

  //   expect(result.statusCode).toEqual(422)
  //   expect(result.body).toHaveProperty('message')
  // })
});
