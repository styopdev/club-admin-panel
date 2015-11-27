var express  = require('express');
var path     = require('path');
var favicon  = require('serve-favicon');
var logger   = require('morgan');
var session  = require('express-session');
var uuid     = require('node-uuid');
var mongoose = require('mongoose');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

// ROUTES
var routes = require('./routes/index');
var users  = require('./routes/users');
var clubs  = require('./routes/clubs');

var app = express();
var http = require("http");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    genid: function(req) {
        return uuid.v1();
    },
    secret : 'smart words game secret key for session',
    resave :false,
    saveUninitialized :false
}));

app.use('/', routes);
app.use('/users', users);
app.use('/clubs', clubs);

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

var port = process.env.PORT || 8080;
app.listen(port);

mongoose.connect('mongodb://webandweb:webandweb@ds045632.mongolab.com:45632/heroku_gl2x2zpj', function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Connected!!!");
    }
});


//mongoose.connect('mongodb://localhost/smart-words', function(err) {
//    if (err) {
//        throw err;
//    } else {
//        console.log("Connected!!!");
//    }
//});



module.exports = app;