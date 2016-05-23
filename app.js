var koa = require('koa');
var app = koa();

// x-response-time o
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
}
//logger 99
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms+'ms');
});

// response () ss aa
app.use(function *(){
  //console.log(this);
  //console.log(this.request);
  console.log(this.request.path);
  this.body = 'hello world!';
});

//启动,qidong,sss,sss
///sss test
app.listen(3000);
