"use strict";

var os = require('os');
var path = require('path');
var koa = require('koa');
var fs = require('co-fs');
var parse = require('co-busboy');
var saveTo = require('save-to');

var app = module.exports = koa();

app.use(function *() {


  //parse the multipart body
  var parts = parse(this, {
    autoFileds: true
  });
  //console.log(parts);
  //create a temporary folder to store files
  var tmpdir = path.join(os.tmpdir(), uid());
  //console.log(tmpdir);
  //make the temporary directory
  yield fs.mkdir(tmpdir);
  //list of all the files
  var files = [];
  var file;

  //yield each part as a stream
  var part;
  while (part = yield parts) {
    console.log(part.file_name_0);
    console.log(part.filename);
    //filename for this part
    //console.log(path);
    files.push(file = path.join(tmpdir, part.filename));
    //save the file
    yield saveTo(part, file);
  }

  //return all the filenames as an array
  //after all the files have finished downloading
  this.body = files;
});

if (!module.parent) {
  app.listen(3000);
}

function uid() {
  return Math.random().toString(36).slice(2);
}