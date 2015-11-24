var express = require('express');
var multer = require('multer');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();


var app = express();
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'app', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

// catch 404 and forward to error handler
app.put('/save', function(req, res) {
  console.log(req.body);
  var file = './app/tmp/setting.json';
  fs.writeFile(file, JSON.stringify(req.body, null, 4), function(err){
    if(err) {
      console.error(err);
    }
    else{
      console.log('New setting saved!');
    };
  })
  res.status(200).send(">>>>>");
});

app.put('/tempsave', function(req, res) {
  console.log(req.body);
  var file = './app/tmp/temp.json';
  fs.writeFile(file, JSON.stringify(req.body, null, 4), function(err){
    if(err) {
      console.error(err);
    }
    else{
      console.log('New temp setting saved!');
    };
  })
  res.status(200).send(">>>>>");
});

app.post('/upload', multipartyMiddleware, function(req, res) {
  // We are able to access req.files.file thanks to
  // the multiparty middleware
  var file = req.files.file;
  console.log(file);
  console.log(file.type);
  var oldPath = file.path;
  var newPath = './app/tmp/setting.json';
  console.log('oldPath:'+ oldPath);
  console.log('newPath:'+ newPath);
  var source = fs.createReadStream(oldPath);
  var dest = fs.createWriteStream(newPath);
  source.pipe(dest);
  res.status(200).send(">>>>>");
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
