'use strict';

var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Stream Objects', function(){
	it('Get /', function(done){
		request
		.get('/app.js')
		.expect(200, function(err, res){
			if (err) {
				return done(err);
			}
			res.body.should.eql([{
				id:1
			},
			{
				id:2
			}
			]);
			done();
		});
	});
});