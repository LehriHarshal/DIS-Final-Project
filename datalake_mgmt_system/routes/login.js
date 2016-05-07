var express = require('express');
var router = express.Router();
var db = require('../db')
var bcrypt = require('bcrypt-nodejs')


router.post('/dologin', function(req, res) {
    console.log('Username: ' + req.body.username);
	console.log('Password: ' + req.body.password);
	var collection = db.get().collection('usercollection');
	collection.findOne({username: req.body.username}, function(err, document) {
		console.log("Inside");
		if(document!=null){
  		     if(bcrypt.compareSync(req.body.password, document.password)){
  		     	req.session.username = req.body.username;
        		res.redirect('/search');
  		     }
  		     else{
  		     	res.render('pages/login', { title: 'Login', message: 'Incorrect password!', loggedin: 'false'});
  		     }
  		}
  		else{
  			res.render('pages/login', { title: 'Login', message: 'No user by the username ' + req.body.username + ' exits!' , loggedin: 'false'});
  		}
	});
});

router.post('/doregister', function(req, res) {
    var collection = db.get().collection('usercollection');
    
	collection.findOne({username: req.body.username}, function(err, document) {
		if(document!=null){
  		     res.render('pages/login', { title: 'Login', message: req.body.username + ' already exists !' ,loggedin: 'false'});
  		}
  		else{
  			var hash = bcrypt.hashSync(req.body.password);
  			collection.insertOne({username:req.body.username, email: req.body.email, password: hash}, function(err, r) {
		    res.render('pages/login', { title: 'Login', message: 'Please login with your new credentials', loggedin: 'false' });
		  });
  		}
	});
    /*console.log('Username: ' + req.body.username);
	console.log('Password: ' + req.body.password);
	console.log('Email: ' + req.body.email);
	console.log('Confirm-password: ' + req.body.confirm_password);*/
});

router.get('/', function(req, res) {
	if(!req.session.username){
		res.render('pages/login', { title: 'Login', loggedin: 'false', message: '' });
	}
	else{
		res.render('pages/login', { title: 'Login', loggedin: 'true', message: '' });
	}
    
});
module.exports = router;
