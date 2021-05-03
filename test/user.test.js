/* eslint-disable no-undef */
require('dotenv').config()
const request = require('supertest')

// const urlTest = process.env.URL_TEST
const urlTest = 'https://www.facebook.com/'

describe('api/v1/user ', () => {
  it('not found page', async () => {
    const result = await request(urlTest).get('/users')

    expect(result.statusCode).toEqual(302)
  })

  // it('invalid login user', async () => {
  //   const result = await request(urlTest).post('/user/auth/login').send({
  //     username: 'dummyuser',
  //     passwod: 'dummyuser',
  //   })

  //   expect(result.statusCode).toEqual(422)
  //   expect(result.body).toHaveProperty('message')
  // })
})
