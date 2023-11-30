//Please note this server test the base (/)end point on the server and works 100%.
// Please however be sure to stop the server (lsof -i :8080) BEFORE you run the test
// as you'll encounter an 1) Uncaught error outside test suite://Uncaught Error: 
//listen EADDRINUSE: address already in use :::8080, if you try and run the test while the 
// server is running. 

const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const server = require('../server'); // Import the server from your server.js file

describe('Server Functionality', function () {
  it('responds to the base URL with "Welcome, the server is active."', function (done) {
    request(server)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.text).to.equal('Welcome, the server is active.');
        done();
      });

  });
});
