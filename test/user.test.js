'use strict'
require('dotenv').config()
process.env.NODE_ENV = 'test'
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = 'http://localhost:2000/api/v1/user/'
const assert = require('chai').assert
chai.should()

chai.use(chaiHttp)

const users = {
  username: 'user',
  password: '123'
}

const methodSame = (users, code, done) => {
  chai.request(server).post('auth/login')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(users).then((res) => {
      res.status.should.be.equal(code)
      res.body.should.be.a('object')
      done()
    }).catch(function (err) {
      throw err
    })
}

// Our parent block
describe('Users', () => {
  describe('/POST Login user', () => {
    it('it should login user valid user', (done) => {
      assert.typeOf(users.username, 'string')
      assert.typeOf(users.password, 'string')
      methodSame(users, 200, done)
    })
  })

  describe('/POST Login user', () => {
    it('it should login user invalid user', (done) => {
      users.username = 'user12'
      users.password = '123'
      assert.typeOf(users.username, 'string')
      assert.typeOf(users.password, 'string')
      methodSame(users, 401, done)
    })
  })
})
