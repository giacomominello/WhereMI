var mongoose = require('mongoose');
var passport = require('passport');

var config = require('../config/database');
require('../config/passport')(passport);

var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/User");
var Place = require("../models/Place");
var Clip= require("../models/Clip");

router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});

      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});


router.get('/places', function(req, res) {
    Place.find(function (err, places) {
      if (err) return next(err);
      res.json(places);
    });
});

router.post('/places', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    var newPlace = new Place({
      id: req.body.id,
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    });

    newPlace.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save place failed.'});
      }
      res.json({success: true, msg: 'Successful created new place.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});


getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

router.get('/clips', function(req, res) {
  Clip.find(function (err, clips) {
    if (err) return next(err);
    res.json(clips);
  });
});

router.post('/clips', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    var newClip = new Clip({
      id: req.body.id,
      title: req.body.title,
    });

    newClip.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save clip failed.'});
      }
      res.json({success: true, msg: 'Successful created new clip.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;
