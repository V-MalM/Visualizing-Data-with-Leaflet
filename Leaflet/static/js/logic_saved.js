// var myMap = L.map("map",{
//     center : [44.0582, -121.3153],
//     zoom : 12 
// })

var myMap = L.map('map').setView([46.1879, -123.8313], 2);

var streetmaplayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: token
}).addTo(myMap);


// var streetmaplayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// var tecGroup = new L.LayerGroup();

// var artMap ={
//     "Mapo":streetmaplayer
// }

// var dataMap ={
//     "Tectonic Plates": tecGroup
// }

// //L.control.layers(artMap, dataMap).addTo(myMap);

// Store our API endpoint as queryUrl.

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
//var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2010-01-12&endtime=2010-01-13&maxlongitude=-60.52148437&minlongitude=-125&maxlatitude=48.74894534&minlatitude=15.16517337";


// Perform a GET request to the query URL/
d3.json(queryUrl).then(data => {
 console.log(data)
  let features = data.features  
  

  features.forEach(feature => {
    coordinates = feature.geometry.coordinates
    magnitude = feature.properties.mag
    //place = feature.properties.place
    console.log(feature) 
    var lat = coordinates[1]
    var lon = coordinates[0]
    var depth = coordinates[2]

    var mag_color = "#9dff00"
    if (depth >= -10 & depth <10)  
    { mag_color = "#9dff00"}
    else if (depth >= 10 & depth <30)  
    { mag_color = "#efa24a"}
    else if (depth >= 30 & depth <50)  
    { mag_color = "#ffb300"}
    else if (depth >= 50 & depth <70)  
    { mag_color = "#ff7d03"}
    else if (depth >= 70 & depth <90)  
    { mag_color = "#df4b2d"}
    else 
    { mag_color = "#f80404"}


    var circle = L.circle([lat, lon],
        {
            color : 'grey',
            opacity: 0.8,
            weight:1,
            fillColor: mag_color,
            fillOpacity: 0.8,
            radius: magnitude * 10000,
            draggable: true
        }).bindPopup(`<h3>${feature.properties.place}</h3>
        <hr><p>${new Date(feature.properties.time)}</p>
        <p>M${magnitude}, Depth: ${depth} KM</p>`)
        
        
    circle.addTo(myMap)

    
    //L.geoJSON(feature).addTo(myMap);


  });
    // Once we get a response, send the data.features object to the createFeatures function.
  // var tectonicQuery = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

  //   d3.json(tectonicQuery).then(tecData => {
  //       L.geoJSON(tecData, {
  //           weight: 1,
  //           color: "orange",
  //           opacity: .75
  //        }).addTo(tecGroup)
  //        tecGroup.addTo(myMap)
  //   })
});

////////////////////////////////////////////////////////////////////////////////////////////

// var legend = L.control({ position: "bottomright" });
//     legend.onAdd = function(map) {
//     var div = L.DomUtil.create("div", "info legend");
//     var limits = ['-10-10','10-30','3-50','50-70','70-90','90+'];
//     var colors = ['#9dff00','#efa24a','#ffb300','#ff7d03','#df4b2d','#f80404'];
//     var labels = [];

//     for (var i = 0; i < limits.length; i++) {

//             div.innerHTML += 
//             labels.push(
//                 '<li style="background:' + colors[i] + '"></li>'+limits[i]

//                 // '<li style=\"background-color: " + colors[i] + "\"></li>' +
//             );

//         }
//         div.innerHTML = labels.join('<br>');
//     return div;
//     };
//     legend.addTo(myMap)

function chooseColor(depth) {
      return depth > 90 ? "#f80404" :
      depth > 70 ? "#df4b2d" :
      depth > 50 ? "#ff7d03" :
      depth > 30 ? "#ffb300" :
      depth > 10 ? "#efa24a" :
      depth > -10 ? "lightgreen" :
      "greenyellow"; // <= 1 default
}


var legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend"),
      depth = [-10, 10, 30, 50, 70, 90];
      div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"
      for (var i =0; i < depth.length; i++) {
        div.innerHTML += 
        '<i style="background:' + chooseColor(depth[i]) + '">&nbsp;&nbsp;</i> ' +
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;
      };
      legend.addTo(myMap);


/////////////////////////////////////////////////////////////////////////////////////////////



// function createFeatures(earthquakeData) {

//   // Define a function that we want to run once for each feature in the features array.
//   // Give each feature a popup that describes the place and time of the earthquake.
//   function onEachFeature(feature, layer) {
//     layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//   }

//   // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//   // Run the onEachFeature function once for each piece of data in the array.
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });

//   // Send our earthquakes layer to the createMap function/
//   createMap(earthquakes);
// }

// function createMap(earthquakes) {

//   // Create the base layers.
//   var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   })

//   var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//   });

//   // Create a baseMaps object.
//   var baseMaps = {
//     "Street Map": street,
//     "Topographic Map": topo
//   };

//   // Create an overlay object to hold our overlay.
//   var overlayMaps = {
//     Earthquakes: earthquakes
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load.
//   var myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [street, earthquakes]
//   });

//   // Create a layer control.
//   // Pass it our baseMaps and overlayMaps.
//   // Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

// }
