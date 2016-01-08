var mongoose = require('mongoose');
var Data = new mongoose.Schema({
  name: String,
  space: String,
  data: {}
});

module.exports = mongoose.model('Data', Data);

