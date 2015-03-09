'use strict';

process.env.MONGO_URI = 'mongodb://localhost/transform_test';
require('../../server.js');

var mongoose = require ('mongoose'),
    chai = require ('chai'),
    chaihttp = require ('chai-http'),
    expect = chai.expect;

chai.use(chaihttp);

describe('transformers api end points', function() {
  var id;
  beforeEach(function(done) {
    chai.request('localhost:3000/api/v1')
      .post('/autobots')
      .send({autobotName: 'Test Bot'})
      .end(function (err, res) {
        id = res.body._id;
        done();
      });
  });
  it('should respond to a post request', function (done) {
    chai.request('localhost:3000/api/v1')
      .post('/autobots')
      .send({autobotName: 'Le Test Bot'})
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
      .send({autobotName: 'Le New Test'})
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.body.autobotName).eql('Le New Test');
        done();
      });
  });
  it('should have an index', function (done) {
    chai.request('localhost:3000/api/v1')
      .get('/autobots')
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.body[0]).to.have.property('autobotName');
        done();
      });
  });
  it('should be deleting an autobot', function (done) {
    chai.request('localhost:3000/api/v1')
      .delete('/autobots/' + id)
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.body).eql({});
        done();
      });
  });
  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      done();
    });
  });
});