"use strict"
require('../models/bbs.js');
const express = require('express');
const router = express.Router();
const xss = require('xss');

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

/* POST /bbs */
router.post('/', function (req, res, next) {

    let newBBS = new BBS({
        title : req.body.title,
        content: req.body.content
    });


    newBBS.save(function(err) {
        if (err)
            throw err;

        console.log(req.body);

    });

    res.status(200).json({status:"ok", bbs: req.body});

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/auth/login/bbs');
}

module.exports = router;