function loadMapScenario() {
    var bounds = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(40.730610, -73.935242), new Microsoft.Maps.Location(40.835825, -74.065242));
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AnRbHuqz4P2pzMusE4Xh_nsuuxm3VeURqW8GQu_AfnGZZg2_Ww0pT4SNWATrsKXR',
        maxBounds: bounds
    });
                // Highlighting the border of bounds on the map
    var boundsBorder = new Microsoft.Maps.Polyline([bounds.getNorthwest(),
    new Microsoft.Maps.Location(bounds.getNorthwest().latitude, bounds.getSoutheast().longitude),
    bounds.getSoutheast(),
    new Microsoft.Maps.Location(bounds.getSoutheast().latitude, bounds.getNorthwest().longitude),
    bounds.getNorthwest()], { strokeColor: '#81F781', strokeThickness: 5 });
    map.entities.push(boundsBorder);

    $.ajax({
        url: "http://localhost:3000/business"
    }).then(function(data) {
       console.log(data);
    });
}
