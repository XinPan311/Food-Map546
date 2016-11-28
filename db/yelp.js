//Food Map Database Model
//Contributor: Haotian Huang

const Yelp = require("yelp-api-v3");// npm install yelp-api-v3 --save
require("../models/yelp");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/yelp");// Connect to MongoDB
const Business = mongoose.model("Business");

savetodb = (jsonBussObj) => {
    if (jsonBussObj) {
        for (let i =0; i < jsonBussObj.length; i ++) {
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
                    return Promise.reject(`Error in saving Category: ${bussiObj.categories}, Name: ${bussiObj.name}. Error: ${err}`);
                };
            });
        };
    };
};
// https://www.yelp.com/developers/documentation/v3
let yelp = new Yelp({
    app_id: "91u3VSKZtIP4wqhR7tREuQ",
    app_secret: "CIq2EfUXcEZXHQeMIIDJ4fSUU2PSs8UxPK7DIL77qgS48uoR4PYgzXBOm71xDCIC"
});
getrestaurant = (category, increment) => {
    return yelp.search({term: "restaurants", categories: category, location: "new+york", limit: 50, offset: increment}).then(
        (data) => {
            let jsonBussObj = JSON.parse(data).businesses;                
            return jsonBussObj;
        }).catch( (error) => {
        console.log(error);
    });
};
/*
https://www.yelp.com/developers/documentation/v3/business_search
major categories: newamerican, tradamerican, argentine, belgian, brazilian, caribbean, chinese, filipino, french, german, indpak
					italian, japanese, korean, latin, malaysian, mexican, mediterranean, portuguese, spanish

Using the offset and limit parameters, you can get up to 1000 businesses from this endpoint if there are more than 1000 results.
If you request a page out of this 1000 business limit, this endpoint will return null.
If there are less than 1000 results and you request a page out of that range but within 1000, you"ll get something like this:
{"businesses": [], "total": XXX}
*/
/*
let categories = ["newamerican", "tradamerican","chinese","french", "indpak",
"italian", "japanese", "korean", "latin", "mexican", "mediterranean", "spanish"];
let list = [];
for (let i = 0; i < categories.length; i++){
    let increment = 0;
    for (let j = 0; j < 20 ; j++) {
        // we can only get up to 1000 businesses so limit is set to 50 and iterate the loop 20 times
        list.push(getrestaurant(categories[i],increment));
        increment += 50;
    };
};
Promise.all(list).then((bizdata) =>{
    for (let q = 0; q < bizdata.length; q++ ) {
        savetodb(bizdata[q]);
    };
}).then(() => {
    console.log("Done seeding database!");
}).catch((err) => {
    console.log(err);
});
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//After hundereds of millions of test and debug, it seems we can not send too many requests to the API at one
//trial, or it only returns null. And the way that I constructed a couple of for loops to handle this problem
//also failed. I surrendered, decided to give up some restaurant categories and wrote these stupid codes.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
let start = Date.now();

let list1 =[getrestaurant("newamerican",0),getrestaurant("newamerican",50),getrestaurant("newamerican",100),
getrestaurant("newamerican",150),getrestaurant("newamerican",200),getrestaurant("newamerican",250),
getrestaurant("newamerican",300),getrestaurant("newamerican",350),getrestaurant("newamerican",400)];
Promise.all(list1).then((bizdata) =>{
    for (let q = 0; q < bizdata.length; q++ ) {
        savetodb(bizdata[q]);
    };
}).then(() => {
    console.log(`Done 1st seeding database! Time in this seed: ${Date.now() - start}ms`);
}).catch((err) => {
    console.log(err);
});

let list2 =[getrestaurant("tradamerican",0),getrestaurant("tradamerican",50),getrestaurant("tradamerican",100),
getrestaurant("tradamerican",150),getrestaurant("tradamerican",200),getrestaurant("belgian",0),
getrestaurant("brazilian",0),getrestaurant("caribbean",0)];
Promise.all(list2).then((bizdata) =>{
    for (let q = 0; q < bizdata.length; q++ ) {
        savetodb(bizdata[q]);
    };
}).then(() => {
    console.log(`Done 2nd seeding database! Time in this seed: ${Date.now() - start}ms`);
}).catch((err) => {
    console.log(err);
});

let list3 =[getrestaurant("chinese",0),getrestaurant("chinese",50),getrestaurant("chinese",100),
getrestaurant("chinese",150),getrestaurant("chinese",200),getrestaurant("chinese",250),
getrestaurant("chinese",300),getrestaurant("chinese",400),getrestaurant("filipino",0)];
Promise.all(list3).then((bizdata) =>{
    for (let q = 0; q < bizdata.length; q++ ) {
        savetodb(bizdata[q]);
    };
}).then(() => {
    console.log(`Done 3rd seeding database! Time in this seed: ${Date.now() - start}ms`);
}).catch((err) => {
    console.log(err);
});

let list4 =[getrestaurant("french",0),getrestaurant("french",50),getrestaurant("french",100),
getrestaurant("german",0),getrestaurant("indpak",0),getrestaurant("indpak",50),
getrestaurant("korean",0),getrestaurant("latin",0),getrestaurant("malaysian",0)];
Promise.all(list4).then((bizdata) =>{
    for (let q = 0; q < bizdata.length; q++ ) {
        savetodb(bizdata[q]);
    };
}).then(() => {
    console.log(`Done 5th seeding database! Time in this seed: ${Date.now() - start}ms`);
}).catch((err) => {
    console.log(err);
});

let list5 =[getrestaurant("italian",0),getrestaurant("italian",50),getrestaurant("italian",100),
getrestaurant("italian",150),getrestaurant("italian",200),getrestaurant("italian",250),
getrestaurant("italian",300),getrestaurant("italian",350),getrestaurant("spanish",0)];
Promise.all(list5).then((bizdata) =>{
    for (let q = 0; q < bizdata.length; q++ ) {
        savetodb(bizdata[q]);
    };
}).then(() => {
    console.log(`Done 5th seeding database! Time in this seed: ${Date.now() - start}ms`);
}).catch((err) => {
    console.log(err);
});

let list6 =[getrestaurant("japanese",0),getrestaurant("japanese",50),getrestaurant("japanese",100),
getrestaurant("japanese",150),getrestaurant("japanese",200),getrestaurant("japanese",250),
getrestaurant("mediterranean",0),getrestaurant("mediterranean",50),getrestaurant("mediterranean",100)];
Promise.all(list6).then((bizdata) =>{
    for (let q = 0; q < bizdata.length; q++ ) {
        savetodb(bizdata[q]);
    };
}).then(() => {
    console.log(`Done 6th seeding database! Time in this seed: ${Date.now() - start}ms`);
}).catch((err) => {
    console.log(err);
});

let list7 =[getrestaurant("mexican",0),getrestaurant("mexican",50),getrestaurant("mexican",100),
getrestaurant("mexican",150),getrestaurant("mexican",200)];
Promise.all(list7).then((bizdata) =>{
    for (let q = 0; q < bizdata.length; q++ ) {
        savetodb(bizdata[q]);
    };
}).then(() => {
    console.log(`Done 7th seeding database! Time in this seed: ${Date.now() - start}ms`);
}).catch((err) => {
    console.log(err);
});
