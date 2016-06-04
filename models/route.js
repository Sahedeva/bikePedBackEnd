var mongoose = require('mongoose');

var routeSchema = new mongoose.Schema({
	userid: String,
	location: []
});

var Route = mongoose.model('Route', routeSchema);

// Make this available to our other files
module.exports = Route;