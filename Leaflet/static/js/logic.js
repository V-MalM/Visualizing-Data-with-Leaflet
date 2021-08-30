// Store our API endpoint as queryUrl.
// getting all_week eartquake info
var eartquakequeryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(eartquakequeryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  // console.log(data)
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a functions that we want to run once for each feature in the features array.

  // Give each feature a popup that describes the place and time of the earthquake.
function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
    <p>${new Date(feature.properties.time)}</p>
    <p>M${feature.properties.mag}, Depth: ${feature.geometry.coordinates[2]} KM</p>`);  
  }

  //Create a circle marker for each feature with magnitude and depth defined radius and color.
  function pointToLayer(feature, latlng) {
    depth = feature.geometry.coordinates[2]
    var mag_color = "#9dff00"
      if (depth >= -10 & depth <10)  
      { mag_color = "#9dff00"}
      else if (depth >= 10 & depth <30)  
      { mag_color = "#ecec11"}
      else if (depth >= 30 & depth <50)  
      { mag_color = "#ffb300"}
      else if (depth >= 50 & depth <70)  
      { mag_color = "#ff7d03"}
      else if (depth >= 70 & depth <90)  
      { mag_color = "#df4b2d"}
      else 
      { mag_color = "#f80404"}

    return  L.circle(latlng, {
      color : 'gray',
      opacity: 0.8,
      weight:1,
      radius: (feature.properties.mag) * 40000, 
      fillColor : mag_color,
      fillOpacity: 0.85
    });
  }


  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature and pointToLayer function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);

}

function createMap(earthquakes) {

  // Create the base layers.
  // var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  var Grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/light-v10',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: token
  });

  var Satellite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/satellite-v9', //mapbox://styles/mapbox/satellite-v9
      tileSize: 512,
      zoomOffset: -1,
      accessToken: token
  });

  var Outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/outdoors-v11', //mapbox://styles/mapbox/outdoors-v11
      tileSize: 512,
      zoomOffset: -1,
      accessToken: token
  });

  // var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  //   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  // });

  // Create the tectonicplates layer
  var tectonicplates = new L.LayerGroup();

  var tectonicplatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
  d3.json(tectonicplatesURL).then(function (techdata) {
    // Once we get a response, send the data.features object to the createFeatures function.
    L.geoJSON(techdata,{
      weight: 2,
      color: "orange",
      fillopacity: 0
    }).addTo(tectonicplates)
  });


  // Create a baseMaps object.
  var baseMaps = {
    "Satellite" : Satellite,
    "Grayscale": Grayscale,
    "Outdoors": Outdoors  
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    "Tectonic Plates" : tectonicplates,
    "Earthquakes": earthquakes
  };

  // Create our map, giving it the Grayscale and earthquakes layers to display on load. 
  var myMap = L.map("map", {
    center: [
      47.09, -95.71
    ],
    zoom: 3,
    layers: [Grayscale, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


  function chooseColor(depth) {
    return depth >= 90 ? "#f80404" :
    depth >= 70 & depth < 90? "#df4b2d" :
    depth >= 50 & depth < 70 ? "#ff7d03" :
    depth >= 30 & depth < 50 ? "#ffb300" :
    depth >= 10 & depth < 30 ? "#ecec11" :
    depth >= -10 & depth < 10 ? "#9dff00" :
    "#9dff00"; // <= 1 default
  }
  
  
  var legend = L.control({position: "bottomright"});
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];
    div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"
    for (var i =0; i < depth.length; i++) {
      div.innerHTML += 
      '<i style="background:' + chooseColor(depth[i]) + '">&nbsp;&nbsp;&nbsp;&nbsp;</i>&nbsp;' +
          depth[i] + (depth[i + 1] ? '-' + depth[i + 1] + '<br>' : '+');
      }
      return div;
    };
  legend.addTo(myMap);
  

}