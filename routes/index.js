var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Street Life, Saves Lives' });
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

    res.send('User created!');
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

        res.send('User created!');
    });
});


module.exports = router;
