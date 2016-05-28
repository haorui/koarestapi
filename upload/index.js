'use strict';

var logger =  require('koa-logger');
var serve = require('koa-static');
var parse = require('co-busboy');
var koa = require('koa');
var fs = require('fs');
var app = koa();

var os = require('os');
var path = require('path');

//log requests
app.use(logger());

//custom 404
app.use(function* (next){
	yield next;
	if(this.body || !this.idempotent) {return;}
	this.redirect('/404.html');
});

//serve files from ./public
app.use(serve(__dirname + '/public'));

//handle uploads
app.use(function* (next){
	//ignore non-posts
	if('POST'  != this.method){ return yield next;}

	//multipart upload
	var parts = parse(this);
	var part;

	while(part = yield parts){
		var stream = fs.createWriteStream(path.join(os.tmpDir(), Math.random().toString()));
		part.pipe(stream);
		console.log('upload %s -> %s', part.filename, stream.path);
	}

	this.redirect('/');
});

//listen
app.listen(3000);
console.log('listening on port 3000');