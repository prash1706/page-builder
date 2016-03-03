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
multipartyMiddleware = multiparty();
// var db = require('./models/db');
var cloudant = require('./models/cloudant');
var db = cloudant.db.use('northstar_page');
var Data = require('./models/data');
var Folder = require('./models/folder');
var domain = require('domain');

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

app.use(function(req, res, next) {
  var reqDomain = domain.create();
  reqDomain.on('error', function(err) {
    fs.appendFile('log.log', Date() + ' | ' + req.originalUrl + ' | ' + JSON.stringify(req.body) + ' | ' + err + '\n', function(err) {
      if (err) console.log(err);
    });
    console.log("Error req:", req.originalUrl, req.body);
    res.status(500).send(err);
  });
  reqDomain.run(next);
});

// create a page
app.post('/page', function(req, res) {
  var space = req.body.space;
  var name = req.body.name;
  var data = req.body.data;
  var file = './app/pages/' + space + '/' + name + '.html';
  var dir = './app/pages/' + space + '/';
  var fn = jade.compileFile('./app/jade/index.jade', {
    pretty: true
  });
  var html = fn(data);
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
  db = cloudant.db.use('northstar_page');
  db.insert(req.body, function(err, body) {
    if (err) {
      console.error(err);
      res.status(401).send(err);
    } else {
      console.log(body);
      res.send(body);
    };
  });
});

// delete a template
app.delete('/templates/:id/:rev', function(req, res) {
  db = cloudant.db.use('northstar_page');
  var id = req.params.id;
  var rev = req.params.rev;
  console.log(req.params);
  db.destroy(id, rev, function(err, body) {
    if (err) {
      console.error(error);
      res.status(401).send(error);
    } else {
      console.log(body);
      res.send(body);
    };
  });
});

// save a template
app.post('/templates/:id', function(req, res) {
  db = cloudant.db.use('northstar_page');
  db.insert(req.body, function(error, data) {
    if (error) {
      console.error(error);
      res.status(401).send(error);
    } else {
      console.log(data);
      res.send(data);
    };
  });
});

// get all templates
app.get('/templates', function(req, res) {
  db = cloudant.db.use('northstar_page');
  db.fetch({}, function(err, body) {
    if (err) {
      console.error(err);
      res.status(401).send(err);
    } else {
      var data = [];
      body.rows.forEach(function(value) {
        if (typeof(value.doc) == 'object') {
          data.push(value.doc);
        }
      });
      res.send(data);
    };
  });
});

// get all folders
app.get('/folder', function(req, res) {
  db = cloudant.db.use('northstar_folder');
  db.fetch({}, function(err, body) {
    if (err) {
      console.error(err);
      res.status(401).send(err);
    } else {
      var data = [];
      body.rows.forEach(function(value) {
        if (typeof(value.doc) == 'object') {
          data.push(value.doc);
        }
      });
      res.send(data);
    };
  });
});

// add one folder
app.post('/folder', function(req, res) {
  db = cloudant.db.use('northstar_folder');
  db.insert(req.body, function(error, data) {
    if (error) {
      console.error(error);
      res.status(401).send(error);
    } else {
      res.send(data);
    }
  });
});


// rename one folder
app.put('/folder/:id', function(req, res) {
  db = cloudant.db.use('northstar_folder');
  console.log(req.body);
  db.insert(req.body, function(error, data) {
    if (error) {
      console.error(error);
      res.status(401).send(error);
    } else {
      console.log(data);
      res.send(data);
    };
  });
});

// delete one folder
app.delete('/folder/:id/:rev', function(req, res) {
  db = cloudant.db.use('northstar_folder');
  var id = req.params.id;
  var rev = req.params.rev;
  console.log(req.params);
  db.destroy(id, rev, function(error, body) {
    if (error) {
      console.error(error);
      res.status(401).send(error);
    } else {
      console.log(body);
      res.send(body);
    };
  });
});



/*
doc = {
  _id:'',
  _rev:'',
  name: '',
  images:[{
    url:'',
    length:''
    },{
    url:'',
    length:''
    }
  ]
};
*/

// get all images
app.get('/image', function(req, res) {
  db = cloudant.db.use('files_space_dev');
  db.fetch({}, function(err, body) {
    if (err) {
      console.error(err);
      res.status(401).send(err);
    } else {
      var data = [];
      body.rows.forEach(function(value) {
        console.log(value);
        if (typeof(value.doc) == 'object') {
          var doc = {
            _id: value.doc._id,
            _rev: value.doc._rev,
            folderId: value.doc.folderId,
            images: []
          };
          for (var key in value.doc._attachments) {
            var image = {
              name: key,
              url: "https://ibmddm.cloudant.com/files_space_dev/" + value.doc._id + "/" + key,
              length: value.doc._attachments[key].length
            };
            doc.images.push(image);
          };
        };
        data.push(doc);
      });
      res.send(data);
    };
  });
});

// upload a image
app.post('/image/upload', multipartyMiddleware, function(req, res) {
  var data = req.body;
  var file = req.files.file;
  console.log('file:', file);
  console.log('data:', data);
  db = cloudant.db.use('files_space_dev');
  fs.readFile(file.path, function(err, imageData) {
    if (data._rev) {
      console.log("Update Images");
      db.attachment.insert(data.projectName, file.name, imageData, file.type, {
        rev: data._rev
      }, function(err, body) {
        if (!err) {
          var image = {
            _id: body.id,
            _rev: body.rev,
            folderId: data.folderId,
            image: {
              name: file.name,
              url: "https://ibmddm.cloudant.com/files_space_dev/" + body.id + "/" + file.name,
              length: file.size
            }
          };
          console.log(image);
          res.send(image);
        } else {
          console.error(err);
          res.status(501).send(err);
        };
      });
    } else {
      console.log("Add A New Image");
      var docData = { _id: data.projectName, folderId: data.folderId };
      db.insert(docData, function(err, docbody) {
        if (err) {
          console.log(err);
          res.status(501).send(err);
        } else {
          console.log(docbody);
          db.attachment.insert(data.projectName, file.name, imageData, file.type, {
            rev: docbody.rev
          }, function(err, body) {
            if (!err) {
              console.log(body);
              var image = {
                _id: docbody.id,
                _rev: docbody.rev,
                folderId: data.folderId,
                images: [{
                  name: file.name,
                  url: "https://ibmddm.cloudant.com/files_space_dev/" + body.id + "/" + file.name,
                  length: file.size
                }]
              };
              console.log(image);
              res.send(image);
            } else {
              console.error(err);
              res.status(501).send(err);
            };
          });
        };
      });
    };
  });
});


// import data to Cloudant
// var importData = function() {
//   fs.readFile('data.json', 'utf-8', function(err, data) {
//     if (err) {
//       console.error(err);
//     } else {
//       var obj = JSON.parse(data);
//       console.log(typeof(obj));
//       for (var i in obj){
//         delete obj[i].__v;
//       };
//       db.bulk({docs:obj}, function(er) {
//         if (er) {
//           throw er;
//         }
//         console.log('Inserted all documents');
//       });
//     };
//   });
// };

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// process.on('uncaughtException', function (err) {
//     console.log(err);
// });

module.exports = app;
