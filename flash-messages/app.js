'use strict';

var koa = require('koa');
var rawBody = require('raw-body');
var sessionoa = require('koa');
var rawBody = require('raw-body');
var session = require('koa-session');

var app = module.exports = koa();
app.keys = ['key1','key2'];
app.use(session(app));

app.use(function *(next){
  console.log('get: '+this.method);
  if (this.method !== 'GET' || this.path !== '/messages'){
    return yield next;
  }

  var messages = this.session.messages || [];
  this.body = messages;

  delete this.session.messages;
});

app.use(function *(next){
  console.log('post: '+this.method);
  if (this.method !== 'POST' || this.path !== '/messages'){
    return yield next;
  }

  var message = yield rawBody(this.req, {encoding:'utf8'});

  this.session.messages = this.session.messages || [];
  this.session.messages.push(message);

  this.status = 204;
});

if (!module.parent){
  app.listen(3000);
}
