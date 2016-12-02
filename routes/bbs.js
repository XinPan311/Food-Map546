"use strict"
require('../models/bbs.js');
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
// const BBSModel = require('../models/bbs');
require('../config');
const BBS = mongoose.model('BBS');

router.get('/', isLoggedIn, function (req, res, next) {
    BBS.find().then((allBBS) => {
        res.render("index/bbs", {BBSList : allBBS});
        // res.json(allBBS);
    }).catch(err => {
        console.log(err);
    }) ;
});

/* GET /bbs listing*/
// router.get('/api', function (req, res, next) {
//     BBS.find(function (err, bbs) {
//         if (err) return next(err);
//         res.json(bbs);
//     });
// });

/* GET /bbs/title */
// router.get('/api/:title', function (req, res, next) {
//     console.log(typeof req.params.title);
//     BBS.find({'title': req.params.title}, function (err, docs) {
//         res.json(docs);
//     })
// });

// /* GET /bbs/id */
// router.get('/api/:id', function (req, res, next) {
//     BBS.findById(req.params.id, function (err, post) {
//         if (err) return next(err);
//         res.json(post);
//     });
// });

/* POST /bbs */
router.post('/', function (req, res, next) {

    let newBBS = new BBS({
        title : req.body.title,
        content: req.body.content
    });


    newBBS.save(function(err) {
        if (err)
            throw err;

        console.log('BBS created!');

        res.redirect('/bbs');

    });

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/auth/login/bbs');
}

module.exports = router;