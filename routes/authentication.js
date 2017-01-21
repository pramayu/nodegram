var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next){
  res.render('auth/login', { layout: 'auth'});
});

router.get('/signup', function(req, res, next){
	res.render('./auth/signup', { layout: 'auth'});
});


module.exports = router;
