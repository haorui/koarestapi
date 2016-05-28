'use strict';

var views = require('co-views');
var koa = require('koa');
var app = module.exports = koa();

//set views, appending .ejs
//when no extname is given to render()
var render = views(__dirname + '/views', {
  map:{html:'swig'}
});

//dummy data
var user = {
	name: {
		first: 'Tobi',
		last: 'Holowaychuk'
	},
	species: 'ferret',
	age: 3
};

//render
app.use(function* (){
	this.body = yield render('user', {user: user});
});

if (!module.parent){
	app.listen(3000);
}