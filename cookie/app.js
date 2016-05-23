'use strict';

var koa = require('koa');
var app = module.exports = koa();

app.use(function *(){
  var n = ~~this.cookies.get('view')+1;
  this.cookies.set('view', n);
  this.body = n + ' views';
});

if (!module.parent){
  app.listen(3000);
}
