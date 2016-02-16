var mongoose = require('mongoose');
var Folder = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Folder', Folder);
