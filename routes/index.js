var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var User = require('../models/user');
var Post = require('../models/post');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage: storage }).single('profile');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:username', function(req, res, next){
  var username = req.params.username;
  User.findOne({'username': username}, function(err, user){
    if(err){
      res.redirect('/');
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

router.post('/accounts/edit', upload, function(req, res, next){
  var username = req.user.username;
  if(req.file){
    var filename = req.file.fieldname + '-' + Date.now() + '.png';
    gm(req.file.path)
    .resize(152, 152, '^')
    .gravity('Center')
    .extent(152,152)
    .noProfile()
    .write('./public/uploads/profile/' + filename, function(err){
      if(!err) console.log('done');
    });
  }
  User.findOne({'username': username}, function(err, user){
    if(err){
      res.status(500).send();
    } else {
      if(!user){
        res.status(404).send();
      } else {
        if(req.body.fullname){
          user.fullname = req.body.fullname;
        }
        if(req.body.username){
          user.username = req.body.username;
        }
        if(req.body.website){
          user.website = req.body.website;
        }
        if(req.body.bio){
          user.bio = req.body.bio;
        }
        if(req.body.phone){
          user.phone = req.body.phone;
        }
        if(req.body.gender){
          user.gender = req.body.gender;
        }
        if(req.body.phone){
          user.phone = req.body.phone;
        }
        // tambahan
        if(req.file){
          user.profile = filename;
        }
        user.save(function(err, updateUser){
          if(err){
            res.status(500).send();
          } else {
            res.redirect(`/${username}`);
          }
        });
      }
    }
  });
});

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
};
