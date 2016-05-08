var express = require('express');

var router = express.Router();
var fs = require('fs');
var inspect = require('util').inspect;

//...




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

/*router.post('/fileupload', function(req, res) {
	var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/../files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('/extract');
        });
    });
});*/

router.post('/fileupload', function(req, res) {
	
	var fstream;
    req.pipe(req.busboy);
    req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      if(fieldname == 'optradio'){
      	console.log('Access level is: ' + inspect(val));
      }
    });
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/../files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('/extract');
        });
    });

   

});




module.exports = router;
