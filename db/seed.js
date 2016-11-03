//Food Map Database Model
//Contributor: Haotian Huang
"use strict"
const Yelp = require('yelp-api-v3');// npm install yelp-api-v3 --save
require('../models/yelp');
require('../models/bbs.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yelp');  
const Business = mongoose.model('Business');
const BBS = mongoose.model('BBS');
var post = new BBS({title: 'haha', content: 'little star, little star, little star'});
post.save(function(err){
    if(err)
        console.log(err);
    else
        console.log(post);
});
// https://www.yelp.com/developers/documentation/v3
let yelp = new Yelp({
    app_id: '91u3VSKZtIP4wqhR7tREuQ',
    app_secret: 'CIq2EfUXcEZXHQeMIIDJ4fSUU2PSs8UxPK7DIL77qgS48uoR4PYgzXBOm71xDCIC'
});

// https://www.yelp.com/developers/documentation/v3/business_search
/*
major categories: newamerican, tradamerican, argentine, belgian, brazilian, caribbean, chinese, filipino, french, german, indpak
					italian, japanese, korean, latin, malaysian, mexican, mediterranean, portuguese, spanish

Using the offset and limit parameters, you can get up to 1000 businesses from this endpoint if there are more than 1000 results.
If you request a page out of this 1000 business limit, this endpoint will return null.
If there are less than 1000 results and you request a page out of that range but within 1000, you'll get something like this:
{"businesses": [], "total": XXX}
*/

let categories = ['newamerican', 'tradamerican'];
//, 'argentine', 'belgian', 'brazilian', 'caribbean', 'chinese', 'filipino', 'french',
//'german', 'indpak', 'italian', 'japanese', 'korean', 'latin', 'malaysian', 'mexican', 'mediterranean', 'portuguese', 'spanish'
var increment = 0;

for (let k = 0; k < categories.length ; k ++) {
    let category = categories[k];
    console.log(category)
    for (let j = 0; j < 20; j++) {
        // we can only get up to 1000 businesses so limit is set to 50 and iterate the loop 20 times
        yelp.search({term: 'restaurants', categories: category, location: 'New+York', limit: 50, offset: increment}).then(
            (data) => {
                let totalbiz = JSON.parse(data).total;
                console.log(`Total number of restaurants in ${category} is ${totalbiz}`);
                let jsonBussObj = JSON.parse(data).businesses;
                //console.log(data); //Yelp API returns JSON String that could be parsed into JSONObj
                //console.log(typeof jsonBussObj); //An array containing multiple dictionaries
                //console.log(jsonBussObj);
                let len = jsonBussObj.length;
                //console.log(`${j} iteration`);
                //console.log(len);
                //if (len == 0) {break; } //If no more data is available from the API, break the loop and go to next category
                for (let i =0; i < len; i ++) {
                    let bussiObj = jsonBussObj[i];
                    let newBusiness = new Business();
                    newBusiness.id = bussiObj.id;
                    newBusiness.name = bussiObj.name;
                    newBusiness.image_url = bussiObj.image_url;
                    newBusiness.url = bussiObj.url;
                    newBusiness.price = bussiObj.price;
                    newBusiness.phone = bussiObj.phone;
                    newBusiness.rating = bussiObj.rating;
                    newBusiness.review_count = bussiObj.review_count;
                    newBusiness.categories = bussiObj.categories;
                    newBusiness.coordinates = bussiObj.coordinates;
                    newBusiness.location = bussiObj.location;

                    // save this instance
                    newBusiness.save(function(err) {
                        if (err) {
                            return Promise.reject(`Error in saving this instance: Name: ${bussiObj.name}, Category: ${bussiObj.categories}.`);
                        };
                    });
                };

        }).then(() => {
            console.log(`Done saving restaurants of category ${category} to database Yelp.`);
            increment += 50;
        }).catch( (error) => {
            console.log(`Error cateched: ${error}`); //Some problem happens here!!!!!!!!!!!!!!!!!!!!!!!!
        });    
    };
};

//console.log('Done! Please have a check!')