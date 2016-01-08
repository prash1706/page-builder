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

// create a page
app.post('/page', function(req, res) {
  var space = req.body.space;
  var name = req.body.name;
  var file = './app/pages/' + space + '/' + name + '.html';
  var dir = './app/pages/' + space + '/';
  var fn = jade.compileFile('./app/jade/index.jade', {
    pretty: true
  });
  var html = fn(req.body.data);
  console.log(file);
  fs.exists(dir, function(exist) {
    if (!exist) {
      fs.mkdir(dir, function(err) {
        fs.open(file, "w", function(err, fd) {
          console.log(fd);
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            fs.writeFile(file, html, function(err) {
              if (err) {
                // console.log(err);
              } else {
                console.log('New html created!');
              };
              res.send(html);
            });
          };
        });
      });
    } else {
      fs.open(file, "w", function(err, fd) {
        console.log(fd);
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          fs.writeFile(file, html, function(err) {
            if (err) {
              // console.log(err);
            } else {
              console.log('New html created!');
            };
            res.send(html);
          });
        };
      });
    };
  });
});

// add a template
app.post('/templates', function(req, res) {
  console.log(req.body.space);
  Data.create(req.body, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// delete a template
app.delete('/templates/:id', function(req, res) {
  Data.remove({
    _id: req.params.id
  }, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

// save a template
app.post('/templates/:id', function(req, res) {
  Data.update({
    name: req.body.name
  }, req.body, function(error, data) {
    if (error) {
      res.status(401).send(error);
    } else {
      res.send(data);
    };
  })
});

// get all templates
app.get('/templates', function(req, res) {
  Data.find(function(error, data) {
    if (error) {
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
