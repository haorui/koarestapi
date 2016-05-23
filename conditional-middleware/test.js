'use strict';

var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Conditional middleware', function(){

  describe('in',function(){
      it ('ignore js logger', function(done){
        request
        .get('/')
        .expect(200,done);
      });
  });

});
