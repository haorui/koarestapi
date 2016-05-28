'use strict';

var koa = require('koa');
var app = koa();

//x-response-time
app.use(function* responseTime(next){
	console.log('----------start-----------');
	console.log('responseTime 1');
	var date = new Date();
	yield next;
	console.log('responseTime 8');
	console.log('--------end------------')
	var ms = new Date() - date;
	this.set('X-Response-Time', 'ms: '+ ms);
});

//logger
function logger(format){

	format = format || ':method ":url"';
	console.log('logger init!');
	return function* logger(next){

		console.log('logger 3');	
		var str = format
			.replace(':method', this.method)
			.replace(':url', this.url);
		console.log(str);
		yield next;
	};
}

//content-lenth
app.use(function* contentLength(next){
	console.log('contentLength 3');
	yield next;
	console.log('contentLength 6');
	if (!this.body) {
		console.log('---------contentLength end--------');
		return;
	}
	this.set('Content-length', this.body.length);
});

//body
app.use(function* body(next){
	console.log('body 4');
	yield next;
	console.log('body 5');
	if (this.path !== '/'){ 
		console.log('---------body end--------');
		return ;
	}
	this.body = 'Hello World!';
});

app.use(logger());
app.listen(3000);





