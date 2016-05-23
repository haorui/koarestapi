'use strict';
var koa = require('koa');
var app = module.exports = koa();

//app.disable('x-powered-by');
//error
app.use(function *(next){
  try{
    yield next;
  }catch(err){
    this.status = err.status || 500;
    this.type = 'html';
    this.body = '<p>something <em>exploded</em> ,please contact r.</p>';
    this.app.emit('error', err,this);
  }
});
//response
app.use(function *(){
  throw new Error('boom oooo');
});
//error handler
app.on('error', function(err){
  if (process.env.NODE_ENV != 'test'){
    console.log('sent error %s to the cloud.', err.message);
    console.log(err);
  }
});

if (!module.parent){
  app.listen(3000);
}
