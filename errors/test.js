'use strict';

var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Errors', function(){

  it('should catch the error', function(done){
    request
    .get('/')
    .expect(500)
    .expect('Content-type',/text\/html/,done);
  });

  it('should emit the error on app', function(done){
    app.once('error', function(err, ctx){
      err.message.equal('boom oooo');
      ctx.should.be.ok;
      done();
    });
    request
    .get('/')
    .end(function(){});
  });

});
