var mongoose = require('mongoose');

// var lead = new mongoose.Schema({
//   headline: String,
//   subhead: String,
//   imgUrl: String,
//   videoUrl: String,
//   cta: String,
//   ctaUrl: String,
// });

// var step = new mongoose.Schema({
//   imgUrl: String,
//   title: String,
//   desc: String,
//   ctaLeadIn: String,
//   cta: String,
//   ctaUrl: String
// });

// var defi = new mongoose.Schema({
//   intro:{
//     subhead: String,
//     column1: String,
//     column2: [{type:String}],
//     ctaLeadIn: String,
//     cta: String,
//     ctaUrl: String,
//   },
//   asset:{
//     subhead: String,
//     body: String,
//     cta: String,
//     ctaUrl: String,
//     imgUrl: String,
//     videoUrl: String,
//   },
//   step:{
//     subhead: String,
//     cta: String,
//     ctaUrl: String,
//     ctaLeadIn: String,
//     step1: step,
//     step2: step,
//     step3: step,
//     step4: step
//   }
// });

// var contact = new mongoose.Schema({
//   phone: String,
//   priority: String
// });

// var setting = new mongoose.Schema({
//   lead: Number,
//   // defi1: {'type': Number, 'substyle': Number},
//   // defi2: {'type': Number, 'substyle': Number},
//   // prom1: {'type': Number, 'substyle': Number},
//   // prom2: {'type': Number, 'substyle': Number},
//   // prom3: {'type': Number, 'substyle': Number}
// });

// var Data = new mongoose.Schema({
//   name: String,
//   data:{
//     lead: lead,
//     defi1: defi,
//     defi2: defi,
//     contact: contact,
//     setting: setting
//   }
// });

var Data = new mongoose.Schema({
  name: String,
  data: {}
});

module.exports = mongoose.model('Data', Data);

