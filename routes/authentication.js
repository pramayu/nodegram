var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/login', function(req, res, next){
  res.render('auth/login', { layout: 'auth'});
});

router.get('/signup', function(req, res, next){
	var messages = req.flash('error');
	res.render('./auth/signup', { layout: 'auth', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/users/profile',
	failureRedirect: '/users/signup',
	failureFlash: true
}));

router.get('/profile', function(req, res, next){
	res.render('./auth/profile');
});


module.exports = router;
