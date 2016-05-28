'use strict';

var koa = require('koa');
var app = koa();

app.use(function* (next){
	console.log('>> one');
	yield next;
	console.log('<< one');
});

app.use(function* (next){
	console.log('>> two');
	this.body = 'two';
	yield next;
	console.log('<< two');
});

app.use(function* (next){
	console.log('>> three');
	yield next;
	console.log('<< three');
});

app.listen(3000);