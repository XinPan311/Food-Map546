
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'GHSyOEKbD15C3SbWZWUcFg',
  consumer_secret: 'uubKB0-iZ1o4nLmd0VsWT-ne0gA',
  token: 'pMyS-2TrcguehKitycvmqNmj8MVqJ7rE',
  token_secret: 'i93NwnIwtcpTj1Hv0_-TH-a0PKQ'
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});

// See http://www.yelp.com/developers/documentation/v2/business
yelp.business('yelp-san-francisco')
  .then(console.log)
  .catch(console.error);

yelp.phoneSearch({ phone: '+15555555555' })
  .then(console.log)
  .catch(console.error);

// A callback based API is also available:
yelp.business('yelp-san-francisco', function(err, data) {
  if (err) return console.log(error);
  console.log(data);
});

