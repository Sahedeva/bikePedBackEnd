var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Route = require('../models/route'); 
var Flagged = require('../models/flagged'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Street Life, Saves Lives' });
});

/* GET seed page. */
router.get('/seed', function(req, res, next) {
  res.render('seed', { title: 'Street Life, Saves Lives' });
});

/* GET user Routes */
router.get('/routes', function(req, res, next) {
  Route.find({}, function(err, routes){
    res.json(routes);
  });
});

/* GET flagged Routes */
router.get('/problemRoutes', function(req, res, next) {
  Flagged.find({}, function(err, routes){
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

/* POST seed data for flagged database */
router.post('/seedFlags', function (req, res, next) {
  var problemFlags = [
    {
      "comment": "Bad lighting",
      "longitude": -97.75619409987493,
      "latitude": 30.22982723082437
    },
    {
      "comment": "Construction",
      "longitude": -97.75469767870172,
      "latitude": 30.22905521563275
    },
    { 
      "comment": "Pothole",
      "longitude": -97.75709766903682,
      "latitude": 30.23074982690646
    },
    {
      "comment": "Needs stop sign",
      "longitude": -97.7569041308926,
      "latitude": 30.23111175748541
    }
  ];
  for(var i = 0;i<4;i++){
    var flagged = new Flagged({
          location: problemFlags[i]
        });

    flagged.save(function(err){
      if(err) console.log(err); 

      console.log("Flag seeded"); 
    });
  }
  res.json("Flag seeded");
});        

/* POST a route collection, which consists of a userid and list of location points */
router.post('/route', function (req, res, next) {
    var location = req.body.location;   
    var route = new Route({
      userid: req.body.userid, 
      location: location
    });

    var flagged; 

   location.forEach(function(data) {
    if(data.comment !== undefined && data.comment.length != 0) { 
      console.log("Comment found - " + data.comment); 

      flagged = new Flagged({
        location: data
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
