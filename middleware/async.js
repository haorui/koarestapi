'use strict';

var koa = require('koa');
var cofs = require('co-fs');
var app = koa();

app.use(function* (){
	var paths = yield cofs.readdir('../middleware');
	console.log(paths);
	var files = yield paths.map(function(path){
		return cofs.readFile('../middleware/'+path,'utf8');
	});
	//console.log('files: ' + files);
	this.type = 'markdown';
	this.body = files.join('-----------\n');
});

app.listen(3000);