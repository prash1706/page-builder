var mongoose = require('mongoose');
var topFolder = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('topFolder', topFolder);
