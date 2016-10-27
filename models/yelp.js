//Food Map Database Model
//Contributor: Haotian Huang

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining a schema for Business
let businessSchema = new mongoose.Schema({
    id : String,
    name : String,
    image_url : String,
    url : String,
    price : String,
    phone : String,
    rating : Number,
    review_count : Number,
    categories : Object,
    coordinates : Object,
    location : Object,
});

 mongoose.model('Business', businessSchema);
