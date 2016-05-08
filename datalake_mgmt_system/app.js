var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./db');
var session = require('client-sessions');
var busboy = require('connect-busboy');



var routes = require('./routes/index');
var login = require('./routes/login');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*Db = mongo.Db;
var db = new Db('test', new Server('localhost', 27017), {safe:false});*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(busboy()); 
app.use(session({
  cookieName: 'session',
  secret: 'key_session_cookie',
  duration: 2 * 60 * 1000,
  activeDuration: 1 * 60 * 1000,
}));

/*app.use(function(req,res,next){
    req.db = db;
    next();
});*/
db.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) {
    console.log('Unable to connect to DB.')
    process.exit(1)
  }

})

app.use('/', routes);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
