'use strict';

process.env.MONGO_URI = 'mongodb://localhost/autobot_test';
require('../server.js');

var mongoose = require ('mongoose'),
    chai = require ('chai'),
    chaihttp = require ('chai-http'),
    expect = chai.expect;

chai.use(chaihttp);

describe('transformers api end points', function() {
  var id,
      token;
  beforeEach(function(done) {
    chai.request('localhost:3000/api/v1')
      .get('/sign_in')
      .auth('bumblebee@example.com', 'transform')
      .end(function (err, res) {
        token = res.body.eat;
        chai.request('localhost:3000/api/v1')
          .post('/autobots')
          .send({eat: token, autobotName: 'Le Test'})
          .end(function (err, res) {
            id = res.body._id;
            done();
          });
      });
  });
  it('should respond to a post request', function (done) {
    chai.request('localhost:3000/api/v1')
      .post('/autobots')
      .send({eat: token, autobotName: 'Le Test Bot'})
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.body.autobotName).eql('Le Test Bot');
        expect(res.body).to.have.property('_id');
        done();
      });
  });
  it('should be able to update an autobot', function (done) {
    chai.request('localhost:3000/api/v1')
      .put('/autobots/' + id)
      .send({eat: token, autobotName: 'Le New Test'})
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.body.autobotName).eql('Le New Test');
        done();
      });
  });
  it('should have an index', function (done) {
    chai.request('localhost:3000/api/v1')
      .get('/autobots')
      .send({eat: token})
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.body[0]).to.have.property('Name');
        done();
      });
  });
  it('should be deleting an autobot', function (done) {
    chai.request('localhost:3000/api/v1')
      .delete('/autobots/' + id)
      .send({eat: token})
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.body).eql({'msg': 'deleted files'});
        done();
      });
  });
  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      done();
    });
  });
});