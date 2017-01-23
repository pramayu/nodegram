var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next){
	res.render('./auth/profile');
});

router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/users/login');
});

router.use('/users/login', notLoggedIn, function(req, res, next){
  next();
});

router.get('/login', function(req, res, next){
  var messages = req.flash('error');
  res.render('auth/login', { layout: 'auth', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/login', passport.authenticate('local.login', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}));

router.get('/signup', function(req, res, next){
	var messages = req.flash('error');
	res.render('./auth/signup', { layout: 'auth', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/',
	failureRedirect: '/users/signup',
	failureFlash: true
}));


module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
};

function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
};
