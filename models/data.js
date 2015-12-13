var mongoose = require('mongoose');
var Data = new mongoose.Schema({
  name: String,
  data: {}
});

module.exports = mongoose.model('Data', Data);

