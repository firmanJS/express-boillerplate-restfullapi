'use strict'
require('dotenv').config()
process.env.NODE_ENV = 'test'
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = 'http://localhost:2000/api/v1/user/'
const assert = require('chai').assert
chai.should()

chai.use(chaiHttp)

// Our parent block
describe('Users', () => {
  describe('/POST Login user', () => {
    it('it should login user valid user', (done) => {
      const users = {
        username: 'user12',
        password: '123'
      }
      assert.typeOf(users.username, 'string')
      assert.typeOf(users.password, 'string')
      chai.request(server).post('login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(users).then((res) => {
          res.status.should.be.equal(200)
          res.body.should.be.a('object')
          done()
        }).catch(function (err) {
          throw err
        })
    })
  })

  describe('/POST Login user', () => {
    it('it should login user invalid user', (done) => {
      const users = {
        username: 'user',
        password: 'user'
      }
      assert.typeOf(users.username, 'string')
      assert.typeOf(users.password, 'string')
      chai.request(server).post('login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(users).then((res) => {
          res.status.should.be.equal(422)
          res.body.should.be.a('object')
          done()
        }).catch(function (err) {
          throw err
        })
    })
  })
})
