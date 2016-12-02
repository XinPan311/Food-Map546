function loadMapScenario() {
    var bounds = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(40.730610, -73.935242), new Microsoft.Maps.Location(40.925825, -74.065242));
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AnRbHuqz4P2pzMusE4Xh_nsuuxm3VeURqW8GQu_AfnGZZg2_Ww0pT4SNWATrsKXR',
        maxBounds: bounds
    });
    // Highlighting the border of bounds on the map
    var boundsBorder = new Microsoft.Maps.Polyline([bounds.getNorthwest(),
        new Microsoft.Maps.Location(bounds.getNorthwest().latitude, bounds.getSoutheast().longitude),
        bounds.getSoutheast(),
        new Microsoft.Maps.Location(bounds.getSoutheast().latitude, bounds.getNorthwest().longitude),
        bounds.getNorthwest()], {strokeColor: '#81F781', strokeThickness: 1});
    map.entities.push(boundsBorder);

    $.ajax({
        url: "http://localhost:3000/business"
    }).then(function (data) {
        console.log(data);
        var pushpins = [];

        for (var i = 0; i < data.length; i++) {
            var longitude = data[i].coordinates.longitude;
            var latitude = data[i].coordinates.latitude;
            var name = data[i].name;

            if (!longitude || !latitude) {
                continue;
            }

            if (isNaN(longitude) || isNaN(latitude)) {
                continue;
            }

            if ((longitude > -180 || longitude > 180) && (latitude < -90 || latitude > 90)) {
                continue;
            }

            var center = map.getCenter();
            var location = new Microsoft.Maps.Location(latitude, longitude)
            var pushpin = new Microsoft.Maps.Pushpin(location, {icon: "public/assets/label.jpg"});
            pushpins.push(pushpin);
        }

        var infobox = new Microsoft.Maps.Infobox(pushpins[0].getLocation(), {visible: false});
        infobox.setMap(map);
        for (var i = 0; i < pushpins.length; i++) {
            var pushpin = pushpins[i];
            var name = data[i].name;
            var category = 'category: ';

            for (let j = 0; j < data[i].categories.length; j++) {
                category += data[i].categories[j].title + '\n';
            }

            var phone = 'phone: ' + data[i].phone + '\n';
            var price = 'price: ' + data[i].price + '\n';
            var rating = 'rating: ' + data[i].rating + '\n';
            var link = 'link: ' + '<a href="' + data[i].url + '" >' + data[i].url + '</a>';
            var share = 'Share this restaurant with others? ' +
                '<a href="' + '/bbs' + '" >' + "Share this restaurant..." + '</a>';

            description = "<ul>" +
                "<li>" + category + "</li>" +
                "<li>" + phone + "</li>" +
                "<li>" + price + "</li>" +
                "<li>" + rating + "</li>" +
                "<li>" + link + "</li>" +
                "<li>" + share + "</li>" +
                "</ul>";

            //Store some metadata with the pushpin
            pushpin.metadata = {
                title: name,
                description: description
            };
            Microsoft.Maps.Events.addHandler(pushpin, 'click', function (args) {
                infobox.setOptions({
                    location: args.target.getLocation(),
                    title: args.target.metadata.title,
                    description: args.target.metadata.description,
                    visible: true
                });
            });
        }
        map.entities.push(pushpins);

    });
}
