'use strict';

var compose = require('koa-compose');
var koa = require('koa');
var app = module.exports = koa();

//x-response-time
function *responseTime(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
}

//logger
function *logger(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  if ('test' != process.env.NODE_ENV){
    console.log('%s %s - %s', this.method, this.url, ms+'ms');
  }
}
//response
function *respond(next){
  yield next;
  if('/' != this.url){
    return;
  }
  this.body = 'Hello World!';
}

//composed middleware
var all = compose([
  responseTime,
  logger,
  respond
]);
app.use(all);

if (!module.parent){
  app.listen(3000);
}
