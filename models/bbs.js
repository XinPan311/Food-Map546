/**
 * Created by Chopin on 11/3/16.
 */
// Food Map BBS Model

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining a schema for BBS

var BBSSchema = new mongoose.Schema({
    title: String,
    content: String

});

var BBS = mongoose.model('BBS', BBSSchema);
// Create a model based on the schema
//