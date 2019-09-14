var express = require('express');
var path = require('path');

var logger = require('morgan');
var bodyParser = require('body-parser');
const Youtube = require("youtube-api");
var mongodb = require('mongodb');
require("./config/dbconnection.js").open();

var passport = require('passport');
var config = require('./config/database');

var api = require('./routes/api');
var app = express();

console.log(config.database);



app.use(passport.initialize());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;