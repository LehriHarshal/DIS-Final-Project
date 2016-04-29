var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('pages/login', { title: 'Express' });
});

router.get('/search', function(req, res) {
    res.render('pages/search', { title: 'Search' });
});

router.get('/graph', function(req, res) {
    res.render('sample', { title: 'Graph!' });
});
router.get('/extract', function(req, res) {
    res.render('pages/extraction', { title: 'Extraction' });
});
router.get('/login', function(req, res) {
    res.render('pages/login', { title: 'Login' });
});
module.exports = router;
