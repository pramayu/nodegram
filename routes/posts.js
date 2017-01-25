var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var Post = require('../models/post');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/posts_original');
  },
  filename: function (req, file, cb) {
    cb(null, 'original-' + Date.now());
  }
});
var upload = multer({ storage: storage }).single('photo');

// router

router.post('/upload', upload, function(req, res, next){
  var post = new Post();
  if(req.file){
    var filename = req.file.fieldname + '-' + Date.now() + '.png';
    var original = req.file.filename;
    gm(req.file.path)
    .resize(293, 293, '^')
    .gravity('Center')
    .extent(293,293)
    .noProfile()
    .write('./public/uploads/posts_thumb/' + filename, function(err){
      if(!err) console.log('done');
    });
  }
  post.photo = filename;
  post.original = original;
  post.location = req.body.location;
  post.caption = req.body.caption;
  post.user = req.user._id;
  post.save(function(err){
    if(!err){
      res.redirect('/'+req.user.username);
      Post.find({})
          .populate('user')
          .exec(function(error, posts) {
              console.log(JSON.stringify(posts, null, "\t"))
          });
    };
  });
});

module.exports = router;
