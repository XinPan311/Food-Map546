/**
 * Created by XIN on 2016/10/27.
 */
"use strict"
const express = require('express');
const router = express.Router();
//mongoose -> dataBase
const mongoose = require('mongoose');
require('../models/yelp');
mongoose.createConnection('mongodb://localhost:27017/yelp');
const Business = mongoose.model('Business');

router.get("/", (req, res) => {
    Business.find().then((allData) => {
        res.json(allData);


    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });

});

module.exports = router;