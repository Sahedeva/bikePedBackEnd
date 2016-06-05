var mongoose = require('mongoose');

var flaggedSchema = new mongoose.Schema({
	location: []
});

var Flagged = mongoose.model('Flagged', flaggedSchema);

// Make this available to our other files
module.exports = Flagged;