var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var clubs = require('./routes/clubs');
var users = require('./routes/users');

var mongoose = require("mongoose");

var app = express();
var session  = require('express-session');
var uuid = require("uuid");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    genid: function(req) {
        return uuid.v1();
    },
    secret : 'club admin secret key for session',
    resave :false,
    saveUninitialized :false
}));

app.use('/clubs', clubs);
app.use('/users', users);

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


mongoose.connect('mongodb://heroku_c1ltfq3k:heroku_c1ltfq3k@ds059524.mongolab.com:45632/heroku_c1ltfq3k');

app.listen(process.env.PORT || 3000);

module.exports = app;