var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:username', isLoggedIn, function(req, res, next){
  var username = req.params.username;
  User.findOne({'username': username}, function(err, user){
    if(err){
      res.redirect('/')
    }
    res.render('./auth/profile', {user: user});
  });
});

router.get('/accounts/edit', isLoggedIn, function(req, res, next){
  var username = req.user.username;
  User.findOne({'username': username}, function(err, user){
    if(err){
      res.redirect('/')
    }
    res.render('./accounts/edit', {user: user});
  });
});

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
};
