var express = require('express');
var multer = require('multer');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var jade = require('jade');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var db = require('./models/db');
var Data = require('./models/data');

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

app.post('/page', function(req, res) {
  console.info('setting', req.body);
  var file = './app/tmp/test.html';
  var fn = jade.compileFile('./app/tmp/jade/index.jade', {
    pretty: true
  });
  var html = fn(req.body);

  fs.writeFile(file, html, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('New html created!');
      console.log(req.body.disc.resource);
    };
    res.send(html);
  })
});

app.put('/save', function(req, res) {
  console.log(req.body);
  Data.update({name:req.body.name}, req.body, function(error, data){
    if (error) {
      console.error(error);
      res.status(401).send(error);
    } else {
      res.send(data);
    };
  })
});

app.get('/get', function(req, res) {
  Data.find(function(error, data) {
    if (error) {
      console.error(error);
      res.status(401).send(error);
    } else {
      res.send(data);
    };
  });
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
