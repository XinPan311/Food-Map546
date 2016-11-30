"use strict"
require('../models/bbs.js');
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
//const BBS = require('../models/bbs.js');
require('../config');
const BBS = mongoose.model('BBS');

router.get( '/', isLoggedIn, function(req, res, next){
  res.render("index/bbs");
});

/* GET /bbs listing*/
router.get( '/api', function(req, res, next){
  BBS.find(function (err, bbs) {
    if (err) return next(err);
    res.json(bbs);
  });
});

/* GET /bbs/title */
router.get('/api/:title', function(req, res, next) {
  console.log(typeof req.params.title);
  BBS.find({'title': req.params.title},function (err, docs) {
    res.json(docs);
  })
});

// /* GET /bbs/id */
router.get('/api/:id', function(req, res, next) {
  BBS.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /bbs */
router.post('/api', function(req, res, next){
  BBS.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
      }

    res.redirect('/auth/login/bbs');
}

module.exports = router;