"use strict"
const express = require('express');
const router = express.Router();

router.get("/", isLoggedIn, (req, res) => {
   res.render('map/map');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
      }

    res.redirect('/auth/login/map');
}

module.exports = router;