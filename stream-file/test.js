var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Stream File', function(){
	it('Get /app.js', function(done){
		request
		.get('/app.js')
		.expect('Content-Type', /application\/javascript/)
		.expect(200, done);
	});

	it('Get /test.js', function(done){
		request
		.get('/test.js')
		.expect('Content-Type',/application\/javascript/)
		.expect(200, done);
	});

	it('Get /aass.js', function(done){
		request
		.get('/aass.js')
		.expect(404, done);
	});

	it('Get /', function(done){
		request
		.get('/')
		.expect(404,done);
	});

});

