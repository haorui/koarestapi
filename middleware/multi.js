'use strict';

var koa = require('koa');
var app = koa();

function* random(next){
	console.log('random init');
	if('/random' === this.path){
		this.body = Math.floor(Math.random() * 10);
		console.log('random');
	}else{
		yield next;
	}
}

function* backwards(next){
	//console.log('back init : ' +this.path);
	if ('/backwards' === this.path){
		this.body = 'backwards';
		console.log('backawrds');
	}else{
		yield next;
	}
}

function* pi(next){
	console.log('pi init');
	if ('/pi' === this.path){
		console.log('pi');
		this.body = String(Math.PI);
	}else{
		yield next;
	}
}

function* all(next){
	yield random.call(this, backwards.call(this, pi.call(this, next)));
}

app.use(all);

app.listen(3000);