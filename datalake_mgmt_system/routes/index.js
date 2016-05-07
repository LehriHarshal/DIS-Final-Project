var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  	res.redirect('/search');
});

router.get('/search', function(req, res) {
	if(!req.session.username){
		res.render('pages/search', { title: 'Search', loggedin: 'false' });
	}
	else{
		res.render('pages/search', { title: 'Search', loggedin: 'true' });
	}
    
});

router.get('/extract', function(req, res) {
	if(!req.session.username){
		res.render('pages/extraction', { title: 'Extraction', loggedin: 'false' });
	}
	else{
		res.render('pages/extraction', { title: 'Extraction', loggedin: 'true' });
	}
});

router.get('/graph', function(req, res) {
	if(!req.session.username){
		res.render('pages/graph', { title: 'Graph', loggedin: 'false' });
	}
	else{
		res.render('pages/graph', { title: 'Graph', loggedin: 'true' });
	}
});

router.get('/logout', function(req, res) {
	req.session.reset();
    res.redirect('/login');
});


module.exports = router;
