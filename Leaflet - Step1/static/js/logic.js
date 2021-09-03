var myMap = L.map("map", {
    center: [36.0544, -112.1401],
    zoom: 5,
});

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(queryUrl).then(function(data) {
    createFeatures(data.features);
  });

function magnitudeColor(depth)  {
    switch (true) {
    case (depth >= 90):
        return "#ff0000";
    case (depth > 70):
        return "#ff8000";
    case (depth > 50):
        return "#ffbf00";
    case (depth > 30):
        return "#ffff00";
    case (depth > 10):
        return "#bfff00";
    case (depth > -10):
        return "#00ff80";
    
    }

}

function styleDetail(features) {
    return {
        weight: 0.4,
        color: "black",
        fillColor: magnitudeColor(features.geometry.coordinates[2]),
        fillOpacity: 0.7,
        radius: (features.properties.mag) *4
    }
}


function createFeatures(earthquakeData) {

    function onEachFeature(features, layer) {
        layer.bindPopup("<h3>" + features.properties.place +
          "</h3><hr><p>" + features.properties.mag + "</p>");
      }
    
    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(features, latlng) {
            return L.circleMarker(latlng);},
        style: styleDetail,
        onEachFeature: onEachFeature
      }).addTo(myMap)
     

      createMap(earthquakes);
    }


function createMap(earthquakes) {

    

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY


}).addTo(myMap);
}

    
      