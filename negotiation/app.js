'use strict';

var koa = require('koa');
var app = module.exports = koa();

var tobi = {
	_id:'123',
	name: 'tobi',
	species: 'ferret'
};

var loki = {
	_id: '321',
	name: 'loki',
	species: 'ferret'
};

var users = {
	tobi: tobi,
	loki: loki
};

app.use(function *(next){
	console.log('1');
	yield next;
	console.log('5');

	if (!this.body) {return;}

	var type = this.accepts('json','html','xml','text')	;
	//console.log('1 type: ' + type);
	if (type === false) {this.throw(406);}

	if (type === 'json'){ return ;}

	if (type === 'xml'){
		this.type = "xml";
		this.body = '<name>' + this.body.name + '</name>';
		return;
	}
	if (type === 'html'){
		this.type = 'html';
		this.body = '<h1>' + this.body.name + '</h1>';
		return;
	}

	this.type = 'text';
	this.body = this.body.name;
});

app.use(function *(next){
	console.log('2 ');
	yield next;
	console.log('4');

	if (!this.body){ return ; }
	console.log('_id : ' + this.body._id);	
	delete this.body._id;
});

app.use(function *(){
	console.log('3 ', this.path);
	var name = this.path.slice(1);
	var user = users[name];
	this.body = user;
	console.log('3 ' , users);
});

if (!module.parent){
	app.listen(3000);
}