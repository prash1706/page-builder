var Cloudant = require('cloudant')
var cloudant = Cloudant("https://ibmddm:Cl0udant@ibmddm.cloudant.com/");

cloudant.db.list(function(err, allDbs) {
  if (err) {
    console.log('Failed to initialize Cloudant: ' + err.message);
  } else {
    console.log('Success to initialize Cloudant');
  };
});

module.exports = cloudant;
