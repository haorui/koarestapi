'use strict';

var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Stream View', function(){

	it('GET /', function(done){
		request
		.get('/')
		.expect(200, function(err, res){
			if (err) { return done(err);}

			//res.should.html;
			console.log(res.text);
			res.text.should.include('<title>Hello World!</title>');
			done();
		})
	})
});