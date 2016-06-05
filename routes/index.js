var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Route = require('../models/route'); 
var Flagged = require('../models/flagged'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Street Life, Saves Lives' });
});

/* GET user Routes */
router.get('/routes', function(req, res, next) {
  Route.find({}, function(err, routes){
    res.json(routes);
  });
});

/* GET user Routes */
router.get('/routes/:name', function(req, res, next) {
  var userid = req.params.name;
  Route.find({userid:userid}, function(err, routes){
    res.json(routes);
  });
});

/* GET map page. */
router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Street Life, Saves Lives' });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Street Life, Saves Lives' });
});

/* GET googleMaps page. */
router.get('/googleMaps', function(req, res, next) {
  res.render('googleMaps', { title: 'Street Life, Saves Lives' });
});

/* POST a route collection, which consists of a userid and list of location points */
router.post('/route', function (req, res, next) {
    var location = JSON.parse(req.body.location)    
    var route = new Route({
      userid: req.body.userid, 
      location: location
    });

    var flagged; 

   location.forEach(function(data) {
    if(typeof data.comment != 'undefined' || data.comment != '' || data.comment != null || data.comment.length != 0) { 
      console.log("Comment found - " + data.comment); 

      flagged = new Flagged({
        location: location
      }); 

      flagged.save(function(err){
        if(err) console.log(err); 

        console.log("Comment saved - " + data.comment); 
      });       
    }
   }); 

    // Save the route
    route.save(function (err) {
        if (err) console.log(err);

        res.send('Map route created!');
        console.log(route); 
    });
});

router.get('/route/:id', function(req, res, next) {
  var id = req.params.id;
  Route.findOne({ _id:req.params.id }, function(err, route) {
    if (err) console.log(err);

    res.json(route);
  });
});

router.post('/test', function(req, res, next) {
	// Create a new user 
	var buddy = new User({
  	name: 'Buddy',
  	email: 'buddy@thenorthpole.com',
  	favorite: 'Smiling'
	});
	// Save the user
  buddy.save(function(err) {
    if (err) console.log(err);
    User.findOne({
        name: 'Buddy'
      }, function(err, user) {
        if (err) console.log(err);
        console.log(user._id);
        res.send(user._id);
      });
  });
});

router.post('/new', function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var favorite = req.body.favorite;     

    var newUser = User({
        name: name,
        email: email,
        favorite: favorite,
    });

    // Save the user
    newUser.save(function(err) {
      if (err) console.log(err);

      User.findOne({
        name: name
      }, function(err, user) {
        if (err) console.log(err);
        console.log(user._id);
        res.send(user._id);
      });
    });
});


module.exports = router;
