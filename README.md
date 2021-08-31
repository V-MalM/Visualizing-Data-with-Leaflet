#  Visualizing Data with Leaflet

**Link To Leaflet Visualization :** 
https://v-malm.github.io/leaflet-challenge/Leaflet/

## Background

![1-Logo](Images/1-Logo.png)

The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS collects a massive amount of data from all over the world each day, and this app uses this data for visualization by plotting it on the map using Leaflet. Being able to visualize the data will allow us to educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

### Level 1: Basic Visualization

![2-BasicMap](Images/scr2_full.jpg)
Lets first visualize an earthquake data set.

1. **Source Data set**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page has several data sets to visualize. Here I am using the link to fetch earthquake data for all week by clicking "All Earthquakes" for the Past 7 Days. The link has JSON representation of that data. URL of this JSON is used to pull in the data for our visualization.

   ![4-JSON](Images/4-JSON.png)

2. **Import & Visualize the Data**

   Created a map using Leaflet to plot all of the earthquakes from the data set based on their longitude and latitude.

   * Data markers reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.

   * Each circular marker opens a popup that provides additional information about the earthquake when it is clicked.

   * The legend provides context for map data.
   
   ![3-BasicMapClose](Images/scr3_close.jpg)

### Level 2: More Data

![5-Advanced](Images/sat_tect.jpg)

This is the plot of a second data set on the map to illustrate the relationship between tectonic plates and seismic activity. The Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>. Used the Url for tectonic plates and created visualization alongside original set of data. 

This step includes:

* Plotting a second data set on the map. (**Tectonic Plates**-Orange Line)
<p><img src="Images/od_tect.jpg" width="30%">&nbsp;&nbsp;<img src="Images/sat_tect.jpg" width="30%">&nbsp;&nbsp;<img src="Images/grsc_tect.jpg" width="30%"></p>

* Adding base maps to choose from as well as separate out two different data sets into overlays that can be turned on and off independently.
<p><img src="Images/sat_eq.jpg" width="30%">&nbsp;&nbsp;<img src="Images/grsc_eq.jpg" width="30%">&nbsp;&nbsp;<img src="Images/od_eq.jpg" width="30%"></p>

* Adding layer controls to our map.
<p><img src="Images/layer_control.jpg" width="30%">&nbsp;&nbsp;