"use strict"
const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');

router.get("/login/:login", (req, res) => {
    if (req.params.login == 'login' || req.params.login == 'map' || req.params.login == 'bbs')
        res.render('login/login', { message: req.flash('loginMessage'), param: req.params.login });
});

router.get("/signup", (req, res) => {
    res.render('login/signup', { message: req.flash('signupMessage')});
});

router.post('/login/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/auth/login/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.post('/login/map', passport.authenticate('local-login', {
    successRedirect: '/maps', // redirect to the secure profile section
    failureRedirect: '/auth/login/map', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.post('/login/bbs', passport.authenticate('local-login', {
    successRedirect: '/bbs', // redirect to the secure profile section
    failureRedirect: '/auth/login/bbs', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/auth/login/login', // redirect to the secure profile section
    failureRedirect: '/auth/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;