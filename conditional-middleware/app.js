'use strict';

var logger = require('koa-logger');
var koa = require('koa');
var app = module.exports = koa();

// passing any middleware to this middleware
// will make it conditional, and will not be used
// when an asset is requested, illustrating how
// middleware may "wrap" other middleware.
function ignoreAssets(mw){
  return function *(next){
    if (/(\.js|\.css|\.ico)$/.test(this.path)){
      yield next;
    }else{
      yield mw.call(this, next);
    }
  };

}
// TRY:
// $ curl http://localhost:3000/
// $ curl http://localhost:3000/style.css
// $ curl http://localhost:3000/some.html
app.use(ignoreAssets(logger()));

app.use(function *(){
  this.body = 'Hello world';
});

if (!module.parent){
  app.listen(3000);  
}
