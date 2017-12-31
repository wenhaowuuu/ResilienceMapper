//AS OF SEPTEMBER 12TH, THE UPDATE HERE

//SOME LEARNING RESOURCE ABOUT FIGURE GROUND IDENTIFICATION
// the migration is complete.
// TARGET: TO LEARN THE OSMNX TOOLBOX
// AUTOMATICALLY IDENTIFY AND GENERATE STREET NETWORK
// http://geoffboeing.com/

//WORLD EARTHQUAK HEATMAP WITH CONTROLLABLE WIDGET VERY COOL!
// https://openlayers.org/en/latest/examples/heatmap-earthquakes.html


//POLYGON EDITING OPERATIONS:
//QUITE COOL HERE
//https://codeofsumit.github.io/leaflet.pm/


//HOSTING FREE SATELLITE IMAGE
// https://gis.stackexchange.com/questions/113683/free-web-service-providing-satellite-images
// https://aws.amazon.com/public-datasets/landsat/
// https://blog.mapbox.com/processing-landsat-8-using-open-source-tools-d1c40d442263

// 1. the tiff is not hostable.
// https://stackoverflow.com/questions/39143900/displaying-tiff-image-in-google-maps

// good resources:
// https://gis.stackexchange.com/questions/97943/how-to-open-geotiff-as-base-layer-on-openlayers
// https://www.researchgate.net/post/How_can_i_display_and_load_geotiff_images_in_web_browser_from_my_desktop_do_processing_on_itWhich_programming_language_can_be_used_for_this
// GREAT EXAMPLE OF USER INTERACTIVITY WITH HEAT MAP!!!
// https://openlayers.org/en/latest/examples/heatmap-earthquakes.html
// TILE MILL
// https://tilemill-project.github.io/tilemill/docs/crashcourse/introduction/

// FLY TO CERTAIN LOCATION!!!
//https://www.mapbox.com/mapbox-gl-js/example/scroll-fly-to/



// THREE METHODS TO GET SATELLITE IMAGES:
// 1. USE MAPBOX - FAKE THE LOGO AND THE MARKS
// 2. EXPORT HIGH RESOLUTION AERIAL IMAGE FROM ARCGIS, THEN GEOREFERENCING, THEN SET THE MAXIMUM BOUNDARY
// USER CAN ZOOM INTO, THEN
// 3. OTHER WAYS TO GET AROUND.





// //ADD A TIMER
// function startTime() {
//     var today = new Date();
//     var mo = today.getMonth() + 1;
//     var d = today.getDate();
//     var h = today.getHours();
//     var m = today.getMinutes();
//     var s = today.getSeconds();
//     m = checkTime(m);
//     s = checkTime(s);
//     document.getElementById('txt').innerHTML =
//     mo + "-" + d + " " + h + ":" + m + ":" + s;
//     var t = setTimeout(startTime, 500);
// }
// function checkTime(i) {
//     if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
//     return i;
// }



///1. SETUP AND BASEMAP

//1.1 SETUP BASEMAP
//SOME NOTES HERE
var map = L.map('map', {
  center: [45.023830, 7.636160],
  zoom: 13.5
});

// var Style = 'dark';
var Style = 'light';

L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  subdomains: 'abcd'
}).addTo(map);



//1.3 LOAD SATELLITE MAP
$('#satellite').click(function(){
  $('#map').hide();
  $('#map0').show();
  mapboxgl.accessToken = 'pk.eyJ1Ijoid2VuaGFvYnJpYW4iLCJhIjoiY2owaXNrNzhnMDB4ZjJxdGoxdHdkd2VibiJ9.Cn_2Ypo7UctdNZHt6OlDHA';
  var map0 = new mapboxgl.Map({
      container: 'map0', // container id
      style: 'mapbox://styles/mapbox/satellite-v9', //stylesheet location
      center: [7.682122, 45.069799], // starting position
      zoom: 11.5 // starting zoom
  });

  var editorData = $.ajax(
    {
      url:"https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/muni_northerntriangle.geojson"
    }
  ).done(function(data){
          // console.log("downloadxxx");
          map0.on('load', function () {

            //REFERENCE ON LOADING ELEMENTS ON MAPBOX'S MAP
            // https://gist.github.com/danswick/339d00429ed5a201e0d7ef4fac648fa5
            // http://lyzidiamond.com/posts/external-geojson-mapbox
            // http://lyzidiamond.com/posts/external-geojson-mapbox

            //TESTING
            map0.addLayer({
                        'id': 'boundarys',
                        'type': 'fill',
                        'source': {
                        'type': 'geojson',
                              'data': {
                                        'type': 'Feature',
                                        'geometry': {
                                        'type': 'Polygon',
                                        'coordinates': [[
                                                  [-90.583466, 10.571087],
                                                  [-90.583466, -10.333333],
                                                  [-70.589323, -10.333333],
                                                  [-70.589323, 10.571087]
                                                ]]
                                                }
                                        }
                                },
                          'layout': {},
                                'paint': {
                                    'fill-color': '#0000ff',
                                    'fill-opacity': 0.5
                                 }
                          });


            //add source
              map0.addSource(
                "myData",{
                  type:"geojson",
                  data:data
                }
              );

           //LOAD MUNICIPALITIES///////
            map0.addLayer({
                  'id': 'shapes',
                  'type': 'fill',
                  'source': "myData",
                  'layout': {},
                  'paint': {
                      'fill-color': '#00ffff',
                      'fill-opacity': 0.8
                  }
                });

          });
      });
  });



//1.2 LOAD THE PROCESSED IMAGE
// var imageUrl = 'flooding-01.png';
// var imageUrl = 'https://preview.ibb.co/nyk5PF/Torino_Sentinel2_28_Mar2017_PS.png',
var imageUrl = 'Torino_base_citywide_s.png',
imageBounds = [[45.142949,7.820598], [44.98445,7.514261]];
// var imageBounds = {
//   north: 45.161777,
//   south: 44.972073,
//   east: 7.839621,
//   west: 7.515590
// };
L.imageOverlay(imageUrl, imageBounds).addTo(map);


//LOAD THE ZOOM-IN IMAGE
var imagezoomUrl = 'Torino_base_zoomin.png',
imagezoomBounds = [[45.029872,7.647414], [45.017178,7.622817]];
// L.imageOverlay(imagezoomUrl, imagezoomBounds).addTo(map);


//LOAD THE BLDG LAYER
// var imagebldgUrl = 'Torino_bldg_only_300dpi_PS.png',
// imagebldgBounds = [[45.142949,7.820598], [44.98445,7.514261]];
//
// L.imageOverlay(imagebldgUrl, imagebldgBounds).addTo(map);

// if (b1 == true){
//   L.imageOverlay(imagebldgUrl, imagebldgBounds).addTo(map);
// };



// var schoolicon = L.icon({
//       iconUrl:'marker-icon.png',
//       iconSize:[15,24],
//       iconAnchor:[8,10],
//     });

//TESTING SOME TURF FUNCTIONALITY
//0720: SOMETHING IS WRONG WITH THE TURF FUCNTION
//GDHKKGHDKI GDLHGLDSHGK _FGSDGSG I DONT REALLY UNDERSTAND THE CAUSES
// OF THE PROBLEM
// var features;

// var bbox = turf.bbox(features);
// $ npm install @turf/intersect
// $ npm test

//EXAMPLE WITH DISTANCE OPERATION
// const distance= require('@turf/distance');
// var from = {
//   "type": "Feature",
//   "properties": {},
//   "geometry": {
//     "type": "Point",
//     "coordinates": [-75.343, 39.984]
//   }
// };
// var to = {
//   "type": "Feature",
//   "properties": {},
//   "geometry": {
//     "type": "Point",
//     "coordinates": [-75.534, 39.123]
//   }
// };
// var units = "miles";
// var distance = distance(from, to, units);


//EXAMPLE WITH INTERSECT
// const intersect = require('@turf/intersect');
//
// var poly1 = turf.polygon([[
//   [-122.801742, 45.48565],
//   [-122.801742, 45.60491],
//   [-122.584762, 45.60491],
//   [-122.584762, 45.48565],
//   [-122.801742, 45.48565]
// ]]);
//
// var poly2 = turf.polygon([[
//   [-122.520217, 45.535693],
//   [-122.64038, 45.553967],
//   [-122.720031, 45.526554],
//   [-122.669906, 45.507309],
//   [-122.723464, 45.446643],
//   [-122.532577, 45.408574],
//   [-122.487258, 45.477466],
//   [-122.520217, 45.535693]
// ]]);
//
// var intersection = turf.intersect(poly1, poly2).addTo(map);

// intersection.addTo(map);

//ADD VALUE CHAIN LOCATIONS FOR HONDURAS
// L.marker([13.309449, -87.227567]).addTo(map).bindPopup('Iron and steel Fundición y Maquinado (FUNYMAQ) Grupo Imferra');
// L.marker([15.472559, -88.028377]).addTo(map).bindPopup('Other bars and rods of iron or non alloy steel, not further worked thanforged, hot-rolled, hotdrawn or hot-extruded; forged INTREFICA');
// L.marker([13.336175, -87.205594]).addTo(map).bindPopup('Barbed wire of iron or steel; twisted hoop or single flat wire, barbed or not, and loosely twisted double wire, of a kind use for fencing Derivados de Metal, S.A. INTREFICA');
// L.marker([15.513698, -88.007150]).addTo(map).bindPopup('Endless bands for machinery, of stainless steel INTREFICA');


//1.2 SWITCH BASEMAPS
$('#dark').click(function(){
  $('#map0').hide();
  $('#map').show();
  Style = 'dark';
  L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});

// 1.3 SWITCHING SCALES


// 2. CREATE VARIABLES
// 2.1 DATA SOURCE URLS
  //FOR HELSINKI PROJECTS
  //2.1.1 BASIC DATA
  var adm = "https://raw.githubusercontent.com/wenhaowuuu/Mock/master/data/ita_adm1_1.geojson";
  var torinoboundary = "https://raw.githubusercontent.com/wenhaowuuu/Mock/master/data/base_tolimit_regiongp_2011_torino.geojson";

  // 2.1.2 BACKGROUND INFO
  // B1, B2, B3, B4, B5
  var buildings = "https://raw.githubusercontent.com/wenhaowuuu/Mock/master/data/infr_buildings_reggp_2010_torino.geojson";
  var railways = "https://raw.githubusercontent.com/wenhaowuuu/Mock/master/data/infr_railway_reggp_2010_torino.geojson";
  var roads = "https://raw.githubusercontent.com/wenhaowuuu/Mock/master/data/infr_roads_reggp_2012_torino.geojson";
  var greenspaces = "https://raw.githubusercontent.com/wenhaowuuu/Mock/master/data/ecoh_greenareas_togp_2003_torino.geojson";

  // 2.1.2 HAZARDS INFO
  // C1
  var hazards_h = "https://raw.githubusercontent.com/wenhaowuuu/Mock/master/data/uhi_h_exp.geojson";
  var hazards_m = "https://raw.githubusercontent.com/wenhaowuuu/Mock/master/data/uhi_m_exp.geojson";
  var hazards_l = "https://raw.githubusercontent.com/wenhaowuuu/Mock/master/data/uhi_l_exp.geojson";

// 2.2 VARIABLES
  var Buildings = [ ];
  var Railways = [ ];
  var Roads = [ ];
  var Greenspaces = [ ];

  var HighHazards = [ ];
  var MediumHazards = [ ];
  var LowHazards = [ ];


  var list = ' ';
  var blank = '  ';

  var parsedData_buildings;
  var parsedData_railways;
  var parsedData_roads;
  var parsedData_greenspaces;

  var parsedData_highhazards;
  var parsedData_mediumhazards;
  var parsedData_lowhazards;

  var filterFunction;

  //set layer selection variables
  var layerMappedPolygons;
  var selectedmuni_name = '';
  var selectedlayer;
  var mapURL;
  var img;

  // var PrimaryRoads = [ ];
  // var SecondaryRoads = [ ];
  // var TertiaryRoads = [ ];
  // var UrbanRoads = [ ];
  // var RuralRoads = [ ];
  //
  // var Hospitals = [ ];
  // var Clinics = [ ];
  //
  // var PrimarySchools = [ ];
  // var MiddleSchools = [ ];
  // var HighSchools = [ ];
  //
  // var Schools = [ ];
  //
  // var layerselected = [];
  // var namelist = [];
  // var namelistvalue = [];
  var order = 0;
  var list = ' ';
  var blank = '  ';

  // var slideNumber = 0;
  // var parsedData1;
  // var parsedData2;
  // var parsedData3;
  // var parsedData4;
  // var filterFunction;

  //set layer selection variables
  // var layerMappedPolygons;
  // var selectedmuni_name = '';
  // var selectedlayer;
  // var mapURL;
  // var img;

  //DEFINE THE IE SCORING FACTORS FOR THE RADAR CHART
  var RD_1ST;
  var RD_2ND;
  var RD_3RD;

  //1. TOTAL LENGTH
  var RD_LENGTH;
  //2. DENSITY
  var RD_DENSITY;
  //3. URBAN ROAD LENGTH
  var RD_URBAN;

  //4. RURAL ROAD LENGTH
  var RD_RURAL;

  //5. SECONDARY RD PER 1ST RD
  var RD_2ND_1ST = RD_2ND / RD_1ST;

  //6. TERTIARY RD PER 1ST RD
  var RD_3RD_1ST = RD_3RD / RD_1ST;


  //DEFINE THE FADING AND HIGHLIGHTING EFFECT WHEN CLICKED ON LAYERS
  var samelook = {
    'color': '#E0903F',
    'opacity': 0.01,
  };

  var fadeout = {
    'opacity': 0.01,
  };

  var highlight = {
    'color':'#416FEA',
    'opacity': 0.2,
  };

  var maskin = {
    'color':'#FF0000',
  };

  var maskout = {
    'display':'none',
  };


//set PDF variables
var P_country = ' ';
var P_department = ' ';
var P_muni = ' ';
var P_pov = ' ';
var P_id = ' ';
var P_year = ' ';
var P_source = ' ';

var P_length = ' ';
var P_density = ' ';
var P_rd_urban = ' ';
var P_rd_rural = ' ';
var P_rd_1 = ' ';
var P_rd_2 = ' ';
var P_rd_3 = ' ';

var P_rd_21 = ' ';
var P_rd_31 = ' ';


//ZOOM TO SELECTED SCALE
//ANOTHER METHOD HERE: http://learn.jquery.com/using-jquery-core/faq/how-do-i-get-the-text-value-of-a-selected-option/
var changeBasemap1 = function(location1){
  var value1 = location1.value;
  console.log(value1);
  if(value1 == 'district'){
      map.setView([45.023830, 7.636160],13.5);
  }if(value1 == 'regional'){
      map.setView([45.069799, 7.682122],6);
  }
  if(value1 == 'city'){
      map.setView([45.069799, 7.682122],12);
  }
  if(value1 == 'neighborhood'){
      L.imageOverlay(imagezoomUrl, imagezoomBounds).addTo(map);
      map.setView([45.021413, 7.634196],16.5);
  }
};

var changeBasemap3 = function(location3){
  var value3 = location3.value;
  console.log(value3);
  if(value3 == 'La Libertad'){
      map.setView([16.849479, -90.426450],10);
      //highlight the boundary of the selected municipality
      selectedmuni_name = 'La Libertad';
      console.log("lalibertad selected");
      //layermappedpolygons not defined?!
      layerMappedPolygons.eachLayer(function(layer){
        if (layer.feature.properties.m_name == selectedmuni_name) {
          console.log("ready to select");
          layer.setStyle(highlight);
          console.log("selection highlighted")
          };
      });

  }
  if(value3 == 'Guatemala'){
      map.setView([14.629168, -90.519007],10);
      selectedmuni_name = 'Guatemala';
      console.log("guatemala selected");
      layerMappedPolygons.eachLayer(function(layer){
        if (layer.feature.properties.m_name == selectedmuni_name) {
          console.log("ready to select");
          layer.setStyle(highlight);
          console.log("selection highlighted")
          };
      });
  }
  if(value3 == 'Coban'){
      map.setView([15.466670, -90.383285],10);
      selectedmuni_name = 'Coban';
      console.log("Coban selected");
      layerMappedPolygons.eachLayer(function(layer){
        if (layer.feature.properties.m_name == selectedmuni_name) {
          console.log("ready to select");
          layer.setStyle(highlight);
          console.log("selection highlighted")
          };
      });
  }
};



//FOR THE SATELLITE MAP
var changeBasemap01 = function(location1){
  var value1 = location1.value;
  console.log(value1);
  if(value1 == 'regional'){

    map0.fitBounds([[
        14.682122,
        50.069799
    ], [
        0.682122,
        40.069799
    ]]);
  }
  if(value1 == 'city'){
      // map0.setView([45.069799, 7.682122],9);
      map0.fitBounds([[
          10.682122,
          47.069799
      ], [
          4.682122,
          43.069799
      ]]);
  }
  if(value1 == 'district'){
      // map0.setView([45.069799, 7.682122],11);
      map0.fitBounds([[
          12.682122,
          46.069799
      ], [
          6.682122,
          44.069799
      ]]);
  }
  if(value1 == 'neighborhood'){
      // map0.setView([45.069799, 7.682122],14);
      map0.fitBounds([[
          8.182122,
          45.369799
      ], [
          7.182122,
          44.769799
      ]]);
  }
};


// COMBINED FUNCTIONS
var Basemap = function(location1){
  changeBasemap1(location1);
  changeBasemap01(location1);
};

//3. FUNCTIONS
// 3.1 WHEN THE LAYER IS CLICKED:
// var numberofClicks = 0;

// REFERENCE HERE FOR CLICK EVENTS
// https://stackoverflow.com/questions/12420910/select-unselect-text-on-click-using-jquery

// THIS DOESN'T WORK BECAUSE IT DIDN'T TRACK THE ID OF THE OBJ
// var toggle=0;
// layer.click(function() {
//     if(toggle==1){
//         // $("#information").fadeIn(200);
//         // $("#leftColumn").animate({width:"250px"}, 200);
//         // $("#collapse").html("«");
//
//         toggle=0;
//     }
//     else
//     {
//         $("#information").fadeOut(200);
//         $("#leftColumn").animate({width:"10px"}, 200);
//         $("#collapse").html("»");
//         toggle=1;
//     }
// });

  var eachFeatureFunction = function(layer) {
    var id = L.stamp(layer);
    // console.log(id);

    // var first_click = true;

    layer.on('click', function (event) {

      // if (first_click){
      //   first_click = false;
      //
      // } else {
      //
      // }
      //NOT WORKING FOR REMOVE LAYER OR HIDE MAP
      //IT SAYS THEY ARE NOT FUNCTIONS
      // REFERENCE
      // https://stackoverflow.com/questions/12420910/select-unselect-text-on-click-using-jquery
      // layer.on('click',function(event){
      //   map.removelayer(layer);
      // });

      // var x = {};
      // function selectIt(obj)
      // {
      //     var id = L.stamp(layer);
      //     if (!x.hasOwnProperty(id))
      //       x[id] = 0;
      //     if (x[id] % 2 == 0)
      //     {
      //         obj.setStyle(highlight);
      //         // obj.select();
      //     }
      //     else
      //     {
      //         if (document.selection)
      //         {
      //             document.selection.empty();
      //             obj.blur();
      //         }
      //         else
      //         {
      //             window.getSelection().removeAllRanges();
      //         }
      //     }
      //
      //     obj.focus();
      //     x[id]++;
      // }

      //  $( "#target" ).toggle(function() {
      //    alert( "First handler for .toggle() called." );
      //  }, function() {
      //    alert( "Second handler for .toggle() called." );
      //  });
       //
       //
      //  $( "td" ).toggle(
      //    function() {
      //      $( this ).addClass( "selected" );
      //    }, function() {
      //      $( this ).removeClass( "selected" );
      //    }
      //  );


      console.log(layer.feature.properties);

       //TO ADD THE RE-CLICK THEN DE-SELECT FUNCTION
       //you can't really do this because the number of times clicked is not stored with the layer itself.
       //come back to this later!
      //  if (numberofClicks!=null){
      //    console.log("selected again?");
      //    // second time click
      //    numberofClicks = numberofClicks + 1;
      //    console.log("selected again!");
      //    if (numberofClicks % 2 == 0){
      //      layer.hide();
      //    }
      //    else {
      //      layer.show();
      //    }
       //
      //  }

      //  else {

         // first time click
         var numberofClicks = 0;
         numberofClicks = numberofClicks + 1;
         console.log(numberofClicks);

         //YOU'D BETTER CLEAN THE HTML ELEMENT EVERY TIME YOU CLICK ON THE LAYER
         //reference from
         //https://stackoverflow.com/questions/24815851/how-to-clear-a-chart-from-a-canvas-so-that-hover-events-cannot-be-triggered

         $('#myChart1').remove();
         $('.chartsarea').append('<canvas class="charts" id="myChart1"></canvas>');
         console.log("replace1");


         $('#myChart2').remove();
         $('.chartsarea').append('<canvas class="charts" id="myChart2"></canvas>');
         console.log("replace2");

         //Click odd number of times - loading the shape, while
         //click even number of times - removing it.
        //  if (numberofClicks % 2 == 0){
        //    //1. change the selection style;
        //    layer.setStyle(myStyle);
        //    layer.setStyle(fadeout);
        //    //2. remove it from the layer selection list
        //    layerselected = layerselected.filter(function(item){
        //      return item !== layer
        //    })
        //
        //    //  arr = arr.filter(function(item) {
        //    //    return item !== value
        //    //  })
        //
        //    console.log(layerselected);
        //
        //    //3. remove the graph and text;
        //    map.removeLayer(myChart);
        //
        //    //4. remove it from the excel;
        //  }
         //
        //  else {


           //UPDATE THE EXCEL TABLE INFO TO BE DOWNLOADED
           // id="exceltitle"
           $('#exceltitle').text(layer.feature.properties.m_name);
           $('#X_ID').text(layer.feature.properties.id);
           $('#X_country').text(layer.feature.properties.country);
           $('#X_department').text(layer.feature.properties.d_name);
           $('#X_municipality').text(layer.feature.properties.m_name);
           $('#X_PovertyRate').text(layer.feature.properties.gen_pov);
          //  $('#X_department').text(layer.feature.properties.d_name);
           //UPDATE THE PDF INFO TO BE DOWNLOADED
           P_country = layer.feature.properties.country;
           P_department = layer.feature.properties.d_name;
           P_muni = layer.feature.properties.m_name;
           P_pov = layer.feature.properties.gen_pov;
           P_id = layer.feature.properties.id;
           P_year = layer.feature.properties.year;
           P_source = layer.feature.properties.source;

           P_length = layer.feature.properties.rd_length;
           P_density = layer.feature.properties.rd_density;
           P_rd_urban = layer.feature.properties.rd_urban;
           P_rd_rural = layer.feature.properties.rd_rural;
           P_rd_1 = layer.feature.properties.rd_major;
           P_rd_2 = layer.feature.properties.rd_second;
           P_rd_3 = layer.feature.properties.rd_tertiar;
           P_rd_21 = layer.feature.properties.rd_second / layer.feature.properties.rd_major;
           P_rd_31 = layer.feature.properties.rd_tertiar / layer.feature.properties.rd_major;

           //LOAD THE SATELLITE MAP FOR THE SELECTED
          //  BELOW WOULD PLACE AN AERIAL ON, BUT NOT REALLY WORKING,
          // it would become VERY VERY VERY SLOW to load when the following section is released!!!

          if (location != null){
              location = P_muni + P_country;
              //getelementby id and then remove
              mapURL = "https://maps.googleapis.com/maps/api/staticmap?&zoom=10&scale=1&size=320x460&maptype=satellite&format=png&visual_refresh=true&center=" + location;
              console.log(mapURL);
              // img.src = mapURL;
              // img = new Image();
              // img.src = mapURL;
              // imgcontent = document.getElementById("myImage1");
          }
          else {
            var location = '';
            location = P_muni + P_country;
            mapURL = "https://maps.googleapis.com/maps/api/staticmap?&zoom=10&scale=1&size=320x460&maptype=satellite&format=png&visual_refresh=true&center=" + location;
            console.log(mapURL);
            //
            // img = new Image();
            // // var img = document.createElement('img');
            // img.src = mapURL;
            // var imgcontent = document.getElementById("myImage1");

            // img = new Image();
            img = document.createElement('img');
            // img.src = mapURL;
            // $('#myImage1').append(img);

          }

          // just like the charts going on the sidebar
          //
          // $('#myImage1').append(img);
          // $('.locationmap').append(img);
          // console.log("appended0");
          // console.log(img);

          // $('#myImage1').remove();
          // $('.locationmap').append('<canvas class="charts" id="myImage1"></canvas>');
          // $('.locationmap').append('<canvas class="charts" id="myImage1"></canvas>');
          console.log("replace3");

           //  $('#exceltitle').text(layer.feature.properties.m_name);
           //ZOOM TO THE SELECTED MUNICIPALITY
           map.fitBounds(layer.getBounds(),{
                      padding: [80,80]
                    });
           order = order + 1;
           console.log(order);

         //PUSH INTO THE LAYER SELECTION GROUP
         layerselected.push(layer);
         console.log(layerselected);
         namelist.push(layer.feature.properties.m_name);
         console.log(namelist);

         _.each(namelist,function(name){
           list = order + '.' + name;
         });

         $('#selection').append(blank + blank + blank + list + " ");

         // $('#selection').text(namelist);
         // <div id="results" style="display: none;">
        //  document.getElementById("results").style.display = "inline";

          //  $('#LENGTH').text(layer.feature.properties.m_name);
          //  $('#POP').text(layer.feature.properties.d_name);
          //  $('#30PCT').text(layer.feature.properties.gen_pov);
          //  $('#60PCT').text(layer.feature.properties.id);
          //  $('#90PCT').text(layer.feature.properties.year);



          //HIGHLIGHT THE MAP CLICKED
          layerMappedPolygons.setStyle(fadeout);
          layer.setStyle(highlight);

          $('#hidemap').click(function(){
            layer.setStyle(samelook);
          });


          //highlight the hospitals and schools in the
         //  selected layer, if applicable
         // TEST 001 - NOT WORKING!
         // if (x4 == true){
         //   _.each(Schools,function(item){
         //     if (item.feature.properties.m_name == layer.feature.properties.m_name){
         //       item.setStyle(highlight);
         //     }
         //     else{
         //       item.setStyle(fadeout);
         //     }
         //   });
         //
         // }

         // TEST 002 - LET'S TRY FILTER
         // var myFilter = function(feature) {
         //      if (feature.properties.gen_pov===' ') {
         //      return false;
         //      }
         //      else {
         //        return true;
         //      }
         //    };

         // if (x4 == true){
         //   var schoolFilter = function(feature){
         //     if (feature.properties.m_name == layer.feature.properties.m_name){
         //       return true;
         //       feature.setStyle(maskin);
         //     }
         //     else {
         //       return false;
         //       feature.setStyle(maskout);
         //     }
         //   };
         // add the code for actual filtering and styling execution - BELOW NOT WORKING
         // var SelectedSchools = _.filter(parsedData17,function(item){
         //   return item.feature.properties.m_name == layer.feature.properties.m_name;
         // });
         //
         // Schools.setStyle(maskout);
         // SelectedSchools.setStyle(maskin);

         //if layer is not clicked, then load all the school data for the region
         //if layer is clicked, then filter out the schools within the selected muni and display them, and not loading the others
         // if (Schools)
         //RECREATE THE SELECTED SCHOOLS ON THE FLY - still some issue
         // _.each(parsedData17,function(item){
         //   if (item.feature.properties.m_name == layer.feature.properties.m_name){
         //     var itemB = L.geoJson(item,
         //       {
         //        //  style: {opacity:0.3,width:0.5,color:'#E5EF12'},
         //         pointToLayer: function (feature, latlngs) {
         //           return new L.circleMarker(latlngs, {
         //              radius:4,
         //              fillColor:'#FF0000',
         //              color:'#EBA430',
         //              weight:1,
         //              opacity:0.3,
         //              fillOpacity:0.3,
         //             });
         //           }
         //       }).addTo(map).bindPopup("Schools111");
         //     }
         //    }
         //  );
       // };


          //LINK DATA WITH THE GRAPH
          var backgroundColor = 'white';
          Chart.plugins.register({
            beforeDraw: function(c) {
              var ctx = c.chart.ctx;
              ctx.fillStyle = backgroundColor;
              ctx.fillRect(0, 0, c.chart.width, c.chart.height);
             }
           });
           //STUDY THIS EXAMPLE!!!
          //  https://stackoverflow.com/questions/43664722/how-to-save-chart-js-charts-as-image-without-black-background-using-blobs-and-fi
          //  https://jsfiddle.net/a9hmnd9L/2/

            // var canvas = $('#myChart1').get(0);
            // var myChart = new Chart(canvas, {
            //     type: 'line',
            //     data: {
            //       labels: [1, 2, 3, 4, 5],
            //       datasets: [{
            //         label: 'Line Chart',
            //         data: [1, 2, 3, 4, 5],
            //         backgroundColor: 'rgba(255, 0, 0, 0.2)',
            //         borderColor: 'rgba(255, 0, 0, 0.5)',
            //         pointBackgroundColor: 'black'
            //       }]
            //     }
            //   });

            // save as image
            // $('#save').click(function() {
            //   canvas.toBlob(function(blob) {
            //     saveAs(blob, "pretty image.png");
            //   });
            // });

          if(myChart!=null){
           //  myChart.destroy();
           //  $('#myChart2').remove();
           //  $('.chartsarea').append('<canvas class="charts" id="myChart2" width="300" height="200"></canvas>');
           //  console.log("replace2");
          }
          else {

            var ctx2 = document.getElementById("myChart2");
            // ctx2.style.backgroundColor = 'rgba(255,255,255,1)';
            //Fill the background
           //  Chart.plugins.register({
           //    beforeDraw: function(myChart) {
           //     //  var ctx = myChart.chart.ctx2;
           //      ctx2.fillStyle = 'rgba(255,255,255,0.05)';
           //      ctx2.fillRect(0, 0, myChart.chart.width, myChart.chart.height);
           //    }
           //  });



           // ctx2.fillStyle = "white";
           // ctx2.fill = 'rgba(255, 0, 255, 0.5)';
            var myChart = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: [layer.feature.properties.m_name, "Average", "UN"],
                    datasets: [{
                        label: 'Poverty',
                        data: [layer.feature.properties.gen_pov, 33, 20],
                        backgroundColor: [
                            'rgba(255, 120, 35, 0.5)',
                            'rgba(50, 120, 230, 0.5)',
                            'rgba(255, 206, 86, 0.5)',

                        ],
                        borderColor: [
                            'rgba(255, 120, 35, 1)',
                            'rgba(50, 120, 230, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                  responsive: false,
                  maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                                }
                              }]
                            }
                          }
                });

               // ctx2.style.backgroundColor = 'rgba(255,0,0,1)';

              }
                       P_country = layer.feature.properties.country;
                       P_department = layer.feature.properties.d_name;
                       P_muni = layer.feature.properties.m_name;
                       P_pov = layer.feature.properties.gen_pov;
                       P_id = layer.feature.properties.id;
                       P_year = layer.feature.properties.year;
                       P_source = layer.feature.properties.source;

                       P_length = layer.feature.properties.rd_length;
                       P_density = layer.feature.properties.rd_density;
                       P_rd_urban = layer.feature.properties.rd_urban;
                       P_rd_rural = layer.feature.properties.rd_rural;
                       P_rd_1 = layer.feature.properties.rd_major;
                       P_rd_2 = layer.feature.properties.rd_second;
                       P_rd_3 = layer.feature.properties.rd_tertiar;
                       P_rd_21 = layer.feature.properties.rd_second / layer.feature.properties.rd_major;
                       P_rd_31 = layer.feature.properties.rd_tertiar / layer.feature.properties.rd_major;
              //LOAD THE RADAR CHART
             //  REFERENCE
             //  https://canvasjs.com/docs/charts/chart-types/html5-stacked-bar-chart/
             //
              if (radarChart!=null){
                //USING MAP REMOVE LAYER DOES NOT WORK ON CHARTS!
                radarChart.destroy();
                console.log("destroyed2");
              }
              else {
                var marksCanvas = document.getElementById("myChart1");
                var ctx1 = marksCanvas.getContext('2d');
                //Fill the background
               //  Chart.plugins.register({
               //    beforeDraw: function(myChart) {
               //     //  var ctx = myChart.chart.ctx2;
               //      ctx1.fillStyle = 'rgba(255,255,255,0.05)';
               //      ctx1.fillRect(0, 0, myChart.chart.width, myChart.chart.height);
               //    }
               //  });

                var marksData = {
                  labels: ["Total Length", "Density", "Urban Road", "Rural Road", "Secondary/Major", "Tertiary/Major"],
                  datasets: [{
                    label: P_muni,
                    backgroundColor: "rgba(255,120,35,0.5)",
                    data: [(P_length - 46775.31635) / 76377.96091, (P_density - 244.1640059) / 190.074839, (P_rd_urban - 7936.693108) / 14941.34066, (P_rd_rural - 38367.5124) / 69831.91203, (P_rd_21 - 3.627827758) / 24.37334603, (P_rd_31 - 3.518684818) / 23.91963842]
                    // OPTION 2
                   //  data: [(P_length) / 76377.96091, (P_density) / 190.074839, (P_rd_urban) / 14941.34066, (P_rd_rural) / 69831.91203, (P_rd_21) / 24.37334603, (P_rd_31) / 23.91963842]
                  }, {
                    label: "Regional Average",
                    backgroundColor: "rgba(50,120,230,0.5)",
                    data: [0, 0, 0, 0, 0, 0]
                    // OPTION 2
                   //  data: [46775.31635 / 76377.96091, 244.1640059 / 190.074839, 7936.693108 / 14941.34066, 38367.5124 / 69831.91203, 3.627827758 / 24.37334603, 3.518684818 / 23.91963842]
                  }]
                };

                var radarChart = new Chart(marksCanvas, {
                  type: 'radar',
                  data: marksData,
                  options: {
                    responsive: false, maintainAspectRatio: false,

                  }
                });
              }

       }
   )};

var myFilter = function(feature) {
     if (feature.properties.gen_pov===' ') {
     return false;
     }
     else {
       return true;
     }
   };


// 3.2 LOADING CHARTS
//CREATE RADAR CHART
// var marksCanvas = document.getElementById("myChart1");
//
// var marksData = {
//   labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
//   datasets: [{
//     label: "P_muni",
//     backgroundColor: "rgba(255,50,20,0.4)",
//     data: [65, 75, 70, 80, 60, 80]
//   }, {
//     label: "Regional Average",
//     backgroundColor: "rgba(0,0,250,0.4)",
//     data: [54, 65, 60, 70, 70, 75]
//   }]
// };
//
// var radarChart = new Chart(marksCanvas, {
//   type: 'radar',
//   data: marksData
// });


//PLACEHOLDER:
// var ctx1 = document.getElementById("myChart1").getContext('2d');
// var myChart1 = new Chart(ctx1, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: 'ROSE MAP SCORE',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.4)',
//                 'rgba(54, 162, 235, 0.4)',
//                 'rgba(255, 206, 86, 0.4)',
//                 'rgba(75, 192, 192, 0.4)',
//                 'rgba(153, 102, 255, 0.4)',
//                 'rgba(255, 159, 64, 0.4)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });



// 4. LOADING REAL DATA
//4.0 LOADING THREE NATIONS BOUNDARY
// $(document).ready(function(){
//   $.ajax(Honduras).done(function(data) {
//     parsedData_Honduras = JSON.parse(data);
//     console.log("parsed23");
//     console.log(parsedData_Honduras.features[0].properties.country);
//   //   layerMappedPolygons = _.each(parsedData_Honduras,function(item){
//   //     L.geoJson(parsedData_Honduras,
//   //       {
//   //         style: {opacity:0.4},
//   //         pointToLayer: function (feature, latlngs) {
//   //           return new L.Polygon(latlngs, {
//   //           }
//   //         );
//   //       }}
//   //     ).addTo(map).bindPopup("text");
//   //   }
//   // );
//   });
// });

// 4.1 LOADING SOUTH AMERICA DATA
//SELECT THE LAYERS YOU WANT

// console.log(document.getElementById("infrastructure").checked);
//ADD THE LAYERS TO THE MAP

// var selectedmaps = [];
// var x1, x2, x3, x4, x5, y1, y2, m1, m2, w1, w2, w3;

// $('#nation').change(function(){
//   if(this.checked){
//     console.log("nation checked");
//     y0 = true;
//   }
//   if(!this.checked){
//     console.log("nation unchecked");
//     y0 = false;
//   }
// });
//
// $('#department').change(function(){
//   if(this.checked){
//     y1 = true;
//   }
//   if(!this.checked){
//     y1 = false;
//   }
// });


//
// $('#municipality').change(function(){
//   if(this.checked){
//     y2 = true;
//   }
//   if(!this.checked){
//     y2 = false;
//   }
// });

// CHECKING OPTIONS
var selectedmaps = [];
var b1, b2, b3, b4, b5, c1
$('#buildings').change(function(){
  if(this.checked){
    b1 = true;
  }
  if(!this.checked){
    b1 = false;
  }
});

$('#railways').change(function(){
  if(this.checked){
    b2 = true;
  }
  if(!this.checked){
    b2 = false;
  }
});

$('#roads').change(function(){
  if(this.checked){
    b3 = true;
  }
  if(!this.checked){
    b3 = false;
  }
});

$('#greenspaces').change(function(){
  if(this.checked){
    b4 = true;
  }
  if(!this.checked){
    b4 = false;
  }
});


$('#uhihazards').change(function(){
  if(this.checked){
    c1 = true;
  }
  if(!this.checked){
    c1 = false;
  }
});



//PUBLIC HEALTH
//WHY Z1 IS NOT CLICKABLE???
//A BIG BUGS HERE! SEEMS THAT ONLY THE EIGHTH AND NINTH BUTTON IS ONLY
// CLICKABLE AFTER THE SHOWMAP BUTTON IS CLICKED...
// SHOW THE MAPS OR HIDE THEM

// var parsedData_buildings;
// var parsedData_railways;
// var parsedData_roads;
// var parsedData_greenspaces;
// var parsedData_highhazards;
// var parsedData_mediumhazards;
// var parsedData_lowhazards;

//DISPLAY THE DEFAULT INFO AND BOUNDARIES
//FOLLOWING SHOWS THE ITALIAN REGIONAL ADMINISTRATIVE BOUNDARIES

// $(document).ready(function(){
//   $.ajax(adm).done(function(data) {
//     parsedData000 = JSON.parse(data);
//     console.log(parsedData000);
//     console.log("parsed000");
//     layerMappedPolygons = L.geoJson(parsedData000,
//       {
//         style: {opacity:0.4,width:0.5,color:'#E0903F'},
//         pointToLayer: function (feature, latlng) {
//           return new L.Polygon(latlng, {
//           });
//         },
//
//         onEachFeature: function(feature,layer){
//
//           layer.bindPopup(
//             "<b>Region Name: </b>" +
//             feature.properties.name_1 +
//             "</br>" +
//
//             "<b>Total Area: </b>" + "10,795 " + "sq km" +
//             "</br>" +
//
//             "<b>Total Population: </b>" + "570,000" +
//             "</br>" +
//
//             "</br>" +
//             "<b>Data Collected Year: </b>" + "2014"
//           )
//
//          }
//         }).addTo(map);
//         layerMappedPolygons.eachLayer(eachFeatureFunction);
//         // console.log(layerMappedPolygons[0].id_1);
//       })
//     });


//LOAD THE ITALIAN ADMINISTRATIVE BOUNDARIES
    $(document).ready(function(){
      $.ajax(torinoboundary).done(function(data) {

        parsedData_torinoboundary = JSON.parse(data);
        console.log(parsedData_torinoboundary);
        console.log("parsed torinoboundary");

        var boundary = L.geoJson(parsedData_torinoboundary,
          {
            style: {opacity:0.7,width:1.2,color:'#FA2712', fillOpacity:0},
            pointToLayer: function (feature, latlng) {
              return new L.Polygon(latlng, {
              });
            },
            }).addTo(map);
          });
        });


// DISPLAY THE SELECTED INFO
$('#showmap').click(function(){
  console.log(b1,b2,b3,b4);


//comments to Barry

// I'm thinking to try exporting a high resolution aerial image from ArcMap with

//NOT ENABLING THE PARAMETER CONTROL FOR NOW, BUT WILL HAVE TO MAKE IT WORK!
    // if (c1 == true){

    //CITY-WIDE IMAGE OVERLAY
          // HighHazards = L.geoJson(parsedData_highhazards,
          //   {
          //     style: {opacity:0.9,width:0.5,color:'#F71C0E', fillColor: '#F71C0E', fillOpacity: 0.75},
          //     pointToLayer: function (feature, latlng) {
          //       return new L.Polygon(latlng, {
          //       });
          //     },
          //     }).addTo(map);
          //
          //
          // MediumHazards = L.geoJson(parsedData_mediumhazards,
          //   {
          //     style: {opacity:0.75,width:0.5,color:'#E3C715', fillColor: '#E3C715', fillOpacity: 0.75},
          //     pointToLayer: function (feature, latlng) {
          //       return new L.Polygon(latlng, {
          //       });
          //     },
          //     }).addTo(map);
          //
          // LowHazards = L.geoJson(parsedData_lowhazards,
          //   {
          //     style: {opacity:0.75,width:0.5,color:'#81EC23', fillColor: '#81EC23', fillOpacity: 0.75},
          //     pointToLayer: function (feature, latlng) {
          //       return new L.Polygon(latlng, {
          //       });
          //     },
          //     }).addTo(map);





    //LOAD PRIMARY ROAD NETWORK
    if (b4 == true){
      $('#box5').show();
      // $(document).ready(function(){
        // $.ajax(adm).done(function(data) {
          var itemB = L.geoJson(parsedData_greenspaces,
            {
              style: {opacity:0.4,width:0.5,color:'#08732C', fillColor: '#08732C', fillOpacity: 0.85},
              pointToLayer: function (feature, latlng) {
                return new L.Polygon(latlng, {
                });
              },
              }).addTo(map);
              // layerMappedPolygons.eachLayer(eachFeatureFunction);
              // // console.log(layerMappedPolygons[0].id_1);
            // })
          // });
          Greenspaces.push(itemB);
    }


    if (b2 == true){
      $('#box3').show();
        _.each(parsedData_railways,function(item){
          var itemB = L.geoJson(parsedData_railways,
            {
              style: {opacity:0.65,width:1.2,color:'#6C3483'},
              pointToLayer: function (feature, latlngs) {
                return new L.polyline(latlngs, {
                }
              );
            }}
          ).addTo(map).bindPopup("railways");
          Railways.push(itemB);
        }
        );
      }

      if (b3 == true){
        $('#box4').show();
          _.each(parsedData_roads,function(item){
            var itemB = L.geoJson(parsedData_roads,
              {
                style: {opacity:0.45,width:0.05,color:'#190D75'},
                pointToLayer: function (feature, latlngs) {
                  return new L.polyline(latlngs, {
                  }
                );
              }}
            ).addTo(map).bindPopup("roads");
            Roads.push(itemB);
          }
          );
          // selectedmaps.push(SecondaryRoads);
      }






//TRYING TO FIGURE OUT HOW IMAGE CAN BE OVERLAYED ON TOP OF MAP-ADD ON OBJECTS!!
//THE SEQUENCE IN CODE DOESN'T MATTER HERE

  if (b1 == true){
    $('#box2').show();
      var imagebldgUrl = 'Torino_bldg_only_300dpi_PS2.png',
      imagebldgBounds = [[45.142949,7.820598], [44.98445,7.514261]];

      // L.imageOverlay(imagebldgUrl, imagebldgBounds).addTo(map);

          var itemB = L.geoJson(parsedData_buildings,
            {
              style: {opacity:0.2,width:0.03, fillColor: '#000000', fillOpacity: 0.7, color:'#000000'},
              pointToLayer: function (feature, latlng) {
                return new L.Polygon(latlng, {
                });
              },
              }).addTo(map);
           Buildings.push(itemB);

    }


//LOAD THE BOUNDARY
            var boundary = L.geoJson(parsedData_torinoboundary,
              {
               style: {opacity:0.7,width:1.2,color:'#FA2712', fillOpacity:0},
                pointToLayer: function (feature, latlng) {
                  return new L.Polygon(latlng, {
                  });
                },
                }).addTo(map);



    // if (x3 == true){
    //   //LOAD THE TERTIARY DATA
    //      _.each(parsedData_hospital,function(item){
    //         var itemB = L.geoJson(parsedData_hospital,
    //           {
    //             pointToLayer: function (feature, latlngs) {
    //               return new L.circleMarker(latlngs, {
    //                  radius:3,
    //                  fillColor:'#41D0EA',
    //                  color:'#2365D8',
    //                  weight:1,
    //                  opacity:0.3,
    //                  fillOpacity:0.3,
    //                 });
    //               }
    //           }).addTo(map).bindPopup("Hospitals");
    //           Hospitals.push(itemB);
    //
    //         }
    //       );
    //       selectedmaps.push(Hospitals);
    //   }


//LOAD SCHOOL DATA IN DIFFERENT KINDS
      // if (w1 == true){
      //   //LOAD THE SCHOOL DATA
      //   // YOU CAN'T USE INCLUDES BECAUSE BASICA AND PRE-BASICA ALL INCLUDE BASICA!!!
      //   var myFilter1 = function(feature) {
      //       if (
      //         feature.properties.school_typ == "Pre-Básica" ||
      //         feature.properties.school_typ == "Pre-Básica,Básica,Media"
      //       )
      //       {
      //         return true;
      //       }
      //       else {
      //         return false;
      //       }
      //     };
      //
      //   _.each(parsedData_Schools,function(item){
      //       var itemB = L.geoJson(parsedData_Schools,
      //        {
      //          style: {opacity:0.3,width:0.5,color:'#E5EF13'},
      //          filter: myFilter1,
      //          pointToLayer: function (feature, latlngs) {
      //            return new L.circleMarker(latlngs, {
      //               radius:2,
      //               fillColor:'#E5EF13',
      //               color:'#EBA430',
      //               weight:1,
      //               opacity:0.3,
      //               fillOpacity:0.3,
      //              });
      //            }
      //        }).addTo(map).bindPopup("PrimarySchools");
      //        PrimarySchools.push(itemB);
      //
      //      }
      //    );
      //    selectedmaps.push(PrimarySchools);
      // }

      // if (w2 == true){
      //   //LOAD THE SCHOOL DATA
      //   var myFilter2 = function(feature) {
      //       if (
      //         feature.properties.school_typ == "Básica" ||
      //         feature.properties.school_typ == "Pre-Básica,Básica,Media"
      //       )
      //       {
      //         return true;
      //       }
      //       else {
      //         return false;
      //       }
      //     };
      //
      //   _.each(parsedData_Schools,function(item){
      //      var itemB = L.geoJson(parsedData_Schools,
      //        {
      //          style: {opacity:0.3,width:0.5,color:'#E00F12'},
      //          filter: myFilter2,
      //          pointToLayer: function (feature, latlngs) {
      //            return new L.circleMarker(latlngs, {
      //               radius:2,
      //               fillColor:'#E00F12',
      //               color:'#EBA430',
      //               weight:1,
      //               opacity:0.3,
      //               fillOpacity:0.3,
      //              });
      //            }
      //        }).addTo(map).bindPopup("MiddleSchools");
      //        MiddleSchools.push(itemB);
      //
      //      }
      //    );
      //    selectedmaps.push(MiddleSchools);
      // }

      // if (w3 == true){
      //   var myFilter3 = function(feature) {
      //       if (
      //         feature.properties.school_typ == "Media" ||
      //         feature.properties.school_typ == "Pre-Básica,Básica,Media"
      //       )
      //       {
      //         return true;
      //       }
      //       else {
      //         return false;
      //       }
      //     };
      //   }

});


//LOAD THE URBAN HEAT ISLAND ANALYSIS
$('#analysis').click(function(){
  console.log(c1);
  //ZOOM-IN IMAGE OVERLAY LOAD HAZARDS DATA
          HighHazards = L.geoJson(parsedData_highhazards,
            {
              style: {opacity:0.25,width:0.3,color:'#F71C0E', fillColor: '#F71C0E', fillOpacity: 0.2},
              pointToLayer: function (feature, latlng) {
                return new L.Polygon(latlng, {
                });
              },

              // onEachFeature: function(feature,layer){
              //
              //           layer.bindPopup(
              //             "<b>City Name: </b>" +
              //             feature.properties.provincia +
              //             "</br>" +
              //
              //             "<b>Total Area: </b>" +
              //             feature.properties.area_m2.toFixed(5) + "sq meter" +
              //             "</br>" +
              //
              //             "<b>Total Exposure Population: </b>" +
              //             feature.properties.total_expo + " people" +
              //             "</br>" +
              //
              //             "<b>Exposure Population under 5 years old: </b>" +
              //             feature.properties.new_under5.toFixed(2) + " children" +
              //             "</br>" +
              //
              //             "<b>Exposure Population over 65 years old: </b>" +
              //             feature.properties.new_over65.toFixed(2) + " senior population" +
              //             "</br>" +
              //
              //             "</br>" +
              //             "<b>Data Collected Year: </b>" + "2014"
              //           )
                      //  }
              }).addTo(map);


          MediumHazards = L.geoJson(parsedData_mediumhazards,
            {
              style: {opacity:0.25,width:0.3,color:'#E3C715', fillColor: '#E3C715', fillOpacity: 0.2},
              pointToLayer: function (feature, latlng) {
                return new L.Polygon(latlng, {
                });
              },

              // onEachFeature: function(feature,layer){
              //
              //           layer.bindPopup(
              //             "<b>City Name: </b>" +
              //             feature.properties.provincia +
              //             "</br>" +
              //
              //             "<b>Total Area: </b>" +
              //             feature.properties.area_m2.toFixed(5) + "sq meter" +
              //             "</br>" +
              //
              //             "<b>Total Exposure Population: </b>" +
              //             feature.properties.total_expo + " people" +
              //             "</br>" +
              //
              //             "<b>Average Exposure Population (< 5 years old): </b>" +
              //             feature.properties.new_under5.toFixed(2) + " children" +
              //             "</br>" +
              //
              //             "<b>Average Exposure Population (65+ years old): </b>" +
              //             feature.properties.new_over65.toFixed(2) + " senior population" +
              //             "</br>" +
              //
              //             "</br>" +
              //             "<b>Data Collected Year: </b>" + "2014"
              //
              //           )
              //          }

              }).addTo(map);

          LowHazards = L.geoJson(parsedData_lowhazards,
            {
              style: {opacity:0.25,width:0.3,color:'#81EC23', fillColor: '#81EC23', fillOpacity: 0.2},
              pointToLayer: function (feature, latlng) {
                return new L.Polygon(latlng, {
                });
              },

              // onEachFeature: function(feature,layer){
              //
              //           layer.bindPopup(
              //             "<b>City Name: </b>" +
              //             feature.properties.provincia +
              //             "</br>" +
              //
              //             "<b>Total Area: </b>" +
              //             feature.properties.area_m2.toFixed(5) + "sq meter" +
              //             "</br>" +
              //
              //             "<b>Total Exposure Population: </b>" +
              //             feature.properties.total_expo + " people" +
              //             "</br>" +
              //
              //             "<b>Average Exposure Population (< 5 years old): </b>" +
              //             feature.properties.new_under5.toFixed(2) + " children" +
              //             "</br>" +
              //
              //             "<b>Average Exposure Population (65+ years old): </b>" +
              //             feature.properties.new_over65.toFixed(2) + " senior population" +
              //             "</br>" +
              //
              //             "</br>" +
              //             "<b>Data Collected Year: </b>" + "2014"
              //
              //           )
              //          }
              }).addTo(map);


//LOAD THE BOUNDARY
            var boundary = L.geoJson(parsedData_torinoboundary,
              {
                style: {opacity:0.7,width:1.2,color:'#FA2712', fillOpacity:0},
                pointToLayer: function (feature, latlng) {
                  return new L.Polygon(latlng, {
                  });
                },
                }).addTo(map);

});


//REMOVE MAP LAYERS AS REQUESTED
$('#hidemap').click(function(){
  console.log("ready to remove");
  console.log(selectedmaps);
  $('#box2').hide();
  $('#box3').hide();
  $('#box4').hide();
  $('#box5').hide();

  _.each(Greenspaces,function(layer){
    map.removeLayer(layer);
  });

  _.each(Buildings,function(layer){
    map.removeLayer(layer);
  });

  _.each(Railways,function(layer){
    map.removeLayer(layer);
  });

  _.each(Roads,function(layer){
    map.removeLayer(layer);
  });

  map.removeLayer(layerMappedPolygons);
  console.log("removed");
  layerMappedPolygons.addTo(map);
  console.log("reloaded");
});


//4.2 PARSING SPECIFIC DATA
$(document).ready(function(){
  $.ajax(buildings).done(function(data) {
    parsedData_buildings = JSON.parse(data);
    console.log(parsedData_buildings);
    console.log("parsed buildings");
    // console.log(parsedData_secondaryroads.features[0].geometry.coordinates[0][0]);
  });
});

$(document).ready(function(){
  $.ajax(railways).done(function(data) {
    parsedData_railways = JSON.parse(data);
    console.log(parsedData_railways);
    console.log("parsed railways");
    // console.log(parsedData_secondaryroads.features[0].geometry.coordinates[0][0]);
  });
});

$(document).ready(function(){
  $.ajax(roads).done(function(data) {
    parsedData_roads = JSON.parse(data);
    console.log(parsedData_roads);
    console.log("parsed roads");
    // console.log(parsedData_secondaryroads.features[0].geometry.coordinates[0][0]);
  });
});

$(document).ready(function(){
  $.ajax(greenspaces).done(function(data) {
    parsedData_greenspaces = JSON.parse(data);
    console.log(parsedData_greenspaces);
    console.log("parsed greenspaces");
    // console.log(parsedData_secondaryroads.features[0].geometry.coordinates[0][0]);
  });
});

//4.3 LOADING THE HAZARDS DATA
  $(document).ready(function(){
    $.ajax(hazards_h).done(function(data) {
      parsedData_highhazards = JSON.parse(data);
      console.log(parsedData_highhazards);
      console.log("parsed highhazards");
      // console.log(parsedData_majorroads.features[0].geometry.coordinates[0][0]);
    });
  });

  $(document).ready(function(){
    $.ajax(hazards_m).done(function(data) {
      parsedData_mediumhazards = JSON.parse(data);
      console.log(parsedData_mediumhazards);
      console.log("parsed mediumhazards");
      // console.log(parsedData_majorroads.features[0].geometry.coordinates[0][0]);
    });
  });


  $(document).ready(function(){
    $.ajax(hazards_l).done(function(data) {
      parsedData_lowhazards = JSON.parse(data);
      console.log(parsedData_lowhazards);
      console.log("parsed lowhazards");
      // console.log(parsedData_majorroads.features[0].geometry.coordinates[0][0]);
    });
  });



//4.3 EXPORT TABLE
var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    window.location.href = uri + base64(format(template, ctx))
  }
})()

//USE MIT OPEN LICENSE TO EANABLE PDF DOWNLOAD FUNCTION
// https://jsfiddle.net/pdfjs/9engc9mw/?utm_source=website&utm_medium=embed&utm_campaign=9engc9mw
// https://codepen.io/SitePoint/pen/rxPNpG

// GENERATE A MAP IN THE DOWNLOADABLE PDF REPORT
// https://stackoverflow.com/questions/35447928/dynamically-create-image-map-via-javascript

//REALLY GOOD JS PDF REFERENCE
// https://mrrio.github.io/

var PDFvalue = $('#PDFheading').text();
console.log(PDFvalue);

// P_country = layer.feature.properties.country;
// P_department = layer.feature.properties.d_name;
// P_muni = layer.feature.properties.m_name;
// P_pov = layer.feature.properties.gen_pov;
// P_id = layer.feature.properties.id;
// P_year = layer.feature.properties.year;

// var geologo = 'geoadaptive_logo_web.png';

var geologo = 'logo.jpg';

// = L.icon({
//       iconUrl:'marker-icon.png',
//       iconSize:[15,24],
//       iconAnchor:[8,10],
//     });
//

// Since images are loaded asyncronously, we must wait to create
// the pdf until we actually have the image data.
// If we already had the jpeg image binary data loaded into
// a string, we create the pdf without delay.

$('#PrintMap').click(function(){
  console.log("map printed");
  // //000 THE LEAFLET IMAGE PLUGIN
  // var snapshot = document.getElementById('snapshot');
  //
  // document.getElementById('snap').addEventListener('click', function() {
  // leafletImage(map, doImage);
  // });
  // console.log("image drawn");
  //
  // // function doImage(err, canvas) {
  //   var img = document.createElement('img');
  //   var dimensions = map.getSize();
  //   img.width = dimensions.x;
  //   img.height = dimensions.y;
  //   img.src = canvas.toDataURL();
  //   console.log(img.src);
  //   snapshot.innerHTML = '';
  //   snapshot.appendChild(img);
  //   console.log("function ran");
  // // }


  //001 first try leaflet print
  // var printProvider, printControl;
  // printProvider = L.print.provider({
  //           capabilities: printConfig,
  //           method: 'GET',
  //       dpi: 254,
  //       outputFormat: 'pdf',
  //       customParams: {
  //         mapTitle: 'Print Test',
  //         comment: 'Testing Leaflet printing'
  //       }
  //     });
  //
  // // Create a print control with the configured provider and add to the map
  // printControl = L.control.print({
  //   provider: printProvider
  // });
  //
  // map.addControl(printControl);

  //002 then try map print function
//   function printPage(){
//     var nowWidth = $("#map").width(); // get current width of mapdiv
//     var nowHeight = $("#map").height(); // get current height of map div
// //  $('<style>@media print { #map { height: ' + currHeight + 'px; width: ' + currWidth + 'px;} }</style>').appendTo('head'); // add print style with current width and height
// //   // $('#map').css('width', '267mm');
// //   // $('#map').css('height', '210mm');
// // //   map.invalidateSize();
//     var content = window.document.getElementById("map"); // get you map details
//       var newWindow = window.open(); // open a new window
//       console.log("content delivered");
//       newWindow.document.write(content.innerHTML); // write the map into the new window
//       newWindow.print(); // print the new window
//     };
//   // $('#map').print();
//   // $('#map').css('width', nowWidth);
//   // $('#map').css('height', nowHeight);
  //003 easy print plugin please
});

// npm install leaflet-easyprint
// var printer = L.easyPrint({
//       tileLayer: tiles,
//         sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
//           filename: 'myMap',
//             exportOnly: true,
//               hideControlContainer: true
//     }).addTo(map);
//
// var printPlugin = L.easyPrint({
//     	hidden: true,
//     	sizeModes: ['A4Portrait']
//     }).addTo(map);
// printPlugin.printMap('A4Portait');


var tableToPDF = function(){
  console.log("PDF starts");
  // SETTUING THE THE PDF PARAMETERS
  // https://stackoverflow.com/questions/24335372/setting-pdf-page-width-height-when-using-jspdf
  var doc = new jsPDF("1", "", "letter");
  var pageHeight = doc.internal.pageSize.height;
  var pageWidth = doc.internal.pageSize.width;
  console.log(pageHeight);
  console.log(pageWidth);

  //000 THE LEAFLET IMAGE PLUGIN
  // var snapshot = document.getElementById('snapshot');
  //
  // document.getElementById('snap').addEventListener('click', function() {
  // leafletImage(map, doImage);
  // });
  //
  // console.log("image drawn");

  // function doImage(err, canvas) {
    // var img = document.createElement('img');
    // var dimensions = map.getSize();
    // img.width = dimensions.x;
    // img.height = dimensions.y;
    // img.src = canvas.toDataURL();
    // console.log(img.src);
    // snapshot.innerHTML = '';
    // snapshot.appendChild(img);
    // console.log("function ran");
    // doc.addImage(img,'JPEG', 84, 80, 100, 62);
  // }

  //////////////////TO BE FIXED!!!//////
  // function function1() {
  //     var img = document.getElementById("myImg");
  //     var map = document.createElement("map");
  //     map.name = "myMap";
  //
  //     var area = document.createElement("area");
  //     area.shape = "rect";
  //     area.coords = "0,0,100,50"
  //     // area.onmouseover = function(){alert("over")};
  //
  //     map.appendChild(area);
  //
  //     var div = document.getElementById("mapimage");
  //     div.appendChild(map);
  //
  //     img.setAttribute('usermap',"#myMap");
  //     }
  //
  //
  //
  // doc.addImage(div,'JPEG', 174, 40, 48, 32);

////////////////////TO BE FIXED!!!//////


  //THIS MAY  WORK??
  // https://github.com/MrRio/jsPDF/blob/master/examples/images.html

  // var canvas = document.getElementById('canvas');
  // var imgData = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);

  var imgData =
  'data:image/png;base64,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'

  //GEOADAPTIVE COPYRIGHT
  //LOAD IMG LOGO
  // doc.addImage(geologo, 'JPEG', 140, 10, 170, 20);

  // doc.addImage('geoadaptive_logo_web.png', 'PNG', 140, 10, 170, 20);


  // doc.addImage(geologo, 'JPEG', 140, 10, 180, 20);
  // canvas parameters (left, top, canvas width, canvas height)
  // https://github.com/MrRio/jsPDF/issues/434
  // https://github.com/MrRio/jsPDF/blob/master/examples/images.html
  doc.addImage(imgData, 'JPEG', 164, 14, 35, 12, undefined);

  doc.setFontSize(10);
  doc.setFontType("light");
  doc.setFont("inherit");
  doc.text(10, 5, 'DataXLat @ Geoadaptive LLC.');
  doc.text(150,5, '250 Summer St, Boston, MA, USA');
  //DIVIDING LINE
  doc.setLineWidth(1);
  doc.setDrawColor(255,140,40);
  doc.line(0, 8, 240, 8);

  doc.setFont("times");
  doc.setFontSize(18);
  doc.setFontType("bold");
  doc.text(10, 18, 'Urban Heat Island Effect of');
  doc.setTextColor(255,140,40);
  doc.text(110, 18, ' ' + P_muni);
  // doc.text(20, 30, '     ');

  //INTRO
  doc.setFont("times");
  doc.setFontType("normal");
  doc.setFontSize(12);
  doc.setTextColor(0,0,0);
  doc.text(10, 30, 'Following is a brief summary of infrastructure efficiency condition in ');
  doc.text(10, 36, '' + P_muni + ', department of ' + P_department + ', in ' + P_country + '.');
  // doc.text(10, 50, 'this City of ' + P_muni + ' is selected.');




  //INSERT A DYNAMIC MAP!!!
  //REFERENCE:
  //https://stackoverflow.com/questions/35447928/dynamically-create-image-map-via-javascript
  //PLACE HOLDER f39ISEhTq9gUlpaWlFR4Q0xagAMw9RqdWBgYEZGho1fYbPZiYmJGzZszMqaYjDoTSazTqczGAwMwzAMQ9M0SZJms5kgiOjo6Oee2
  // function function1() {
  //   var img = document.getElementById("myImg");
  //   // var img;
  //   var map = document.createElement("map");
  //   map.name = "myMap";
  //
  //   var area = document.createElement("area");
  //   area.shape = "rect";
  //   area.coords = "0,0,100,60";
  //   // area.onmouseover = function(){alert("over")};
  //
  //   map.appendChild(area);
  //
  //   var div = document.getElementById("div");
  //   div.appendChild(map);
  //
  //   img.setAttribute('usemap', "#myMap");
  //   }

    //
    // var newCanvas1 = document.querySelector('#myChart1');
    // var newCanvasImg1 = newCanvas1.toDataURL("image/jpeg", 1.0);
    // doc.addImage(newCanvasImg1,'JPEG', 120, 130, 80, 80);


    // THIS MAY WORK! USING GOOGLE/CARTODB!!!

    // http://staticmapmaker.com/google/
    // https://devblog.mapquest.com/2011/05/11/get-creative-with-the-open-static-maps-api/
    // http://html.com/images/how-to-make-an-image-map/



    // THIS METHOD MAY WORK TOO!!!
    // https://stackoverflow.com/questions/14847573/how-do-i-change-source-url-of-an-image-which-has-been-dynamically-added-to-a-div
    // http://html.com/images/how-to-make-an-image-map/


    // https://jsfiddle.net/epistemex/Lsx53yn2/
    //test 001 - not working!
    // var img = new Image();
    // console.log("image variable");
    // img.onload = function(){
    //   doc.addImage(this,100,100);
    // };
    // img.crossOrigin = "";
    // console.log("image added");
    // img.src = mapURL;
    // console.log("image loaded");


    //test 002 - THIS WORKED! this below part has been moved up for the click layer activity
    // var img = new Image();
    // // var img = document.createElement('img');
    // img.src = mapURL;
    // $('.locationmap').append(img);
    //
    // console.log("appended0");
    // // src="https://maps.googleapis.com/maps/api/staticmap?center=Beijing,China&zoom=13&scale=1&size=320x460&maptype=satellite&format=png&visual_refresh=true"
    // //
    // var imgData1 = img.toDataURL("image/jpeg", 1.0);
    // console.log("appended1");

    // doc.addImage(imgData1,'JPEG', 150, 230, 40, 60, undefined);
    // doc.addImage(img, 'JPEG', 10, 40, 190, 80, undefined);
    //

    // var newCanvas3 = document.querySelector('#myImage1');
    // var newCanvasImg3 = newCanvas3.toDataURL("image/jpeg", 1.0);
    // doc.addImage(newCanvasImg3,'JPEG', 120, 130, 80, 80);


    // var newCanvas1 = document.querySelector('#myChart1');
    // var newCanvasImg1 = newCanvas1.toDataURL("image/jpeg", 1.0);
    // doc.addImage(newCanvasImg1,'JPEG', 120, 130, 80, 80);
    //




  var mapData1 =
'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4RCIRXhpZgAATU0AKgAAAAgABAE7AAIAAAAHAAAISodpAAQAAAABAAAIUpydAAEAAAAOAAAQcuocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFdlbmhhbwAAAAHqHAAHAAAIDAAACGQAAAAAHOoAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFcAZQBuAGgAYQBvAAAA/+EKX2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iLz48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PGRjOmNyZWF0b3I+PHJkZjpTZXEgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOmxpPldlbmhhbzwvcmRmOmxpPjwvcmRmOlNlcT4NCgkJCTwvZGM6Y3JlYXRvcj48L3JkZjpEZXNjcmlwdGlvbj48L3JkZjpSREY+PC94OnhtcG1ldGE+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9J3cnPz7/2wBDAAcFBQYFBAcGBQYIBwcIChELCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJChQLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/wAARCALjBmwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3UiIxNLAN2Oqkcik8vMW08fSpbYBZCABhwQeKrzGTjZ09q53sLZaimCPb6e+ajhYI7Bjj0oMmBllIP0qq5y3XPNS2uhLaTTRoOSqjau4dwKrpJs4YEAnI4pkExVtpPBqdpMnaSM+lPfUrfUkDCUEbTj3HWomtc/dbj3qZPujNKxXox/WnbuNxT3GZKkDcPxp/DD1qPzIhkDH5dajt5VwV75/Oi4c2pMxWPHH3jiqdvE5le7uBiQjCR5/1a+n1Pf8AAdqikke5ug8bFYYjhQD99u5+g/n9BVpZQB868+1F7C5lezHCXecmM/UU8SI3HOPXFNEwPCjGaikbBwDxU3JcrE5O04X86ikkPTvTkDFct+A9adyTTs2OzkV+T70hjLKVK5B4IIq4FJ+90pSme9LlF7Mz7UG2lFtKCUHMD9eO6k+o/UfQ1o+YoHAJPvTHIA2r+dVIbh/MEN0oSX+Ej7sn+7/h/PrTb7DcnsiySWJJ60okZRgHinpErAHd9cUo8kZyfzpWYrMryK3lhux7UfOcHdtwOAKlZ42HzHpzg8UwuHYlRj2oYmktiZc7AWqu675C2Pl9fWlc/uyM4qVRmIA+lPcr4tB9u276jIH1poQCQv1JqJH+z3B3cqc5x296knYxqCpBz0PqKd9Bpq2pHNGm4O4Bx39KgbG47enarFwjSRjb681XVSeBzUyIqbjSQoyelNEgIyOfxqfyiB+8BGehqPygp2gD8KkiwgORS01lKdOPakD+opCJApbpQRg4qZNhUELn3zT/ACo36D9arlZpyMq0VJKhjwOq9qjpENWClZWX7wxSxnbIpPTNXaaVyox5kUKapJHNWLjb5gA696jO0DA5PrSZLVnYbRRRSEMZST61MmBGaZTlQt0pjIkPzGpUUO2CcelNK7SfWgcmgOpY8oL/AAgUx2AGF+8D1FKUBGP1qNlCjrzVNluWhYhlL5Ddh1qdgWYbQSAAM/hWcvyklSQT6GnxStExIzyMHmhSGp9zRKlYv4WAPPfFM3L3QY9iagt7jLkP0PFTlDjI+Yeoq73NE0wZcYIOQehqnLEwYsOQTV2P5sqeh5z6e9MoauEo3KHOcYOfpQCD05q1LnjBwdrc+nHWoXDqBvCMSOrJzXJKU1Nxir2F7KKjdsbEcbmPzJkAqBnNEjhyNiFcHuf6UqMzSKpcIpYZKgDHNJISZGJGDk5A7VEKT5nOW451Fy8sdjH1pvO1zSYXs769i+yXTNBZ3IhOQ8ADkmRAQAxHU/e6VBda7rGg6FscR3NxZ2015NFOr3EghDuUVpdygEKAu/LkkHg9Tu7FaRZPLVpERkV9vzKrEFhn0JVfyFR3WmafqFvu1LTra7ZPkjaeENgHqOe1ddyFU2uMs9VvL7UZZoPscFjBdramKcMJnyqncH3YB+cYXacjuM1jaJq97pvhrSFv5bJ4ZdDFzA/lSAxmMQqA5BYvnzQeAORjvmulXT7D7YmoGwthdooAnMQ3qAMdevTj6VA9vaPBHAbK2MMUBtkjaIFViO3KYP8ACdi8ewqm7FuSW5jQard6jqVpaahEiXFlq8alliMW9Wt5GHyF2weT/Ee3TpW1ojT3nhWwuBEcyW6khWZ8fixJP4k0lhYabZ4Ftp1pb4cSAxxBfnAKhvrgkZ960YY0t7WKO1RYoohtRYxgKOwFC1QXUloUCCDgjFS25Hmc9ccVZnT7Ufl+WYduz/T39qjtIQWLyjCpyc9qm2pko2kX4UVIjnl2Gdvcio7jdGQXf5jyQDwKjdy7lj3qGTl0B+6TzWjehqywk7rjJ3AHOG5omQlTJF8ykcc5x7Go6ltyRLkZwASfcUeQzNd2Y/MfwojyJFxxzVnygZS7c88CobhcSZ9RWTTWpi4taskmYlSFxtHBqFJWTvkelSwLuiYHoTTXiSNDkkntTd9xu794VjvkxE2ARk0oilB/1nFEWI4TIetBufRf1o06hpuxqwuzkuce/rUkDllIY5IqJp2ZccD6UxHKNkUrpMXMk9C7SmQgZbGB3IFMRw65FMuP9V+NaX0NW9LkyzLOdoOGUcdgf8KCCpwRg1Rjco2V59quq/mQK/pkH2/zzSTuTGVwoqIzoBwcn0xTo5RIOmD3ouiuZXsPooopjCiiigAooooAKKKKACiopZWjIwBg+tRfaH9B+VK6Jc0ieRA6479qgUFY2VxjbwPof/r1Ikqhdzvknt6Ux5t5GxeenPOfbFY1Y8yvHdFRlFPXqJARvwe9WGXd3xUCQ7WBAcc9ODj8ak3sG7/RsZP0xUqskveTXyKjTaVriklAAOnrSjcw9KVSTyenalZgiknjFdN1a4iFvlzu4xSB5NwUALn8TSrkTR7juyecjocf/XqJy6s7DGAcc1EKsZRUokVE4uxYjXa7DJbODk/59qkqBJlJVjwD8pPb2qXzEPRl/Otnd6gmhs7bYzjvxVSrFyPlU9s1Ao3MB6msJbmU/iHRsytlRn8KuxZK73Uqo/vDrSsAmUjAUA447+9V5Pl6tyelWlY0S5UJI5uJgueB1NP86NTjPT2qFisa7Y+fU1AFJbk1N7Ec1izJcZ4T86bGQSFJwSetRVYgKbQONx9qW7EryepckyiRmM4TaFGD+YpiyMuOhx6inROA2xyNj8EH+dRuGUkdwcVqbgPmZUPc/KfQ01m2+5PQUiMA5LMNwHAyOTRCA0zeYwDHoBzgUiW+g0LgkNyW61HDGDIc87envVg4HJ/lVN2HmEpwO1S7ImVlYuCJWff0KjOf5VSZSrEGrVtNuJWQ9eDRLCzSYYgAelDV1dBJKSuioB6CgjPBq0QY1xEmfem+SSrNJy2OlTykcjK9FFFSQW7RmjUkHcrdUPQ1YaNSheLoPvKeq1Utt20/3e1W4TtWRvRcY9c1tHY6I7ELrvUg1TI2sQDnHep7iT+AfjUAGQaiW5nNpsazYHvTUXuaJO1OHQVBmZ17q08OrnT7ZdPXZbRTl7y6aIuXaRcKApzjy/1q9aXxl/tE3SpGljcNFlAfuLGjkn1PzH9Kz73S55dZOoWzae2+2igKXlq0pUo0jZUhhjPmfoK0rSwWIXq3LiUX0zSSBVKgBo1Qjr/sn860idEbdCHTtTvp0tri80yO2srqIyrKtwXaAbdw80FQBkehODxz1qT/AISPSBbyzPdSRrE0auslrKr5kOEIUruIYggEAg4NRWmk6ksEVlJreIIIGhiaCApI2U2K0jFiCVHPAGSM+1UbLwjLBffap763Lf6LlYbd13eTKz5JZ2JZt3XtVal6Gq3iKwbzIrSQtJFNBDN50EsaqZHRQpOzhsSLhfU84GSFTxDpzXstqZ7iGWKJpnFxZzQjy1OC25lAIyR0NJNou+G6QXAAutSgvwdn3RG8TbOvU+Uefeqcei6qX1Uz6pbiTUVdftMMDrNCMERqp34CrnoMZJJzkk0ahoWn8QwyiD7EfNZr2O2mS5gkieMMCc7WCsOMYPStGZ8ECLbnHzBjjFc9p/hR7W8e5lu7cNJcW85jt4GRR5QYY+ZmJJ3dc1szq3mFiOOxpNuxE3ZaCOZVOWLDPT3qeA5j65Oec1XRwFKP90+nUH1qzFHsjyDkE/eHepjuRDcczbVJ9BVdRuG5+Seg9KdcS7VKrySKjhH7sZbHJzmn1KbTlYlBIGBxSqfnFMLoP4ifoKcjjeFUE56k07ormRNRTWfaRxmlDBun5Uwur2FkeOCB5pjhI1LscdABk1xs3iy7g1CHUL+3Nvp76RLcxW8VwZDIWlhCbhtAVvnxxuA3Hmuz+8NpAI9659PDelW7MptZXBt2tQktzI6rExU7VBPygFBjGMYqZXBtLcgtPEUmp3mloENsU1JopfKlZ45kNpMw5KqWAIGQV4Kj2NWr65nudWvIE1C7sraxtYZsWMAllleRnGSuxiQNg4A7nPSrlvpFrCIXf7RI8ExnRp7l5WDmNo+rE8bXIx+PWnXWl2l/Kk0onimjXyxLbXDwuUznaSpGRnnnp2pq9hpmeviWV9PV7G2j1MW1lHd3c4c2+5WDf6tGUksdjHaxUDgZqhe397di8isppHguNZt4QftLwssTW0D7VZQSoJJJxjqfWtu48N6TJDDEbaSOOOBbcpDO6CSIZwj4Pzjk9c9T6mpZLCyEzMIMM9yl22GIHmKiopx6bUAxQ79QbSM6PW3muYWFlssLi6e0huftBLl1LLlkK8KShAO4npkCtAsSME1XXR7KPUBdQwSGUSNMqec5jSRs7nEedoY5POO59TVzyZEkXcp65qNzCVnsJ+9jx1A7VIWkLbWwPXFPlkCLzyewpI1MntnuaduiKatohUDNlQAy989vxqfcQOQNp44HFRAZHIwM5C9hThx93j6Va0LirIcoVuOVPbJ4pRECpVhlmHABqJ2ww9CKXJ2/KcEjg0yiNLbDct8ueCDkHnpUk/8ArFXqFGKAMAAdFOQKdL8pLfwnkGklYmKsNjOIgv4D6ZIpoyQwNLF/EvY/Mv49f1/nTqqW41sQQxKVJYZIOMelSLGqHKjmnYppBVSQSTUWSEopIJJBGOevYVQ1FrSZI/tyZMMLyptlKHOQMD8qveSpOXJY1UuI5ftrIlnDdRLboT5zhQmWfoSDUydldlR5nISSJTbXFvC1xMFkiUmSYvwcE49Bg81oVSDSW8EIWzhsjNcYMakEEbc5GAOeKu046RQ3uNdtqE+lQrC727+TIUlkRgrZ6Ejg1LIhdcZwKbPCJLCeLesYMTDe5wF9yfSn1ItdmdAiS3EP2e28qSDYHYTIyxqrEkDaSSTkg5rUWRZMlfyqhbQiee3kS2tLZQ5KyxTK28AHKrgDPvmpTmKQ7T0qb2CUmmXKKijmD8Hhqlqyk09go/iDYG5RgNjkfjRRQAoAJYlVJPUlRzxj+VRW92l3cXkUIfzLOYQSFlAyTGkgx7YkH45qUEBT61y+raXeyyX+dO+2W1xqiSsm1JC0QtIk3BHYK3zrj5s46gcA0ajOhvbuHT7GW5u8rDCuWCpuOMgABR15NMs9Vtr+dre3E0U8CBzDcW7QuFJPzAMBkZBGRWJBpepN8Ol02dJUvhGYwhZS6AS/LzyvCgeo4qfVtFmGn3UiSXOsXkoiiY3Pl58kSZYKiiNG4JOD97AByOKLsDfEbAKBGMKcqNo4PtSHIOCOc5PHf1rgZNBuX0RdNvvDkk8D30xRjDbtJZ2xCsRGN21C54G0/LyeoAruoVRLWFYoTboI1CwkAGMY4UgEjjpxRdgP7AYGFOQMDg+oqGeQjgHJPJqamsiscsAaHqiZJtaDIGzF83bvTo5PMzgYApskieWwBHpxRb/6v8anyJT1SJaQ8g0tIehxVFkaLk81LTUXA560pIHU0ADfdOKZH1PrTyeMjmmDA+Y9TQBJRSK26loAKKKKACgHHSiigBhkO7pQr568U7AznvQUHcUAKTjrTd6+tJs9+PSl2L6UAEdwiurAj5TnBp06LuBVsIw3L9KqworSkHkAVd2ia3MR6r8yf1FKLbREW2rlKSZVyM7qqnqaVh+8IHPNP2jbg1m3cyk23qRqMnFWIEw4J6dc0wLtp25tu3pQgVr6lveM9aGjRuSoNVN7BQAelT+YWUdq0TTNlJS0IpYuP3WeOoNVpHQSxxMuWkz07ADk/wAh+NTyK3ncfxVEYm+0ySFeFQIh9cnLH+X5VNjNxu9B8SRxKAq4CjAUDpSk7jk0wsVOHHNTebHCqlgOe5GaSVyUmxgBLAL1pJFZGAI5pTJ++EgBC+wpS/mxuf7p4osOyHibC8D5vX0pomYHAxk+1MyNvzA5/IVOqALuxtz607Mq0nq2OjJU4Y5Y+9JLNtbav40KEWTczgnoAKY0e5iRxk03toOTsrIeDkVK0MUkJjlQODzyO/Y1A3CccUgnc4HH1pJpExaW5G1wYpC0ykW/Qup+6f8AaHYe/wCdW1RThgcjqOeKqyAA4/Oooz9iiP2eIsoOfLU/njPH4UJoFJLcTW9Y/syG3xHAWnnEKyXUvlQxnaWyzYOM7cAY5JAqOTWobW0SbWI2tJTvykCvcqUU/wCsBRc7MEHcwGM81JM0upRg6bdRRFSd8c8PmRyjGCrrkEEdev1BrKm8HzNp8dtHqFuqfvy8LWzeQhlOcxxhxt28gZJ+8TxT1ZrpJGjNrelpdG1a7JkDxoWWGRo1aQAplwu0btwwSec4qTXNUfRtJE1vateXLuI4LdW2mQ4LNg+yqx/CqVv4c8nSJrT7YG81rU7xGePJWMdM9/L/AAzVjUdITU7+2ubqW4ENsjiOKCaSFvMYjLl0YHhRgD/aNLYlcqYl1rWl26RyzXb7ZoPtSeXbyS/uf752KcLzyT0oTXbBnvoZJJY47JIy0zxPsbeRjYcc5JAAGd2eM1Hp/hw2UMsIu90P2SW0gVlJaONnLKCSedoO33AFM/4R6Ry/l30aDZbPGTASUlgIIJ+bBU7eRweetOwcsUWh4h00W4LXMuXlMCxi0l83eE37TFt3g7eenIpItY08RCYXUP2U2v2jzjvDY37fu7fXjGd2eMUyz0dzrEeqXd7HLdCczSiKEohHkmJVUEk8Zzkk5qq/hgNG0RvdrBSY3EOdri589WIJ5AOAR3xQNqNjbs7+11GJ2tXdvLbZIksTxOhxnDI4DDIOeRzTjAd3y5yO9V9Osp4Li6vL64jnurvZu8mMxoioCFABJOeSSSe/tWgWJ707XG4pkaru+SVcnsaa1mh6E/jUuTT6dkHKnuU3tMdMVEFeJsqSB7Ve60jKG9j61PL2IcOxRkmZiNwphyx9BV426leMZqIx5G1RzUtMhxfUZCu6QZP/ANerlU3jaMjP4EVLDIxba/4GnF20Kg7aMmIHXHNU5GLOSRj2q7TSit94A1TVy5RuVAwVeBzTamNs275SMe9KLY/xN+VRZmPLIhz8uMfjUkZyAB1JqMjDEdeakWNsK8Rz/SkgW48wAFyeRjioUYL1FWVY+WxlqpTY5WWxMu6QHZgY9aY0br94fjU1sMKT6mn7s5Uj5sdPWnbQpRTWpSJwOaWlEZlfCAk+gqwln8p3uAwHCjn9alJszUW9itVu33Kmdx9vaqu05xjmp41lCkDAHbNOO5UNGWgxZWB9M9KZUcczLIA6c+3enzjaMD7rEAH2JxVyklFy7G8feehFne2SeDz/AMBHT8zUNxL5mFQdO9ThA6NnjJ7dscUw23Bw2T24rClF8t3u9Qq3bsthkcRIAAyTwBTriMrMx6gk8ip7b7pfuP0p1bKOhkoJorWxInC44PX6U64cm4Vm6DoBTpMpIsqjOOo9RSXgAKbTkEZFLZA1ZNEjKJExng1TZSrEHqKljnKgBhkUT7WCspB7UOzVxStJXIatW0+MIR2x9RTGiUQBh165qOE4mWkrpiV4suyICOOVPQ+lRzSzeWscjZ3nk4HI7VKhO7AOAetV7qTzJMAc9eO1W9jSW1yUkKMk4FVpJyzDbwAc0xpGYYY9KbUuVyJTvsXBMmB83WpEco4Ze1Z9WlmU7VQfMSAFpqRUZ33JboeXiWI/I3QH+VV2ZplACc561PdHcRDEvyBjls5zQBgADoKbV2OzbBRtUAdqqSZaQtjgnrU00jJwCOfzpLZhtYMQAOcmk9XYUrN2JWQMm09KaIIx2z9TT/OBBEKbvVmqNpHA4jOaehXu7kcsJ8weWvUUx42T7w4p/wBocHlRTJJTJ14HpUOxk+XoNDFTlTipwjzICzDHsKrE4q5ApWMZ780RCGrsOSNUHyj8aZJPsbZjKnhh61KDnpVT5TcHceM1T02NJaKyGyJsYjqOxx1FLHKY84AOatTAPbcY+Xj/AD+tUqlqzM2uV6Ey3DbvmwRVmqsMZZgxHyirVVG5pC9tQoooqiwoopMc0ALSClooAhuRlAfQ1Wq8QGBB6Gq0sOwZXp79qiS6mU4vciqSEqsmX444pYE3Nk9BVgopbJAJoS6ijF7ihgRkEYpsn3Qf7pBp6xIxyQBjnpRJGSoIOR7U5R5otM3TadyFZAq7VeMgdPn7UhJLZ7+u3oPbNPMbChY2dgADWCoyaSnK6L51ukRop8w4BJBDHn2Ip8nzfKY2bvjipysagDarEdyKhZV6np12joaPZ1IXULWYc0ZfERxRhJe6HH3SetSy/wCqcnsD1phX5Bt3bfQckHtipIx5T/vEIBHKsN2ffH86I1ZU5WqL59A5E17o2Vf3OB2xTYIdpWST6qvrU0cZSRUyHiI+Vwew7c/lmkuJNhY8HnAxXTKNncwsm7sQFmbJ4FQXC4YNnOf0pDcOemBTXkaTG7tUNpomUk0MpSc9OBSUVBkKBnuB9acj+U3GDSIQGyaGbceBimPYe7E/Mxw3YVZu2ZoEk6F1Gfr0NV1uPlw67qtyqTbxpIMEgsRnkZq1qmaLW9mVY41KBt2D3p37lcYbBBzkHmo2j3SERDgdakFsvck0kCv0RYDiSNsEHBzwKiZVAJ2Zz1wKZBIkdwyD7rfKD6GpXYRthzg5xVXui000QLHGzfK5qxk4GTnAxzUMyq6llIyOuKS3cklSeMcUlo7Ep2diekOdwx070tFUaFdoxubPrSKuBhfmqywVl5FIBjhR+VTymfJqIAUjwBkgdKcrslq7SDqyjj8akEBAzIRGP9rr+VNmZPIMaZI6knvVWsXbsUZW3yEg5HamUUVkcz1EIywNLRRSAeNqKGbkk8e1S1UY4JGakhdlkDMc59atNI2Ukki7AuG54JBA9qf5bd/l+pxTabLIwGerHgZqzR6EshUYVPugZye/FMoWRJMBvlbHXtSSnygd3agV1a4tMkXfGQOtKh3ICRjNNkfaMZx60nsDasVMetXbdNsblWypHP1pkUJlbLDCjsf6095VVNsQyAeOOp9aUVbVmcVbViNEjnJHPrTDGIzgU5ZWUc4J9cVE8vzHuaTaCTixi4JLNUked248f4VCOWC1aQAq27pRFBBdSNnyC3r0pYUccnIzSxKCxZRhe1TU0upUY9WOXrUUmAxI6np7U+n4VUBIyxHccDmqLIFJKEYJp8K5wDxk/lTwykYYY9CoFNeYAYTgfz+tMBZGEpJAwVPboRUGPMZmzhRxmno4CsHz83pUbvxjgAdFHapkzOT6EbMW/dxggd/VvrV3aTGv0/SorePoT1PJPoKmc5Ue5zj27f1oihxVhgRC/Vd3rj+tKQVD5HIGMH34pKOSeST9TTLCiiigCNsleezEfyP9aVeX9gop0i5iyOzZP6f4UijHPfAoAdRP2Reinn3NAODxSy4aPeBg55FMBkAxH5jDluBx90en19fwpx61HbDNw2OBtIOD1J5/w/OnswXrVT3JjsLQTnrSA56UtQUFVr5dRwPsmfIC7mWLHmE/8C4x+tWao30ED3BNzpcc4CqTKZUUkYx0JB9vwqZq6KjuOggaS2sXLSFomLy+cW3F9hU/e9zVyqNsskclpC5ICRSts378AupQZ74Xir1UthdQqC/QPp0oZwnKYJQuCd4wMDk56Y96kkk8tc9ajcfa4DHueFtyurqAcFTkdfelfoTdXsVtPhka4lu2+yMZmbc6xMkiHGNuD05H61dWJFGNoPuRUdray20jtJdtMJSzlXjUEngE5HpxU9CQ3ZsaEUHIUA/SnUUUwCiio3Rnb7xVfbvQDJKTIzjPPpUDoqMuMkn1qRY8sr5pX1J5new/POO9L1qB1dZgwPDHGalGGXk4FA0yQSLtG8BtvTmhgPvKcqehqlL0FWI5VdhEvcZHHf0oUrkqdx9MkQumAcU+kbOw44PrTLexUkTy2Aznip7cYiz6moMrty3zMasxDEYFRHcyh8Q+iiirNRGYL1qPDMc4p5QFsmlJ2igBiqwanFAfak356DmnAEdTk0APVABSE5NBbNMkOFoAAwLYFOqOMck1JQAUUUUAPUYFDHimZNFABRTWfaaUHIoArW5xL9RVrJH3SQexHaqUcwjk57jr6VPseeVEVyu44OKmOxnD4QeEXKmeNgGAAcbcAnpURgcHoD+NWhJDHEIYmJOcsSMZo3DGc8U+VByJkIt+QS314pskO1hgnBpZLghsJjA/WmG4B++PyqfdF7mwhiI+6c/WnQbjlWGCPWlidZWwMj60srgTLxwtPRaoei1Q91WNS7nCqCSfQU203SWcbzAb3G4jGMZ5A/DpVe7b7VA0JOxX4PqR3H5VN9pPHyj3p8yHzoWa3LyAjp/Kka0V8h84xipPMY+mPpQXJHpSuhXiItuBGI/4cYpwSONQvT6momk29zRsDKWfOewouHN2RKViHv7YpsjDbuP4Cm/dT1xUDEsOTUtkuTYb9zE1MzhRxyagUYHNLgngdaRA5nLdabTcFc55NOHI54oEOVCwzmlWPn5qRH254pNx55oGH2aEXHnKdj4wSpxu+vrVazvpbrU9UtbiU4ivlihUgcL9nhbAx15Zj+NWKqHR7WbUpLpWu45JpFkkWO7dI3ZVVQSoOOiKPwpplRfQpweLFa5uLUWBmK201xbrazea03lkAoflChjuGNrMOvOcZ1NE1U6taTM0cULxN5ZNvceaBkZ7qrKw9GUfiKpnwxpVmoZLO4uFEbw+WbqRhHG+NwRSeBlR0wfStHTLSztoZHsXll85g0ks0zSuxAwASxJGBxirVzfQxbeW8sdQ1+a41S+vINJjWSO3kaMCQGDeQxCZ6+lWW1u/2NHFpEbTpard3Ef2zAjiYttCts+ZzsbjgDH3q1W020k+37oSf7QQJc/OfnATZx6fL6VHe6Jp+obWuY5VKx+QTDO8ZeL+420jcvsfU+posDSZgy+M4IJp0giaXzbiNLfz5diBWtklJJWMso+bphjk9h0kl8XHbZSLphSO4i3s9zceSN28oUQldrNxn5imQR64q5B4bhaa/mvwqvPdieD7HK8ZgVYliXDDBBKqcjpzinzaHp15NGk0dwFVBEw+1SfvVBJAk+b5+SeueppO4nypWNZMAbQc7TinVXddkjM55z2qWLJj+Y59KaZMZdB460pPpSUAZpmgUUEYpwAVQW5J6CgQ2jvnHNPKhuUwPVSelDsYlAxtOMn1pgVbg4ZcjgVEZDvBHbpVm4bcVU9wCfypiRq/YYFZtamMk3LQkjfemcYp1LtCqMlUB+6CcZpOnWrNkFNDqxKhuaZO+2PA71VqXKxnKdnYtxxCMk5yaeABnAxnmo4Q4Hz9McZqWmti42sVp3IJQcDv70qW+Rlzj2p7Q7pQxPHcUlw2I8Z5J6UrdWQ1u2NeQBdkOc+1S+QZIUMh2nHBNJaNticrw2Rk+1NmlLIdxOSfzo6XBaq7F8pYlIVyXbjK8cU6KYpIY2+YEYLdxVdBIvB/XtUiMY2O9fqaL9hXXQsNEAd4wR6ikoR8jch6+lKXfHDkH61WhqJSSMfK28HJAGfWoxdOr7ZlDjv6/nRI4OGQ5AJxkY3H0rGtNRgx0/ekGN0T5O0Fic/jUUbSBSV5UDvSyI5ZUAO0ACpwiqm3t3pwi1FLsRL3pNkVvJgybuhGf1FTRsrbjyVHAx3NVY8CbA+6SVz9eKuJFshVcgNjJB9TVxuRBvYjndAoBDcn+9/9aoZ5RI4wPlUYFTXC4jO76iqdKTYpt3CnxhWf5zgUyipMy3+7kGwcgDtUDoYXBBz6UsMoTIbpUsmJIg3OOtVujXSSv1FiuQZFBGNxwfxqCYbZjVmNBIgCYGR19Peorsgybh3zTd7BJPl1K9WI4UZATk5/Sq9PjlMfuPSpVupEWk9QkjMbe3Y0+0x9rj3YABzzTnnVkIAOT61ADtOVNGiY3ZPQuiN4vlk5brUUs207U69zRMztBDIC2Cu049QT/TFQiGU/wN+VU30RTk7WQwkk5PJqRlKQDcMFzkZ9PX9akggB3GXjB24x3qVo03LjlVGACPxpKLJUW1cbDgRDBzUlHTpRVm60RWuEw24dDUNSzvufaOgqKsnuc8rX0HRrukAPSrhYKOTgVRBIORwaUksck5pp2HGXKixbt8hBPQ1A+N529M8U2lVSzADrRe+gm7qxYtmQo0bHG/j/AAqtT2jZOo49RVpoUkQSY+8Mkjsadmx2b0K8UrAheCPerROBk1D9mX1NPdSISqDPHemro0jdLUeDnpRVOIyK/wAmSO4q6ASucYGOcnFNO44yuhKOi7mOF7k0m+MAkyLgenNVp5fNYbc7VGBmhuwSkkid5FTB3hvZef8A9VNFwhbqwH+7VdI2c8DjualMiRHai59TmpuyOZvVlkDIypDD1FBjYrypwfXiqRkbzN4OD7UedIWzuNPmQ/aIspbugYKQeeMEZqRE2puc9eg9ahE+I92RuHapSxflutUrdC1bZEm0KpI6N0P86YGZc7WI+lJVRZmiyp5+tDdhOSW5d35xvGSO+aC5xgAKPaqSzFmyz4HtVkfOnpmkncFJMCN/filAA6CozMicDn6UomDfcBJouh8yJBVkos/BGQOhB/p64qtUqERxkn7zdOKrR6MZTkBV1OcAMdzfQ/1FSB1clcZGM9ODTnXe24khv7wPNRJhJOcDPBx0z/8AXFc8W6TUJbdC2ubVbg1uD904qKWPyyOc5q3UM8ZfBXt2rVrQwlFW0GQLG33uW9DUjx7yBwqio4I237iCMetEnmSN0bb2FLoJfDqhhZRwFH40gzIwUAA08277c8Z9KZhopAcg+1K3ciz6l20iWMszAMwUkfWobiclmHO49TTIp9lyJGGRyCPY8VJdw4YOh3KwyCPSqv7uhd9NAgZTHgcEdakyPWqPQ8HFSNMWUjAGfQUlLQIzVtRmdr5HY8VdnAeAMfT9RVJVLHCjJq6iMLdN3Ixz7c0RFDqijk4I7GnxvskB7d6R0KMQaIwDIu7pmp6kK9y7QaKK1OkKkhO3e44KqcH68f1qOpE5hlx1wD+GaaAjJJOTyaiuG2x47mparXJ+ZfpUy2Jk7IiVSxp8igKMCiNgFOfWmu+72FZmA2ik3DPWlpCGsuTmmlsnHQVJUb4zx1oGaSkFQQcioX/fS7QcBe9Mtm2xM57cCnQLucua0vc1veyJCojXjOfU0spDWgLdRx/hTiAetOwjxlHyAehFV0sW1pZEIlyoEa7jj8qI4CzF5SMDk+gqcQpH8ocYHXg5pkz5AVRhfSlbuS9rsSWUFdkfC/zqHcB3FNkbC47moqhu5k5XY8uWOFpfL7A896Io2Y5HA9TUuAo2jn1PrQlcqMb7kUSFclhyTVlFwvI601F7mnk4GTWhqlZWHKu5gowPSmlT3Ybf9nkmliO9ueMc8VWnmZpW25UZ6ChuyFKVizvWIcMQT1JNDMT945+tUQcMD1+tWFuAw5GD6etSpXEpp7itJsGJB17g0wnONnA9+9TbVfDFQfqKcMDoB+VPUdm+pA/y8t1I4qKNDK/8zV0IrjLjKj9aAQP4R+AxS5SeTUcBtjA6bhkn0AppO4+g7Cgvldu3A9c5/CkqzQKKKcowMmkA2mpkrzQWy+3t3p6LuPPAHU+lACD7w9Of5U7Zj752+3enhlH3Bj3J5qJ5AOhOfY0wHFRtyrZGccimI6yB4wecZ/KnK7FQQAcjnjPNV45JPMzFFz/EFXOfX6Um7EydiRYwrFt7LxzimlmPKt5hGOHXkj8eacWWRshgoHOxuDSMy5DKckehpqeo7XQ9CjKTHxg4ZT1BpaYJVDoRzv4PuOtSMNrYptdQQlUrmCQ3E5W0guo7h0ch5ChXaAMHg5HGfxNXaKkopW9slotu8jqXVGiO3hQS2cAenYVdqCQLJFMB0ONp/wBsdMfpUsb+ZEr4K7hkg9R7VhRlfmj2Zc1sxrQqWLd/ekdGCxJHKIpZZdisY94+6xxjI9KlAz0pt1CLmOJXaRdh3qY3KkHBHUe2a3sjKyvcitvMe7ikkvI5s2rGEJCY8qzLzyT6CrRZujjP+91FVbK0jspN0bSyYj8tRI5YKvoPSrBJJySSfejoUKCp4YbfcU7ywMBm5boAM01BlhkcdaVSS5bqQM0xAyojEEliPTimU98+WCwwRx9RVJpHWQnOCe1JuxLkkSyxn769R2pkLMzEAgfh1oSc7T5jZx0GKiB5LZx9KhtXuZtq90WnBO3HZgaifImA/h7U+Dd5fzevFLJyUHcmm9i3rG5DL938ajRijhl6g5qafqFUdPSqqkknNQYvc043FwnygB8/TNJVa2fDFfWrjfOofv0atU7o3i7ormBTJu7elOB/enFOY4WmxjnNFhpJD6KUgAcHNJQMZI+0cDJpsZMigt0xTyoY5NRecVYjb8ucUr2E2kTABelKetMEqkHGd3oR0pnmFeByfSi6FzInAJ6Ux1LYxTQ8hGAu2lXCD5m3H3ouNO45V2ilprS5HFM8w0xktFFFABRRRQAYpCwHU0tRuDuoApIpaUBvXmtKV3t7FGz5bZPynq3vUqwbpobiPBbOSvfGcGqlzAJWJyd2epOc0rNIzSaWhURm8wvsJz6CkeUswPTHarsceFAbGcdqRoUfkAE0rOwcrtYptuKBscUkaeYxBOOKuiM9MYFOSJEOVAz60uUPZkNvCUfcT2xRImXLdeeasMQq579hVd22jjrQ7LQUrJWKbsJdRCr92CPP4t/gB+tWY13HntVeEpNGJYl2iTnOOW7A/lirSjy15qTMczBRzTPM3cKMe/pUEjlmOafFCXXPTmmtWVFXZIio745OOc1ITmnLCI4iQOtJjjNNly00QyQ4X3NQ0vJPqaCCDg1JkJUo+SPPemxruPPaic/Lj2oAjVt7Y7mpzEAMd6rxYDZ96suWPTrQBH5bU4RDuc0udv3jR5i+tAaDY1BmCnkVIbf5sq2BTFdRKpX6GrJYKMk4qklY0ik1qABH8RI96iaOGKbz9uJCMErxu+vrTklDyMAeMcVDO26QAHpVX0KckloXbaVWij80KjsSowSR378c4GaklZS21jg9ck9DUMK7AFGc9AR61XuI5EgUWSCYR/eQP8wA9PX8aq+g9Sc8VBGu2dg3JxnNMhuxcRmS3+bHEiYwUPuOop8EuZiT1bpUN6kuSbRK6hoy3cdaSAKIxk7SSSB3I9adcR7oywHzfzqIxNJIJPuggde3tR1DXmLGF9W/L/69GVHQMffOKbRVmg7KejfnSM24kn/9VJTJPu9cAdaQDgwbpTk2mTDdOpquZNi/IM+5qNJXXcwPJPOanmRDmi3JFHIzFiwY/wAR/wAKihVom+fBU/dweGNNgkySGPJ5qQBIvQZo31Fo9UR3QZmD9fWmJPJHweRjowzVqkIDdQD9aLa3G463Qiv5kYJRVP0z/Okkdo0ypYn/AHqfTTtI3HtVFWK5vpccFvzqeO5cqCcnI6E1WdQq++aFJK7ULZ7ioUmZKbvqXVaNxxlT+dRtah2JDbifQ1WaN4cMOCe4qSO43cN19Kd09y7p6MmjgMG9nJAIxyMVGo+bnoOaVm3UhXEZz1YYFVsitIoRmzIvualdN4x0qBiAy59anZ1UZY4qURHVO4qgKoA7UtUnfdIWHHpUsUjFSPvHtmk5pK7HGV3ZCygGUEHAHBP+HvSMzR4bAAP8PoPSkdtgG0+oB/maiJJOScmueCcn7SXyKqSUfciTm5G7gcY/WmqZJuCcL3qSKMGIbhnvSyN5aYUcngCunXqRZ2u2RzFVURrVlzwHbjcNx/rUUNvh98hzjk0lzJlSO57ego21HqrtjAyyRbZCfl4DDn9KidSjFT1H606M4zmjerqFkyMfdYdvao3MSOlA3MAO9PaHbGXDq3PQHt61HQIc6Mn3hUkUjgYVdwHWnofOiKt1Hen20JTJkGF9c9apLXQ0UdboWEbLfGMbucegqG4xgZ+8alnkwh9TwKYwV4NxHOOKb7FvaxWq0sSRj5sEn1qNoPlBj54p28GPEw+Ydj3pLTciKtuNeDClkOR6VDRRUkO3QsWkrIzJgmNhhgDj8RSy2jxMdrbg3QjuKrhipyDitG3YvGIpOd3Q+hq42ehcUnoMiUmAlsBuM8+nFFRSeajZXkemKdGs0qFgoUY6mnfoaJ20H1FJMFBCnLfypqB5CwdyMHkYpk8QTBXpSbdhOTtdEXWinhFCqXYjd0wM8UoZE5UFm7bhwPw71BjYjop/nOfvEMfVlBpWTc25CuDzjcBj25oAjqzbphSx6npTYbcvJhio9Bu+9VjGOMYxVRXU0hHqFHmeUpbtjketFQ3JOwD1NW9DRuyuWB5bgMrYB7YzSM6IpO3IHcmoEmQRgHggdMVHNLvwF6d6XNoS5Kw5blkYtEiqSevJpJZZZzhhx2UDipLcjy/x5oll2DA+9/Kp6E20u2QKmZAjHFTmKIdePxqrSgE5wOlJMhNLoWyVC4DBeOKqEYOOtSJAzdflHvUhSOEbjye2aerLd5FaignJyaKgyFBwwPpUxuTt4HNV8DOe9LTu0NNrYlFw4POCKjceYSxXAqSJWPRePU1OIl6t8x96qzZaUpFMDHSpDM5Tbn8ammISPgDJ46VXKgYA5ak9BNcuhYj8srwAcdSRTTPzhB+JqKRDGQM9RTKLsbk1oSi4cHnBq27bm3DoRkfSs/6c1fhb5ArfdxjpVRZUG2FMdM5IIHrkZB+tSlMLkEEdMiopf9W1KpFOL5kbRbT0GRsRkckbAwHp7U1Lg7vn6fyqROVlx1ZiM1UrOndU43M6smpaFwOjn5W5oyMFgd2B61Tp0f3xWnMR7Rk+5j149hTSQOtLmoi7Bjz3qSGyRuRjOM8c069DJcFOQqgKB7CmbfNdFXkk8CpdQfMwTOdqgE++KroPoVKYWO7HSn1LDDvO5hx/Op3JSuyNGMZyv61didwuWxk9R600ukfBwPYU5WDrlataG0VbqJcRbkyvTqP8KrwxF5gp+X61cVhgq3Q/ofWnFdhIxlsfgKbjd3G4pu4w4yccikooplBnPSpID+9CnowK/nUYHoKXlSD0NMBKrXI+cH2q5MP3xI6N8w/HmqkuRJuKnA4BxUy2InsQUEZ607l24FIylT8wxWZjYYEANOopcHGcHHrQISgR7ldj+FFSw/6sH15pxV2XBXYsTILb5iOnTNPgwsWT3NIwQRHcACenFNgIJ2n6iq6l7SVyXl29BU8fG4nGAOp9ajAx0qRj+6UHr1HtVmgzkn1JpJlAUetPHyrk1VmlJ4FS9iZNJELHLGpIkU8v09KjCMwyBx61JCwLbOuO/rUxRnCN3dk7MAuFpqru+lOMYyMdKf0qzYOlRSNk4FPdsD3pqDPJoAkQCNT3Yjn2qpNjzTin3h/fkelMEXGW49qmWuhlJuWiIgc5xUsS5YE5wTjAprrhjgYFA3cc47A1HUz2ZcBGcDtTiuMZBPGcAUkUIjUbue+PWnuxrU6UNJ4AHAFYWvaxeafeQrYFfJs4vtupAoGzAXC7Qexx5j/9s/etzIHX8BWY/hzTLm/vbrVIIr+S7kBzJFjyowoVYxz2wTn1Jod+hUbX1H6hqzWeoNZ2unT30i232otFKiqE3EfxHrx2qva+I4rgQySafdQQXVq91aySMh81EAYggElSQQRnt+VTabov2Bo2kv2uDHp62IJiwSqsSGPPXBA98Z74psWhRC10m2a6d102ye0YrHjzA0aoW6/L93OOetGo/dJTrNqiWLvHKEvLGS9BGCURFQkY7n95+lQReIYv7Lm1C8srm2tY4BOkgZJRKpOAoKnAfOBtPr1ptj4fv45LV7nV4yLGxls7c29rsYBggEhLOQWGwcYxVX/hE45Ib5b65t1+126wMLG08lWYNuErqWIZsgfhkc5pah7pO/iSC3iumubG4S5t/IYWyyxs0iyyCNSGB25BJBB/PnNLP4okt0vll0O8Q6agmuwJYiEjIyGBz8xwGOPY+oyQ+HTLp00U0lhDvlt3D2OniIfu5FkOfmJJbbjrge9Wr3SY7pdbBuin9rWot/8AVZ8rCMu7r833s446U9Q90rah4ktLK4ukEM88NkiPdToyqIgw3DAJyxCkMQOx9eKbNr8cNxdf8S+5e1s7lLae6WRNoLBCCFzkj94M/wBaZc+HIpNSuLyCSxxcrGJjeWImZCihdyEkYyoHByMjPqKtT6LFLZanbC5ZBqN2l0P3PMe0RDbtzz/quvGM9OKiU1HdjSTDR9UvL/UdYt7u1SBLG5EUTK4JI2KcH1POc++KxbjxDKs+ved4nWzubK7kjtLFlgIkUIpUbCnmNliRwa6G2sns9W1OeOZGjv5FnWFoyHVwiqfmzgghc4x3pdMtRYTXskNw0n2+8kuyNm3Z8qJt68/dzniodRX5b6jSS1sUrvxF/ZsUcl9p01uvlxPcHcibWcDIRWO59pPOP1ORVfW9dnSy1sWNtPEdN/dNfF0C7sI2AOvRvTFO1vwu+o32ovHfW8S6h5e9prPzZYigAARtwwpxnHu3rxdufD8d5p+s2Zu8DVpzKSYc+X8ka468/wCr9uvtQ6STvFDUl1LFnfW+rRzzW8RNoJNsMzEbZ8dWUf3QeAe/bjmp1WR4V2q7BS2duSSOSBVfTdLhsJ7iGybFpLIHhtNm0W7MfnKMD909duODn1xXHs7a3Ct/eQySh3lNtb+dsjijRSRx3Pytx1JHJA61KfNBwT1FGHvX6Hb+WR/yzQewypH40uBj7jMcfxPxWD4eupItUutJeeWaJIBdQiYHfApYDyySSTwynnkegrpEK7cYAb1PNZqhBrS6+YSlJMjMW3YX5OOBjAX6ChJWkaYSx7SjAIwP3xgHP8xTy7qxBJB7g1C8Mkl7HcR4wsZSVfUZBUgfn+dbxjGKtEzbb1ZYjPYfexxn1pNkjnJBJPc0wDJwOakcYILFtxGfWqERMSo6UoBX/WFQPrz+VPLLuJC557mo3I3bnODSAc03oSFI4HtUe/kAUMu7kGmufKXI5PQUBeyuOlmARYu+c5zUIjEjnB6DmlS3d3+fjPJOatLEiDCjFTq9zOzk7sqi2JJycDtURjKybW496ung1HKm4Ar1U5FDiDgraChwBwOB096Tb5mCeCKVXDkgjDDqDT6e5ejQ0IFySeT1JpgjRiDjnuPWlk7UR8MadgsiTp0pyHBweh4NNooGDrzhuxo6dKc/O0+o/wDrU0DPSgApCMjBp+3AyabQAzIbK9PSmlW781IFA6CloAhJzjcoP1FKXJqQgHrTPL9DQAynKpb6Uoj9TThED70AN2AfeNOCAHNPESjmkPXigAooooAKKKKACiiigCwke2AAuqyKNy/Ng89qrgZOKm/1tqjt16KfUVCzhfu8U2xXIpnAPsOPrVcMyncvFSupkzjgDkk1CFL8A4rJ3uYu7ZMlwxYAgUSytxg4+lRYEcnGTSMxY5NF2Dk9ibPy5znjvVS78x7aQRZ8xl2qR2J4z+FTByFxVd5H+2Rxpwu0s/H0AH6n8qRJJGixxqiDCqAAPQCnncULE5A7U1s44qMLI8q7ckdxQtWC1ZIDnARQW9TyatInlRYz8xoiiEKFm5am78/e4PpVvQ2k1FWQoORxTWfCHaaUMDwDQU3DavepMhkYxz1J6CrCR7Rk8seppUjVPuj8adVJWNYxsVpC7ycAjHTiopFZVy4xn1q9UM6GTAJwo5ocRSh1KadalMjfSmH5V9qkjUMc1BkMYs3embWHQ5q0WUelAA6igCuqyE8jinsCPvc1NULfM/HPpQA2lVS7YXrTjC4GdtOgcIx3d+9FtdRpa6lyLK8/3V/+tVZmE0xXYFbopHHNWlZFTkjLD17VFE0a3IVepbOfStH2NZa6FUSkOHwvmAY3kfMRnOM+lJI7QMfNi2pk7ZU5XHo3dSPXp79qtyGIzKuzHfdnGal2gHOCyEH+VCXcSj3IIG3ovI+Y/LzU78BQDnA7fWka2t2VDJEjKpBCMMhfQ1GLSC3KtBBHF8u0eWuBjOcVVrItbDqKgawjlYt++BJJOyZ1/kacsIihaMPJ/vM5Zh+JpDJCcdaikOZMdgKrvBIDuF5OADwMIc/mtOlEzRfu5VSTjLMm4fkCKlsiT0sK7jGBTFBZgB3pyWTkq0l3I2P4VRVB/TP61I9jBI2XDnjBHmMAfwBxS5SORjxAgGD19c1Rmu7dHINzG5U4IVtxX2IHSrsdtb27F4oY42bgsFAJ/GpcVVkW4pmctyWhLxiVgOi4Kk/g2Kfbz3LglbRhk8mSRR/LNTXChWBAxnrToCDGVJwc1K3sRHSVhZpJAoESK7HqC2MfpUAkufNVXgjEf8TCXJH4Y/rVvaB0HNJGpVfm61TNGm9CrdC6Mg+zQRumOrSlT+WDU9uX2sssXllT2bIPvmpqpajLJEqMpIjQ5l46r0P5cH8KNgslqSzSIyYByQagpWXaxFABYgDqazerMZNtihio+Vv/AK1OyRHuzknvTfLbdgjBp3lsIyWO0eh70ahqR9etTRQh1yx/AVDUsUm2Nh3PShbhG19SQ2644yDVfbhm3Pt2nGQM81M52DbJI2R1AHT8aibhVAzzlzn36fpWVZ3tFdTaHLrK2wSFWUYIZ92SwTaakhi3fM3TsKhqaKfaArDj1p0qapqxMqnPK8iwSB14qJ3i3BickdMUs0ikYMXynowbNPjiiXBKEn3b/wCtXRuO93ZEhP7tQO/NU512ycEnPPNTSXK7jgZPTjpVZ3LtlqUmiZtWsNJwKbu4zg1MPL+lMIBbA6e9QZDVm2NlSQalUpKy4Qhm4wp4P+FOjhBbDH8KdMnkKNnVhyfT2p20Ks7XHW7RiVti5AH8R681KXLNyeRVWItFIGxkdCParbLtPqDyD61cdjWD0KbBppG9B69qV5g0YRRj1p08g27UPXrioKh6Gbdti7H/AKtcelKyhhhhmqiSNGeOnpUrTK0RwcN6VSasaKSaIpIyjHjjsaZVkv8AuCXHXgVWqWZSSWwVo27KJI2JAHYms7rU5hCxZbO6nF2Kg2i2YmDlSMEdc9qeUPlkBWKgZzjrz/8AXpsUuYVjuMkDoR1FWmkjWPeCCOgxWqsalDABzjk1HMhcDnCjqT2qw+JJP3SkccikkQPGI9yk88ZqWgeqKEjBnyOg4H0ptOdGjcqwwRTayOYKKKM0gDp0q7bz+YjLM44HBY1Soqk7FKTRoAxlchzj1xUcwiIG92x6AdaqZOMZOPSkp8xTndFpPsnctz3I6U6NEB2qqzKTyQMkVTpQSpBHUUuYXN5F/wAhYgSnQnkZ5FM8tSclQfwp9u+9cnGMHOelSCMOp+6CO4Oa0tc20sVHgGQUHfkVKFAYkdT1paKVgSSIpJGVsIuT34qCSUyAZ4xVtgSp2nB9arNAyqWJFKVyJqRFTijDHHUZFNHXmrpKr859OtSlciMblKinyMHckDAojiL5OQAOppE21sidfNK7sr7DFKj4yZ/kBOF4pwwIztYYUdSelNnIkhz2UfLWht00C4hbI4zxx/jSpGqAYHPrTLachtjuAp/vDOKsTliwCkcDAJ9KFZ6grPUgYCSYA8hRk0TAbAvAycA+lOSMID3J6mlkGY2HtRbQdtCJYgpwOT3NPEgMgRTwBUOCsCq33if0p+IkYENyKRN7aItJJtGMAjOTkVHOn7lipDAf41GJ1LADJz3p7ngKOdxAx7ZpVJLkZrDWWhGjfu5AvUM386rk56DFWIRnMmMBug9s5/rUczow+UYbPpUpWhH0RnV1bZFTkOHGKbQDg5FBgSsuG3ZxTNqn+P8ASk5Y+poIwcGgZPaSpBcBnPfGR6UXcRST6HBqvVucPNDE68grgnPccVS1Vik7qxUqxHA+3c25VPp3qOIbCZHGQh4B7mni8lDFs9euaSt1CNluNkhdZMKrEHkcdaWLdFksp296mjupTvbkhRnGTyelQyT71wBjPXNPRaofurVD1m3zDBwuO/esXxALz+10nvv7VbR1tQFOlyOrRS7juZwhDsNu3GMjg5FaPWkn0hpr1rux1K706d4hFKYBGyyKuduVdWAIyeRj3zTi7lwk3uYt54mk0rSbIxXtjqebMz/a5pCjXIGcARoGIPqx4B7dhJP4nv5Vu5tM0+2e3tdNg1B/tEzKxV1dtgwCM4Tr/PPFg+D7OKNI7K9vrJfsn2OYxMjNPHuZuSynDbnc5GPvH2xctvDdhDa3Nukl0VurCKwkZmXIjjV1DDgANhzk9OnAp6mmhn+Mb908Bz3tpLcW/mG1YNC7LIqvNHkArznBI4qmdUGjXV3qFkusSaPbWMklympeeMyhl8sRmf58n5s/wjiumvvD9rqGiJpU0kwt/wByAyYD/u2Vl5IxzsGePyqfU9Pt9Qs7iyu/3kFzGUkTODg+h7H3ptMLo5ZfHGYboSwWt1PBDE8IsrgvG7SSCMRsxUYIZl59DntioL3V9W0rWNWuL62tpJ4NNtPLhhnbyn3XEi55GVPOO/3QfYdE3h37RpNxaarql/fxzqqqXaNTFsO5XXYoG4MAdxzyBVR/CsE/2mTUNSv72a7ihikkkMa7VikLqFCoAOSc0WYaDH1DWHvn0+z0+xlvbW3Se63XDrHl2cJGh25yQhyxGB6Grtrfwato9lqFsGVLqFZlVuqhhnBpNR0Zb29e8tb+7064liEE7W2z97GCSAdynBG5sMMEZNTW1nb2FrBa2ibIbeNYok/uqBgfU0ncmWqsToiHBAxjtSXBxF+NLH1NQ3L7iQOgpPREyskV2G7BFS2/yuA3Q9qjUYXjrUkDqrfOOR+lQtzKO5dxmqjnZOSvY1aVgwyDkVBPHg7x071ctjWequiZHDqCKWY7cDvgVFZkeZtbvyAe9TsNwYuCTmnuhp3iQbyFIPSoDl34qR/mIUd+tLtGNoHH86m1zNJyI2YuPLj+6Opp9vEQcnrSqm0bQDU6jC4qzYWmLKG3ei96czBUJP4VSz82OxNS3YiUrMlUl2LH6CrEak4A6k1HEqhFZ+FPQDqam83j5cKPaqRSVkVpoyJWckFSxOaBIrHk9fanyMCvPI9PWmCM43NxnueAKnbYj4dhs7Z2qBwKlTCIDjJI+XPb3pY7dV+Z2yfYU24744GOB6ClruS092PG6QHcxx/OlCkZOcnHGaWFCIwD2FMWQncSAADgYqjRJCAMX3SDAHvTgSx67VHU0g/eE5OFHJ9qHZnJIztzwPSmNKwu9Txh/wAx/hTuq4xtX0/xoAHYUpXcOnFAwRlQHtkYBqNozIwUHeT/AAr/AFPYVJTSxQfJgE++OPU+1JyUVdjSbehN5RCqrMM+mMD8BVdwFYqAC3U5PCj1NOUuwOCxB7hdufbJ5/KlWLpuACg52g5yfUnvWLqSnpBfMvlS3GRxMcHp6Mw5/AdqlVVj+6OT1Pc/U04nH1plXCnGOvUlybMbXtRu7O5jS2mMatpt9MQAPvxiPY34bj+dVtEu7jU7oW0eqak8Zske4kngWKSGVmXZs3RglWAkycEfKMHNbVzYWl6wa6hLssMsAIcj5JNu8fjtHNOSzt4rqG4jjKyww+Qh3HmPjAPrgjIJ6ZPqau2tw5tLHNNd6hB4Ln1OTVr6Sc3v2fdsRiiC98rKqEyW2DHfr0qymutZ6Pq979tlmt7d1htJtQRYXWZhgqwKqQoZlOWAPXsK3P7Ksv7PNl5WLXzhPtLnO/zfOznr9/nH4UkmmWr3325oSZfMWYlZDsLqpVWK9M4bH4L6DDsx8yKWg6gNU0gOt/Hd3FpM9tJdQMpWUqflfjj5lKk+/wBKx20e70vUbi40hoBHdE77e5jlZFJBBK+Xk9GPB6Z79a6vyIo7iW4VMT3CoJTk4O3O049cHr6Y9KjMbcFcZBzg9+KShFu7Dna2MzQdGbTfOuLiUzXU4AeTbtAUdFUdQPryeOPXYpiSB8jBVh1U9qfTty6EuXNqPyHADHDDgH1pl6k/2SU2ZG8LuQr6jkA/iKUHA96aGw3B59qYhYrkzwpKjZSRQy8diPSlC5pURfK2jhlJPPGQaDuUYIx6GgCGUsDtU498VXlYluecVcpCQOpqGrkSjfqU0BZgFOKsjMkZVxg9DTgqg5AANOoSsEY2AcdKUsQMk8UmcdaqyTFm+U8dqbdhylyosK6sSAeRTwufpVZZIhtIGW6VOsnHXFNDV7aiCILIWz8x/SpClNpAwYZByKB6IaY8nk/pSqu2lJA6nFNaQDoM/SgV0h9AGSAOpqBpZBzgY9KVLgGdScqvIPsfWlzInnRYc5bjoOBTC4QcnApJW8ogN61XncOwCnIFDdhykkiyZQVzu4pFYMu4dKrRqTk9sU5JfKyrDIpKRKn3Jt/BY/dFIsoZsKCR646VA8pZdoGBUqTKy4fj+VF9R8ybHcu3HSpgnrUCzL92Pk/SnruVcbsf0p3Kv2HuccAUlNDgnFKTgZNMYrEkcUijA560A5ANLQAUUUUAFFFFABRRRQAzzG+xxDtgj9abCcqdw5z6U6Y/vvJUHEY2gY/X86I0K5z1PpU9TON7kcwdzhQdo/WgoYouBlvpT5ZdgwPvVGkxYYPX1o0uGnMMSPcfm70oX92R3pzPsGe/YVGjhRg1LsiZJLQZUcceJpJd24vgDjoB2/Mn86dM+y3mmx/q0L49cUkMBtoEhPJRQCT3Pc0uhHQV+lPtHQbmLAjtimOMrimIoi4oTsNOxcabIBP4CouZGpFXd0p4Vk5646jNAtWIybVyDUsLIoG5vmP6Um1XQlST7dxTfLBHBp7FfC7lqikVty/zpa0NwqGaQA7evrT5H2Jnv2qoMu/uTUyfQznLoiSVV+z7m6npUUbbQMVbkiEke3pjpVZozHwRipaJkrC+ZweBmmjJ4FKCo28dOtKZ1H3aRAhLD5SafblQ/wA3XtURfcckigEHuKFoCdncv1GLceYWHOATtPemqsqsPmyvvUvmCNgSRx2NaaPc30a1KyF5HIJ75J9KtRIqKzAc4xn61BO6bR5Q4fk1OvFvGB6ZpLcmNriYBxntTDcKjcE/hTJpuCqgj1NV6HLsEp22Lq3CluGyTxyOtTLIoyGT5T1wazVYqwI6ipPtD+35UKQlU7l1wW5XlcdB2oZPMyUPXr7VQ8185DsD7GkZ2f77Fvqc0c4e0JpEVzsR8uOg7H8fWkW0kZc8Z9M5NQVa8tx92Q/Q0lqJe87slRHCAFTkDB4oIIXOCfYdfypiJJIx84/IoztB61HOjbt4OcdvSqvoXd20QmWnOBhQDU65Cjccmo7eUsW8wbvfv+dT4U9Hx9RQu4R2uMZQ4wwzSKip90YqUIpUnd0PJxUM0gjk2J8zdDnsfSm+5TstWOJAHJxUTTgSKFOV7mnfZpHOZCcdu1KbZV6qRS1JfM9iYqgVc7hkZ9aa0aupGVYEcg9xTlQvHhQTtPHFOWJgcNhSw4zVFmSqrF+4V95jAHJycdBn8v0p6ttYEdqLqzEF0lx5oA/1cgwehPB/A/oTVpLVByz5x7Vnyu5hyu5JTJIxIMH8Kl2jsy04R8ZPPspyauxvuVYrbJ+Ybj2AqYCO35yobtjtTi5IwOB6CmfZ2uHAHCDktStbYmyS0Kcz+Y3yj2A9aJVZZXLA43fexxVm7iWFcR5GDnOeRUMSNkM8jE4BK4J4PauKtzQqJouEVKLiyKp7facgjmoMFeCMY7GpYlZHDMDtx1rpi+pzrSRcUARtngHp9aYTgE07IMa45zk0lam5VWMPkg9B1qKrqIEXAqKSAYLJx7VDjoYuDsV6OvSnRoZGwOKd5bL06g9KkizCKTy5lY84POas3ILKSuGGdwJ9KrtCy4Mp2FuQCDRKSMKDlcAf41V7KxSdlZiRfNKN3erhw0TIep+6ff0qgDhgR1FPLvKw9ewFCdkOMrKxHRVo2+JnLdMnAqs42uQOxpNWJcWgCk0AZ9PxpM8VJGEKnccMeBnoKQiPJPeilZSrEMMEUlAiWGNiyt2q1VNJWQYHI9DVmJ965OM+gq42NoNbD6mgOA2/BjAywI61Eq7s84A6mpJvkVYl7ct7mrRoRvJgckKvpVW5++vPamzMxkIbjHQVHWblcxlK+hP5izQhJDh1+6x6H2pgiycb13HoM5z+VRlSRxQOO9Tci/cKMc5qSVScSqPlbqccA9xUdAgoop6xO65A4oHa4yilIKnBGDSUhBR1oqzaxgDzWGecKD6+tNK40ruxOq+VCEHXq1AdlUgEgHqPWq73Dhjlec96T7T8v3efrWnMjbmitCcnCk+lAORmoHn3LhB1HNME7quBilzIOdXLLtsQt6VUZ2bOSaDI5UgsSDUsEAlA7nOMUt9iG3J2RB1q7BGwi/efKAcDPelWKKNtyjcw9elOZieWP/1qpKxUY2Gm3CfwceuMimi3HLSHah6Ip61D9pdZCVPGeKWSeRl+YY3dzSug5ojZpA5AQbVXoBUWTjHainFMICTgnoKjcy1Y6CLzZQucVYuZcNhOvQfSo7ZORIDyD0qW4+VmwvOeKtLQ1inylR94PzE8+9HmP/eOPeh9xwXGM9KbUGbdnoLvb1phbB5FOpCM9aCSW2YGX8KmkX5vZhtz+PT8arw/JIuPWrMo+ZPr+uOKzqpOkzqoPUbFMoQK52svGKJEWVdyEE+oPWkMhjRCoBBGfxpqE7lkzgu2CP7wrpi1Na7kStflImUqcMMGkp0jbpCT605AAu4isjHqMBIPHFABY+ppCcmpwAOgxQBCyletXrXKWTFx8rPxnvxVV03YwMmr0+Q+D0UAKPbFXHuXBa3Kc6seQBtHOB2qEAkZ7dzS+Y+3G44qS3ON2fu45qd2LRssQFAuFOVPBNRyWw8w849cUefGOn6Cmvcv/BjaBjJWqurGjcbakiKikhQMjrTL++h0fSbrUrs4itoWlI/vADp+PSpbQs5LMFbOeNo5qDUtPi1SBbe+8zy1mjmZFwBJsYMFbI+7kDj2qlsVHY5fw3rF6um6rZm+h1jU7e3W/h/fB1YuuWiypOAsisAOwZa1f+EwE9tdXVjb2r2cNpbzGW4mES+ZNyFZugCqVJ6k7gAMmtF9Otlv4tVihk+02cUipFb7F89WAOw5wOqgjJGD3xmsfS/C0UXhh7C6VrSe4uzfEwOGa3kEgaMAkEHYFReQR8vpRqitCOPxrdXVrKkNraz3UeoQWYZZHSJxKMhuV3LjJBGD070XXifWbZdSkvNNsSukSpHdNHcP+9DBWzGNvBCuOvfj3rQg8MWqyyXV3e311PJdw3bySNGu6SIYUAKoAXHUe1WrzQLG7tdYEkk2NWkRptrAFCqKo25HHEY655Jo1sGhm3/ie+tf7WuUsrV9O0m5W3nJmYSsm1GZlGMcCTPJ5weneW48QvFpuoXAtoybLU47BRuOGVpI13fX94fyquvhqa6vNY/tC8uI7K91BZ/ssRj2ToscQG47SwyyEEAjIH52bvwtbXVxNIdQvoba5ukvJbSIx7GmRlOclS2DsUkZxRqGglrq2oahcGey06OXTftbWu/ziJiFco0oGNu0MDxnOBnrxWsY1HeqEegQxXzTW+oXkVs1ybtrIMojMpO4ndjdgt8xXdgn24rTaIuCCNwPXBz/ACo1EyvJKoXEZ61XAycCp2tn34jBb+lSRW5jXcw5/lUWbZi1KT1KpRl+8CKmggDIXZc+9SSRvMwVR8o5LdhUhlSFVRGAA/WmlqNRSYgAAwBgUMoZSD0p+9TyEH58UbwfvKp+nFUalWIBLxAOgbvVl3YHAGT7+tL+7X97g7gcDJqNssvBpWsSo2IsYJPUnqafGOppPLNSAYGKZSVhaKKKAEIyMHmozGrttGFAHJA6VLSnAhz6n5qAIJX2qCOCeFHoKb5Dbc7vmpY1MknmHoOgqcdeaW5FubVkKIEUF/mbsDT42LMW9eM4qSRVaRiRnJ/TtSdKLWBRsxAMdKYF8xzjipKQKAcgc0NFNXG7nB2Z9qRwFwBUhOetQ8tk4z60WBKw7pDx3bmlRhtA7012CWxbqSwGPT/P9Kahyu88Ac0xkzMFGTSM+Rw21BgE4ySfQCoVJfLsM84Ue/YVIg574XIHuc8muepKUpKEev5FQ1XM9hVJJwkiMT/C3yn/AD+FNckq7FSu2Ngdw7nt79KkIDDDAEe9KscYxx0OQM8D8KmVKo1y810WpRTvYd8wPekyS1OLY6U0H5smuoyFcd6bS4LtgUuFXr8x9B0oAQKWPAzS4VfvHcfQUx5hjBZQB2Bpocn+H8qAHySErzwB0A7U2IlVyCRTMl25qTGBgUAKzZJLH6monYtwtOKs3UjHtSsVRCSQvvT3ASFd7lz0UbR7+v8Ah+FSEHsKZET5CDG3AxTwSKct7CWxGUJ/ipyLtIzz609FLNwM05wucbuR7cUhlO+ikMn2iAj7RGCAD0df7p/oe351PDPvjAZCMjO1uq/lT5sYzgM3U4PFUbhnjxcwbm2jDw/3h7e4/Xp6YBXRfGGBAG09uarTxsqnHbqDSw3EU8ayROGRhkEd6m3B18t2GCMAntSeomk0Ro2IQT1xUcT4ZgSTzUssbKgG08dqhxsOD940tbi1uiR4g75bpjpQY41XaRjNSVHL2x1xQ9BuyVyJv3bDGHHbirGMjkVDDtOWYjdnv2qXeofaTjjNJCjsOqpLlJWCkj6VYBYvkH5fQ0SRqyEtwexoeqCXvLQjxiimEuq9jTPNK81BkSycKc1CMBhuGRnkUGUy8mklfdjFAiabdJNycgjKkelREYYirCMpVdi5YKASx4GO9Ru/nMqhtwUYzjAP0psb7ktucxkGoZR+8+XnPSrAIjizTYkz87fgPShK5Vr6FcDD4fjFSqiSnqePSnvArMWJIp0aoi/L+JpqOo1B31K6t5U2D64qYsW61DcqG+Ydc9aIWLKQe3eqSsXFNElSBQyjk5qP68UolC/KvzHv7U7jbSLCLjFN788UrHEWW4PtVUTMz7WwRmk3YTkkWeN2AcmgDJqNcGQ7egFKJCj4IyMdaLgpaXZKQoHNKD8tQ7jK2TwqmpI2yCaY07hnB4pKQMG+6c/Sg57YoGU1vxfsXgUoqqApPV12hg3U9mXrg8jipEmdSA3I96paKkXmXX7tt7EskkiKHMZAyTs+T5mB+6OdvOetWXUo5B/ClNWehjK61RakiWTGeD7VUuE8tgFJ9atQvvTnqOtDwrIwLZ+lJq6LaUldFVFL4A5OKMHGccVaSIRsWzUWNygD+I1NjNxsRDacq4DIw2sp7g9RTmlS4t4p4s7XXIyMGpxboCDz9KgtIdts8JG3ZK4XjHBYkY/A4qrOxSi7WGVG8W+QMe1SspRsN1qSFUYNu5PpUW1M0m3YjQfMOcVLkMdo/E1DKU3hUOG7jNIRn2PqKNh7OxbAiUg8AinmNWOSOfWqiJkZY/jVqI7o1NWnc1i09LDRDh9wc1LRSb1P8Q/Oq2KSSEZAzAtyB2pQoX7oA+gpaKB2QhOBk8CoZJEJPOakkj8wAE45qN7YbTsJB96TuS+boQom84H4ZqVbIMOSc+1RR5Undwy9KnSdyp6D3FQrdTKNupWltnj5AyKaqY5NX3mDKRt5I5zVTZuzt6UO3QUkughdiu0nj0pKNuG560mecUiSVxtjRT1+9+f/AOqriBWiCjqq8e9VIyr4jk4HZh2qzFFHE2Qx6VcTWBXuGywX0qIKW6VZulTarLndnHPeoPM+XA4qZbkS+IQoR1I/Om1JHCZOTwKRonVSSOBSsxWdrjKsQR4Usw69M0JCjIp9uferFvtGd/OwgY/rVRjqaRjZ3ZQY5YkcDNWreORlGDkenp+NV5YmichgR6e9XFbdBGV6Yx+NEdxQWo9xsG0D6nHWoyMgj1pyswIwTSSnyy/sTVmxUV2hYj86WSYuMAY5qM5PJ70KjN90E1ld7HPd7IkFw49M+uKkidpXJIUJnlQP881XUbmA9TV+ONYVAPJ64/xqo3ZUby3JJFDSEhucZIIpEbKhFYqeT7GkhYMzN97AOff1pQdsjYUDaDzzWhsSFNyrux8vJ4xmkY+W5yc5J+Uio0JYFM8Hkc96PlT0Y/oKYEmBNmRwVX1z1qvFMk3mxxlQ0b7WBGDnGQfyINTTEj5Tnrnmqogb7Z50Z4ZNrr64PB/U/n7UhExUr1GKFO1gfQ5pJ5re0tHmvbiK3hj5aWRwqr9SeB+dNt7mzvbZJ7G5juIX6SwyLIh/EUDJsLgv1Gfu/wCNTBwY08vheregA61CiEHj5gRjIo+XytjH74IPtnv+lMBrXMRHfb7jr+tVwyhjsO7GM47j/EU3y40eOG4uI4ppiwijaQBn2jJwO+BycU9o4ztWMEANwckFj6+1cle9lLr0HS5m7PYhmGZc9m7kYqwzrEoBOePzpJg0asGPAOMA5z+NRAKAJJuSTkL6/wD1qqm52vNWInyxfuk6Z8pSRjdk4/GhZAzEDqKa90p55J+nSmxyx5JxtJ65ra6FdbXJqKqvMTJ8hwB+tLFL+8O8/epcyDnV7E6Rqmdo60E7CTn52HGOwpwxgluQoyfeq8jnljySeaHoKemg7zQi7ZBuU847g+opjSRFh8hI75NQsx6nmpbWMTSfMM4GcevtU6sz1ZDtKSsDzjv61LEzK3yDOamliEm4rgNnmlhBVNpXBH607alKLTHzyLG2D1AHH4VSY7mJPerk0IecsxPIBxTDDH0xgnpzTkmypKTKtFPQqjnzE3jp1xU8ccMo6bR9D/if5VKVzNRuQqwdQkhxj7ren/1qY6sjbW4Iqea0Ma7kbev06VHhnhGPmKkg+oHGP60NPqDT6kdWLXksAMn2qAqVOCMGtC0h2W++Q7Ax59T7CnFajgtSZMQpvIB7D/aP+AqLf5h/eHns1NmYy9DsA4UDsKgDGJsOdynofStGzZuxJNDu4bgjoahRDExLKWPbFOa8K8BQyjpmo/t7Z4RQPpmo0M243uWVJKjIwfSqjxuGOV/KrK3kLAeZjHsMEVJ5hblTwfSnZMppSK0EZZW3D5OOo7024iWJgEJII71c35GHyR2PcUySBZV+VuR045pcugnDQiihXaGPJNStnHy4B96rqJIWHcE4x61YZtq5wT9KFsONrFaSORnyVz9KjIKnBGDVj7QvcNUMj+Y2cYqXYzkl0EEbFNwHFXVG2GNT1xk/j/kUiDCgD0qV1+b5mA4H8qtKxpGNiFlDqQajeIYCIBnqSasbc/cO72xzSCNs5Ix7nina5TSYxECLgD8aHTehUcfhUoRScbxntxxSeTJkljsUdcr/ACosGlrFB12MVPNXYRstwcYLcD+tCrGnKpk+rHJpSxbrSSsTGNmQTuw+VM+pIqGNDI3fHc1cWMspABOeppw2xDbGBkdTS5bsHG7uyLyk242inbAwC4yPSkNwynkkfU04T7hw/H5VWhWhAluTKc4GP4dwzUksGc5BDds1HJCS29DjvT4bhiuC3Tt61KtsQktmPtVKwk4w2eM8YqKcTGTCof8AeouJ3KhVOPoMVCEkm5B6cZNDfRA3b3UTLbtNj96pPTFO+xAHDSgH0weKUDyowOtSoQHy2c9u/NNJD5V1KBRhKYwMkdcVKlv/AH/0q0qIc7PlY+vel8psZb5QPWjlBQS3IdgEe0cAd6Y2ZW+U44+UjsPX/CnzMuNgBIxlvf2pUXaOeWPU1hP95Pk6Lf8AyN42irjWjj25YcAfkKau2Jc9GPTd2FOJZlbhdvI5NRT8qpzkgYNdL92OhzyfUiJyx+tSnBUjpUaHDDNLJ96sTIRE3H6VNTUXaPelZtooGI77eh5q3E7T2hZxgxnCn19qpIjOwYruGavznEmxQFROFA7VcS4J7lKSA7soMj09KFgkwQTtB61Zop8qK5FcrmEZCL16k0soG0RxjJz0FT4pUjHzN0HfAosPlQkKeXAc/T+tNed4sEDcncHpT2bOABgDoKiMKnjkD0BpvyBp2sh63MRU4GM9mNP8w/w4H0FUNn7zZnvjNTwoUZs9Og96lSZMZNssoplkAJ69Se1OlcMgCDaoPA9feo2kMVtIy/eJCj8c/wCFNhJjQBgG7kGrv0LvrYWnKQVKk47g0pTJ/dncPTvTOnWgYEYJB6iinP1B9QKbSAXexGCxx6ZoDhOW+73qCaUowC496iklMmBjApORDmkTzXKjCw8gdz3NVS25iScnvTWbbRGNwOOTUNtmTbkPV2T7pxUkckrNgc/UVEVYDkYqe26N6UK97Dje9ieMlwY5FxnkHPGaGHlryCBTDJ6UiksHHtnH41obiu+1AR1PSmoJWJ3HaPpTxnauBTqQrXYxY8NksWPvT6RvumkQ5WmPYdSptAKnIB5z6GopZNnCjLfypIpC/GOnU0r6i5lexZMY2jDKW+tRkEHB4NFPZS0xA5JPFUMa3b1x/wDW/pSVI6KWxGwbavvzUdABRRSmMvHkEdcYzSAVV3ICpyTyB61ET5S7QfnPXHankFAoYEHpzxUcgwc0wEYNIvzncBzzSOMiNexPNSIcrTsD/Ck9RNXQ1/uqMfxr/MU6JCyk8Ab25z05NMJ3n5cbVILMTwMHNOiKhMlSSxLYPGMnpXPFqVdtdv1NXpAkMTAAjkHvQUC/ebn2GaaWJOSeaTrXSZi4X1P5UuF/vH8qbRnHWkA8kKu1TnPU/wBKhcMfp9aPMHvS7xjrQ9RNXK3lYb5hgelWI/u1H5nmZI6dKVSQeKSVgUUiamu4RctSgY69e9QyHcrkYOBnkVSV3YYiyu5JVeTwue5qzFAqsXfLsASSf88UyKLa2SxJA4GOBUrE+WPQk5qr2VkLfcAA+Qow3oD1plIu5WJ5Hoam2q7DIxu7g8ZqRjY+Msegx/Ok2oWwGPscUr5K8Y2g9qYBk4oAR1JBGSpqsN4Bzyc1dlADdecc1E6BunB9amSIlG5QluVtUDCICHcTIV/hz/Fjvz1/Or0Vt5i7/lVB/EaRYEHUbvrTcLZWyxeYVh34QN0jB/hHtnp9celK3cnl01JhIhYKAWUdcnFJJHhwQcg9D60xD82FHFTD5kK9xyP61RorjCcDJ6VEzh2JFSspdSFBJ9BVd4pIzvK8exzUyuRO5FMepHanIxdgT1xU8IBjzjknmoUxvbipsQ1ZEsblY8Ec+tIAPpRSdGznigLjWkAOOtNKrtJB/ClJjNR0iRyqNpPpVqO2PkgtGSWGenJ+lVA2OOoz09asTSyC4IA4zwMdaasVGy1ZFMhiXyx/Ecsf6URYGR3pJH34AGAKWIck0PfQTtfQc/IAJ4zVgdOOlQTKQo9zSo7Rx/NzgdqcTSGlxzzbGIZOOxz1qKWUOoCjBBzmiaQORt6AU2Ndzc9BSbZMpO9hVd2HIBHelEiKpIXDfpTmUFcdBVdxxxRdi5mg37m9TU1vzJg9KhUYHHWrcChVyetIUdWSS/6xAenNNdCQdvBNRTS75AB61Y3BRk8+lWmapp3I40ePdvOQehpZiPLDLg08zKV7/Sqko5JB+UnpSewm0lZCxZIJJPsM1KzbYmUdxzUUT75AoXAAqbbvY56U+lh2tGyI7dwMqepPFWKiWHbNuH3e1PLgHBprYcbpWZmWEs51CaGaKfzGB3PMj/cH3QGbgnO77o5zntzalPKj05rOuo0k16dPMEbLNGzTrbqZY2IjCrvJPBLDHy9Nw7GtgMRwx3bRgsQMnHfjiqkrg1dWIoG/fHtkVZqjn5sjjmrkbb0BqIsmm+hHI5ZjGo57mnom05JzT6KdiuXW7CoUmY3ssLAbVRXU465JB/l+tTVCYW+2pMCNojKMPXkEf1plBcLlAfQ1DEcSD34q2y7lIPeq0qKjKEPPfmoa1uZTVncrvHtu2b17U+pLpN0i7fvY5pqRsSAwIpNakyTuNJOKat08Q27SeeeKeylDg0Bd6n0pLQlNpk0kpWPnvxVYPzjFOJycmjHOabdxyldksMgQkN0NTGdAODn2xVSihSaGptKxP9pO77oxUySK4+U/hVKjpQpMFNomuF2sGHegN8mTUTMW+8c0ZOMdqTeom7u5bRQBnvVcsUZgV71ItwoQAg5HFJLiSISAVTtbQt2a0IzID1X9aaAGbjigAsQAMk1cWxx98njrxxSSbISbKZXHvTk8wj93ux3xVwxhPlwMe3emQLmJgRnY3B/z/nmny6lclmQTDCpkjOMEA5/HNJDC0rcDIHWrM0LvFkAYHPPX8Kjt98UmGXg0W1Dl94siMJjzOAP4R1pGAK7lGOcEU5l3HK8JjgmkVlXgAvnqOma0NhlKpA3Z6bTn+dSMRG2AoxjnvmmOFVCQeo4yOn1oAF+ZWU8gjODSJGFj2oPvN0/z9aqi6lX7rAfRRViK68xdjLg99pIzUppkKSbJC2zhD9WHeoJkLhQOmeamK8EqcgdfUU0Ak4AyfamymroTAxjHFRzSGNRt6mpaSQFYjIv3xwp9PU0PYJbaFdAInDzdc52jqfr6U9pWncrF1PJJ4qqCTknnmpoOGbHoP5is0+hgm9i7FFsgCl8gE5weKfIAF4wM8Ak5yBio42w2DjBPOaZNIVUlh93gCtdEjfZEqKQ2SV245Oe1N2r3f8hUMc4MDZPzA5IA6j/JpiTF26YABYjPXHap5kLnRcJEr8KR15z0pkyIY2hYb1cYYEdR6ULcoYDJNsRFBd3JCqMdyfSqcWpWeoWzz6de294m7a0lvMsgB9yDVN6DvpcytYs/PXTrSS8ihuYrwS2DXKGSOdlRvkccc4JIOc8AjnIrOm1Jopb20S2bT9YuNQhguBp8oZblmiZlKs+BGSqHcdu7juSDW/cxRXtq9tewQ3UL9YriMOpPY4NVrOz0t9PfS5tKskhDh5YFhHls3Z8Y7469RjrxUXuKM0Yen6jq17JYWEuoXNuf7ZuLSSSORGkMaW7OELAYJB4zjPHqM10fhu8eTTL4anO9wbG7uIRPIPmaONuN20ckDjIHOKntrHT7LZ9g0+yhEUhdEjhVAGKbSy4/i28HHOParNo+zzWghhiUsXZUTaGdupOOpPPNNaD5lsYOr3KXvijwxc2LpIjW15PG8ZzlDCu1v1FVbTXp0sfC89xekCfR5bm6bAbeUhRt5XjOCScV1OnaNpWnyST6Xp1tZTTL87Qwqpxu6Z44zziqlhpeg2etTR2dlYwXvltK4jtlDhGYjOR0BOeO/PvSknzItPRnGvrOsQQX2+6uwJfD1xqET3MsTuJFC7ZFCDCZ3n5ckcDHSt2yF5B4iSym1C4vY7jTRdN9o2/LIHVcrgDAIbp7VtR+HdDsI5PsekWMYlVonAtkAZWxuU8cqQBx04qx5cBlExgjWVU8sSKg3BM5259Mjp0p8vcl2ZRZWU/MMUlaJRGUnOR7ioZIoEUsdxx0HQGpcTFwsVhGzKWA4HenCMhQ7ME9M9TVoTYjUltoxwBxioJZd/yLyPU0NJA4pIkaXeoCjC/zNQyNxinE7V+lMSNpWJPA9aWrJ1YRRhlLOMgdqctwqjCpwPwqZYf3flg9e9Rm02nBbH4VVmloaWaWgsMweT95wx/i9fr/AI1ZVRnJIIHJqKOIJ90ZPrT3PlRMW6kdKpbalRTS1Gu+AWb6mqhdnkyOvarLfNCfdabDGFUN1JHWpeopJt2GfZ2J+Zh71MiBF2rTqeuVjLDqTjI7U0kUopC8iMo529xUDW5DeZC4DDrio5pcEKnUHmox5wfeu8N6gUm0RKS2LxVAqNIg8zqVzwP8+lPUmWNkb7w+Zf6j/PpVJhcMu10b5u5GKmtYpIZNzttK44NUnqNMhkmdWIC496gZixyxzWhMBHK4PABOM1EUR+cA+4qWmKUW+pTppQH2qzNtVMYG7PbtUFQ9DJqzsM8v1NPQsgOGNFFAi/UcoOFcHBU5qSlVdxxWp0tXRPNFG6GSLnaeR1/Gq9EDPBdbFG5G7DpT2CFvkYAehPSnuCYylWJR87LgdvemtJFGfmdWI/hFQSXTucgYFS2kJySLW884wM+gpjEgfKMmqwnkH3uR9KlSZW68Gi9wUkxv2c9d3zdab9odeHXcR74qcuMcVFOowrnr3pNW2JasroiaeRuh2j0FSw3DBsMfxqAnPtSVN2Z8zvc0SynqvPsaNwH3V/E81UScjapHA4JqQuTznC5wD61fNc2UkyR5GPGcn+VNJ2LjPJpofb0Gfc0Km9st0/nRfsDlfREJjZgXA49z1pIzhTx+OatkAjBGRVWUL5m2MZPcCpasQ48uqFYkr98Y9BTFcpnbxmpBA20ZGDTniLL90Z7UWYuWW5CAXbGeT61YiUICocEmqzK6vtxk+xqeGLYd0hAPpnpQtwjuAdnYRsOc8mp81FkNc5UcYpkiyCYlM807lp2VycttPPHvQZd3Vs1WaWVThjg/SljkZj85yPpT5gU03YkePgtwT3z3oifJwckYJGevBwaVlAUtnAAzUW3gAj+L5hjucHFYSSVaPLu9zdP3HcJH/djacjcfx5qNnLU+UZm29h0pJAAoxWsndtnHLcVFBQZFAVW5FEZyuPSmt8jHHepEK0nPy0iMd2DkimU8MFXjqaALVm2yV1H9wsuR0P8A+qnkliSxyT3NRWsxGPVfXuKtSw8goMZGSpPStY7G8diGnBRtyxxnpgU7yWH3/l4zTXx8u3pjv9TTKDC/3j+IoZsKFXp3I71DLL5fTkmmrOWU/ISfaldE8yvYfJJ5YHuaV22KWPaoQjT/ADMcDoOKjeRzlWOQDU3JcraiySl2BHGOlWgcqD61RrUs02x+bJwEHH1ojqxQbbZHc4jCI3CqcscZ3N6D6UFcKpByGGRUbWokkBj6dWB61OdrNl8qR1GP84qi1e5HTt5xhvmHvQVB5UjHucEUBMOQ3ReTTKHPjy17H0z2qPOelNmkIVmPU0kShYxjvyaV9RX1sR3Ef8Y/Gq4GelWp5AFK9zVUEjpWctzGdrgygHnBoX5WyKKKRBbjkWRcAfUGnYX7owMc4FQQLtbce/GKWcFW3A9RV30ub8zSuyTy/Q0qoVYEHke1NRlSANjH9aI2Jy78Z6U7lXLAbcMSHtwcdKjkDJn1oByM1KyMcYBxgYqhldtzduKAdgyxxnoKlKkdRSY5zSAQY64wTS0UqrubHT3NAAql2woyae7AcIc8YLf4UrnYmIyNrHBPc/54qKmAAlSCDgjpUjneN4C/7QxUdKrbWz+dAClV/hfA9D2oYqF2rz3JodQDlTlSeKjZd3egAKgtmhwSOKVRtGKWkA1V2imSHORyQOCBxuJ7f40922xsw7AmkVcPg8mPjPqTyTWFVttU11/I0jp7zE4OPMIO3ooHC08EHpRtB5xQAB0rWMIwVoohtvcWgHHNN8wVHM5KEIDVCEe6UMQBnmjduANVhExxxgVbQhetACBSegpKl3r60vDD1oAhjjxwvTvUwULQAB0paAEYgKc1GI/MYxk4Xblsdwe36GldgeBToM/vAeDnGPTiqjpqJ9iUEdBSyOI1wVDdzmm7ccnmiRd0hzzk5FIYgkLYI+UAYx2pUnIY7FUDPp1qJvuj0PQCopHMciov40ru5N7stp8xYDqw4FNIZTnBHpTR0FOV2RvlplCyffPr3+tIBmnMA7ZQ8nkqTyKaSRweKAEqGUCZTG6hkYYII61KwJXApqJg5NICG0jlgLwyZeNeY5CeSP7p75Hr3q5FkPuH8PNQTBXieMsy7hjKnBH0NMs5ZY5hDdZLKMrMvSQD+Te35ezAsvIzgA9B2zUZlw2wdxzSyPtVmx+AqGAF2ZmHWpb1Jb1sPkk8tRxnNQl97DYmD3qaYKy7By2aYo2NlRg1L3Ik9bA2VHzD8Kik3jhuM84q0ZFbBbAIqJ182T2HShoTStoV+tShQi5PJprDZIPTNTxJk7z+FJK5MVdhbRgAyuOQflz609pFXqwqRvup6Y/rUPlxopJUe+eavY2SstCuI2b5sYUnrVmJAFzSM4KbVFKp2xEmoM7JMryzfvBnoDTlljIPP6UpgDKGIJJ5xUZixJhRgEU9Uh+9FXGkYGQOO1Kj7c8ZombgKtMUELzUmY4sT1NJUyABRigx+aflIyOtAWbIlBY4Xk1YAIhLN96q1zm3UFTk+tSWcpePcx7nNUl3LjFbMUReWQ7n6e1SMcn27VIQsikZBFR9PqDQ9BtWVkKBhhu6UxyAC3UA8D1qQsXX0HeopBvAXOOeKEhpDLbJlLe3JqzGwK47jrUe1YI9ueT1qONZDKGXgZ5NNvUbl72hbpCAeopaTIHU1RZkaVDESZTcQ3htB5cc25JyMjORLtDA8kkHJ+bOcGrjyZGB07n1q4FKRJG7s5QYLMQST35AGfrioLhBtDDr3onqRJO2hCgy4qxACA3pniqwznjrViMuiAGNsD07VnHczhuW+Uj+U88Fh6ULzGWIVewOKbHIr/PzuTqPWnS54HqSR9OgrU2GP/DznjqPrVS8YosMgJAWZc4PY/Lz/wB9VbfjCjnHU+9QzxpLAyy8J1J9Mc0hklRCELJvZu+elO81WQMhDBhkEd6YQzKT1PagTSe5XlkY3QKjgDv3qYOwXceuOBURD43P68UFywwazb1MZSdxGO45bmguVjwOKSkIyMdKRAiN6nmnVGBh8VJSAKaAd3J4p1SBlQeppgRYYng07YwXJp5l9B+dI0m5cYoGMoopRjvSEOCblyDzSrKVQoRkVHShSRkCmO9tiW3P7w8dquJKVYbssuemarW6gR57k1NWkdEbwWg/cmNpViPr0qRVIUmJeOgI6nPrUFPjbBIzjPf0NUUKzYQBsMc885/lTRtYY4U/oaXIPDjB9R1o8piMoNwzgEUAOK7F5x8o+vJ/z+lVXu2DYjAz67RVi5bYoX+Nh8xqirBZskZ+lTJ9DOUuhcTJg/efeHAIpJR/o3PvUjbY0AYbm5OO3+eKqSTtIMFdgIxTeiKbSRAwAxg5qS3IEhz6cVGR82F5oIKnkEGskYJ2dy+p2nPWn7sQnAxuOKjUFiB3pzfMwVOQBgYHWtjpDzG7nP15qG5kPl4x1447VIRg4PBopMTV0VFgdhwMD3qzbwrGGL88Y4+tOpwI24OeucikopEqCQm3Em0+uKWVPPU+YGxnO8Cnu+0grjkZ3Y5P+FNWZSd2SzLwfeq02KKlwrQ4jU/Ljkj+LvUI3LhhkehrQkUS/NjPqp7VVmkDDYuc5rOSsZSilqUNft4b3w3Jbahei1jmliCSyKXQP5ilAw7qWABBI69axL/VH0y61L+0LeOz1cWkIW80471ljaUIo2OQFbc2AWyBnOSARXXTtFLFNbXUUckTAo8cqBgy+hB61lQaTplrbT21tplnFBcDE0awKFlHQBh3FNl8ySsc5HqurQT3umzXEsG29tIBNNKkslsk2d3zgYycADIOC1X9SaaymjsIdWuLy5kvBDEkZjFwimIu0bSngD5d2cFsYA9a3LLSNMgs5oINMso4bgbJo1t1CyqM8Nx83U9fU0o0DTmtPsJ0u0+wF/M8owrsDf3sf3vfrRZ2HpucTFJd6rc+H5L27ufMt9bntQwlBICpIRkgYLYGM9xWppuqa/f6mLuMT+UuqvbyxtLAkCQiQoV2/f34AbPUn2NdDPo9h5UUFvplkLRJhIbYQKqhh0cYHDD19Mj0qf8AsvTTqo1JtPtTe5z9o8ob89M59ccZ64ppWKOd0u/1FbTQdSfVLm5e+1F7SW1kKGMx7pB8oABBXYGznsfYVT8P6vr84s9aEMz/AGxZmuY5ZIRG2EcqkaKd+5WAXB5I3Z9uj0jw9p+hxxvbWsEl4pfN55CiXDMSefocfQVKtjptnqTX9vp9ul7JktOkIVyT947vU9/WsKlTka0ZpFJnO2l9fxv4cnOuXV3/AGnbSz3EbFNjP5G8FAACApOMZ7DvT49fvo9K8NTib7TLPo8tzNFnPnusCMNwHP3ifzrXh8N6ZFq9rqNnbQWk1tJKzeTAq+dvUryR6Ek/WrVro+ladeC5sdMsredmwZIoFVjnqM4yK1i+aNyJabnO6He6s0UFzql3dJpt1p7zXNzNcwDawCkSRBDlVALAjoBjv10fD8F8+n3Oo3VzePbXjKbOC7fc0cQ6O3oz5zjsMDrmrA0fSIUlNvpNii3IKzA2yfOM5IPHIyc/WptPsNJ01ZPsOl2lm0q7Xe1tkjLDrzgDNO/Qzc4tNFWbUr6R7xdO0tLyHT2Ecpa4KSSvsDlY12kHAYdSMnjjrV61u7WW8ks2aMTee8UaqHJbaiuc5UAHDe46c5yBUm0nUI7q8/snUBbQ6gRJNuty8kT7FUmNtwAJCjqDg889KWTQLuPUDfWF5HHcfbHuFE8DOu14ljKnDA5+UHOfamkUuVlfV/Ethp+kXN3byG5lS0luYIxBIwO0MAXwPkUspGWwDg1qLrVgt1DatKRcTFV/1L+WHK7tnmY2hsc4JzXPT+E7mDT7myttUhVr2wNldvJbM24ZkIZAHG0/vWHOR0P1mbwzNd61BcvqMckMFzDcqJIWMiiMAGNW34CnBP3erUk2mC5VoaP/AAlNrdeILPT9PZpIbhbgyTNFIq/uwMbGICuMkglc1PqeqvplvBIkYlWa7gth8+APMkVCfw3ZxWfp3hy4sbrTPMv4ZbPS4pYbaIW7K5RwANzFiCQABwBnr3qe+0i8vbxPO1CM6el3HdrCYP3iFCrBA4bG3cueQTyR709RvcnbxHpqfaRLeuotopJpGaGQKyR/fKMVxJjvtzVLWfFFjYaHc3Vu0k062clxDEbWXkKG2s+F+RCV4ZsA9jWdceC57x53m1SFzJbXcAlNu/mN5y4Bdi5B29MAAYHatTXNBuNSl1FrC+itl1Ox+xXImgMnygPtZMMMH94wOc9vTk1HZD18RWkUsiXjBArpBGkMUssjy+UJWG1VP8LKRjPf6VbsryG7hjuLOTzraYbkYAjjOOh5BzwQelVrfQhBqy3huQwW7+07PL6j7KsGOvqu78cVb02x/s7T1tvMEmJJX3BcffkZ8fhuxRZktFqlVip9R3HrSUUxi/ulJYqR61Xa7kLHZ8o7AU26kwoAPfmoI5drgsM4qWzKUtbFuOaYNgqeepHFTbyU2npTVYOoKnIpHbb0qkaIshBPCPNTIXgPuA/DmojpqbuJwAe1JDNtzxkHhlPenSxADchzG3Q+nsaejBpMpz2zQMwJDAdwahq9tyu1uRVeSEIu4N+FZuPYylC2qIaVRuYAnHuaSnxxNIeOB61JC1ZO8m0BV5Y8VLCgUnOTwcmmRwqp+UZapJSY4SAMseSK1Xdm/mx6yfJtIAI6NjkVBNBvXcrA9uDUSXHPzjj2qWA/6N/wLH+fzpXT0FdS0KhXY2CMe1S+U8ig8KOwpRG0kuZBgVaUlUYg4J4qVEmML7lJopB1GfpSLG5+6DVt59n3jn6jNNF2p6gD6r/hTsrg4xvuVx5qdm/KlCSTHkMT24q0JUIyAuPqaja8ABCLge3eiy7hypbse6RxQ4dQxA59qqFUJ+V8D0YH+lNZ3c5ZvwppBPfipbuTKSZKiRs4XzQSemBxVpsBQDwB2qpDbrIG3Z9quOFbB5zjnNVHYuC0Iw0TNjjPuMUkspjwAKGWNup/SomCkbUDZ9TQ2DdloSI7yJnGKQKsAHdmPc1CrsmQpxT9pflzk0ri59PMmaZV9z6CoTMztjO0e1P8nCeg71GoUSYHPHNDuKTkKsTOdy8DsalWNSeW3kUwRBYxuLZPYGlZvKj+UBSe1NKxSVldkwAAwBgUM20VDG0gxuUlT+lT1SLTuQnBbIXk/jQF5wBipqKB2IXO35euBnHrzTYgTIXY5CjIHue/1x/OpJR0PbocehqAMYG34yhHOOn1B/z3rKnZVZJ7vb/Iqd3BNbLcQMXlyaJD82KeVVcSIcoemKiZtxzTaa0ZyvzFRttITk5pKKRIUuDjOOKkii3sM06SIh8E/LRYdna4yGJ5JlROC3f0rVnB2r5TZ2r1zyeOtVbUBI5WUcgYB+tTQyZUxMQARwT2rWKsjaCshFuHX39zTHcu2SAPpTJVZUbIKnFQJcHoVye2KG+420mSyIHUjuOlQW7kPt7GhpHLFQMH260xVYuAoO7PFQ3roZylrdF2iVFRfujcOSdueaak4GEU7nPVl6VIkbSHC4Hck9BV7mujRHDaq4818RAHnJ4/z7VY86N+EY7ACAMfrVeeQTOsMRzGg5b19aimRY1BQYOeoNK9tiNloWm+VAAc7uc0gc4w3zD3qKK4EqKj8MvAOeDUoXyidxy2Pu46U73LTTQ51jX+Ikn07UjsMYTnpk/hUE0zI/I3Z75qB52cY6D2pOSE5JCSvvc+g6U9bgrHjHI71DRWd2Y8zvcUkk5PJpKKcjBW+ZdwoJG1aWFWjG5cNikCwthhgc+tTVaRtGPchC7GAyTzSzYbg9hUmBuzVdZP3x39DQ+w5WSsNRSwBY8DpUg96c/UY9KRRlsU0rFRjZEw6U5cls56U3oOeBQJF6A8/SmO6HvOVIGePSmuMNx0PIqFvmepz/q09uP8/nTAbT1B2nHVvlApqrubAqdT8pwB8o+XI6fWhAQMew6Ckp/OcGMZ+hpdmR90ofccUAREgDJ4FRm4QdMmnSxlmCngA802RFWPIUcVLuS79CeMsYiWUhSMgGm00S+bxkED1UGpQ6lgGQe9PcaYyigdKKBiEZUj1FMQkuCfvNGpPHU80rPwdvQcM3Zf8fpUYkCAkZxwq5GTge35mud2nWjy9LmnwwdyemFlV/0NNDllyuCD3FRld86pwQvLf4fln866ktdTJuyJXI3bQjM2MkLj+v0pUiLtmRCqDopPJPqcUqRpHnYoXPpSGZw54yvtQ5JbCfmNlURISjOD/vE/zzUSynafMVm9CAM1Z3qVz6Gml8dRz6UuZ9RNdUyBfLZs/Nnr0J/lUi/N9w5FSJGdxYjlv0pWgQnOWUn72043fWmrPca5iFWDMQpyRTSTIAfnKe3Gfzqd0R1A24A6Y4xSOAI/92huKWgPmsMcYXMmAOyDp+PrTkaMD5EVQRzgYzRFhk3USRjbkcDviocpNEWdrjvPCnnp05qTO6Md8HiqLjGOc0+N2WH5G5Ukke3FSpAp9yyzDr2HSqojaWcs3ABp8ZZoyT93tT94C/KKtGid1ckLhFz1JqIb2fcD359KRpAxA7jrToWyD6A8VO7JveVhWj7jinLIy8S/Mvr6U4tkYpKosUAEnLKPTnOaVk2gEHIPQikALMAOSaUzLGCqfOT1PajQTdiIpls54qWMbiVA6jiojO39xD+YpY5o2YghkI980XQuZMqzyyWsjR3bKYnPyTYwFz0Vv6H+vWzFlYR644qW5CSZjZQybdpBGQRVSe4FnsJj/wBHVcMyj/V+hx6fyoe4+txxbbzTDKPrVgsjxBlwVIyGHeohGjZLcfjWbMWhquGOOlPUEtwcU1kQDcAdvrTDL/c/OkLbcbJ96pY5gWQDgYxVZ8kZ/OnL82AvNCYJtMvuwSEE9if6UmQVz1GKZKCLVQ3Jx/WokDKvJP0zVtmrlZkiJnk8ClRvMY/3V6Uind8v8I60skgiUYH0FJdyUupJUUifOGLYB4NNWc7vmGFp6OJdy44qrplXUtA8iPHT9aUDMRBGBjiolcxy7DyuePanTqxXIPA7UugXVrpCKp4A5pGDBwV6g4xSQuQMmlSdBuLnB/nUozVipfykyBAeOpqS2gk8nqMNziqkrebcn0JxWkWMUS+pp+Y9G22KsDpyrgGmByjkSjOetWEcOuRUNyvRvwoa0uhtJK6HiaNVwDkY9Ka2JISyjG3pVcDJwOtXEG1QuOg60LUIty0K8TNLN+85Aq0SFXJ6Cmqm05/Ko7piEAHc81SVjSKsNa65+UZqBpHZskkfSkRd7hfWrYtUI6H86YyRJBIuR696bMf3ZHel4QYXgD3qBpuDjqe5pN6akt2WpJbRBsMexzn0FOiCxthCd2OtDzqkJiVMKwyrA9R71FC4DfOcccUtEQmk0i0XJGD/ACoV2X7pIpqurjKkGlqjUKY7Lja3ftin5xUMh+c56AUm7Ck7Iqac8a2EcbbiYgY+R12nb/SrAlkkYBPlqNAHd1VCNjDPuCAc/qau9qWrIXM9yqCWyr9j2ocKF6Y+lOwm/KdPWkYA8kZqTNkNFWEQFvn59uwqvSasDi0MAPmZp9BOBSA5FIkWnpGX6dKZUqzbY8Ac0xq3UQxYPXiozViLbKCGyT3ps0Sou5eOcYp20uVy6XIaKUAnpSVJAU7cQuBxTaKAFVyudpI9aeJnHfP1qOincd2iytwpHzAg1IkgkBx2NUqkgbbKPQ8VSky4zd9S8Dv+VuvY0SS7FwwG1R0IplMuiWhDHrnH1q29DV6K5G2Zm3Q59Cp5I96mhtxC2+QElegPHNUasQO7fe5HrUJq5lFpvUtPgqpGe45/z71GyhhhhmpGG2MA9c5x6UyrZsQeXtnXYCB3qYqG6jNPVc5LHAHWnM2ADGNoP55+tCQkkhFAQZfqRwB1pC5IwOB6Ch+SG9R/9am0xjsq2N2QfUUAxnpn/e/+tUbttHHU0kalUAP4Ur6ivrYkIKnBpKGlRQPMH4jrTsBk3xncO/tQO4lw+2EHAPyjrUEM0KgBlIJ6gHirLRFocHHGcgnGBUZtw2FI2+hoadyGne6JMDyS8fzg+g5xVfzlH3gwPuKm+5tVcgIMDPWn4DrmQYH971/DvRuVqUzIJwVcYYD5G/oaiVGb7oJq4tqvmB1YYzyM4p20g7cEH0xU8r6mfI3uQ2hK+YO6jP0qVm6sx/E0kQ8reC37wnnHYVFdNvUHockEevvT2Q78sRj3DHheBVRJDZXG9mJgmb5uSfLb1+h/Q/XiWggMMEZB4x61F2Z8zvcnnlz8qn64p8ce61UtweVU+3/66pjet2sMq7BIMo/Y4HI+o6/T6GpZH3sAuQq8KPQUPzK5mpXZYRsNg8buQPfuKjuEwQ4JzmmpuTBYE4bcR3Axip0kWXIx+BFZUHeFuxvUs3Yh3CePDELIuSCeA3/16lt1VWWOXGW5C/41FLH++AX+KnTRtFIr4yuByPpW22pz6pkjR/vN4OGzzmnrkSKVOMHninkF03gdOG/xpmGPEf3u1WbWRk6fPLc6bcXV1J5nk3V4pOVXCR3EiqOcAAKoGT+NZln4ty8sa6dG9yGt1jSO6JjdZnKBt5jHIKnOAR0wTWunh7T4JJnklujHM8ryW32tzExkLFwUzjBLE496jtNC0eK4DrHcPKTEA891JIf3bFoxlieAT0qbaitFO7Kya9qEup2Nr9gt4Sb2S1vF+0l8bYi+UOwZGCDyBzxx1qvJ42jiku1axR/Ktpri38u53eaIyoKsdm1T8w+6WHB59dqTSrKSYXAjdZVuftaskrKfM2BD0PQqMFehrLTwzpJJUW07jypIVRrqRljRyCyqCcKPlHShtobkkyabXp7QXkN5YQQXdu0QVPtmY3Emdp3bN2flYFQrH0z1q1pGsR6vpS3ix+SwkkikiLE7XRypwSASMjI4BweQOlT32iWmoTyTTwzCaQxt5sUzoylN20qVPH32HvmoINMi0y3NvZwyJD5jyku7OSztuYlmJJySeppu6CTstC1FMWba3foamJwM1UiGWz6VNPJtUBep5pJ6akRk+W7JQcjIpHYIuT09qFcFFJ4zSkZBB6GqNOmhSY7mLHvTOGJHf1qTYfmx/D1poXngc1kc2o1HeI/LnHerIbeob1qCQGPGRxU9uoKkehqlvY0g2nZksY61YT/j3kx6jI9qiqSAjzNrcBhtNaI1I6QgEYIyKkkjMTYbGaYAWOAMn0FIBEhHO1Rx1NP2+rKKbk9KKAHFsDanA7n1ptFFAFNgWlIA5Jq2ibIFXvkmporfzFLggHOOlEoMW1eDx6e9CjbUiMbMipzcIo+p/wA/lRuH9wfrVlLdXAdiQMDA/CmkWUnTehWlTT2cdCPc8VofuYB/CD+tRrKyxny0yoJIJ4//AF0cq6ktJmdLaFWwOCOuaiMLhsY/GrskjSHLdhxxVTzJWbb0P0qGkTKMUB2RpgDLH17UgTCNt5I61GQQxB61Zt4nClsfL3NTuyFq7ESzeXHtC8+9IsjF/mJPtVoqCwJHIqGVP3oIPLcYptMpxaRJsUjIOKa8Y25yakUbVAHamyuqr8x/Cqsi7LqQbV804GAPWp0XHJ6moUzI4wMlj0HpV3ydv+tYJ7dT+VKK6kwSvciP3TUSJucsV2j0qwfKH/LX/wAdo/df89R/3yaq1y2kyFxucDJA9qURIDnGT6nmpQYOrSMcdgvWo3mBY4UL6AdvrQ7A7bsHcIuWqNZWkYBBgDqTSbDK25j8tCTDcFVcCpuRe7J6Y0gVwvc/pTmYKuW6VXAEk+VBx1OabZUnbRFmq8gxK2BgbQx/A1YqGJA7SkEkdVb+Y+n+NTUpudN23LjLlkrjTkTMEAHqvZv/AK9RGLBymSD69jTlPzqwGMg8Z6EHmp1/1Tk/eLUQn7WHMzOULOxUPFFFLj5sHioMCcEjBXrU7r5iAioOlLvbARTwxxVo0T6MsRcWjEd2A/nTc45qSX5FSIDAVQce5FV5oy68E8dvWrehrsh73All5O4n8hQFAOQoz9Kgth8zGrFJa6ii7q7ECgMWxyabGvls7N1bhT6DvShgTgHmkSUy5jJA2/degHYQlI8vjBP61KctZAD5TIcn6CoTZzbiSy5HPXmrrRsJlU4yqgAE9SB/jTSYlqVo7cRfeO0+/X8qS4jO1l7ipQhDZfGBz1602SQMpD8MRgNg9aLKxVlaxTiTcSzA7F5P+FWFDhyWbcD+lSsNiqg+6AMY7+9NpJWJjGxDcKSoYdutVquyf6tvpVPaQfm4+tTLcia1ADJ5OKbketL7VGUPaoMyYRse361YEMZUcfrUEcvaTg+vrUoORwcitEkbRjEeIozyFpZFZlwhxQn3eaJX2Rkjr2p6FuyQwBsHMmcdRUYiaRmIwBmoxknA6mnxv5Uh3nH+NRuY3TeopjkXq2AB60xHZXznOfWpiwlXJwR7VDbgGQluQKbWuhTWqsWCrFdxpmfnA9OalMqA4JpjFdwCgdM5FO2pXKrip98VYPMK9sHH1qBF5zVjcvynuBwuOM1ZY9QsQw/JIyR/IVGS8nQHGewpGY7FcckHBz9aY0uWwe3T0FAEoV/LYnOMYA/GmoGzlO3U9qb0pSzN94k/U0ASS7GQMuN3AOPxqKlVtvYEHqDTtgb/AFfP+z3oAjAx0wBSlcKXb5Rt4JpwRiM4wB3NRzMQoUtlerDrwOf/AK341E5ckXJjSu7DQxzg7s4ztQD5frnvQylhxvPqGYDP5CnIDty33jyfrSswRSzdBWMaUpL3m7luST0REqv52AqttUEdtuSen5UeXglpMbsdB29qkhBXLuPnYDI9PanOFY5Iro5YwXLFGTvLVlRbdZCzFV4OOnWpV+TnGOOBikkkET4HGfSlBy4yfzo16kqCWo9B/ExpcYo25bJP5VKVGzBHFBRBEoOSf73FOTBbeRn0p1NYYjIHFKwWFeTB96QSZBLcAd6jAyaa4398DsKG7ClKxIZQR8ueemRSMMKQerUROPLAPbg1FM5EjCk3oJy924zLI52nFW0JlgPYniqinDAmrsJG3joeaUSIEAtufmbNOWLy/uSMu4gcHGaJpSGymMdKSIs7Mz8BV4Huaeg/dvZAW3scdNxx780x2IUgfnUjDYvoT+lQtIuPbPNDfQcnbQFhdhkY+masQIVTBHOaZnJzUyvyQCPemkkUopAeM0gJI5GKXPPvRTKHocBiOoFRGIM3GQKJ7m30+1a8vp0t7dCA0kjYHJAA/EkD8arW+sadd7BZ3sMzTO0cflksCwUsRkdPlBPNDE1cl27pCqngdTUiwRqRIcnnhe1Z9xrekabcG1vdTtYLgY3RySANkjPT6c1o/aIFtllkmjWGQoI5C2FYuQEAPuWAH1FJJCUe44sWOTzSElcYGfxpEUjKkHg0XU8FjZy3N5IIYIVLu7DoP6/SmUVgI7CGQxROQW3eWh6ZPO0E8euBTUnS5IaJgyH071ZG25t0kQOEkUMvmRsjD6qwBB9iKrxWCw3BliJXd/rF7P7+x/z6UrEcuo2aU5KDnjmkSJguTSQyRSbmVwxVirDuCPWleYv8q9KhmTd9xp6HFS2Y+ZietM8sqtPhBMo28etJbhHRlxiF2bsdPzpkkYKlk49qLhd9uCP4f8/1qIy/J97Iq5M1k1syANgYY/LnkVY3RRKNo69MU2Jdy5x3qUxIRjGPehJ2FFO10NM8e319sVEilpMwjA96VQkTMJBk9uKDcYGEXApeom77jxH+8y/zH1qU8imxSeYvofSn1SsaK1tCgeM+tRqpdsDrUwXfJgHGT3qRoWjBZDkY5rNIwS6kcdookDdWq3sB6jPGKSJNi8kknkk07IzjPPpWhukrFcFoHOR8pqYhZVB6jrUdw4+5jnrmmwS7TtPQnip2djNNJ8pOI1DbgADTqKTOKs1Ezn7uKr3IIUZ9asqu3pTZFDxkGgCrbf678K0AeOeKpIBCQepJxVvryO9JuwmZ9KBlgPU01uFNKh6GszmHSNulIHCrwo9BUqxKYCzDnBNQuNs8gP8Aeq3H80fPuKpas0irtkEDBX5zzxxVqq4GLrCjAFWKcS4bDM5k+lQSBizHtkmrDEIufU1FgtwoyaJCnroRgOmoGRBmOWEAnPQqTj8w36VPI3G0cetV7yRoGgZOEEqq/HY5A/Uin7iU3fjTkxydlYcibn9FAojw7kdlp65EOV5JGaZbleQCc96kmyugYYyOg/nUDMCcL2qa5yH9jzVRPvUnuRLckpUADcjikqzbrhTlcHPcUkrhFXZA0bf3SM9KaqkOEb9Kuu21CaqbgcuDyR09KppItxSRIjCEnvmkmmDgAfXmoGLlqUQs3Oam+liOZ2sSK21T60yneWVXnmnCByuePpQKzZHRSlSpwRg01jgcUCFJxRTOW68CpUXPABJoAbTkjZ/ujpUgtm28kA+lCyiOPA+9nmnbuWo23LCcKPMb6mq9y5ec5GNvAHoKa0zOu04oDKyhZOMfdb09jTbvoOUk9ELFFvOT93+dXW/dYVABj+IDrVWKRYxtZ9w/2R/jVtdpQqCWPYHiqiXC1iMnJyeTRUc0hiO3BDe4p0CllGOS3JovrYq+tiRT8rD2z+tKgyrBjgevoaEKxk553feOOn0p4QbMEgj7xYHp+H+etUMY6lUXPXJFRlgGAJ5PSpd2/wCXHy4+X2qnKu2YOeVyPwpMUnZBK5VyGH0qWLiJe/FE0BYAn5Tjj3qSMiNShXaqHBLDrSSsyVpLUqSrIzMSOBSxzOu1U+U+oqaW5ViUjiXHpz/Omzxfu0dOMDkHtU27EeaCaVkC4b5+pqeOVQoydp25KYyB6VXSMyN5kowP4Qe//wBaoZQwkO85Y8n3p3a1HzNak5unLZVVx67eabEzzXPBJyOST0piuAgyaltRty5HDcY9qSbbEm2ydyOFToO/rQHYdGIx7018I+0nr096jeNnbhyB6VdzVkoVGctja579jUF0jtKdoyqjApICQzIx5zwKsScu2PU0t0TZSRn9KVTtYH0pDweaKzMC0DHdQyxvuUleChwR7g0zFuGxHIGcLkqT0HPP04NRwrumUbtvfOcYxzQ8e+R5z5auAypuOBz15/CorVOWF+p0UvflqiWJlckA5G0A8Yz71MqhRhRgVDGVhQBhtOOvXNTBlK5BGKqioqCUWXJty97ca6b8c4IOadBLumdByD0yM81FLKAMA4ptrGzSFl+6Op7VpfXQyclzaFoM7OMMc9Bz0p0u/DbBhe3QA04/6sv8pb1H6mq7tsUk1ZbK7bC2WdnPsOKblP4UfP8Avf8A1qRI2lcKgyTV1LXyuF+c9yO1ZpNmMYuTGbiVDAFTIMgehyRRGgRcDr3NTbd4CqMmPrj3qNjtFXY2sGRnHegsVBI44NIVBbNK/wBxvpQMqxzxow3RkHPIU8H/AAp8z+epkxgrwR7dv8/SkmQKiHAB71GjlGyADxgg96zb6GDbWjLUUfmqG6DHfpT2BGR0PvTm+4m0YXHQetAkYEZOR6GtDfoQpFtySclutNjGI2AHzA4NTsMMR6HFRIpErk9D0pWsTa1rDGT92SRn0FWra1/dgscDv7+tMqwkm6EIrbCOpqklcdtbkDLtYg9qdHE0gJXGB60ijdkseB1q9EmyMAfXmmlcZCsjqwEyAgjG/OP1pWMaqZUXnIA4xUxOGAIxkc/So5pFt9qqoyck44/z3piKZVgMlSAe5FIRjrViWQyhUCsCTnkVJLEGl3fxHsehpWGVNrbc4OPXFOSF36Dj1PFTs4RSdvX5VHTio0lkONv3AcEA9fxosgLG+OCMLxwfzqnNcRO+WfoMDC1HcRNkoGxg8+9UqiUnsZyk4l0XEI6cnsTUgnd1GHJHtVIwOIfMxkDr7UQyiNjuPymlzPqCm76luplkUQFT15AqoLmM9z+VPEinoc1SZd0x1RE73GB0onYiLK8n2qMeZgb+AR2pN2E5WJkjWS6Uf3iATV+SJY/LwCuMgeg+tVIFVGLyZwBgY9akM8jYXduHQZHWqjogSITyODimrGFOerepq49tknarDj86h8iX/nm35UWHoMpixgZLfMT1JqyLaTbllI/Co9jnorflSsPQdj7PEixDbuXcW7moGcq3I69Ksz5KxswIcjBz7VUljZ2BU4xQxbLQjlX+LoxPGKMN3b9KeUIBY5OB60gA4L9f7tRrcz1b0ABiOP0FATGMj6D1+tOMuPQUKCzZ/WqsXy9xl7dW9lZNPfXCW8KkAux6k8AD1JPYcmqFtqlhMiSwXauGnFuAEYMsh5CspAK8c8jvTfESmKXR76VWNpZ3xkuMKW2BoZEVyB2DMvPbr2rOvnstcETWcErxtqNukt5GCguAAc7WHJC5xn34PWk9wlFNnQyvukiifKNK5VAVJyQpbsOOAetWFi8tcBSPw61ytjFcWevWFpAblbSPWZ1Cl2ZRGbRmAyf4d5OM8ZqrYW8+naNpV7Cuoy3M+gyyXYSZ2kkkEcbL97IDglgvHHSmhqNtTtFhaUZlVlj/ALvdv8/59KSe5WBV8x44Edgil2Cgsxwq89SScAetcBb3rwQ6i9hcSPbLb2k7G2ad0BWf94Qz8ltn3iMZxyM1Lr01vrX2y8Ms0thb6hYMJVeRUVN6+YwIxkAZ5HTGeopyndaBY66G4huZrqO2cu1rcCKUBD8r7VJHv8rqatMGxIo4O4Hn6CuJu3W3bUlnDpbT63zI8jpFt+yx4LlRllJGAMgFsZPaug8ITSP4dt/OaRz5txGrShw2xZn2D5/mxs24zzgVlSik5JdSpaxRc5DdOQaVid3zdavMq7skdetV5o8cA5P8qbjYwlCwhYBc9qs2SZzO4AA4G7uewqtj5ce1Wbcq1iu4E7GIOD61UdwjuSuoYFn3K2eSeRTNgUAs3XpilZQ/MfPOMDP4UyVgvA5wMCrZsRxGIyOFJXnvzUhG1iD1BqK2QNIWPTP6VMQzv93k9sUlsTHYhkjDkdvcUxbfBzvOfarAUk4AOaQAswA70rIbim7j7cGKNpCdzDhSfU0wkk5J59aklKoojU5wcs3qagkkVFOTz6U3oGiH+cS5BwffFOyp+8Me61VWVByc/TFOikaSQnoo7UuYXMuhZlABUKcgKOcfj/WmU4x+eBtyHXpjuKgd3hfbIM+hHemx3tuS1HLF5mOcGmGZ94XaAT61PS0YtJaEItk7kk1CwTJ2Z68VcqNIljORyfek4icOxX8lz/D+dMGVJwSPUVckPGKhZN4J7gZpOPYlwstCSAErvYkk8CpCARgjIqqsj7Ni9KmhbK7W6imn0HGS2BIdkpb+HtVSblifc1oVSyBNg/3qTQpK1khYo2bttU9aSM+TIQwyOtWEbDY9aglOZW/KhqwSXKtByp5jZJ68n2qQDJwKZBzuX8anVNppx2KhtcUcAUtFNYkuqJyzGqLbsK5xFjqWYAAd6ax28yRlR0yccU6UMoUEFSdyg+hOAP60wIDyo2OOuf5H1rmlOo5uMen4mijHlux4GBS1GNy8qp255Qc7fce1PBBGQcitYVFNeZMo2FpokBGVDEYzkKaY7ZzwGVTjH94+lWYbZZF825Y9cDHr7elRzznPlp9B8qSvIh3sxzh2PYFSP50zAf8Autk8kcgAcgZ781ZuoUSYoNxUY4Y5qOm6c5P33p5BzJLQKYIkUg4yR0LHJH50+it7tEWCiiikBWuE3HK8mldd0AJHzDrUnl+pprZZwoBCLyT60mTLawqII33DkDgjuKl8wN0OKhjYPIwH40rJtIB5ycUbbBqtiWmuCVwKdRTKIR94AHjufWpmRB2pjRK3PQ9jRKcRMR6UrdyUu5XmO6RUAwPapHjB2kjtzUUCjBbvnFWMFouOvah7DkrohMYPtT0BVdueKj3lXw/TuBUwCOuUNQjFK+wMgyFz3yalHAJx1OM/T/8AXTSvynHU+tPYEKqt1A5q0rGqVipcMTJjPAFRhDIdo71aaJSzO/T+VNgAyzgcE8VNtTNxvLUS3iCbs9QcUxy0cxK8VZAx+dGML83PrmnbQvl0sQxz7mAYde4qeosLvGxRn1xSySFOik+9PbcaulqZnikyf8I+3ktIrLd2km6OIyFAtzGxbaOuACce1QxXDX99pDi4nvDDdS+ZM9m0G0GBwOCB37+9aPmM0gYnH0q7uY9zj60J3CMrmZq8Uj694dZEkkWG8lMjKDhB9mlHPoMkDn1qjNDeiTUrpJtQ806xaRxJ5r7Fg82337VBxjG/Jx03DpmuikYBd+SAeo96Ysm8ZViaZVzkbzUNSawWzi/tMXsL35mYRSgAbJjF8+MN1QrgntjpT9U0y5Fnf2gk1GeCWytpsSXErnzvNYNg5yOAMqMDgcCus87arKzEYG4fyqH7X1xu9uaTt1DmSOdvzfRatcpG+p/bkuoV05UMrW7QYj3b+qHnzNxf5h27V1LHDHb0zUHnybN235frSRT54fj0NF0Tzogu7GGWTzeUlxjdGSrH646/jUflzxRAQlXcfxSjr+WKtOY0BK/Mx96j80+gqW9TKW5ELi4ACz2jAscbomDKPfnB/SnQ3EMV1seVA7DhS2D+VSB2/u/pUMkSSLtmRXHoy5pXFfW5pqRyrfdNVJovL6DKk8NTLKOK2DeShUH+Hedo+g6D8KjY3yTMy+TOjfwNlOPrzn8hVNplyakiZJike0Dn1pzXPy/KMH3qNyq24lKuik88bivOMcZpDPbNARBIkh9VbOKWthLmsNMm9uTk0qozfdBNQVcgmVY8Nwf51K1JSTeo6GN0bJHB96laRVIBPJpjTgLlcH2NQNIXcF+noKq6WxpzKKsiSZEQDbw2eKdBIz5Dc1FM4dvl6AU633KcspAPejroSn72hO+7adnWq4Zocgr8x7mrG4noPzpCodcPzVNGko31RTJJOTyafH8rhmzgd8VL9mG7r8tTAYGB0qVFmag+oA7lBHQ0tFIc4461ZsLRQOlFAEUy7ivsc1Kv3aRlDDB6Uh3DhOlSyXcosMjFSxQM7qvbufQUhidWA2554xVyQlFKqeM44pJdzKMbvUqXHM24d81PCcx596ry/eH0qe3A8rr1PNP7Ra+NixjcWk9TgU5mxwOTSRcR7R0BpOTJ+NNbFx2I7hvur+JqSOWNYhjAOPxqKaT94Qv0JpiMBnPepvqZOVpC38Xn22zOA3OcZ5HIP6U5UYR8/wAXSp1GEAPYVX04FbJYm6ws0f4KSB+mKq1y3G7uSKTFhX5GOCKYgZHJXGDVgjKmoI45G5Y4H0pNMUk7qwkmW4GSTzVZh8wxWgqhen50nlpzkDnrS5RcjK0QJlXHrmrlQKoXITPNTLwAD1qkrIuKshsn3fxqlwOg6mr554NVXjYuxVTgGlImoCuFT3qaJhIpz296q0LI8TZU8VKZnF2epe2L6ChmCLljgVWNwzKNhwe/FN2yODvOQfWq5kauaWw+dkbBU5PtUNGwp2pyNtcH0NQ9WZN3Y+OLfxyB3NWQoRcDgUoORkVXuJMnYOg61eiRrZQVx7zKFO05PbFVaKKhu5lKTYUUUUiQq8udoz1xzVDcKd57AffP51Sdi4ysSSyPFIwDkLnOM8U37Q7LtD4HoBgfpUDuXPOTTljJwVzSuK5bEKmNS/B6mnSOyhfLOG/pVcvIev8AKkJYNknmquuhXMktC3BOxmCOFz64HNSsJDA2wbWyPm29BVKGTa5Ynn19KuCYFtygbu5q4u61LjqhcYZQfmCrn68ZqsVll+8cemTmrHmN3Ofwo8w4PQH+9Q0mU43GxwCJfn4/malMgMYx8p6Db6VUllO07D+NTDG1WUYDKKSfRCTV7IjmYCM5bBPSqqJuP86fPnzTn8KYGIBA71DeplJ3YHG446VJA5D4z8vU1FUiAqxJ4+U/ypLclaMmVzO4kIAwe3enPKqdTk+gqkm4IQCcHk09Nu4b+lVzF85cVkC+dgHaMjjv2qvDJmU7j96nTuDDGI8hT2I6471Xob1By1Hy481setMop8Sh5AG+71OPQdakjdgvyRvI5Coqn5icCsyLV7WXD+Rd7G5jK2sh88dthA+bP8uenNWNWulh0m7nnjEkUMDuYscFQpJH41smK+0jwWYrVluNQtbArF5hAWSVU+UEkgYLADkj3PeqVNVE0zSno7nOTau4mVvsd+XxiW0+yPvj77umMD64PbnrsWqQ3dqk1vKJY5F3K6ngirugX8+o6dOLtpVuoJmhmWSJY2jYAEDCsynhgcgnrWBoV4tjpcFjJFgxPJbs+eHkjdlY+uWIZqv2cYJJFOzd5Gmxbz2jjVcZwPlB/nVj7MwZFLCPaOQvc96aZ4449yhg7jp3A+tEV0GOXQ5QZyD+WaSsSuVAJJBcKMblPHToKqs7ycnoPSleWSU4ZjgnoOn5VKiqPvfcXk1LdyW7k9snkqMD5iNzH09qTNPd9ygqflPPHrUUjFUJGOPWr2NlohnmBbgqeOOtWj8wUP3HDH1+tZzyCTnGGzVqCUmP9CD3pJ6kqV3YcRg4PBop+fN68P296ZTLK1y2WA9KbFGXYHsDzUk7IU4IJ7YpkLsvCruFQ9zF25tS4pBBVjjuD6U0hlYhhRUiEbMv0U/L/hWhsNk++R6cflTaQsM8nk09UZ87RnHX2pAMJwKmt2wzAYyRxkd80otXIDHGO4zUoXY2MBgpOdi8iqSAbNFsUsAFJwWBPSoxOxYE5LA8c8Z+lOlEyoQ/I6bvaoVba4brg5oe4F5Y225JbzCOuePpSsiibeTzjjNJDMJdxAIwOaeOPqO9UIjnlMYyq59+1VzNIDuYcEccYq2BtXA+bHQGoHE0uQwCrSYETOjJjGCOnFVDcNBIfJbBI+apZD5aseDioETOZZOnXFZybJl2QxpJH4JPP61KtruVVH3s81ZtIpGlEpUenzdAKmu/MDcgBT0x3oUdLsSj3GXHlx2bRiQbvbnJrKA6AVbnUGMk9ulEaKkakjkDrSlqwlFtlQjBwetOjYRk/KDmnTcy8DrSFdi+pP6VGzM9mL5vP3ePrT9xZScYGOBUFXbdMs0jD5YwCB2J7CmrvQabehMRHDEguJMNjJUdc1E1+F4gTb7jr+dVJA+8tJnJOST3qPIzim5PoNzZY+1Mc5GT9aj8592d1MpC2Km7J5mWkuiFO47T25xQbthjDMfxqtGN/WgkbsCq5mPndi6kgkXIP4U6qkUuxueh4qwJBnB4qk7o1jK6Fc4U4qu6sckNgDsKlY7mAFOI24GM5oew5bERBMYU4GKdHCjQ5yQ1K42jcV3+vtTWmRV/djk+1T6mdknqT7yidTwKZHNJJuJJA6DmomLPEAgJHc+tMjZgpAJX5hnHX0qlq0h82pZSU7ioLjHc96fCzG3yGPJBznr1pptgyhWXgHIBbrU23ZAwIwWHANaNq2hWvUozSv5uQ7Y7c0zzZM53t+dSBC8mHBCisqTXtGQTPLqVvGsTFSu/LE9OF6nnuOOvNYa7mXLKT0NNJ5BvYsSVAI5P+eKHuktpoxcM7TMpKQKC0rg9wo6D3OAPWsf/AISCyeBZvt8VhCxxw6tcn1BHIj46gBiB3WtaGGKK0b7JGqiUb2YEs0h7FmOSx9yTU04tVG+53KEYwXN9y/z/AMrlbVbnURpV5cRy/YTBbySpHFh5CVUkbn6Dp0X/AL6rSuMC4kx03Eiql1H9rtp4kZcTwvGDnjJUj+tNW4v5Y0BhtLRtoDNM5nbOOflXCj/vo1Wt9RyiqsFays3+nzf4l+0TzpMHgH27Us91Z2ZFq93axSH7yvOqsefQmqSWP2lWN5eXNwoH3fM8qPPptTGR/vE0yKOK2RoYbaCOEnmNIlCn8AOaq9kRyU4LV39P6/Q144j5RkQ7gRwynI/Sqspxgdx1rNNhppYuNPgjkPV4k8tj+K4NKICg/c3l/CP+vkygfhKHpOVxSjTaspfh/wAEum7h0/Tpry5O2G3heWQ+igEmuIj1KdvDeu2eoPeG4uLI3yi7t5YtjNxLEm9VyqHZjHHz11lxFObQpc39rLA7IhW+s1IYswCr8jKMliAOOtQ6ncyI0a6lpFrqLurqiW/mPIVON+E8tsA/LnLAdOad7LU0hQb92DTf9d7GXq+oX9/e27q0ENnb69Da+V5beaxVhli+7GDn7u3pg5pdK8X6jdWrajPYpBZvavcRSSQOohYFQqswZjJnd/Cq4Ix3zXR3Oj6W2rJcz2Vmb9mDxvJEvmsV6EH1Hr7UNoulo0rppdmGukInP2df3gJ+YNxyCRk+tVZ3MempQ0DU7vU7i9tdRiWO4sZ0UssJi3qyBhlC7YPP949vpUOmXf2bwHa6hcOryLZqxkn3MC3bOMk8ntya1rLT7DSmMVha2tm0uGMcQVGfHAJHU/Wqv/CN6RaMfL0ezj81TGwMQAcHquD1yB0p20uS13KGkalcXzX1vfwrHcWUyIWSIxB1dAwyhdsHr/Ee30rchXbGOOTyaowWFlp4KWFlBao5Bk8mMLvIGMnHU4rSHTioW5CtzNoRmKqSpwQO1JDN5qFHHzKMg0pGRim2y+WzBuOoz+FPW43e40xMZw/GKlpWBViD1oAzTsNKwlRTS+WuB1/lUrYU1BMCJVYDOePpSYSvYi85+N6kj1qQyJ5ZAySRTthKnPTFVTuyNoJH0qXdGcrrQcWJx2x6VbjQIuBye5qqYZCuVWrUakDLdT1oiEFrqPqncxEyZQHmrDFgxx/KlTcTk1TVzSSuhqqep4AqvIwaQkdKu1XFscnLcdqUrsmab0QyDPm8HHHNWJGKAMOgPIqJ4hGoKsd2fzpAkkv3yQvvSWmhKulYlaVQuVIJ7Cm2qsZS7Z+6eT9KkWNU5Uc1Kilg2B2xVW1Ls27sMh49knI5OfyqEABwQ2eCCT1bB4/LpUm8bSV6BTj3702JNrKCQdqDp6nqaxqWdSKNo/CxyNsbOM+oPepHsxL81vtO4dC5Bz7gdaiPWitJU4z+JEqTWxIljL5g3qBjpxhVHtTrmVSQqcRpwPf3qHzZCuPmx6bqjIZjzwKqMYwVooTbbuy7dKwii3HeQOX7Gq1SQztCNo+ZO6noakkgEnlmAbd4JIP8PvV7iIFVpH2Rjc3pSTwyQS4JycZ4qVpgimO34QdW7uamPlXL7tkhcj5guOPzosgM/wCZqArDpV17fYu9G3LnHIwR+FQE5pAMZtuO9QPI0rbI/wASO1WWQHBPNAVUUselIBEURKMDim8vIGPAFO84MhKfr2qNpPk4POOtIltbiyTKnHU+lORt6BsYzVKrcDZiA7jrSTuyYybZJUcvKY9akpr/AHDVGhBEEHyhx+dOlkaNwFxjHSo2gUgbflI700xAKXDE4HepdzOXNYmE4ZSGGDUGSrfKcfSkqZMbeBUXuZ3bLUBOAx67cjPrSE5602NwNq45wR+hpFfe5C9B39a1vobJoWRdwC+vJpVUKoA6UBcEnPWloGl1CiinIu5vbufSgYipxk/KvqaRxtYKecjII70SMWyRySacseWBfhVAz/OmBQkGJCFHfpUyeckf3Rj1Y4xVgsPOIdQFYcFRgj/GklxImzoo6VFjNRtsMlI8hUZlLHnioo/3TZJ4PBp5hCodvLdiagcPu2t19KTve5Mrp3Lm0MjBvT+oqoyeU/PI7VOiyhGy4+7xx7ioHDs21uo70SHPbYdBJhip6NRJAwY7BkVEVK9asxyEgAfN9aXkyU01ZkJiKAM+AM9KeFA6CiRMt82c1G6AdPypCfkSrIEbHemzsGPFRKpLgDg5qVtgfYTubHNPcauxYojtznGacYF6ux/CmBjCgAywpfPZ/lC9enNVoi/dWjJX+S0XZnp/Ws2aGOSRXdFZ16MRyPxrSkbZZqGGSxP4VUCA8ngDvSluTPfQrPDK5BjlMeOxUEH69/1FS2y3Bci4ERUDhkJBJ+h/xp/0qVF25JqSCs15HCW86GdMHAzGWz7/AC5/WljnjnXfEyup6Mp4pZmy3FNMSSxlZUV1bqrDINAElTwyklU4+tUPsUanMTSRHGBskOBxj7vT9Klfzg6NA6AKfmDqTn8cjFNbjTsy5K0o+6OPUc1HEzpJjbknsabFdzbyJ4kC9mRyc/UEDH61F9viS6Pnb0HOWaNtuMf3sYp9S3a90y35jtJtQdOuamqBLmGQZt2WUNzuRgR+dJmQkvuAA/KnexV7FiikRt8St69fY0tUXuFFNU/MwNSBe56UANqN2IbipMjtULnLHFAFiPht390Z/wAKjf7hp7SEr8x4Haq4YspJ/iPA9qBX1GS/cH1p8K7XI7Y5qKQ5bHpUkJZ5AegHWo+0ZXvMnAA6VVkdzIQGJ54xVll3fxED2qMoqfKv41TVzSSb0IWjZQGboaav3hgZ56VLO3RB260kDKr/ADdexqLamVlzWLVRI0a3EkSDD4Ejcdc8Z/8AHaDcIDjk/SoWbOoQSR5Ksjo/t0IJ/I/nWl0bcyLdFQqd1y3cAce1TUAncKQjIxmlpEHzHPTNAyN4mHzZwoFIOMY6/wAqnc7uh4qEsI5lXseppabk2Sd2PVccnrTqjebBARc/jT1OVzTuNNMja3VmJyRmq7oUbBq7THjV8bu1S4kygnsU6ngyzHJ6dqf5Mag5FQsjJJ8n1BqbWM+Vx1ZbPPWqcsflt7dqnil3naRggVIQGGCMiqeqNGlJaFHzZEyFzikB3DNTvbkcpyPSoSCDg8GodzJprcKazY7VIqg/eOKRhhiB+tBI0HIpGPYdadg4zihQFPPPrQAghYjNKsB6NT2k4+Xim7j6mgY4QAHrUnPRBk0QFOd2M+9K1wBkIPoadkUkrXYwuVOHXFMdtx6UjMWOWOaftXYG/wAmkSR04OwUqDxThGzgv0FNCHdgjFGoaolikbZjt60MN/3ifzoJCj2oVfOPXCj9aer0K1egxyAu0VPHePwAoDcDK0kkarCcKOKrgMo3jinrENYsuSxgzI4HGM1FLlFynTcd3Hr/AJ/SpreTzLc+YOh6j0qO4KKhAbJYdMe4qntcuVnG5Cs2Byik/wC6KTznkilGQFOBgDHfP9KjpyMEj27VYZzzms7mQ75VjIB7VHTwY2+8pQ+q8/oaXbGv3n3eyj+poAJj++ZR0U7R+FR0523uWxjJzTaBBUkf3JP93r+IpgBJAHU1ZihABSRuG647U0rlJNlGeGO5t5IJl3RyoUdfUEYIpF1HVYrA2NxY2OqwbPLLTzmNpExjDLsYE46nIB9BVp7d0JzjjrzTY4zJnBAx6005R2BcyditZ6hqNtYtbaXoun6XFhnXdcFypPJJRUAJ/wCB/jRa6fDHY+RIWeNSWdycM7k7icjuWyeKseW3lM3dlwAOeMjJpW4gTHQkk/p/n8ayhVlUbfToa1FZK+5EjSsubgqZO5UYB9OO3HapEco2RyOhB7iql2NjQzjIMbgEj+63B/DofwqzV+ZiSFYz8ySBR6NnI/KpDs+z53M3z4PGO3/6/wDIqvT2JW1yO78/gP8A65oAsxOGhCqMAE9Tk0rKrDDdKpqxHKkjNIhIlDMcjvVcxopq1mPmUDBQY5wafbsAWB9M1MNjjjBFV22xyAocih6O4NWd0WUkVydp6U+aMSKCHChjkjn8RUeY1YHgFunvUitjg8g9Qav1NN1qRG1QNnfx/dFTLlIUwoQ89OtLuVfuAk/7XamEknJOTRZIFFLYkGJBkglh1A70xmLde3QDtQp2sD6HNKy7fcHoR3pjISjHmr1kr+WQTgE8EfyqsBlgP5VejChjEr5I4IbinEGOBcv8uMY555pVI3EjnnHTk0fxezf56UMwQZc7fr1qyRkmCjRsSflJHvVeK1LcudvfHelku3b7nyD26mq5bLZY5J9TUNoZoCMKm2MlQOTj/PNKRnIUgN1rP+1shwHYkdgM1LHqKHhx7elHMhaFkEKSCxJ255PHpTLjPknPHTPvTDdqD8oPTqOKq3F00hAHJ7AdqG1YexHIdzLH6nJp42tcJG33RycUlnC0jtuGMHljVjyVUsx44xnuKhK+pK11HoV3qVbAyAADj/PWprld0RzknORgVVyyqojLcn060sjsMAtkjqau5RDJH8oL8Ln86YQX5PC0ryZbLsSo9aQHzHA/SoYN2G7N0hIp7r+6KqKm8kqP3hWMf7R/pTHnt4vugyn8hRa24rJbleC2kklA2475PQe5qe5mWGNY4eQO/wDePrTft/mZQDYP7o4zUbhXYFuOO9GiWhKSS0K7yyy8dvSm+UQMnj8KnVQi5pjPu9hWZk/MiKkdDTkhLcmnKQG5Gac8nHHAoADiJeepFMjUuc/5FNUGVvapj8hAH40ANZVHQ80sZ2t2/Gp5ERYm+UDiqyqWOFGabVmU04sn80Kw+X8jmpNwcZTk/wAqjhiK5ZuD2pqwNuzvA9xValpy6kzAvGR0Jpot04znjr70i7/N2h9wHXIp7PzhaejK0eoin5yO1MEiNICoyo5JxjJpruAkgzltpG0HmlwWIVcDiqfuq5Mpa2ROJ4pCSWKEnOCP604tHj5pCfcVUdUjZRjJxzSFvMwq96jmYuZrQg12Z00m4kgf/RkjdrooB5yRbTkxknbn3POOgzVh2uNB8K6W8mn29zPbLBFLuYJ5WdqkrhTkgnoMZ9RUV5FG2mXVtMjOLpWtlRThpSyn5R6cZJPYAntT5b+8fTxY6zo1xeldpeaylj2SFSGDYd1YHIBxg/U1pB9zb3nBXRLHqzSeMLrTprOK342QTywyBrkeUrna5TYwBYjaGz8p4qh4dQQ6DbwbSrwboZBnpIjFXx7bgce1I17FJqn9o2mh6kbk/NEbu5VIEZl279m8lCQMfcz14yTm1p9qbOzETyeZIXeSR8Y3O7F2OOw3MarmT2CKa3Hyr8w24+c8jHfBqLY390/lVl1JUbeoORmnwqZIzllDhsbamUeZXCyuJbxsIZM9MdB61WlBEvsRV2NWWTJBAU89qaVBzu71DjpYpq6sUgpPtViKPcrDG4dh71Fuy2BzT9+NqpkEn5ves0QtGVPEjFNEDeW7LDe2UjCOMsQq3MbMQAMnABPHpWb4h1GPVLW1S0+3CFpnBnihuIzC4UFeEUOc54wQvHOeBXSKzCPCNjnpmml3zyzZ+taGyunoec6heajF4VuLzV31O2vG0eKW3eATIGuNreY0mzjeCF+/woxjFdG99qK6kLGS51Qz/wBsBsrCwjNuRkHftI2+2cZzxxWvd6ZYahcJNe2qTSoAAWJ+YA5AYA4YAkkA561fldgwXccqMHnv1pILs4Q2WsW/h+xlsjfXN7eaIZroXTvMRODByA2dr7XlAAwTjuRSWlg/l2VxK169rDqaFREbtTEpiZScv87DcV5OcZIyASK7guecsfzpqzbm4Zs0rIV3tc5GzudVfxhGBLqccUklzFcR3AllRFUExt86+WM7QRt7HknrXTo2oqo2XFlMvpJbPGf++lcj/wAdqaZjs5Y/nQn+rGPSjqOMmnay+5Ef2q+X/W6bG/vbXgOfwdV/nS/2ii/6+z1CD62xlx+MRepaeo2/Oe3T3NPUu8HvH7r/APBIV1bTZZljF/bpI2FWOV/KYn0Cvg1Nc7oztCn6e9NZi6FJPnRhhkcZBHuDUIZ7JMfNLaAcDBaS3Ht3dPb7y+44Uv3IlTjNWho/69BP3inc7YA7VPC4dfp+lJ/CrKyujgMjqcqwPQg9xSDjpTSsYKNtCYsF60wAufQU8qG60cAegpjADAwKWmeYPrTS8jH5FH40roXMiWimJvwTJgegFPpjCiiigBM0tISAMnihMu2cYQcknv8ASgCRY8ruY4FEvEYRejDJ+lJjedzscL09vYCldt0anGMEgfSmA1cc5IAwck9uKijJXGeMRqD7Hmh2ySByBxj+8ew/qaChC46jqT6muZ+/UTX2S37sPUeGBGQaZuLMNvSo4jlXz1qUMFWt1qjOLurj6azgdOTTRuc9eKDhnAFMYsbZyDVk3LNB5Qjwdu3du7fSoUQCnFscCmA3btGKs27F45IlOGIBXBx0qqTgZNMZ9rIR1/pSvYTLErzFgszN8vQEYqOrMbfaYij8sASrf0qqzBRk/h7033AWlycYqq2+NVJY5J5Gasg5UZGDjmpTBO40RJuyFGaSRCZOnBwM08HBpzN2FFgcUyk0JWUJnOe9WVQIMKKNo37u+MU6hKwoxSCmSsFjJNNd88DpUEkbu3yjIplDFLSsFJOKncbI1QdSelOgh2fMeW/lUUxzJ71MmROVkW4owo/mfWmGPax3fd7YpibmABJ/GpSNqEDJzSumK6aIQpZlA4Oc8VKsZWeQKOCeBSwph19SRUrHYvynLN1P+FUkOMbDCrL94EfUUlKGZehx7Uu5T95fxXiqLBV3Hk4A6mhmyMKML6UMw2hVzjqc9zULMScLQA8nA5pwkZlXPbpUGTv2p+Jp6pt5dtx9+lTcV77DnbGCecnAparPIMEH16DtRHOw4PzHtS5iedXLNIVBYMRyKa7mNB3PSnN905O3PeqKIorhjJtZchhjjqKWRhGxDjLdKW3hUSghtx9u1SSKsh5XNTZ2ISbWpTd9wwKRGKsMVc8pcY2DH0qrLH5cny59fpUtWIlFrUfIzdR+NRK2HDNzg1PEysPm60ThSnGM+1IVupMY1ljB/EGqZj2yBlGakgnKYVvu5/KlPWqbuU2nqMkZ3AG3AFRglWyOCKlLYYDGaZIPmzipJfcsg/aLdgOuNw9iKp1PG4gXnkuBkDsKidt7kgdab1HJ3VxFGWFOmbH9aUFABxyKjc7j9aRJFyxqVFyQtJ0HFPj++KAEIwxFBBBwRzSuMOaew2tuHPrQAiR92/KkfKyZFDOW6cCl2mV/l6dzQHoJHGspcMSNw5KnBP4ioZUvFl8u3lWdc8Ryrg/QMO31Bq7HB5bbm59OKeoUSjC5bOatJ2NVF2I5LmCyt085wqnksfu5479BT1mWQ4GOmeDUboVmMIOcHr7UwWsEEm6BPLJyW2HAbPcjoT701ccbssgjnFK7YTiqebqOTcsaTR5PCttYe3PB/MVKk3nxbgjx4OGWRdpB/r9RxTLCinMpWm0AMVpJfkzx3NSSsqcL97HA9KdCmyPkcnrUc3DE9+lRsjLVRuQUquy/dJFNByKcFypPpUmRZgLMpLHPNMkkVCQnLep7U6Nwtvn0qtnNU3ZGrk0kPiOJQW55p06bXyOhqNThgfQ1bO148nkYzSWqFFXVinUjNCId3mbCuMkg/jUZxk46dqg1CPdpd0f+mTH9KFuSi+sMkb5Qg/Wplzt+bBPtVRBKv8fHpUkcpVtsh/E000XGSRYpsgJjO3g07r0prgsuFOPWrNXsCHMak+lRHLzNjGB3xUp+VDjsOKghb5Xz1NS+xD6JjwAeAOfWpVG0VGFYDcKUuTwKoskopFGFxQeBmgBkjAKWPOOMVArlmJJp0nK49OTTJE8vGO45qJGU22ySFSzeZkD2qxVWAkSAA8HrVqnHYqGwVSfO87uuau1XuEOd4/GiWwTV0Rod0q59afOn73PY96i5Ug9PSrcbiRM/mKS10IirqwGJCuMfrWNrN1c2NrE9soRWn2TXDW7TiBNpO7YpBOSAM9BnJrdCk9AT+FUtQsmuo0aG6uLSaFiySQEHqMEFWBVh9R9Kpo0cVuY0mtx2ujRXt4FvVbefP04qImRT9752ADY/gBY5BxnFSHxBZCYiOC8mt0eFHu0RPLXzQpQ8tuIO9egOO/HNQS+F7SVR/pl2sx87zZtsTNL5pBfgoQp+UYKgcVbt9BtItPks43uGSRrcljjI8kIF7d/LGfqagj3CG314TQEy6ZdJcNdy20NtGY2eXYTk5L7RgLySQM9M5FX7W6ivbVbiDeFZmRkkXDIysVZSPUEEVDNoEaM0tve3UMgunuYXQITCzg715XDKcng5xxjpUtpaR2NqLeFpHG95GkkILSOzFmY4wMkk9OKGKaSJqM0VOkCbEeeTyw5+UBcnHr9KVrmYsDhk2Hr2p0jCOMAjOaheF45GU9VP50xmZj8xziqvpY053awHJGT0p0cpjPqPSmZqeOKNIxLcE7T91F6t/gKlEK99Bsk+9doGPxoEUsmCV4p/2vPytFGYuyYxj6Hrmni4kldY7fdHGOvzcsfrVaNlr3nqWVVYYdzjJI+50wPeqst0h2+VEmO+5cn9aS4uM/u4zkfxN/eNVmbP4CnKXRBKXREzNbs2dsi57DGBSiKCT/VzbW9JBj9RVUEuQAOakIIOCMVNyCb7HPnhMj1BBH5082MixlmHI9DnFRxSrGh4O6lS7kSQMDgegp+6UuXqQEY60Ved7a4TL4jf+8vf8KijtFkOVnjYDtyD+tHL2E466FcZ6inpIUclhk+9YetJe2OpXs+oXWoafagobG+tcSW1uu0A+dGDk/PuJLDG09Vqxd681v4iW1MNnJEbqK2bZMzSDeBhyACqjJ+6TnHPtRy2NFTfRm/I6yRLhWLFeQPTpVdUAyMrgkZBbJxWZZ6xfXV9YNPp9utlfXU1pGUmZpA0XmsCRjGCIm47cc+lXV7qMeMhaXs2rQ266csixaas7fP5rDJEQPbHXisZqU5ON7fI6EoqztqdHCpJDMpZiCNvoD2oe3T7ibsA59a5U+KNQ0vTrKyv41N+bd7mRr0spaPzGWJT5anEjKBk9AQeDSar4gvtR0HU5dJt0ggt7SNpnllZJlaSNZMKAONquvXqeOMZraMYxjyoiS5ndnRXKRmNodgbPXNRqCxAA5PYVn3euXEdxqcw02B7e1uUtIR57CSadzGFyMYVcycnk8dKl0+/umu72wvoIYbm1WOTfAcpIkm4AjIyDlGBFDRhKL3L5KRnAUOw6knj8KSR/Oj+bqhwMDHB/wD1UyiHBjde4+Ye/wDnNSQFBOOtITggdSadI22EJ69aLDSvqNVs9KWmxoSasRwh1JJ74otcSTexCeetTi4wg4y3emtCQ4VTk4zTorOaU8Rtj17U1foUuZbEqyo3Q8+hpwIPQ1FNamNcfxAc+9QLI6dG/Oqvbcvma3LtKH259O4NV0uf74/EU93jMZ3MMH3p3K5k0TqAWBibB7A1IWMuX5WZBk47/wD16z7dv3hA6EVcEvIJyG6blODTTuEXdXHG4mHBYj8OaiJycnmpiyyRANL8wJ5YGkEabTmVc9uv+FMor/vWOBgD8zR9lJQu5Y4OOauxQ4TIcZ3ckE4xSNdxqcLubnJIGP8APSjlXUmyKttH5U2H5UnpipJbUlmUrkA8c1ZhkiZSzPtJP8Q5pJmkQ4jjZ2yBnYcU+VWHboVXsxHhSuTjJGOlSQwLGQGjzu7eg9aV1aRv39wqt12DoKY26DBGST930+uR1pWSCyLJj6qg2gHIIP8AOo5iHjG3pwSScA1V8yR2w0jfTNOZWf77s2PU07jH+bsjwH7YwD3zUPmD0NDKqjOPwquZnLcHFQ5WJckiWVflXHrzUob7Lb7/APltIOv90UWyb2LynKpyff2qKeQyzAt3OaXmT/eICGYbnY/jUy2xKBn+XcOKktYjJMHcZQdB/Krc8TuVKoSMdvrRGN9WKMb6syygEmNwPvRvH9wVYMCFs9vSnBFHRR+VLlDkZUZ93sKbTpXUvhExj9aYN2ecYqTNi0CMuevFOVSxpWbA2rQA5Bg7I8H3qXYkI3Pkn1qzYxCCEyP/AKxhkDHRaguZgzEuCxbsTV2srmiVldleWXzOBwtSWzfKV/Gq9WEhZTndjjtUq97kxbbuSkFuvAFRM0hbYi7R60rIyAMJCTnnNWo0L25cjGOmO5q99DXfQgOI02rUExIYIAeeSR/KpmG2TmhFwWd+CefoKpOzCSurIh2COINGUK+1LEWeQEDGOppCpYZY4zyR6HFOtzhmHtUStzGStcayb5mywUDuakRUQEhwT61A7bnJ9abU31DmSdxxlB1pWb5l+xfuwf4SJCHx9cpn/dFWyx3blOOx5rPkBW8sJOm4TwA/VVk/9pGriMHXP51UdTucrxi+6/VoSTn5unYn0pytuXnqODS44xTYV/fAH7o+8fbr/wDWqGnTmn0YfFG3YmVVRN0gznoP60k+11HkDBzuOfpjH60jsXYk/wD6qTPFdJmNWZ3AWXII5Azmnk56ioHYBo2YgAHHWpSaJW3Bdhr5VSEAzUSKd25uMVKTjrUUjE8Doawk9QdkSKdy5p4YSKf7y/qKaBgAUkfy4Iplgo2tuHWpZcHDgY3DJ+tNYYPHQ8iiV1RVjJ+Ycn8aYiJpQOnJqMSfPuIyccU5ym04xn2qKs2zOTdxWcsealhGEz61DVhE2d80LcI3buPA3HAoY7mJ96cgJDY9KZVmoE4GahllKlShIPtUxGRUflqfvjn1pMTu1oQxFo2ZrWPerMWktQQocnqyE8K564OFY9cE5q1C8cyiSFt8eSMkEFSOqkHkEdwaj8vb93FNZWWbzoZFiuCADu5SYDorj+TDke4yC1oVpJe9v3/z/wAyy7YHHWolDs+Cc9yaElW4LhVMcyY8yBj80eeh91PZhwcHuCBOqhBgUbnNKMua0gCgdBS0UVRQUUUE460AFFM3OeiAfVqNrNw+AO4HegAB3sD/AAjp71M2QigD5eufU0ylDqi8sMtwFzQ2luAuf3QHq3NJIwEagH5iDgenqT6UhbMQ2qfU5G3+dRBd5z1HUkfxew9h+tYTq392nq2aKNtZCxjOGx8o+5nrz1P41JRRWkIKEeVEttu5EkQRTzknvio9679verBICknpVAAvJ8vc5+lWSlYtqxAwBmnRqeuOaeigDmnbuOKAEJyaSiigBjEEge9MYYmBPQDgUoBJyOpPFSs2E55qWyZEtu4jmRycr0qOe38q4G45AGVpbR0DBpclRnAHrU06b/36MXUnnPUVe6HuU5Y/MXjqOlMWf5MsPbirDHJqCZeCe2Kl9yZXWqFE24fL+OaFd2kAzwOtV0RnbC/n6VbRAi4FSrsUby1HU1mAGO9KRkUgUDtVmgxUEfTqx4zUhOM5IPtSSjKL9cVHA24tUvexDetiQsxU8bRjrVJX+bI5q667kI6ZqoiAOc9utS1YiasTxu2OB1p8bGRjxznAoVfk5PXtUxzENijacc+tUkVGLAkJwmMjq1RzyiMgHk7RgfhTlG5gKgZTPKWPC5qm30Kk30JVYOoIoJwM0xQIlxknJpGcsMYoKV7aig5Y5JH401omU5izuPWkZtnUZPp6U5LklSFQlqTaJbWxBuZWyc8HmrZGQccH1qGMbj83Ukk1KxwtKJMNiFoBtymSR1HrUcJzOMdqsxg9e1MdfLk8xRnP3qGuoOKTuMuWywX0pvm/3hmpx5b/AD9cd6qu25yfWpZMu5agK7SfuueB9KnUY61QEu1Rx0qa3mMmQeQOlVF9CoS6FndnoKZtDMTgZpzOqiovNGe9UaDJkPmDaccdhUZRiPvZ/CpjcqDwCzewpVlG3hcZ7VPKQ4XZUGdwx1qyiF+nQdTUqKpYZUYzyKd5jdiRjoBxihREoEXktjIxj1zimOV4VVVlHVjnk1YZy0Z9evSqPmEE45GaTsiZJIdIpZsjHoBQiEcmkEjE4AGacXK/KwINST5kTHLZpKUKx6An8KSgkBycDrSlSp5qRQEXJPWmM+4+1AxtSmTZGHcAs33QRx9f8+9MVVCl5DhR6dSfSopHMj7iMdgB2FAIlSfeSkighuhAAx+lW1kVcLGgUdMnk1nxvtkBP0q3u2/Me3NXE1h3LQJkUqSWOcjJphHljaCR3b3PpUUcoMak5PFKTvIAqjRDAjpIXbmgnJ5qbHGKAoHahKwkrCR/dodUdCkgVlYYKsMgijd8wAqKVZOqc80DIGtBH/x5yvDxjZncnt8p6fhillknVgIoRIMdS+P6U4SMP9YpHvip1kXaMfpQBJVWU5XPvUzTKjYOaqscnAOR2qJGU2hq8LzS5pyozfdBNN6dakyCmr1NOpdp9Dz7UADDacGnxSbGwfunrSS/e/CmKOgJo2Hez0HyqFf5TweajklMMLuBu2qTt9an8tfSopY1ZHUn7ykfpQD3JY3EkauOjAEU6ooAUtokP3ggGPfFTiJu7DHfAp2KSbEgBCktwD0qao2yzYHQVIOBWi0NkrKwVEYwv3R1qWigZFlguMcfSlRec9qkAyadkDpQA2mufkxmlLAdTUZO9uBQBHJ94e+KklUH73Soy37wHsCBU0oBjJPYGpXUhdSoGZWBXrUsMjeZgnINMWIsu7oKYc/wnHvU6oyV1qXiQCATyelLVOOQq4Z/m4xVlJVkYgZ/GrTubRkmJMhdML1zmoo4plXzUQlc4OOas023eQSzqpZMrkEeoNFtRSjrcx7+3i1PxLpdtcNOIfsV3IUiuHiy4ktwCShB4DN+dZ+l6zql1CLS0ntS1vHcS/a75Wf7REk7xx42suMqoJfnqDg5rX1OHS72M3GtWNnMlqruZblfljU43E9scDP0ovLfTr6SGzvLTT7hoI/Mht3iVtkeQMgdl6D0OKVxqasYY8Raje29xe2VvZRW8IsiIJ43MjfaFQ4LhsLtL/3TnGOOtWP7UvItTWyuxbyT2mpmAywq8SODYvMDs3nntgkjvgHGOpitLK4jkkls4i0xQzYj++yY25+mBj0xT/7Ls2uGma1iaRpfNZ9gyX2GPdn12Er9OKrl6j9045vEuq22mwz3sNjM95YRXMAijdFiZ3jQh8sdygyhsjHAP1px1bU01iXR3+wNdC6jt47kQOsY3QNKSU3kk/LgDcPXNdXe6JaXGnvAIoYB9nNsjeSr7Izj5dpGCvA4I7ViWXhzStG0y9S/jtJYriQS3DSwLHEu0BVwvOMdc5JyTzQ4sejJtGM2pWryXRiiaC4kt5Wiztco2Nyg5PPpk4ORk4q1O5mnOBgD5VX0ApfswtIVgtY44IIhhIolCqo9gKTG2Mkdcc1D7GMrdCxNwsQPJEYyf5fpiqbkbuOlWdr3NtHsBZ1bZx3HUflTWtI84W4iJX72TjH09aGmyXqRwIJLhFb7pPP0omlM0hduOwA7D0qWK2lEytFJGcHO8OMD696iumi+0OYfuE8cUugugsMW/k/d/nVqNNquR129fTmqkMwRgrdG/SriNtcE9O/0q42sbQtYoxgGQBumafNFj5vXjgUyQHzmGOd2MVdxkYqUr6ExV00U7NP3jEjoKmkALHjNP2iMEr3NR+9D0VgeisMhKZKuBz0zU/kx/wB2qjcMfrQu4sAuSTwAKSZKklo0WZIIwo5wT0VRkmmb2gxsQrzyWHWs7XoXudHktre7it5XeJFaWUxrKfMBMW4cjfyvHPPesaO6j0lb63tbaTSb0mDNk/8ApEOHZgJIVXqzYYY+UZUEgcksq19Uat5o1peyXRaS6hhvTm7t4JtsdxwFO4YyMgAHaRkdaT+w7Fr77QZLxE+0pd/ZknxEJVxhtuP9kcZx7ZrOtNX1K7mi04mOC6e7mha5e2GQkcauPk3EbzvA64wCcU7VNT1WztxHFPaSXcNvLNL9ltTKr7WIUtkgIpC8jJOcgfdyVqP377nRW9nZJHZxxxSbbO4kuYSW6O4kDZ9R+9f9KkWxSK+Oooref9nFuWV8fIGJHHrk9a5Qa5qVlda7qTzLPBBpdrcRWRUhFZ/Mxzu46cnHIx0xUx17X4ttu0e3zrq2ghurqx8v/WMwddgfnGFIOf4sHpkuSUlqaxujdvtPj1C7iuPOure6jjMXm20mx2jJztOcgjIz6jnBGagvvDdjfSSmSW8jW4jWO4jjuCBOFGFL5ySQOM5575rG1DXdSgebRpP9IuvtotftVvb/ADeW0Hm5CBh84GRweh3e1Sade6tO2n6QIIdMkSGZ98loBujidEQLHu+XIcE88Y461mueOm5Ta9DVubGyuILyCSJjFeS+dKN5B34XDKexGxSPcVHaWdvYySuss09xc7fNnuHDO4XO0cAAAZPAHc1R0PW59St7eS8jhDyac10xjQgbxIV7npgdKy59f1O5EbafaCSa3soLnZHa+YJpZEJ2k7h5a9gRnkk9sU+buY8knpc6tm44NSWSu1yojGeCDxwBWWr6hN4sSytri3ltYx5t2n2XDQIRlI9+7lz16cAZ7jO7DP5StHD0B5IHB+pqPaQjKzY1RluK0CREGaNgx/uHIWmPbiXBidCB68GpRL5ilcLnPysvTPpVaSKQyHjDd8GtYzjON47BKDjoK1tKnYEeoNTRLsjAPXvRA8gDB8/iOtPSfcf4cg8gqKtJCiktRMc5xzVmKR44iNhPPAqF7pIhu3FT2UdKpS3Ik4GRznJp3SHKSRduZSV3t1C/1NULXDMQ4zxxmrbN5qkMc8Y5qpEo8xR05qZbky3RP9nXaR37Gq2DyGGPar9IQD1FDiNwT2KyTBBhYwPXmlaWVui4+gproI5R/dzmrQORkUlcmN3pcqrI6c8475pwuWzyBirBG5SD3qlg7sd+lDuhSvHZltZVZfvY9iaY0mFPlfnTVt2GM4PrmplUKMmnqy/eZCon68/jTg0/sDTssx44FIMZ4+Y+vYU7WDlt1HRwbnG47mJwM9qnnccQxjhf4jSQY80MxwqfM30pBG5w5U/OeDT6FWWxagshHhmYEkcgiormERYIyMnpV/ooUfkabI+3aWCnnoR1PatOVWsJGTsy2W59KrMDLMQgzk4GK2bxWdF+X5s4AH05qsNlqpEeDJ3YdF+nvWbiJxuNcCCJYQfu8ufU1VK5C+uTUn+sPt/OncAfSh6lNaWLdsTFEq9MDn6/5I/KnBv3pz1GTnPpg1DaS/aYnDAkjHsfzqbKZJJPQn9KtbC06FRRuYAdTVWfUbSC0W4DtIrTGEAAJ8wBY8uVAGFJznntWsqxxqzx4JHAJ7frVE2e55yk8W6S5FwnmRBwnyKpGCfYnIIPP1yJLqMr3ZgtpUE5kVpOkaRtI59eFBPHc9PzpXRHgSSDDowDKynIZT0IpRaNZ/ZF0+SI/Zrc2ymdScL8vzDGP7vI4zxyMVnXcl/HJchUeztfLaJCi/JEpYKrrhiBtjDufu+npS5E9ieVF6JHbjovrViGBZrsKR8iLuYDv7VQ07VWuzFBPFN58jPyyY2nBfZ6naDsJ/vLz1rbgiW1iLyn55Dk+3tU8lmLlSRDM5SaQk47H6VnSPvcnt2q5doJcGNh0yfrVN4ypw2D9KmVxTuMBzV1d3krjrjvUPkER5J+bsKuCAhR5h8tcdT1/AURTCCa3K8UMk8pVnwiHLP6Vblu1WMIi4iAwAf51DLJtURxDag7evufeq8g37d7ADPfvVx02LSstR43M2RUcsnzFByP4vf2qSGHzy4LsFGQuG6sc4FVmARRjgYob5NtyJSbQ6STfTKci7/pSSbIEElw+xC21eCWc/3VUcsfYViQoyk7IERnYKilmPQAVF9qti5SKRrqRTgx2i+aQfQsPlX8WFOdWnQrcr5UB/5dQ2Wf/rqwOD/uLx6ls4p5dioXOFHRRwB+FB0qnTh8er8tvv6/L7xBHcXc1sXhitYbeXzgpk8yRzsZcHHyrwx7tU4YCY9uMGo4pTGwzyvpSzp0dTlW6Gmn1LlPmSsrWJ6YHKyMB0ZsH8qjhLevy+lOHEx/3v6Uqkr8vqioapktDfd4oorpJI+kvTqvH4f/AKxTieOaSYZj5OMEHI7UFC34VM+4l2GspPKnP1pi8/Mex6U/yxngkGiNNmcnNY21C2o8HI4pMfNkfjTgKCKu2lyhwPy4IyP5Uy6j3KJU6YAb2NLkAcnH1p6sPKlyQV28/wBKppNEvUo0UUVzmQ5Blx9asFlQAv36AdTUcSgLu7mpmHIHsK0S0NYp2Kzys7Aj5QOgHankucFCORkgEVL5GRkpj68UiwAMDszjt1osxcrGRsWXmiRwuMjNW5FTy9+zb9arOobI7dqbTSK1sM8wkdgKRV9OfehYypOQGqUdKm19ybN7jHhEgQl2jljyYpU+9Hnrj1B7g8Gnwzs8oguVWO5IJXZnZMB1KZ6H1U8j3HJKbLGk8JimBKEg5BwVI6Mp7EHkGq2NlZrllt+RYorPvBdrZtKdTuDcgFYfKRUV3P3V8vBDEnr+PQVoYKgB8bsDdg8Zxz+tO5E6fKk73Cm/fb2U/makWPdGzM20A4yBmnLEhXEb5IHQjGaoyI6KKjJ3csOCSFX19z7VlUqKC8yoxuwLZXe2RH2x1f6UqKwXBO0H+FOAKULzub5nxgsacTjrWcaV3zVNWU5WVojSFHJHJ70uc1Gzj7zdB0HrTguQCPlrdJLRGd7sfmo5JVjXPU9hSPtwf3gBqARh2Bd8+2KdxXQySZpOvT0qaNAvQHJ9aceFAiXp2xSh2B5QA0roXMhzSBCFALH0FORw/TjHWmQqcszdSaeAqNtB5o1BN7jqYSX6cL605hlSKZsPl/TmmU9h6jv+AqOWUAECmPMwG0fiagrIwci1bgiPnueKswymJumVPDL61XgbdEPbipK1WxtHYlnjCEMhyjjK1Unb+HB9c/hV9l32S4+9F1+hqo4yhx17USQnqiKJtsDFfvDrUkbs4yVwO1QpATHuDYJHSpIlkCjcRj0xUq5Mb6EtNY/MtOpCM49qo0GvN5XBGcjiqyuRNnOMnmpihmlznCqcD3qKbhgO9Q7mMm73LKyKwJB4HWookV2Z+vzcVAATwOatWoaONmIxuOF9vWmndjUuZ6lkIY13dX9M/dqKgEg5HBqU7WZiVAAPXOBVmoiALGzN0xj61EzAcjp2pks4kYqn3V6D2pAuIQT161N9SVK7Hhcj5uppj/KwVTjuafGSRzTZVAYHvih7BLYYArcNnr2qdFHRcAVFyqEHvT0YqBgZ9RSWiFHRXDyyJCx6dBQxA680NKSOnfio2YeYQqlmp6FaJEoORxSBwQSOg604J8uZPyHSo1YH5cYB7Uw1Kz5DHnrzxTQMnA60oUkcCheGGPWsjnJpIwsKjb8xwKmSNY1wop1BIAya0tY3SS1GsVH3uahkG/0AHtUyjKksev6VFUt3Ik2xQ2F5AJx1xQjbMlvmpOlJkMPWldi5mNMx84PjIHQGrKTRSsFGVY/iKpuADxSxOFY7sgMMZHahNoSk0y2WCkAkAmmSopQkjkCmiDbIPMO7IzU1XvuarValFc7sr1HNWgTJGGHBpyxqjEqMGmSyeWoVev8AKklYlLlV2EUu/g9fSo5/nkCoPm70+3UbC3cmpSOu3g0bodnKOpVMLk4yM0qwqrYkY5PGKlfcqgLgZ6mmLbgMsjuQM5Ax1osLl7Ika2j8ooDkk5yO1UzAyybT07Grg3JjPSlZQ3IPNNpMpxTGLDHHH8ygn3FDIGjbb6dKUo2KZI7qxEZ4A7CjRA7JDI2URgZGcdM1LCd3NVScdj+VOQlWBXrU8xmpsuk4GTSZ3L8pqMsT1pUOCSewzVmxIqhaRm2ikLB4sjvQRiOgBP8AWcMMio/so7MakVgq+9JljyM/hQA2YhcYHPWoDnPNTTjEyn1pso4BrN7mEtyaFt0Y9uKGhViSep7+lMtj8rD3qbPz49qtao1jrHUpEFWwexxVvrHzTUQcu3qSKSZtsIA6mktESlypsrt94/Wk+lFWIV2p83G6oSuZxV2R+YWGFHNNEbHtipEXaD65qVAGiZsfSna4JXKdmxfT4JJP9Y0aliRj5sc/rVlVdcFmJJ7Z6VFbxbUjiB3BBycdauVSNILqIBgUtFNZtoqjQXIzjvS0xF/iNPoAKY7EMMU4sB1NRElmoAVsAbj3PAFIQ4UlhhfakkbAwvbgfWpuo5pbkfE7DFCSRj5e/Wm3J+UD1NPb5FAUYqOQb5lX0HNJ7BJWjYeBtgA9qrOmxse2aszHaufQE1WUZhyetKRM9rCDHOfwoVirZXrSUVJkXUJMYJ6kVJFn7QhHrg+4qrDKqphieOlPikeS6jCDChxn860TN+ZWK13LFClzPJG0kMcbO8apvZ1x90L3J6YrjrOz1nR9D1S2it5U1KeOGWCRC0my2DKDAD13RqXAA5OcjnNdmyvE5BJz603ew6MfzqCFKxzujW99d3dpBc3uoNYSTzEiOW5iIURLgGR8SEbskHPXIB7VT1XUdci0GExnVPtttY+ZBKonbzpFkcYZYwAW2qpPmEggjA6muvDOxwGb86eJ5k/jb8e9O+hSqIyRLenW7vfJqY1IXUn2eNRJ9lMGz5AQf3W3pk/e3ZHtWFfXl/b6DNNZXGsJIunk6hJdtKuy43x42FuAf9ZxH8uPwrtmuWEYfqM4Zc9PT/PtUV2LPULYRXqeciusgjZmALDkZx1HseKq9y1NFu44LemaqSSDbxU3mrOhDHaTVXyyXIPJzjipkZS11Q5ZGCkKzAHqAetJT2UIoHeoywFSZkqxFoy+fwqMAM4U81YSb92uB29arBgZSRxmqtaxo4pWYsmzKrxU8Mhb5CN3ufSq7RfvRJuzxjAqe2Pzn6UdQT94sPJAjF9uXPJGO9JDdM788Ac4BxVST/WN9TSAkdDijmdw53cnkmUOdg3Y4Bbp+VIszNHJuOcDIHYciocHGe1KjFDlfTHIzSuRdtjdpPODgVKf3Klf+Wh6/wCyPT61aTH2dWKgMehAx+OKrTIiLxksT3NO1kU42VyE2tvewyW15Ek0Mg+aNxkNg5H5daqPoWlRwzW32JXjlZXkZ5HZ2ZeVO8ndkdueOa1YY9i5P3jVeQkyEkYPpRshu8YlAaLpa2ZtUsI0iM3n/KzBhJjBcMDuDEcE5559abLoOkTxxRy6bAUhjMSKMqNhOSrYPzAnnBzySav05I2cjAOD3qSbyZDFp1j5zSmziyLX7KwOSrRDOEZc4Ycnr6mqsnhTT7mxihgiWBFuobiTcWkLrGeEyTkDnjsM1q3G2MLEnblz6n/61LaSYkEbcq/FUt7MuMmnZlN9J0qOxNh9hVoDJ5xBZi3mf39+d273zmo5NK0qa3t7Z7FRFbszRlXYMpb7x3A5Oe+Tz3rTvIY0YlO361Uod0wlKSZk2nhrTodIsbK8hju2s4miWQBk3KxyVIB5XpwcjirF7pWnTQq8mnwyNbw+XGoJUFFHCNg/Mvs2RV6kbGORkVNyOZlGLT9N+3f2hDZRieSTzjIrt8zH+Lrg1e89iRuJbHYmobaDyraOM5+RQoz6Cp6mUYt3Y+eS2ZL58bt8wPKkEetPTDrlcEr/AHTyB9T1qGOMyHj8TVe+F0t5Y2llMLdruQxm5Zd3l4UtgDuSAQM8foDPsFOTl3N41Z2SsaAZlbHJz0VuCfoe9Qum+Rtg68kHgimzaZrO1Vu9asosH5V+znEx9Dl8gew5zjntUNzDqunXlh9pnt7hbmfyRbQxlSnylt4Zic4CnI446c9WqdWLtuvPcqXJNa7kxgfPzKSfrUiWo/5aD8BVvefRf++RRuB++ufccGt+VGSgioZRyEXPGM1DkqRgc1oCNFGFYAe4NMkgSQE7vmAzwOtJxbE4tiRyCRcjr3FPqmf3UnyGp1uFI+bg0J9xqXRkjKHXDVEI5VyFcY7UG5XsCaUToR1x9aNGF4tjTK8fEi596kjKuNwAB702TbJEcEHHNV47ny1I25/GjZivZ67FwkAZJwKge5Q8JkmoHd5j8xwPSpIYCWGASx6ClzdhObexJEkkzKoHJ6CrEsRt3CEgk8nFVrnU106LNokV1IJBHcN5u0REuq7CcHBJcdccAnNOjuVu7WK62tGJlEirIRuAPPOCavlsrsqKtqy5GE8pd/CmT5/f0/rWgDnBBBGOMDiseCQTeZGSQPvr+H/66tMsglRELAABcr696qLGrMtEBXUyH5h90etEsqQnLsAOw6k/hUEsyxDZCcufvOTk1XMMpGTGxz7U7jHzXryAiJNgPfuarBWb7x/CpWRlXJUgepFNyByal+YxQNq4prHA5pc5qS2iA3zzjpwgIzSEx9lAYoGZsDeQRu9BTi6jCyE8jHBBFRzTM7EcgehNMjUNIqnoTiq20QJWRYYbLU4A60HaxI2qTjnHr+tOm2iIAqcD5iPr2qJmmydx4Bx8wpgRGNh2z9OahBuNx24Ud6t+a54wh/Kgzlcgqc/72amwPUprCFleVSUkkOXKEgE+uOmeBzTTNcSfKxJPTcRV9YmmZSyhBn8TRObe2ZHupYoo87UDuF3seijPU0crYmiqtlIYi5LUxIFVgckkVag1P7TZxyxxeWzr8yNyYz0Kn3HQjsRStdhLdvMCls8ZHFHKrhyoZDHmRZG4SM7iTUbP1JOTUL3ZmxvIVP4QTgflSEnBIUkDqTwKrlYXQrN3bn2Hf2oUEtnjcep/p9KjVssWbqBwPSkeYQwmeeZIIw20SO20ZPYep9hUSlbREXc3ZE88hh8pF6qRI2D3PT9MVHchXmKxfMpPGPftUMt358pe1s7iYHGHn/0eP/x75/yQ1H/pDnE1ysSHrHZoVJHoZWO78VCms2zX2El8bS/P7v8AOxN53ls0NuizXCHEm5sRwn/bYdT/ALA56ZwDmlt4h5zTO7TTkbTM4AOP7qgcIvsOvck80gCpbrHGixxoMKiDCqPYUsT7GOehoTV9S1JR92Gi/F/12FnQLggYqKrYIYZHIqKZVC5AwfaqlHqiWupDU9uf3bhxuUDJX1qIRswyBxUlryzoeCeBULcUdyIEq2RxUudwBHXp+I5FPZgqlmICgZJPas3+3tINm00d/AQDwFbLE9gF6knsAOc8UpQcotI1h7rNUHIBHeis1Ne0oCMf2hbnzG2ptkBzz7dOTjmtKuiL5opg9HYZK3ylAMswwBTw2AM8n1qMAiVsj73IPtTqJvoKPcKKKKzKDBJGDinUDiitErEhRIv+ikKOWb+VFPHMJ9mFNq6EVRAccnFMMZD7e9WqU25I8wj9azcFbQXKhscZOFH5087z0DBR0GKbjPAqCWbd8qZCj9aH7pTaRZIKx8jGR/X/AOtUdA4AopFBRRRQAUU1mx9aZkk0ASFgOtLSbR6UtAFdhex6mZ4IrWaLyRHF5ty6GM5Jc7RGQc/KOo4Wn+beQN5k5+1xMMPFbxBTEexUE5YdQcknoQO1S0UGnPfdL+v66EsV1Dd24Nq+9UPzgqVZGPZlOCp+opyNscMOcVDcW4m8udXaG4RcLNH94D0I6Mp/unjvwcGojqNvF+71CaG2uFIBTdxLno0Y6kHB45III56mr9zN0+bWGvl1LrmHqC6+23P9ahVdrEdQuFB9gP8A9dMRhPGksEiyK6hkdeVA9vU5HfpUhXjAP1rBXnUUrWSJa5Vy9RN+T8ozTTknnk9hUiLjgUBVVywzk+prczdyPysEM/Jz0pZM+nHrTmY9AKa5zgd+9J7ESSSGSxr5e7ocU1G3Kdq9O1SzYEJB+lV1DxYfHFS9yJKzLSrtFKxI6DNMjmV+Oh9KczbR71XoaqzWgxt78D5B39aZj98uDxmnAbs7uRjmljX5gfQUnuQ1qiWmSNtjY+2KcWCjLHFQzyKyAKc89qbehUnZApXHyYI7g9aj8oepqOpYpSr/ADE496m66makno0WIUONp4AGakyq9AWPv2qJ3dQDEAfemmfMYcL7MB2NXdI05ktC1DMEkYyn5GGGpfs5Zd8DCVfbr+VZzzFzz930qWK5Ik4OwY4xSUkLnVyYgqcEYPpRVmOfz2Ec4DZ4DY5FRPGAzBTypOQRVWLI6KKKQEVu37vHcGoJTumbHrVvAznvTlUHLHjHfFK11YhxurEcEeFAA5PWpXOSAOgGBTsiNPl53DqR29KhedUJDR/jzzT2RWiRIq7jzwo6n0p0iGWHgcHk89Owpgm3qCAMdhiiQySx4VsY6dqNLB0I3hCqCNoxx94Un3bcncHGf4e1RvbuOWOfemqpjbcpz7HvUX1MrtPYI5CW649MVIXLYQDJqF12OCv3TyKdHIFYs+c9OBS9RJ62ZKPnXc3GODTkdQp3cEntTGmQpwefpTBlm+XoKotvVIkY7jgdKFYCYsRnjFIfY8Ui/P8Ad6DqaG+wOV3ZE8jjZxUSj5ueOM0Nlug47UeUGIMn4c1RpqRBxlsepIqIHBBq46AxkAduKqBWPas2rGEk0yU3LEcACmb3PJJNSRQk8mpHjK9AcetGrD3mVjI+ODURZyferLbejVERg+tIkj346inKcjPSggHrS9OlIQUUUAZ6UAXl/wBTHnqFpaTaFYkdG5H07UtbHSthM/Nj2oIDDBGaWigY1c+mB6U9MM2M8UBS3ABP0pNyQcsw3dQAc0BsKShP3Bx05/nUDNuY5OTR5q/MwPbgVW2lmyM5HpSciHNLYuu21cnp3qpLOG/1fy07zXaMgjI9SOlJFgyjdyKlu5LlfRAhm28HGfU1IoKx/Mep5J70+WRBgE5PoKFQONz8n09KexSSWxE0qDg9PpTVKs6iOh0/fFV9eKcImWRQTjPQildkXbZIVI6ipEXAz60AbV6k/WoP3xBwfwB6VVzVuwjxsHJiOP8AZNOSYnCyLjtxUfmtt5HPc0iyq8iqSBjnFTfXQz5tfdLaoB15p4XIpqsGp241ZqQTglkPYGo5fu/jUsu7cP7veoZCCowc81nLcxnuOtyBu9cU8uFViTz0AqsehqRYdtuWP3s5ppuwRk7WQomO7nlfSmyyeY2egHSmUVN2Rd2sFXMrKhA9PyqskbSHjp60+HeCQp4B5qolwuhjqyHaTSpMysMnI9KlmUFRk/MB+dVqT0Yn7r0H6Y0ZtMR8YdwRjphjU8kjxtnaCtUrcoit5GVG9s8Hrk56++alLsRgkke9PmHz6WLaOHTd0pjtu6UEbY1UdKQjEZb0qzXpqSqMLS1VWZj2P4Ght7NlWIGOQaXMhc6JQu5jTmAReOvSogJMYyfwqXaBEdxzgZyaL3DmutBiKGOP7tWWj2r15AyR6VHCBGu7GWbn6elPU8nceo600tAirIbSBQGJA5PWnMpX0OehFJQUV7j7p/CogwCbcVKU3OS/IHamiHccA845qJXuZTTbJFEUowBgiopYvLxzkGkGYpeexqxKA0J/MUboNJLzKq5zgdTxV2JRHtA7Gq9sAWOeo6VZpx7jgtLizKDI6kZG41Vmh2LuXp39quTDE7/7xqNgGUg9DTauU4poo0pJPWhozG208+lJWZzj4yOVbgMMfQ9qRo2T7w4PQ9j+NMHI5qSJsNtOdrDBAoGMoD7eQafJb/ORnODjPrUbRbepoAYzFjzSAZ6VMkIxljxTxGnY/lQBCgZe+PapFj3cnpTzGM8cU7A247UAMbZtwMVLFHGPnV84quww2OtAYgYBpp2GnZj2UsxZsCo6UsSMGnEjaFXkmkIkVWkQYGB3NWIolUew6n1opx4RR2PNaJWN1FIRm3Nk1G0Ss+45zT6KZVriHODjr2qpIzM3z9R2q5R5YcEtjHcmk1cmUblIowIBHXpV1VYKSnG0cH3xxQTCmB1I4GeKsGLPJ6AYCr2OOaFGwoxsUY4AOX5NTUrDaxHocUlO1ikktiGdHfG3kelQmF1Ukjge9WmYIMnpmoJnJOA+R6CpaRnJLchooorMyIIZGM1wsnRHG046gqD/ADzVlEaQ/LVUqgu2cN8zoAV9QpPP/j38qsxuyLwetPQenUky9uTwDkVDDMkvirSzONsYin8vPTzvk2/js839asJKJPllxjsabPDb3MBt7iFZIic4PqOQfrnnNaR0dzWPlsReL9Mury8sLrT7Wea6t0kSEqsDwhmaM4lEgyB8n3kwQAe5FW/FrKun2hU/6T9ugMGOud434/7Z+Zn2zWa+lx7lEV/qkaDmQDUZiCvpyxI/4Dg/hkU2GwghuDOBLJLjaJJ53mdV9AzkkD2odaPM4IqS5Y3NWO6EmBIBu9fWpfkP94e/Ws6n+c/HzVKl3IU+5fWMHodwx0HWmSSKkbcHnjrmozcuqo7IuGz8uP1/z6USXBOWZGyfUYq7ovmRUJySTTw56AD8qRmMj5xjtVmOIR89T61mlcyUW2VTnPPWlVC5wvWpZEV58A4OOakRFhUkn8aOXUahqVmjZFywwKaOce9PnlMp2r90d/Wp7S086TBOAoycc0W1sibK9kSQ2TyLlcKPU1P5f2G0mlZwsoQkMULhfT5Ryeew5PQVahAUFQ+SBwfSsfW7h3mhtEjaSJmV7kJE7vGNwKnCfMMhXwwHDAcit4xSNbJGdAn9p6nPcbVR1lBklUsWVFwDDng7TjLRuq4LHhutaaDzmeSQZ3Hj2qwiPFp9us3mGZowZPNIZx6KWAGcZIz19aWOF5PuLx69hSlqx2uR6cgNzID91V5PtkVZmlAUiFvlY5Y9yajOyJWWP5mYYZv8Kfaw+bJ833V60krKwRVkWLaBURWI+du/pTvNj8sktjvg9aWUsd3BI2nHrVCaNnG4qwBHJqnpsMmu5klg2oSTn06VT+82Ow61Ds2SAo3BNWIkLbQvVqzu2yU76C1agD+ScA/eBGelQSzrAMRYwON2OWNQvcSyWe45OXxnOccVV0huSRbkVPM3SuDxyF5JNM81S2TEuM8Y4qlChf5nJI9KsUr3GndFo7pgzId6n+Ejlfypjqyux2Beeu7H9ajjk8s9Aec0pnkb7xB+qg1VxkVy9yIJPsiq9xtPlqzEqW7Z5rJtNXl+0ok3mTQmYln8sNJHHtYYkVB8p8wYHtweQa2/OYZ27Vz3VQKijeOBnKooMmS+0YLHGMn1PA/Ki6EYdq+thw6rNB57rI58gnMhgg4I2njd5g6gZB5BArQvbO7u2uUvpEwv7qAyR7ldC5ZsqCCQV8tSCRyh7Eg2m1DamxQTxjcKqbpJpM5Kj69KHUXQlySJoIhb26RRlmCKAZHOWkIAG5j3OAPyppIlXDDcd3yqDyaRwqAbiTzUkcqRHbuAXOVPpntSg+Z3FzX8iaKIRrlsFj1OOnsKiuZMgIPqatRbZWKsCc9CvOPwqhLMJJnFg6ttJWS6I3IhHUIP43/8dU9ckbaU23qzRU3JWiMLCNlTyzLcMu5IA235f7zt/Avv1ODgE0scbC5SSVxLcH5BIBhYwf4Y1/hHqep7ngANiVY8rGCAzbnZjlpG/vM3c/yxgcVMi5bex2qmCSOuewFZFpxguWH39/8AgEUjbpWY9yTUf/LT8KkkffIzYAyc4FRn/WCkZDyxIxUywqVGc5IqHIwBirCSK3A4PpVwtfUqNhyIEXAz+NBUNjIzinohbPYDqTSqmV3EhV9TW1lYsgkkZThV/Gn28LffIOTT90a9FLn1bgflQzvJ1OB6DgVn1HYzPEkJk0G4haMlp9sMQ6ZkdgqZ9txGfatjULp9P1HTAtjBKLmX7PJcFtrRZUkbRg5+6eMjHvVC9t2urF4Vk8ptySI+M7XRg6nHfDKKSfXDKIDqWhXrvbOJhJavHIgYAjIG4OwwTxtz7VpFpaMmSbK/26fWY9f0wWMFpdtFOkUckEivMoZkV8ugV1OAcqWA3DNWNNlhn0q0ltd3kSQI0e85O0qCMk98VUjkZLmefStIvra7nRkW4v7lXjgVm3NsUSMRzztAAOAMgAYvWdqljYwWkOfLgjWNM9cKMD+VUxRuSOm7BBww6GkUkjkYPTFPJwKYh4yP7x/nUS2LW48gge1PiGQ2AGbsDTeWHHSoJA28Fc8dxWTly6g9EWt6nh0H/AeDTZFCyFR2ojnZly6qXH8RHNPJWTJ2nfgkBSPmPpz0rVO6uIip8bFW+UZzwR61npqgYyq9lcLIk4t1QMh8yQqWIBzjgDJyf14p8ev2azxxeXNEzJIx3AZDISGQn1+U+xxRzIZoNsiY7fmbPfoKVGcrlTlnbHP+feqKahbzahFZrv8ANmhEyk42jPIU++Ax+gqaS/gtp5IZEmPkW7Ts4TKuoxkLzknmndALMS29Y+AT19RUSw45bmm2V5Ff25mhV0CvsIYg84B4IJB69u+RU9Typ6ishtFOpCKTiVcaQT3xSbflwTTqKkYgjB7UZwcVIchKgU5frzQBJTBx8wJyDyCakxSYwwPboadmAuKVFLMAOppo+U7e3b/CpE+VWb8B9T/k1VhXBjlyV6dvpVe/vZLPT7i4QjdDC8i5HTC559sgZqaopkjnhkinTzIpQYmTJGQevI5HHeoqyUUXTtzJvYlgtlsraK0TJW3QRAnqdoxn8cZ/GpKgjndHWG8feXO2K4IA8w9lfHAf9G7YPFSFmBwQAfQ01boZ1FJSvLqSA4zUZy0mB2pM45dse2aHwACp6n86Zk3Ya7knA59B60kYbzfn42ilUbQ798cVGpkeTeATUGfW7H3GTgAe9PhO6EZ+lPwCc+1RW5O0jsOlPqVtIeY04OMY6EU05duKWVsA56fzqOGbDENz6U7pDuk7EjYA2j8acn3KYq7uTSylwoEY/wDrUvMSv8REqF5iJc8DNRuuxyvpU8Ubq+5u455p8kQkHoexpWuieW6KdFSPAy9OR7Ugic9FNTZmdmLE0mdqfr2q1AgRGRyPm71VUvC3I6+tTpMrDk7T6GqiaRt1Fe0LHIGAOuB1oESA52inhmBGD05FSbfN+4Pm7r/UVdkaWQ61UNOCei/MfwpWcNuJUb3BPHYU1ZjC48s8Dr/tVYlVFkbAUEjAA9+P61XQZSopyqMbn4X9TSu2G4UAYHGPakA1VznPQdTTHlMj+WvCjrinsxK4PAHpUFuMbvXNS+xL3sSGTylww3pn15FIHjnygYqSP4hRMMwtVYIQM5waTdiZNp2JGR7Zxk8Z6etWIpFYHBqp5gddsxbI+6w5I9qQoVkKj8D7etK9iVK2xauHxGMetQxqxQs5wO2aCNwG4k/jUyNnj0o3Y9JMiVfMbyicZ5U+h/8Ar0rQ/IcnoOMVKABIr916UTKwJVccHHNO2g+WyKbLhsdamhHyOnQ0/wApQvIyfWmo2FJHU0krMUYtMWJXRyG6Y4NSFQRjpUfmEHJNIZwBkkY+tVojRWRKWAODUVwrEAjoPeoPOMr4A2g9TmpJJPk2A59aTaaJlJNCLcOOvNSM27Bxjiq4GTgVMBgYqbsyu7A8hCgA96mUnHqMcHNU2BDHNPjcop64zQnYcZWZOQsSljjcaqVMXVhlufrUaAF+nFDdxSd9hvSlZt3bFTbR6D8qkEK7csMUgsVVXccCp4o98gjBwOrH2pQoLYQU6AbZGc9Dx9RTS1HFakrHJz09B6UlKy7Wx19DSVobhSqu5sZx70lKpwwJ6Z5oAbMWZQkXyrVcxAN13A9cirTDaxB7HFQ7flOeMetFhcq3IhAM/eIAFOVdijPGRk06NlfIzgkYxSb08rDfeAxip0J91O6EWVT8oIOe1M8jdJ8rED0pkcO5sr0ByanoWu4L3lqOkiztKAZHX3p4IUAHg0LwuWNRE8k1VirK9x0caK+VJJ96VlAlDk/hUZJCkrye1MSbecN17UWCyLLjcvFCjavP40IcqKVgSvFAxhRZMkcHvVZLfy5ST65+tTgkdOKerbuD1oAYBk4FODleDzS7AFOTzUdADbhzv2jpioalnQiQnsairJ7nPLcKszfLbgfQVWqeBi+UblcU0OPYgoHUZ5q19nTI60SRxhCSAOOtHKx8jHoQUBUYFKAFHAxSW2Xt8dSp4+lOrRbGq1VxkkaydevrVRhtYj0qaeRg20HAqCs5GU2riWEodZklGf3zY496mnRVZQowarRSmSSZduPLfb16/KDn9a0sZxkU9xr3lYCoOM9qWimSMUTIGas12ARKOgxS4CdAfwpElVlyTz6Ckbe/A+QeveloTp0FJLHAyB3JprfvJFQH5Sefp3pu9hkFsjOBx1qUR7B8x+c9cdvaluK/Noh3r7nNABJwBk0nJYKv3mPFSFgo2p+J9aosR/vYHRRioWnRe+fpTpF3pjOPWq8+0IAgwexpNsmTa2GmYsDgYBp8MhMmP736VDVqHaUGMbhUK7ZnFtyEuEzhvTrSwcwgVIRkEHoahhyrNHjoc5qupdrSuDR+U4cHjPSp6jmXdEfbmnWx84qvfODTW9hqydiWb/WcegP6UynStvlYjpnj6U2qKEZQw+YZqtNF5fI+6f0q1TJU8yMrUtXJlFNFOgHBBHajGODS7Ttz2rM5yY/vZAysMNyRuxj1pZbcrkrnPcGq9WYrrCBJOQOhIziqVnuXGz0ZW+tKM9s/hVwmKQ/dQn6moHZUkIVFx9T/AI0mrA42I8uOTn8ak5ZAdypnoD3pFZGxv+XBBxkkMPSo2cuct+GBjFIkd5TAjcPl9Qcj86c0YxxwaZG+xuRlTwRUqxeaeJVwPY09wWpEY2A9fpSx4Ei7xge9WTbybCUAf6GoWjcsEZCp9xRZodmmWQCTgDJp7LhBg529cdqT/VrsXqOCaRTtbnkdxWp0CUAZOBzTih3YAz6YHWhhtQqDhm6kHoPSkAbQv3zz6DrVSS5d+B8qjoBQ+YG+RuvaoaiTMZSewZOc55q6spmjBLc4wSOKpUqsVztOM0k7ExlZlhLgFf3h59fWmB2e4+Q4H9KhJx1qWJ0jUt1Y9qL3GpN6MfcOMbAec81XoJyc0Um7kyd3cKKUAsQAMk8ADvTowVkIaMk7SQGHtQIpXChbq2kxn5ijH0BGf5gVapZBEZlBhDsrA4zkbgc9DnvSPtaSTbt2hyuFIOD/AE6g/jTGRkknjNOijMje1O8soeQR9animQAAjafUChWvqVG19Rj/AOrwPXJ+g4/nUdTyhQuNwA/hPp7H2qIISxDYUgZOa56btJxlubVlezWw2pYOGLbN+B09KeoeDgthHAIdT/n16Um+WJvmVSPXb1/EV0WMErbkqIPvksWbn5uop0UitcBcBv5GnLOk6fOvbBHp/n60+NUjQui4x9P8K0XkbLbQSWBCylE+9yB3qKUssbbeCKoXV75niG1todUaAkq80RdNpHRUAIySx9+Bn1FZrareyWe6K/L3E1szzpsU/Y5N6ALjHH3mGGyTt+tJtFct1oauTnOefWj5pD+8bOKyZtXvWjurcBor0SxwAJFv8ttpLsowSQQMj6irN1fTNo9nd25jtnupFSVpGCCHCsWBJBC/Mu3JHU1mZezZbJAOK07DhZW9WA4+hrKgl+2RQXIVoxNEsm1uq5Gea27aPy7cbsAsdxz0FXBaiitRt2LoWcv9miIXWMx+aCyk+h5GOOOvFZugRS3twdSumzIskiRsskqkc7WVo2dgvIPAOPlU/SS2nuL15b3SdRiuYmK7bOZNgjXaOM43IxOTyCMHp3rWOF4UcHkkd632NRt2Qu2TYCTx83+FQJI7l2Yk7UOB6dv61Lc7HALMQRwO+RTIVxv8pg7beBg+oqeoEAGWA6ZNX96wRhVHXOOPSsZtSs/OZEkad1PzraRNN5frnbkD6ZyewNbUUqTRxyQusqSAMjqcqwIyCCOCDSi0XKEoq7RFFMWkOVYc/KAOgqG8nEaNGoyWA3H09qsSuLeLA+96ep9fpWUW3yqq/MdwOPWiTsjNuyIiHZS/YcVoWg3RrJg9ccduK58XrAX8tpqzSxRFIgrlHZB5iiSbAHRQTjPHBJ4xTjqd/HOi2Fyb2CK4cBsKTcRiNWZQQACQWYAjuMHvWaaWo1Bo2HQOuD0qWAKFMLcI3Q+h9a5pfEFwy2EqM8kCp5t2wiJBRnKjJA+XChm7dBWhqt5cWmpWUMKyJG0q+bIIWYSAkgICBgep/D3p3W5XLqXzE0b7QdoB5FPpJJHnhYr/AK2M4fHcetMQhFOTgDvQQmuhJUDSvHIcjK54pTcr2BNIs6uCJR+lJsTknswmu0htzJseRiyokaYBd2OAOePcnsATVLzJu+myHPf7VFUxVZ9TCqMRWS5P/XaRf5rGf/ItSPAT90/nSabOjljGK5opvfr/AJlcXEi9dMnP0uID/wCzU4XcnRdKu/8AgM1uf/alTNFiPgZaoe+KnYTcF9hfj/mIZbhxldMuFbP/AC8TxIo/FGc/pSf6Y3WW1tx6RQtM3/fTkD/xyp2Yntk+lNLt0wo+ozir5e7HzQj8MV+f53IWtldgs9zd3OOSHnKL/wB8R7VP4ir06BYVEahVCAKqjAUDjAHYcU23t3flRnJyT61NMQHIHReBVpXuJzlJalGM5arEKhzIjd1yPwqFsCT5fy9KPtsFpfwRTecGldUUiFirE9t3Tpn6c1klZ6ma3EkTY2M5ptJLqumiOaR5mCRoX3mJgHUHBZDj5hkjkeo9aZNdWsFvNPJcDy4VVnYKTw33cY65yKJJX0Bokp8OPMGailaO2QNK5IZsJ5aFy5xngD2GaUMskaSROHjkUOjr/ECMg1K0dxGisgEe1lyM564pbhMbQM7ecVnq7r0Y/jVy2cvGwfkYJ/KtlJS0LUrjQKcTSUyRv4fz/wAKJNQXMy0m3YNry/cXcPT19/pTlXb7nuTQgK8/xe1F1fRWlsZbsSGMAkukRfYAM5OOg+tRThb357/kOT6LYWioRqFiZI4zO4aTZg+S21C/3VY4wpORweeR6ilt720u1jNtcBxI7ovykfMn3gfStrokc7Zyq5z6+lOQBcDHHSobW5t7y3N5BMrW5Bw5G0AKTknP+cU+ORJoEmi3FHGVLoUJHrg81MnfRAibtUasrZAPIOCKeSdoqJoBuaVVkcqC3lx43P7DJAyfc1HvdFcHdEmPSpMCNCDkSEHBH8Hv9axF1K/murYWyN8uS8cRUeZtPJG/B9FI4ZDnIPymtlvvHnPrWtrCvcow6YIrOO3N5cP5LiSGTagaNvmyenzZ3HOc9TStoVjPbSxPJKxkjZSzEBtxffvz67ufSrdFLlQysug28M0c+bhrhZEkEm88BVChcdMbQR0z8xqe7sYZ1JlMg823kgYKcYViMn68U/JHSpS4EaB13cZ689adkBTtLRLOJ0jZnMknmMWCrzgLwFAAGFFTVIyArujyRnBB7UixswzwB6nigBlB5pzIyH5him0ANopcUlZFClvl5qrCcuT71O5+WmxrjkDFAFhF3A5OABkmhvLAOA7fiBQv+qb8KYRirvoIduidSAp/FulKWyoAGADmoWwvzdCO9SA5FNO4ATtUk9hUOdpUHkqvP1PX/PvUj84Xsx5+lRKd5LEZzziuefvVEuxa0jce2ySJ0lRXjcYdHGQw9CKgLiJQJ5GaAcJcSHLR+iyHuPR/++ufmKtIW69PSnqhChl6nqPUelVe5nzJ+61dEhi2syOCu3qPeneWoQEZ46c1BERbGO3b5bV2CREnPkOTgRk/3T0X0Py9CoFx9kKkSlScEbff8KpJWM501BDFG6Mg/SnAYAA6CmwSrIpVwFI5BUVLtA6uPw5qlsTHYYehxTY08tcZzUw2E4557k0wggkHgiixXUq3TYYfSmQDI3GpbmPcu7PsahVtqFRWb3MJfEW4jlc+9PqKBwYwO47VLVrY2jsFFFFMYUzOJPY0+onYLlz9AKA2HuFK/OMiqe04BPAPerW1mwT0PvTmjDJtNTa5m1zHP3+t3liNWuorO2ew0lwspa6ZJZP3Mch2jaVz+8wATyRjjNbMGrWaasNPNwxuWcov7lwjEAsUEmNhYAElQc4Bptp4W08azfalc2VpdXdxcLLFLJbqZIQsUaYDHnGUJ4/vVQm8MynxRDqUuoQzLBetdKGhYyYKOvl79+Ao38YXt+dWa1NLIsaf4msZdI0q41SZYbq8s4LmXy4XZIvMUfeIBCKTkAue3U4q4viXSLnUjbxXLCXzJIgzwOqF4iwdQ5AUkbScZzgZ6c1za+B4lFmDcW8vl2VvaT+fA7bvKXbuQB1xkdmz2986snhyO50+C1nut8Md9d3Um1SCVnFwNo9CPP6/7PvTTY9CZfEWn3UO+1nDsJYFH2iOWIOksqorLlMsCW4YfLnqQORJHq9jcak1nFOzT/ORuhdVfacMFcjaxHcAnFVv7Fv5rGK1vtSglFvLamPyrXy+IZkky2WJJYJjjAHpVS18MTJ4ki1OXUIp/s8s8gBhbznWQMArMXIwuQBgDgUtQ0NuRjnaPxpCreSdoyTTnXdyOopgkdyUX5T3NT1MnvqNWUqNj8nsaZIT07VOEWNSW5OOSaPIkZcrgc9G4JpWZLTKmD6VYA+VOVzt5GcH/OKkhhZ3IkXCg4+pp726nLSrtzwAKFFgosrg8kEEEdjSxn99j2pJZAMIUzgDDEYNCTKP4FDep5pbMWzLKssalyeR90f1pB83I5qAuXG4knJxUiF0Kqfu/TpV3NFK7GTE5K/hSYz0p8hy/TnuaaAEjAXjNG2o9rtkcicFjn2qNRuOKmlVnhLZPsB3oihCxh5s/wCyo7//AFqizbMuVtii13IrBwM/3jjNBjMPyjaWPJJGePShNzs245wevoKUnJz0puyRTSSGgR7+cxkjgjkfl/8AXp0TiNxgMx7lh0+lQPndz+FAdvrSuRcWTcjFCcjt70u5duMGms25FB+8vGfanRKWbNIXUcqKRwM59ads2dsVKFEakmmIGd97dO1NFqIqxng8Z9DTyN3XgelLUTzbWYdMVVki2lEazDftT8alTp7dqhjXPP8Ae5NTnheOwpocV1H/AHo/df5VG7BFy1LE2VcHrj+tQkG4nEa9B1Pp6mmwk7IdEskzmQBtoOBgVOSsXXBb9B/9ekJ6BeFUYA9Ki27iWY4XnmhaDSsiTdu5zmmSoXXCnHPNAXvF8x7qetKM7dzsFB6DHJoG9SA27g/KRx0pVtyUO7huwqUshHylgffvSAjPLnHtS5URyIgSN9/GV96c0jxvhsNjvirIHGVO5fXHT60hUMckZ+tLlsHJZaDSPMUFTxURh2jlifxqyuFHHXtTWGR71RZCiBF+YkKPWoni3rvj59RSy+YRuk4GcAU6BsKTng9BU31IUm3YijmZDzyKl+1D3/KnsiS/eGG9RTPsnP3uKosPNQn71KHUEHcPzpPsg9TThaKD940ASn504pgQkelSKNoxS0AMmOImIqnU00u/5V6evrSCAmMMD2zioer0MZe89AiRdwD8k9BU6osSnFQwLiU56gVM/HLfdFOOxUErXELNgnoKrNIz/eNTM2/luAOgpiR+Y+cHb7Um77Eybk7IltOeAcHOfpU7kNggYJ61AyCFGdCRn5evT/OKdED5ase4/qapdi4u2hDKu+42invAG5HB+lLDzdOx7A/yxUtJK4JJ3uUIbcxXUxIwskgI/wC+QP6VfAJOByTVGOYnVJ0kb5U2lR6ZFaQwqdcMw646CnEI6DSFU8kk98UYRuhK/Xmgr8pIIIHpTaosCuzjGPpSEZUgHHvT1YEbX6dj6UjKVPP4H1pAV3WSGPeBuY8KR/D70+Au0f7zrmpJzhQvoP8A69Rk7ISfWlaxNlHUfE2d8n/AV/r/AJ96WosmOzUqOcZ/WnRSeYme/ehBF9CvI0jSbeQc9PWiSJkGW596sKmGLNyx/SkdHdtpxs68UmiXFvcqVJC22QZ6Hisy7gtJNaVdadjp8FnJcOiOy+WysoDkryeCdoHORwCejnh8Kx2E11qU1+YbWVIpIb2SYNEzY2kocE8ENu5wMnIwcONNvUlRe5uVEgJmdu3SqraPokmptpMs+pTzrA0ywvcTbdo2g4fIDMC68EkjIPFJoM0s+g2ctzL5srxguxGDn0PuOh6cg8CqcbGu5oVJF8qO/oMD6mkSMvkk7VHVjQ7rsCR52g5JPc0DGUUUUgCiimSSeWBxnJoBuxVvAEkDetIGO3HaproqYhnqelV1ztGazluYT0YtSRRFmBI+WovJZuRT1kki4zkCkvMStfUmmjVV3rwc9qgGCfmNPacSx475qOmwk1fQcQmOCaQY70lFIkcrAdVFCyMoIU4BptFA7l1ZPLjDbu3X1qSOclQygDP4fpWdVyH/AFK1akaxldku/P3gp/DH8qPkPZh+tNpVGWAPA71ZoSFSY1CtnrgZx/nvUEiFhjO0g09m3Nn/ACKUOcYPzD0ND1AptA456/SoTg8Zwa0ZCqqG6A+vas08zMffNZyVjGUUtgUEdadRTHyTgVBmOf7poX7opmCBTkPy0APO3Ax1pKRjhTSIeMUwHQ5WQkkA4O3J4zQrvFJwzLg/MucUphkcDavB7nimvzMAp3YAHH0oGTQuiMfLAKoC24rzntj9P1qv++SdHhZQufnVh27Ecdc4/CrUgXPlh9u3AI28Ege3WoXUo2D6Z4pgOSV0PXIPBU9DR5zD7mE/3Rj9etUbYm2m+zP9xsmE/mSv4dvb6VbpAWYcSjMq7tvAJPX604xfLgHcOysBio4HVIzuOOacbhR0yaJQhNe8bwlyq9xyN8xV+UY8hux9P8DUs+DGVTkBcCqyN5uc4DY9OCKeGKcHj2Y/yPes1N0laW3f/M1spq8SGKQRkkjPFNudQmitP3cUbu0iRKGYqPmbHJGfWpBANwDErnsRRd20Etp5UqtjcrAo5VgQcg5FaxldXTMFGUdzOTWj9qhhW2t1mLOjmV2IVkYLhSFyc5zk4rQvdZjsdVltJ4SI1tPtHmYBLNlhsx64QkfSq406ECJo45ozGGCtHOwY7jk5OcnJGeadcQ211cCe5gEkgaNgSx4KFiv/AKG31zTTaHzRRXXxA/2R7ue1WMRQxTT7SCUV3dWwcc42Z9+amTV7qYItvYRtJ9nW5eJpsEqzNtUHGCxwSc4Hv3pItPtAqpHbkqoQbTISCEZmXPrgsT+XpQdItZI0i+zOERDGFEzAFM52Hnleehouw5ovYSC7ea9jUwDyJrh7ZJTJl967skrjAGUYdfT146EqJHC9VH8un+f/AK9UrTSraKYXpjImLl1BkOxSRgsFJwCcnnHc+tXw25fm/i5HsP8APP5VpFWWo0ktiIRW0lwtwsEYlRdgfb8yr6Z/yKZf3CW1tvZWYh1Cqn3mZjtUDPqT1NVbu7uXvWt9PeGM24DTySoWBYgFY+CCPlOSe2V65NRObi8mhkvY44VgbckMcnmbnwRuLYHAycDHoTg8Bt30R0RpWtKW34/0wkutRmwUtbSIekszMSe/3VwP1qM2rXg/4muyVBwtrE7eSPUsDjeT7jAwMDqTZAzwKk2rH/rOW/uj+tLl7le0t8KsLEFEQURrFEnC7PlC+wFRiQ6Xdo0WPs91MEaE9nY/6xPTJ5Zeh5YYO7eM5c8/gPSq915/2q0mS0ku4oFdikTorLJjAb5iN3yswAz1P0IctEFP3nZ9SWWSS6nKIcknGfWoby4k0xwsNtHPtt5LmVmlKkKhGQvB5571PBNa21r9se4X7MwwsrAjJ6bdvXdnjb1zxjNQzWP9szLLdQTW8KoYwnmlZJkJGQ4U4VTgcck98cio/MxjSl8Uh2nast3q80EUVvHEh65bey7A2cbcdx3qlL4mVYZ2FriWK8a2jiDYBQMR5nTgfK34jFXLC3hj1a9SOSVWQo/zTNsfepABXpkBOv070640KyMxMloSzbhu3nndJ5h/8eyfxxT95oco8srMq3GuGHylWyQ/ap5baEB8ZdJSmG46FRuz7EelPbVpRHdXf2QNZW7TK8gk+cGMNk7SMYypAwc8j3xLPpdhKzBoCw+fafMPylpPMJX0O7nPsKfJp9ikolNsZppizCFnYxjcCpbZnGSCe3c+tLXuQ2kiGwlnaae3ntliufLRlWOQuCrEjqQOQVI/Go0ube6mEVvdwzSEZVFbBYeqg43L7jINEVrbSCWK23fZCu2V3lZzchc/uwSSfLGTn+9yOmck+26Qx3SJPGTnZKgZfyPSoexbpwirTv8ALp/XYcVKnDAgjsRSGSOCOS4nyYoUMjgDJIAzge56D3NRLE8S4tbqSNR0inzPH/48d6/gwHtSkTztGk9vFHCkglkeObesm3lFAIDD5trHOR8vU0hRoR5k+a669H/XpcsWUUkNqFnwZ2YyTkHIMjHLfgM4HsBU9NjGEGep5NNlVmA2/wA62WkS5ScnzMJJQpx1NMZgQXGOBnmmSgRgc5Jp0GGZBnpzj9P8/SpjrLUi72Jli29efr396kSISnBAwOSfShjzT3OxBGOvVv8ACtLDB5OiR5VF4GO9QSAkcHHvTqYTuNAyHZscfTNNFvO2rRXazQmKJAixvGxK5++Qc4yeme351M5AOT2GKkQYQVlFLmIS1M9tDb7NDDLdq0UEHk22IsELlfvc8nCAcY7mof7BTz5Uju3W2MyyrGqDKBVOEBORgE5HHGAK3JeAg9FFVojnd655qnFXKKcljLFosdhDd4C4jaRlOWiGcLweDjAJ+uMdpTjaiqFG1QuEGFGOwHpVsgEYPSq6qDPheQKmUbEtCGJlXJFWbcYt2Ptj9aKfEMRsn+zkfhVqNnoNKzGVC5Pm8DIyo/mf8KlY7VJqFSfM29gR+J5zXPiJaxj5m1NbsnqvfWk19FFDBLGi+YGkSRCwkA6KcEcZ5PrirFSj93Hn+Jhx7CurczKEunyPPIDdR+TPLFNcIIjlnQL9054U7F65PXnmqcmhCNRJb3nlMIZI5MJwzMMBwP7wBx74HpWtTH+ZlHbqaXLHqLUpwaPDBYXtmtxI1vdx7MMBujJTYSMADGAvGO1SWFkLGCVN8ZMsnmFYo9iJ8oGFXJxnGT7k1dRNzYHYZJPaho9uDkEH0qOXS6KGZzgVTvpDNpupkhVjtA3HmDLEJn5xjheQcc5AHrirEjFibe2kT7UwVhHkb1jLbS4B64Gfy79KrW/2S/YG5tre4u7VmjkmaEEgpIwXnsTjdt7ZB7jNx0JepY0+0fTYWWVt80n32Zt/yjOxSSBuIU43EZOPYVcA39Yj9V4polk6BqYWLfeJP1NUBL5YCsSjDA6k1DRRQMKfJ1Uf7IplPk6If9mgBoYr90kfQ0/eGUCTccd81HRQBMMrkK6svoTSSKoUMoAycEA5FR1L5f7pd5Cck89e3agCE0m04zg49cVOAqxllXODwW71GZJC2d5z9aiSGiEqWbnpTh7VKrCQlZcc/wAWORTShVtpHNTysLjhxCfdhUbHFSuNiBT1ySR6VDJkADH3ulVLYEQsxY461OgKqAeaYqBfc0M/UA4A+83p/wDXrNzUFdjs3ogkO5iO33fz6/pR0YntjmliXdnjHHyqf89aZIccL1zWcL6yluxyaSsiMLnk9fQVYiXamW6Dt/SmFniJVF6dT6mo3mdxhjV6IxVokkrxvG8MkavG4KuuOGB7VFFvkk+zyuXlVd0crdZox3P+2uQG9eG74DacYjLGBuaNlYPFKoyY36Bh+BII7gkd6V7lKSl7stvyLCRGPkcmnfPUER89WZ18uaNtk0QOQjeoPdSOQfT3BAkaIBQzD9au9jJ3g3Fodvx1dfpmplkLD51U+9VTHuX5F5qMqydQRRzMnnfYvSAAj04IzVS4XY+exqxDL5y+Ww+YdPf2pJFDRkEZFN6obSktCvFgsuCd2at1TTMUg/zmrKSB84GCOtKIoaaD6KKKo0Cqs6sGyfu9qtUjKGUg9KTVxSV0VYpShxyR6VYWTc2CrA+4qAoUmxEcn+VXI1LyKo7nFKNyIXLE8rRbY4/l4BY9yarSEK/oD0qW7Oblj27VRucgqH+9gnPtniqkypOyLFORyjbl61WhlJYK3PoanAJoTuNNNE0cgMwJXk+h61VnV4ZN6HBWpsbSCQCPSnTjzg2eSOD9KHqgauhIT5qDzNqOx4x/hSCPyizMoz79zS7FVVJICKOTmm+b5vfK56DpQCIprhWUo4Ln1Bxihrr92oXJUAdTSSwbj8h/OopYvLUHOefSpfMZvmWpM16eCuc49cVJHKSmVJGfeqapuGc4qRd0anDce4pKT6gpu+pZbbKMSjdnv3qAxbGKj5uePeoRJIWyGOalkunZcBQjfxEdTQ2mJyTJYk2RgOCCOxp1RpcFtivGCTxuzzU4RCzL5nKjkY5FWjSLViDaWOW70mDK4UDA757CpmAWbYWAPYH/ADxRL8iEYwzfexRa4PUilYREb+Sfur6+/wBKazbmy5qPyiiM/U5/KpYol6nk0m7A5WdhqqRubpmmliMkggdqmdCWGBxT5I1I5/H3qbXI5WymSXHA6UyrCJuUlBge9OVSxx0qSLERQNjPBxzUkcZAyvH1pqIfOO48VOMvxGCcdSB0pjSIXzyOp6VKg2oAeoFOKMq/dIA7kcUKpOAMsfYVaVjWMbFf7QwJBUZpEi81Sz9Sankj3cOCO+KFZeAOKVtdRcrvqIibRTjyppwBY4HJpHR9vygH1wc1RYyL+L/dplqcRyHvwM/5+lPAMcLu3GRhc9zTbZSIWJ6MePw//XS6kP4kSKmVDO5+b+EUuBxgcDoKSY+VGuB83p6VARPt65B/Sm3YblYmKgnPQ+1KVyctlj6k0xW2gL1wOtSUFCFQeopCg+lBDFh6U6gBE/dZJ5HcUHHP71fbg0EZGKiI2nFADyU/vsfYDFOVt3VMDsQef/r01UGPmp9ADZYDIuQcgen+FV2DDATgDtVsBhyOKJFV13AYIIBoCxEiZwTU+AopuQAMdaSR/lwOpoAbvy+BT8fLmkjjxyac57CgBtBGDSpwMmjk0AU5lCzc9DzxVhJFZtq9hQGjnXLR9/XkUMkcCb13c8YNTtqZrR3WwyONo93cnoaeSoXax5I70nnx46/hiq0j73J/Ki6S0ByUVZAzFuv5Vah/1K1Tq3CcxD24pR3Jp7jpsfZmz6jFJAc249QSKWVC8IAIHzUW0ZVWRjyTlarqXrzXBP8AXSY/uDP506nMNo29/wCKq93MLe0klb7qKWP0plbIrw2/m3kjhgTKR0HQDt+efzrQJXgYJwMcGq9hCILNASDIqBWYdyep/nU1JaCirD1ZVzjcMjHWk2ZGU59R3FQNOqsRgkioJJS7eg7ChyQnNItCRTnB6dakikUqN3zIf0qms7HIk+dT1z1/Op4l2x+ozww70J3CMrkkiZfLc55BHQ1Xmy8iRrVkPhcEAj0NQou6YOoJZuVAbGB2/GoqTUbLuacjkiWQDO0cqo2ioLf7reuakPynksh9HX+opF4ywXIb+JDuBqFWg3rp6jdN3uh9FICG6HNDMFXJra6tcRi6rDALm+GoSNBa39pFCt0ELCCSN3dSw9CXHXA+XBIyKbcmw8RSRR6t4u02WOMyP5FhLGnWPZ1LMSNrS5z/AHx0287O5tx3Min+6e349M1HJbw3JMdzFHMu/ftZQwBGMde+Rms1iotqMdSvZvdlS01TSLebTLiXxDZ6hPY2Mlq628glkuGYxHcFUk5/ddAOrVJpEUsOn/v4mjklmmnMe0/J5kjPt/Ddj8KvFQ2Mjp09qY52EHJO3LEZPOP/AK+KdapOMbq1ghFN2ZYmyFVEG4AZOPWoiWHVCPqR/jS+WqLtKhnxhmI60gVR0UD8KVqr6oPdGby3Rh/wH5v16ClwT2J+rkfyp9FT7Jv4pN/gHNbZEYYg8k4zg5/hP+Bptz/qx65p7jLDH8WVPuMH+tQOWlZAB1AIpQbTcHqTVty3RDyTljk4wPanEbWAap47fDZc59qWaLcpYdRzWvLoYcjtdjU/eNhTjA9KRrd+xBqJWKNlatRyiT2PpQrMI8r0ZVZSpwwxSVauP9V+NRwMPM+brjApW1sJxs7DBE5/hP4094Asec8jr71JK7pyACtV3kZz8xpuyG1FaCKpY8UlFFQZhVqBw0YHcdqq0+JtkgPboapOzKi7MuU5f4j6D/61NpW4iIHVu/oK0OgjEoMZc8CiFmlJ4wCeKqtuX5D2PSpbUM8yc8KfWpT1MlNtkVlrmlaowg0/UrW5kwXCRSgsR3IHcUMjIxUjn6dawtF0vVF8L6JcX1wrvptgsttaW9oYpQ/2coFZnZskBiPujnkjjFZlnPqx+1pG2pGxZbSSZilyZUBlYTCNpBvztC529BnaAaHqaShzHWuGGMA/lSCWJppIFkzNEqNIm0/KGzt56fwmsqG7OnajY3CHWJdLaK5jXz4pZG3loTHkEFyOJNrPzyecEVH4ZS78kTX6z+bJplh5jzA7mcI+7JPVsnnvzU2MnCyNpjjtmlHSiipMxr5x7UiDvT6PpQA92LwliPmXAyO4pwMexHG5DjqvPI/zmoI5TG+TyDww9RUw8swsEfocgEYPv/n2qhiSurJ8v3h32gUMfMjWQf7rfUf/AFv61GxA61NCYRGEbPLc+n1/DmluBERmobeYzxncNkittdM9CP6dx7GraxADEhKsSVA9D71TkiK3fmodjY2yAj7wGcfQg0AT0U9UGwPIcA/dA6n/AOtStGqHD+Yp9CmP60WCwxWKtkdac0rMck/hT02FsJHuH8TOeg/DpURwWOwHGePpQPVInUq+BGD7oP5ikkyzIp5IPPv71HFK0MgdDg1YUeaokjXoccclT6fSsmnCXNFeq/U6Iy9pHlluSUslqnliQg5J9aZtk9+uP9WacXkMeCBgHr5ZFae2h1T+4p02wWHYmVXA681eTyosAbdx6Drn61RNxkkKqliOcPk/lUbOemCv1GSfoKPrFNLRj9nI0yDJgH7uQGPb6Cqd9fm2sXmRA07OscSHIDOzBVB9skE+w9qYFnKDKnGd3Mpz9aqgk6u7XgHnlm+yE8osYH8A7Ng5bPPPUqBi41HLdWLp01e71sQ3E/8AZFpEot57zcwDSqyBpJWbk4JzknnjgD2FObU4VlYGGcQh3iWfC7XdASyjnP8ACwyRjI+lS3dgZriCf7XLBJCG2IiIwyf4vmB5xx9M+tRSaZBJK2Zp/JLvKsGRtR3BDMOM/wATHBOMn6VpqthNtu7CDXLKSzNxF5iILczuWA3KAcFcdjkYqWO7jm08XsaSshTeYwAXBzgrjOMg5B+lVH0KzkmZg0wEiRpIitgPsIIPHIJwAcelX7axt9PgeFDIVd2cIzbtm4c8nnrk89zTXN1EVhqduZIAI5tkqQuXwuIxKSqZGcnJGOM4rQEgjbCLx3z1NUv7It7hrHKlvsKqqEquTtxty2MjBGcAjmrpdIv9X8z/AN70+lCv1AZ9htYbw3ZjAmbkNkk8jBIB4UkcEjk45qYS7x2UZ6VHOdxQnqUGajUgHnpjmi3Ybk3uyCA51fUf923/APQX/wAavRzvFwDlf7p5FUbUF9T1JhzzCD/3wT/WrkY+fPXHNTEdb4/kvyRKTB5nKuDnG1eQTWbdTfa5pgp/c7iksinG8jgxIfQdGYf7o5zh1xMZHeCF2RVJWedGwwPeND2b1Yfd6D5uVg4CqqKqIihURBhUUcAAdgKmUuhP8PV7/l5/5EsLqJhvwqbSuFHCjGBgegpskbRPtb8COhHrTKni/fQvG/OxS6n09vpWe5luQU5F3OB270iqWOBVtIlQ7fmZh1CrnH1PQUIaVwpGOFPepGVct5ZPy9VIwR/9aozW7kraGhXMTMct+NKpCMDCMkcHI4qVjx9aag3zHbyc4pQ0uyZRsWYh1dhwv6mmE5JJ/GnzkRqEHIXlvc1UkuAFGAc+9U5JbjvYlLZ6Umdo56+lQhmf2+lKeyjqahz7C5uwgy27NTwZdVUdc4qELsZgTVqF2S1TaepJPFKG4o7j5+JiPQD+VV1XErMOlWnG6HzGADE8Y71ABtGBWrVyiCZyTtHT+dLAvVvwFSSjMZ4zSxjEYHtUW964rai0oOOlJQTgZNWUMkOSAO38+1Ike5sr0XB+o6Z/WmZyefqT6f5FWLcbWG7jdwfauGH72pf+vI3fuxsOjALfN0AyfekZi7EmnKMbweoX+tR13mAUifMd5GFxx7+9OwAhd2CIO5o27FVcg4UcjvR0F1Hn5Isd35P0pD/qV/3j/SnSozSEgEg9MDtTvJbygPlzu9aQyrPaRXULGTKSKR5c0fEkZ5wQfbng8HJB4NTyY2LtULkknAxk+v1p3l/uSC6jDc85qOVwANvIUYHvQ3ZahbUejMIco2CpyfpSOVYB14zwR71ACd3HLdCf4V/xoJb+JVZfZa51WlLWMbovlS3Y+imdRkLj02tQHOcH5v0I/D/CqVZL41YOTsPqQASIACAw7HvUYYN0NLWyaeqIAggkHgilRC7YH/6qmaLdiRzsBHOeuajZxt2xjC9yeppgKZAnEX4tjk01PmfLc4BJ96ZT0+65/wBn+tADpWLBM+nb61ETgU+ThgPRR/KmUgGpk5J71N5rbcDGcY3d8VHTSu/ucegOKWyAcGG4gjPFIST1/KgLjpxTWPO0HnHJ/uj1rOcuVXZSV3ZCFuSARkDJJ6LTH/1eecfwg9frShdwwuQg6Z6sfU0GLJ5YkVzqLm+aXyKk7LliJEzk9eBU7KBIJAAecg1GqBW46YqeKTYp+VSPet0ZpaakUp2An15GarqhbpU1y7SYZqExsGPSk9WJq7sQsuxsHmrA6cdKhx5jnj8c1MBgAChBEZKsnmJcWy7riNdpQnAmTqUJ9e6nsfYnM8ckdxAk0DbopBlSRg+4I7EHgg8gjFR1EG+zX4PSC8YI47JN/C3/AAMfKfcL6mqNbc8bdV/ViaDo2Rhs80hwWI7E9KkDZYgDgdT71Gzs0hVMADqaeyOXRIjz5TqR/CTVuUgjd2YZqmEyzAnkd6sMd0EXr0/z+dKJMNyGRcgc4Pp60+Ahcoeuc0kg2sSOTxio/nRg7A0r6kt2lcuMNp/DNJSq4khVl7HB/wA/nSVZsFRTuVUBerVLUUqklWAztPSk9hS2Jre1ZgRGPqxqwgjtiW8wPJjgKOAfrQ5ENoIyMtJ8x9qrVWwDg7DoxH0NU5seeS2TmppJTGR8uR65qBj5p3Ehe2KiT6ETatYAy+Z6CpPtBX+LPtUZRdvHU9KsIixr0Ge5qVcmKbHK7OgLDB9KezFZjj1JpFKlSxPyj0qvLc5bMY/PtWl7I0bS3HMFlZ1Vucg7T7dh+dJ56BtoHy+oqKHmYEkA8nJOOetI8e0BlO5T0IqLmXM90TCQyTAL90c/WpWVXUhvSqcbFXG3rUzFmI3HgdgKFIpS01HMoUgL2FQlWLcnipl2bfm60rMpXCjFIl6jI4+w/E05lAYAHmnxkFcUw8v8vrQFh6gI4cgYXp7mm2pJmZW+82SPentH9w5yuMYxULxlZldTgelVZouzQA7Ll/MPJ6E1Isobd6Dv61I6rKNzDLDrnv71Bs2AKPrTtYpJpjXJEeB1Y4FTLDuTbjJ9aZED5zH+4vH1/wA5onnbdtyT9TS03YrrdhhUAQc46n1p0u4qT2waQxZjxk59adbnfEWkJGDjp1oQLTQijJjXH508OzNhSBSy+Urcvz/srTAqtxHkhvvNjH4UrEWd7CzDau5Rv9Sf8KhyZGG9unap5TkbR+PtUDLlgFH1xQwlvoWRhoQF446jtUUiyYAMrMvoTUo2ouOgFRu+4ZXkCm9ipWsEc/lFkblOy0vn9/LbB/2v/rVBsZSGdTinl+MqCfwqbsjmaLBuEEfCsM9aemGAKMwYjIyMVQeU7fQfzqeFyVXPPAqk7lxk2x7RvNL+9Y9cAVK8iRY8sZxwvtTTMwZVznPr2qGdsbQOTmnsU7JXEdi7Y7n9KkQ5Xb2AxUQUgnd1qWPvQkEV1Y1k2/Snp9wU6mu23GKZQ6ikHKiloAKRlDdaWkJIxgZoAAMDHWnqO5pgznmmSFuQDigB0s4X6UyO6BbaRkHt0qIxliN7ZA7YpUhBk3dqALLYC7lOVpUR2CnGNx4NMSXDNGgGMZyRmneYVySxyRgn1o0C9x4Rv4Pm+n+FJ5bdxj6nFRCXnpTZbnbgDk0AWOY9w/iI+Ug0iTSheGAzz90VCk5j5YA45G7sarm5YcJjHvTAltvutS3bHcqY4Cjn171YdUQ4j6VFegCOP1A/+vUtWRm1aNinRRRWRiFT274JU9+lVycdafGoZwCcCmtyouzNAodqgAnvx70m0L984PoBSPw7egNQs+eB0rY6CdijsSHwT1yKjuYcqsTqJPN6Dr0Gc4pscZduOMc5qE+cNQMkuY4liG0lQdzHrjP+6PzpMmTsTpblFXcwDAkladkZxnml5Zm2qcZ4wOo7VSckuSRg56VLdhNqK0H3AUPx171FU0MSuMsefSpDboemRU2b1I5XLUq05JGjPynGeo7GrIgQds/WqmsT3Flo80+nwCSZWQf6oybFLAM+xeX2gk7RycU+VjVNlwOPsxfaQdpOAakgVRcEZxt2oM9wB/8AXrD0jVhOILee5t7z7RcmGCe0QoPlTeyyISSjDBHvkcCmnxZZRmUx2N/cCKKS5mMaR/JGkjozHLjOCh4GSRjA7VFm6qfZHQtIWOpOY8BAcdf8+lVXgDTNsXB65U4x+NZTeLrSMOt3Y3yTK0BiiZI90qzOUjZcPjBZSMNgjuBUr+JYEs5ZxY3ont5/IntW8pXhfaGG5i4jwVKkHdznAyTit5KMlZkK6LbqY3yzZYDJP95fX8KTdlgyjJ5CZ6e7VkzeMNPe3F1b219PbxWUd7LPBGmIYmLjLZYE48tsgAn0zjiabxBZxaiYBb3sqG8Sx+1qieUJiQNmNwbjPJxjqMk8VyeylfkXw/1obcy36mkq7Vx19Se9O6dKzrDXLXUZ4I4obmKO6VntLiVVEdyF5JXDEjjkbguRyKvuxViuMEDktwF+tbtxhG72M7NscTgZPSo1bdICehwQD1wOc/QnAoVDIpPXHO5yQD/wH/GpNgTvknlm9TWXvVWtLL8ytI+oU1JA4OOMdQacTjrxVSRSZmCjPfit27GMnYm8wedjPBHWnNKFcKOST+VV2UlVHfpijyZByB+tTdkc0iy/Rcf3l/nUeNsaf7DY/AcU+T/UknPAycU2TAjkHox/Xn+tZvSt8jd/wyWimp9xc+lOrckimRSvo3aqtW5VLAYHrVeNPMbBOKiS1MprXQkSRZgqNnPf3pz26n7vymo3hZOVOfp2pPOkAx39xR6hdbSJPJkYYZ+KYbdx0wfxqMSy934qaGXqHbr0zRoxe63YZHFvYgnGOtSy7Y4dg70xC0TnoQR1ppHmybj0o2QbR8xETdyelNbAPFPd8cLUdSQWbdyykHnFTt91fp/Wq9t91vrVk8xj2OP8/rWkdjeOxXuFyobuKgRzG25anuN23AHHc1WqJbmU9JaFpLje/wAwx75qcFmYDcevrVKKMSNycAVM0yxkKBnHX2qk9NS4ydrsmy2Tyc9+arXAAAwxz6ZqV7iCTOVJ3cnNRRwidTs+Vs8DPB9qHrogk76IgoxzU0cB3HzBxTJVCSMo6A8VFmZNNK4ipkZPAptOMhIxxTaBCFQaYVK81JQR60gIuoyTzT0+7SlQfaloAsriWFQ4JbeACO/H/wCqqyh5pWcgZ6ntT45PLcHAZe6nvTyfMhcqmDuGSMk96rcZGGaK5G9Mxogw4/vdlI/L8jQJHX7rsPoadlo4htJUlj04/wA96jjlZSVvcFWP7p+Nznk44HbHft70bjHNI7LhmJHuaktj+8P0qJVLMAoyT0FTwRES8Mp+jChXuEb3HtAjHPI+lSRAQklOhGCD0NKVKnDAg+9KqgjLHA+laWN7IeJpGOFx64CilS5ZOvIzzTDJtz5Q2j17mmgZbk49zTuMUp57McAnrg1JDDEisQmZMZ47celPVBDnLH5uFYcUFxHtVuc/xEcj3/z6Ucqvdhcij3GTcck9/f2qPUrYy26GHC3cbiaAk4G8Z6nsGBZT6BjVxBvXcwVwDkepI6CoRmZyC24Mc+4ptaWHGTjK6KUM6XMXmR7uGKsrfeRh1Vh2IqZULc9FHUmi9somk86CTyblQF81VBJA6Kw/jX2PIycEGqz36xxSG/ZbdoE3vlvk2/31P93t6g8HtlJ20Zs0pLmiWjIEGIuPVj1NIiGRsD8T6VQ/t3RYrdJ5tTtyrnARHy3vkDkY756d8U/+39OluI7WC9ty8v3EjkDbvxHrg49cGrMy9JIAvlx/dHU+tRVIqhV3uM/3R60nmt2wPoooGK/3I8/3f61HUsxJWMnrtqI9KQFRWu4L68MNisizPG6SvcBE4jVSDjc2QQf4fxqQi+mObm+ES90s4tmfYu25j9RtNS0VkbOp1sr/ANdyPyUCKkY2Ig2qo6AVEylTg1dCoke+XOD0AqN1SaAvCSSvJU9R71LRhJJ69SrVyyT5JT1JQjFV4oWlJxgKOrHoKtwRJECzT8MMYUc0RWpEUIgCjeV4UbjzxUUvmfZkBBJb5m46k8/4USSpwHd59p4DYA/H1qB3Z3LMcknrSb1Kci5aMSqluWVsAkcgY6VFNKqP8x5PNS2TNuMbEncMr7Gqkw3sM8kt/wDrq1sO9oilt3CnLeo7VcgUQR78cjge5pETcwVQAAOT6Cm3VxFENzsEjXhc9/8AE1o2oq72BJtiH5s55z1qssW9j2GeKab9epgmEfdyAMD1xnP6VPuDKDGQwxlSOhrKM6dV+672KnTlH4kNA2MB709UxKzflTIgW2luTjJqVmCjJqkkt+hEVcj2eZJuP3R096e7AqoGcAkYHGT/APWpUjdznG49wHxt9qcYWRgSmBt4HpnrWPM6mkVo+pqoqOr3GvIxxuLAKMcgED+tJuO0HK4JxkkinU9+I0HsT+taezktpP8AMOZdURhiRkLn3BBo3eob8jT2UGFQQDkk80zaO3H0OKLVVs0xe6G9c43DP1qC+vILK3D3Lsqu4jUJG0hYkE4AUE9AT+FT4PZmH6/zqlquntd28BW3S4McjOqi4e3dW2MoYMhH95gQexyOQAVJ1bNWKXLfcmSWIyQ5mjDXQMkKM21pFAB4U88ZGfSrOOh4GTgZOMmubi0bWzqFlqF5Jb3U9m0MKoOGaMKY5ZN27b83mO+MA4VB1GKn1S2gfWbn+09Onv4JLKOK1SGAy5fdJ5gDYwjHMfJKjgHPBxnTvSjblKklJ7nRlSdzgH5l9O+RmowhLhSCMnuK5PVdduzcatYW05+a0uo44XwJImQKiPwueWYEEsdwIIAq0+vXtvPcR2Vu14/mXUuJCSSsUgiEa8/Lkqfm5Cnsc1r7aJPs5G1dkvMB/Ao+Uen+eKsJGz28b8DjHJx3qMDMysNpCNn72cinMzs2WVifXIpe1p83MpGapyTJVxGvzPn/AGVPX60PITCp/wBrjHaoc46qw/DNOZx5SDkck8itFUg9mPlfYlxmR1HRxkfzqs5G5Qeg+Y/Qf5FSl/3SOvJU4+XmmZE7kNhGxzjp9D6Gs6sk48kXqyoqzuxqD92ueuOfrQzBASfwqRlKNhhimkAjmteWy0IbuMBVl3A7T3pN4b7wyAeopqwhmP8AdFDIYvmU8ehqbu2qJu0OwT8ynePrz+dOVsEEsR/vL/XpTQA3zKcE+lODP0Kg+4NZ+yX2HY15u+o5pGYln5H94HIophD7gyqA3160+aFoiOOCMlR/T/CjnnTdp6ruFlL4Ru49lyPrT1cjlGI+hpqsGGVOaCoJyf0NdG5BL5pP38OPejajfcbafRv8ah8tP7o/EU07B0faB1x0FJtLcNyV1ZB8w+nvSAYAFNywX5nyg5pMlmXJ2KenHJ/wqJ1IwWpSi2OZto9WPQetMAycDkA5Y+rU949qgo2FPGQOT+JpAMDA4FYtSqSTkrJFaRVkFFFLHGZZCoIGBnmtSRoOelSEqoK4/HPel2CPncGI9O1R0AIeVP0qNcqMLk1MDg0hPrSsS1djFQhix/IU+iigaVgpJIY7m2lgmzskXDFTgj3B7EHBB9RS09FznJwOhJplJtO6IILl5LX/AEjBuon8qcKMAuOdwHowIYfXHan48uM7upOTUWnDzbQ3hHzXjm4APZCAsY/74VT9SafMCE56k0dLmVZKM3boCfdz3NTuNgjX0GaqK2GXJ4Bq7NGQ0jEjI4wO3FETCBHndJ7CmXJ+6O1SRkFAV79aSZQYjntyKOhTV4iWo/dOf9of1qWmW/8Ax7H/AHv8akALMAoyT0FNbDjsKi75FX1OKnb7NFIRtdip7ng0hKWa5Yhpf0X/AOvVMXAkkwc5J6+tVdId0WZHMxLt1/lUJIAyelO3fLiobhsR49TSbBuyFV1mBGD+NQSRGP3HrSJKYwcY5q0GV4mOc8VGjM9JLXcqK2GXvg1d27uO1UeQfcVaWUmPkYY8URYoO24PGF/dLhdx4Bzk9hVTPzEDnBqbJDSEEgheCO3IqEL1IH1pMligkHinqv7tg3HIOfzpI+px6U9PuDNISERdjsp6g4p24A4zzQw2zYPQqMflRgZzjmmMeELDIpp+X73FBn2LgdahZi5yaQOxMDnpTogVG+QhQ33cmoovu/jUiAmTb/CRnHuKa3HHcsNjYBuBIPb0phXcRS0VobkkfVtuC2OBTcoeWU59AabUjPkBtq5PUkdaYAqoVKxqV75J6VBJEfMUkYKnkGpGYtx0HoKcjNnGePQ80tBWEEbE446Z60hCooRPur39TTy/mjH3T146Go6YxCARgjIoChVwOBS0yWTy19z0pCdlqNMapyXIHvTxtRMjgdaqO5kbLdPQVJNKGwqnioujNSS2GMWlckAmnwqRktkY6A1YUAKNowKjc5anylKGt2BZs85pNxIx2pizcssg4B4NRMzt0bA9qOZA5oWdxt2jk/yqS3wsAZugqNYcjJ/WlMeFJJqb63I5ne5NCd7M569B7VKVBOccjpUMLbYz654p4DHnOPqatbGkdhRH6mnAY6VEdx+6c8/Wl+ZVz60yh7vjgdajZi2M0AbmxUmxcUAIsm0DrxQ06Z5OPrUZ61FNj5SfWgCc3CBsDn8afvGM1T2ozZVsD0NT0ADsTz7/AJVKhyvNRU+PqefwoAeGBOBTJJAgx0JoZO6/lUEiMxJzyBwKTFK9tBPNwCw6ngCliZm+909aSOPAJcD8anRc9elNaAlZWAqAvPWmMF+83anspHTkVA0TM5yeKBiPIJMKMgE80GA54IxTGXY+AckVYTcyAkc0AaJ2qNoOMHp0/qKjuYw8MnGecg81GJ5BgMSVH99Qw/TmhZ85HlRtxzsY5rL28NpaepXs2ZzNtOD1pN4960XW2m4bMbdt4qOTTwFyucf3lORTSvqncwdNooEljU0S5lRT3IFWIrQA5UFiBmiWHfyp2t60+Vi5HYT5lypJ681JDbmQlj8qDq1TYV1LyqDk9+9G8iM7flHQD2/zitLI1Bm2cRnCEdB3rNiLz2qznGHJKgf3cnafyxV+cs0RRQu4pwSMYJ+lSEqkaJGu2BVChB2GMYpNXE1cyySetSCUkYkG8e/UfjS3EBic45XsaRI+7flWWqMLNMmt2GTtRQgGOev51PhD0JHseahhx5fHqacxKjKru/GtFsbx0RJ8g/vH9KgvLcXlt5QlltmDK6TQPhkYHIPOQR6ggg06OQSDjgjtT6dylqYsnh2NWN5/aN7/AGiJxObzEe7iMx7dm3bjaT2znnNLaeFrO2guo/tNzJ51nJZO77clZHeQtwOuZD7cVs1HC7K2FJGFwfcZIH8qxk3GpHzLWsWZeveGJL/ybvT5ZEuN9jEx3KPLjhn8wuMjG4BicHPQcVM3hKF2Er390179pNzJdskTGRigjwVKFQAgAHAxj3OdyDe20vnAORU/Axj+ddFkRdnO2vg6ytdHvNNjubho7vThp7O23cEBlO4cdf3x9uBWdfeH9Sk8TRrbCWHThqKag482No2ZQCcDb5gYkdM7epzziuunkKJx1z6cVHFNvbbK2AenpQ0tguzJsPDlvp9xbEXdzPFZoyWdtKV2W4YY4KqC2B8oyTgVpSIpYGXhweMdBj2qVpFYjc4HPPGaifBchhsbPPpSaQXYOSUX5tw6H61TZpEcO/TpirYUgFT35H1qtcfcH1qZdyZbXEuT8qj15qOBtso9+KfI3mxg4xgVAODxUN63MpP3rlibmRQvBPepWcIo3fpS4HUjmmyLnBHJU5x61exra12hSw2bj0xVZ2JjTHIZR+Y4NPmlDIAvfrSQkFcH+FgfwPH8656ztKMv61Ki+a8CwBgAUtFFdIBUL24OSpwamootcTSe5XikKNsfp0+lTkAnJHNVZxiY+9WUyI13dcVK7Ex7EcsK7SyjBFVSNwrQIyMVW+zkOMcrmlJdiZx7EaZb754HWhnzwOBVl4VZcLwarMjJ94YpNMmSa3G0UUVJBciOYwduKlXkFe55HuajjbfGDjFOrZHSthHOxSSOnaqNaL8hSe461GyK4wwzSkrkyjzFDLqcj9KXkr6GpZY1TG1snPSnuEgG3aGfuTzis7GNrFYBvWpYX2SDJwO9IzluuPwUCmkZ60AnZl8yRTKcybD/ABH1+nvVGZwXJAwOgHtUZDDp0pNrHrTbuNyuKH9afTVjz70pxjmkSKGAYEmhmHJ96iwfSo3MiN93K9qBkpcnpxTx92oUkGeVYf8AAamDA0AIG/vDFOBx04opSMUhE8XmsrMQzoBjByQTUM1tJdKySo/zd8Yx6EemKbk4xnijOOaq47liC3aO3MbybpBwZduA4+nb39aW3hbzhjDDoSp6VE0n2iIxys0bHkSLwQex/wA/jmn20zsTFcLsmUZJH3ZB03D29u1Xo9TVWb0LZYPnJxySM+9Qz3tjZqq315DAT8wDuBkdM05csTgd+1Vr+G9mktVit4p7WN/MkjklKb3B+UfdPA6+5x6c0aE8lxaJdvbC7hM0a7njLjco6nI+mD+NKksMgUxzxMrR+aCHGNn976e9Z9xpF02YB5IgW4nuUm3HexkDgKRjjG/GcngD8Ko8O3sUctvbTRrby26w85PlZbMgA7g846fex0FTr2Hob8s8JtYpzOhgIBVwcqVPQ596dG0V6vm28qPHkgupyvBxj6jpj2qpp9ne2WmyQxvHLMhc2xwVUg/MARztAJIxzwBVy0tFgsYbNS+2JeXI5kPdj7k5P41auxEhYFGWJl2hcDPB96IUEeCCC+MkZ/SjyQiHZkk45wCAKSVFWXfIc5xtReCaYiPyCcknag6lu3tWXrccV1JpdvHCrSm/jMDOM4K/O5PtsRuPXHcAjTmkd2/ecY6L6VUu7WW4EE1qyLdWkwnh8w4RjtZSpPYFXYZ5xnODikrXHqTeItRk0OCG7srBZnmm8uaVYJH8pAjtvby0ZsZUDpjLCq/iGK3l8GS3EMcJtsRXUxgAAeNWV3Kn12gkHr9OtM1O8bULVU1DQdZjCtxJZzoDkjbgFJQ2DnHIAGcnGMht99t1DQ20iy0eTTbR4fIZ7mSPCxYxtURs55Hy5OMZzzjB0uJblx3Ltk/gPSm1XW8CypDdxtazOcKrsCsh/wBh+jfThvarFZqSexvKEo7kkn3I/wDd/rUZGalj/eL5Z69VPpUVMkMVJFEXOcYUdTSnZHhSm5h1JNIZnJBB246AdqLANkYOxOMDoB6CoGzC4eL5SKtMRJGWxhgecd6hZA+M1Mo3WgmRyXbyKB0HoBUXmNjGaneMFMKMelMijI5YfSs2pXFZ3IvLYngNSmJwORVoCoJryKFtnLyf880GT/8AW/GlJRhG8nYapuTsggZgy7cllOQSeBTrqW1huiXnQMfmwWGQD/KqEk8sshQ5Vj/yxg5Y/wC83b9PrU0NjIqcuIO4SIA/mSOf0rnWInP3aMb+f9f15HT7CMV+9ZcfULNF2Jdwkn7zeYOfasyeT7RcGSJsjesUTDB75Zh+o/4DVr7LKM4uR7bkH9MURW22UyzP5jjhTtwFHsKmcMRXtCSsv68y4ypU7yi7sadPj25hJSXtKTk/jnqPaq0cr2c2wrtDHJiHOf8AaT+q/wCTrAYXnrUFwiOdkwyjDn2PrWtXDJWnS91r7jKNZ2tPVCxSxvGGgYPu4Hb8PalJO4EfMQQN3Yc9hWY0c9rKSsq72bCTLgeZ/suMdewP+TfiuY5kxF8rxjlD1U9AD+dcvtpVLxqaNdO5p7NRs4aonTkFv7xJqaRmWQhSRjjg0yNfmRR0yBSsdzk+pzXqRjyxSOZu7uL5r9zn6jNPkKFhuyCFHQVEBk4p0v8ArW+tWIe4jwgLMML/AHabuQfdTPuxpJf9Zj0AH6UygCVdkjAFdpPdf8KJlYkeUA4UY4PSkB8uIuep4Wo1yOR19qAG4fu2PoKmC+SnUl2Hc9BUhbYv74Bn7DHI+tQElmJPJNADhI69GI/Gql0lrevEby2huDC++JpYlfY395cjg+4qaRwqn1PSq1c9Wo46Ilys9C0DutyUwSzYYkenQU1QpGAMHuBxTrWMmCTOAGIK5PU9/wBKf5B5aTKgdwK00lZtFRbsMxjoW/M0vzf3z+QoNxCCAQzbRjsM0qTwu2BGw/4FU+zpPoh877itkwE45yBmmKoVQB0qRnLey9lHQUzI9aqMIw2QNt7kiyYG1huX0PaleH5d0Z3r+oquJkJxT1nCNlXANVzIm4AYHFI4Ur8/Spt8UoyTsb1HINRsigj5g3px0pvYZUBIciPNP811PIqYoC4buKWs+R9ybMi+0dMCpHbzfmJ3EdDnkVXlAEh20kYJfjj1qW38L1BSaZP83cq3+8tHToi/gcUtJkeorL2MOxtzsCPRc/VzQAwH3sf7oAApaKfso9dQ5mNIO7dhCfUr3pQOSSck9zQxIHAzTTLyBgj60KnCLukJzezLMHfDsD2UHGabsaSRsLt559qrE45Y49KkW8bGyQFk9c8itbohtIseVEsZZnPH6fhTbZSG3njdwo9e+f0pn7ocsWcdhjFLDI0twd3GRtGO3GKd1cdwbADY6bqZSg/Kw7gjNMMig4JpBdDqglJ34PTtU+c9KQqD1GaT1FJXRAu8fc/+tU652jcMGloFCVgSsKBuOBVfUcy2otIyVa7cWykdQrcu31CBz+AqyTtXA78moJlYSQ3MKGWS33fuh/y0RgAwH+1gcevI4zkNm1PSaf8AXkXGILfKAq9AB2HYVFIwI29aa1wjRq8DeZHIu5HHAYVDvLHk4HtTckccpJOzJ1VBj5QW7ACn/a1Er8ttJ/PtUEMscrXSW7bntZBDIMY2uUVx9flcHNI1vKoBKHBpXa2Iba6FlhFGw2Y+YcH1oZdyketLHiRljePaQMKxFULbXNNu9Hn1SC53Wdv5gmkKEFDHncMde340y46ovxRlYMAE884FWCfslvu6SOM5/uiq+l3ttf20d1biWSGSCO5iYxMqurglcE8Z45HUZGetMmkmnLFom3N+lVsgbSViq8jOcsSee9IDhgfeneVJjOw4+lBidV3FSB9Kx1MNSeSVcAA9fSq74429Kb9KkUqcAjn6U27jbuNRN3XpUqqF6UtFIBkh+X8aIySCD2psjZ4HSnIQI6BdRVVjKxAJXac8e1QzyiJTt4/rU/mnyW25xnB/H/8AVVC5+ZkX3pjLFrkqCe4qVpNpx3pIUCx8fQUjjdJheSaQhZchgP7oAz79T+pNR5NWJU2QAD8ar0MclZkzIGOaY33QMYxTQT0BxVqNOMtQG5FCDwB1J4qdXWJgUXcQfvN/T0poGSzLwBwPx/8ArfzqJy6TEJk8dKtaK5asldk5kHXaRTSxY4XioMSMck8+9WY1+Ueppp3NE7gquTgEc09iOFHIHf196cSFJAHQYzmmUxhQDjpRRQA/OSrqPmz096a4w7AdAaduxDgf3uaZTAKZKgeMg/hin0yRyo+VST/KkxO1tSkBj1NJuy2BViHHlnGM55pixAzYXkevpWdjDl0uWYn8xc9+9JLkkKnBPf0FRcQODuyCcEVLuHmg54IxVdDW7asxwijC425PqajMSfeAxj9akJxzkBR1NQM+9tzHag6UOwSS2BmIIC8k0gwx5YMfQdBUckgOQmcdye9Ot4izbu1CQKHcmVBH87E5J7npSuyvjjIpJfmcR9ADzULgvMFwdvbFG7H8THm5UPhVAHrT5JMpkDPeozansalC7YwpGSKorYgWZi2SML61JJNtXnmkMRblm69BimhA3yupyD1FK5PN3EM/HA5phZpWA4qdYwWwY+PpUwt1HQYplJplIwsB2NSRKyjnoe1WTCB3/WhYxn1+tAESgscYqYQkDqc0wSYYcYx2qVJA/saV0JSTBYyO/wCdDIoHPWn1C7bnwv50xjXi3jA4owyKcYNTqMCmUARJKW+8MUpAZcjjFOKA9OKcseKAIEi3SFjVkJx6UcL9aTcaAEpCob7wB+opaKNwG7cDCsQPTr/Ogb0OU+U/7BK/p0p1MlcomQM81i6MN7W9Cudpak8V1sbMo/Erg/mOKqazqDWumXV5FB5xhQuuDwQPXvgdTj070sDM+4sc1n6+q/2awl/1Bmiaf/rl5iiXPtszn8al88ErO6v1HFxnrYuR6friFEXVdPuGZNwMlsQVHqFV+V546e5Jp6abrkCt5eqWVyh3Zaa2KbD3+62CB0x19SaoNYTWuqXl02gyajeC6e7trxJET5PKwi7twb/Y2kYOc9OaoReFtTj8K69pGpWlvePcWzXMDxuWWS7aNlc/MBhi4D+mXJ7V3WRkXt19H4kGmXtxHdeXGLszRxeXtByojIye/IOScDn1OyrbeCMqeoqlqhQeMoDDt3iwcXHOOPMTy8/+RcfjVndjqrD3xn+Vc8qkIy5Wy1FtXHyxebGF3fd+ZT6iqTEoxXOe1X4nUqTkEKcjB7+lZ06srHIPJ60Ss9UY1ETW8o+4fwqxWVu2c+lWre9DqA/B9aUWEZdGSshW4BQcHrU1AOelFWaJWEZtq56+g9abCuZcH0Ckj15z/OmyN83ynBVWYH3xj+tTRIplOwgIMcE8jFYfFV9P1NNo+pYDjzuHAUcbTUEk5V2fcR/Wms3Vjz34qp80smCef5Vu5GUnYnaeWbG0cdie1OQMF+c5NJErKmGOfSn0hpdWKq7vbHUmpJxyDnPYn/P1qNTg89CMGld92AM4AxyaroMEdkPy/kahvMADHRuRUlJJH5sJUfeXkf1pPVEy1RVj5VhSxyIi8pk+tNKtEwyKaGKtkVlsY3sy6DkA+tLTYGM3bB71KuwnbgnJwCT0rVanQndFW4UYBA+Ynt3qKL/WAHo3yn8f/r1OFcz5fsOMU/yljjZ1HJIwPocmsakOaLJjfnUgQlkBPXHP1qfcojyu0lQOo5HqarE/eKEbCchien4eue1KVK7SqjLZKtIMk49u1ZxxDaXKrs3cEnq7EytlgGxg8HgUCJu/B7D1qSIJcpnkOOGA7U94yqnLkc7sY745rqhJTjzIzas7GbcjlW/Cozq2nx3sdjNf2sd4+Ntu0oDknoMe/b1q5cBSrHorDIrktRMltqd0tnBdStdXMby2E9mZYbn7g8xJQMJwoPLYBXoO62ZCVpHXYPoaQ/KMuQo9WOB6Vwdze6y2qXRtf7SjaSK+jljYTsE2oxiIJAjUkqCuwZweSTzVzWNKuUtrqAyapcW629ndODcTORIJj5hHOfujJUcDAIANFy7HXJJHI8qRSK7wvslVTko20Ng+hwwP407bntn8K5fUri8UXy/8TA2kmpoqSI0/7uL7JEQf3Y8zaXyPlI+Y8nqDjyX2qL4fW41qbVoTHpcxtngE6E3CvIMy7ec7BGRv4+8aLhY7l7YliV4FMNu4GeD9K5dJ9Sfazyao2pF7b7CE8027wlI95fHyHnzNxf5h27V2bY3HHTPFKyZDgihkjjJHtViGbf8AKw5x1qRkV/vDNKFVegAoSaJjFpj1bHB5U9RQYzuwo3DrkDtUfnRoAzEnPQDvTzJ5gBz8vYDoKq6LunsIYU8wO7YI/unmoWt1J+UkfrU1FFkHKmRtCjckY+lQyQ7FJ3cZ4qy2Np3dMc1VVHk6ZwOmTUsiaXYETu35UuU3YwPyoL7V65NRVBkSSOEUgVHCnnOynGSvGTjFNYE9KkhAXOTzQBIyRIv8TH1HFN8sMCY23YGcEYNNd9x46U1SwOc4PbHagBzROBlo2A9StM2CnBirbgcH1p5kGfkjRT9M/wA6AINrL0NGXHWtLZGygMMHvheD71DJbKEzGWPOMHtVcrL5GVgc9KlEJaMMpyfSomTDEdCKkjmaMYPIqVbqSrX1GFWHVSPwqZZG+yMEPzqCFJGcZ6HHpmplIdc8EGoCrJNmIHj2qrW2L5eXVFSaeWXQr5QHS6WFtyx5zz0K45IPb/61Urn7RtXyftX9nfaz5Xm+fnb5XOcfPt39M9/at/yI5JIplGyRBxzjGRyPce1PE5LkKWVlwGB4I4qrGsXZGbq0t1bXmm3Vmk80NvbyvJCgb94CY1xz3AYkZ5+U1mwx38VvKl4147iK6BaMtkyb4du38d23tjPbNdaX3YyxAxyfU49aHl2kRqhJ2jkNzTcbu47nNQi6+z2/9rm8CmSf7b5Pmf635fL27OdmM4xx0zzT2W5S5Un+0vtXmW/2XzM7fKwnmeZt+Td/rN2fbHat2WZnbpsHoDUZdj1Yn8aLBcn+0Kr5ROQTjLcfyqMsQPMY5duh9Kjpytjg8qeop3EOQF8KwOOzY6f/AFqVo2LLGgJB6H196yL1YW8R2sZN1GYyrvInm7ZG6KnHygd2z7D1qiEvWsTGjagty9qRfli42yl0xszxn7+NvGMe1K47HZDEahVGR0+tN6vmNyDjO01ykz6xKl5YtHcm4kljhMsR25RVy0ikkAbgB34LY7VeuZZZ/DsM14s8N03yusYfCyAEHcE+bbkHGOM7armFY2pYobpGt7iFJEkXDo6gqw9CDwawbMAwyS25kNq8pNqC5YrGBjIJySrHJAzgDGKsG4lutIg09zKJ3tkF5Kxw8IKjKkj/AJaNz9M7uOA1nylwBBjaBgIBjaPTFRKKmdEW4Qs+v9fj+XqRW0xEybsEZxuHb6jtUkQBbd1VeTTRCJHy2V29WHUVEztFuChUVmznsfY+n1rPmnS+PVdwspbEpJJJPU0lLGDIpONuDg7jjmneX/tL+dbppq6M9gRgudwyCMHFO83YoEWR3JPemiPP8a/nSmMKcF1z+P8AhVAL57E/Phx6EU2TyhsILL5j7ANpIBwTyR0HHU45wOpArO1TV4NOMsCfv742zzW1sAQbhgDhV7k8c46DHqK5+za58VXCTvLDPEoMLNbttECN88VwqlmAkDx9NxbDKSBytYTqpPlWrNI021zPRGre6w7WJntvMtrUTKsl3LGMCIlgZFGemQBkjgMG+71ZpJkvNNjnmkhiieR1V7ZcCcBiA45OAwweM9eDjBq3a6XHpUa3KyO8zEkpn91HI3MjIOoBYk4JOM4GBSySNK+5zk1xVkr/ALzVjdbkVoEiOlvlIEVVznjnPuT3qczqV71SpQcHNXSrSvyrY5nJt3ZaWQMMheM45NOGXQkkLtOR6cVCeFUd8UnmfudueQefSu2Mvf1C+mpcDb1DYxkdD2pkq7oz6jpUMW5zwxXjNWaa95FLVFd7RZrdkkyCw6jt6H8KoxxTnUrbzQQ2794QhxgA/wAXTaSM4PNa1NT/AF3PqT+gH9a5MRQjKUJdbo6KU3FNFqNF3gjtzwwNUrm5Ntf21sbSdxcOESRWXHTJOM5wB1qyP+Wh/wBmqbW5XVFvVu5kIQR+WFUrtByQMjIyeuPb0rseiMSD+3LeOH7Q1tc+WYzNCcKfPQEDKjPH3gcHHB+tSS6taJaTXSiWWOMRldgGZN/3QvvzTItJtzH5TTXDxRRGOBW24hTIOBxz91Rk54H1py6JZPeO584RyT+eYlcqobaRwRggck49TUpyewNWLV5dRW9k1/h5oCA4MIBJUjOeccYqfyH8zbggZ64qsbKFNGXTlaTyDGyAkgsqknAH0HH4VYedix24XceSODir1AMrLKT/AMs4x0/lTl8tTvVunRT1zTfOO3BCkHrxQCj8EBD2I6UwGdetRtKq5HUipjE4/hyPUc1V8hiTk9+PeolfoJ36DOXJPU9TSohdgBUkSFHOR2qVGEa71AyXCgnt/nFYxo8zuRbqxkvMqxKcKgK8d/X/AAqJ1YSFVJOe2am8sBww7DGKdjnPetpR5irFGdjDayygRZjG5jK5VQo6nIBqBdQuYrcyvp6rJFai6uIzMQUQlsBeOWwh4OADxVq4s1uoDHdBgjMr/LIVOQcjp+dNksrScRpMkrgIUJadsyLuJ2uc/MOeh96yWglbqRJrccl69r5BR/tAijYt99DwWHuD1HuPWls7+LUJJ0RPKWGTCndnfGSQH9slW/T1p01taSyK7QfMkxmRg5BVyMEg/wBKbBaWloQbW1jhIj8rKDGV46+p46n3ocmwbQn2o/ZLqVoI4TayMriSQkbQobOQOvPSpVLGGNpY/KkZFLxg52MRyM0NHA8ciPFlZJRK43H5mGP0+UcU5iWYk9SaTJ0BXZDlfyp4uH7qBUdFCk1sF2Wo33rmoZWdXIDdeaIm2vjsanZQ45FaX5kXuiug7nk0rlYoyM/MaJlIbI71GsZbl+TWexOw1d7nkk/jUnKjnn60uQowKYTnrSFsLubs2KcJ2C8gE+1Moouw5mSi4X+IFaZK6yYCtzSBd30oKBemM/Sndjcm0JSqwVuRnjikpP4jUkku/IyT9B6VatxlxgYO0/hxVdEHl4YdeasE7IQB1fk/StI9zWKe5XiYCVgTjd0P4094ht6D2IpjQ5PBxT42xGRJ0z1pLswXZjIuMjv3FTNGycsOKEUFwRhlJAJFTSNujOc8gEelUloUtCvRRT8Bfvcn+7QMRh8obt0qGZ9o469qfJIQM9T/ACquSZMZFJsmTsNLrb75XO22c7pvSFv+evsp/i7D7394l7KUlaNwVZTg5oSRIS0s3EcalnPooGT+lQWyyRWNnHOMSLbpvH90kZ2/QZwPYCpM6q5oc7329f8AhhlhLdWGtamjaXeTRXV6ksdxCEMe37PChJywPBRu3asWz0G9SGOMaXJb3iWk8WoXqzoh1B2TAw4JJJb5gzD5OntXV2spWRVIyM5qeVSgP6H1rRWaFGV0YPg/TpdOjukksPsULPH5YaNI2cgHcWRGZM9PmGM9xwDWXZ+HtTiSCzSFVtbxhcXys4yskTEqMd9+IgfaM+tdUpMjbUOAOTRCv78k9VpabC59dDmk0HUo9Bit2sWFydF0y2ibcB5FxG0pL5z/AMsyytx16DOajGgzJb2K6lokmpRxQTRSwBo2zcmQH7R8zAfP8xDdVz2ya72fDIgYA7Uz1x2/+tVZQrtgbl9+tU4oq5xVxo14b2XdpzyXrTwPa6kZlf7LGojDIXJD8FXyAPn3c9TiXStKns/E1xc/2e0cchnaW5lKFm3NlQJFbMg9A6/KOM8c9TJCJDnoe9Rvb4XKnp61FiHzEFPjYDg8e9MoqTAlMqionmzwKYIye/NSLBn71AyNXyeacDntxUojRBzTGwT8ooAdEfn2n7rcH/Gku4QrBdvKnqKVD5cgLCrcjBoQ6/NlcVS1RcVdFMOQuBRG2yQGm05lwoP51JBYMsbgrnGfaq8gUN8hyKbShSe1Nu43K4+JMnOM+lWiP3eD6UyFQBSTNllQHqeaRS0QpIihGfXP1JpsZIUu33m6VERJK5OCQTmlQSA/MQV7e1Wtyou7JVG5uanj/wBYv1FMUbRS1RoAOKKaybjnNMAXeVJyRQBLRTSyrwOfpSqSR8wwaLiuh6kDIb7p/SmSIwPB+nvS55xSecvl7SejdT9KB3sIG9eDQzbcVXM5b+EU8leoYfnSuiVJMHARdw6E0wExSZUZDehp/bB5FR3EeyPcvBPakxSutUPnVDncQB6ntWbKZEYDzCy/wnOae8WP9c5z9eKeYxJHjt2xQyXqtSKOY5wxx70oXzSTuIweMfzpzWR27gTj3FEQK4THfkipViY2vqSou5gPzq9HgLxUaRoigg8H171LtAU49K0Nyq0w812684pwmQYOf0pywIx6frSTQosZ2LzQJKwrXkYAAb5j0GDT0ZSMl91U5YMqkinBGM+9PMJC5Bz7YpdRbvUs7tzinsVSRifQYqpFNtADduhoml3KGU98UPYJbEnnsWOOM8fSntLtjznr3qorFTkdfcUEs7c5JpJdxKL6k6TFmCgEfjVlOAf1qO3g2KWbqf0oJG/npnpQ2OTsRuD524dCasIAFGKZIAMY9KWNuxqTNbjHmYEFj9RUisGGV71Xm+Vix554FKJDHED69qtXNI36lvcAvXtUSks/tUKytJ1HFPBI6UyiZeDk0b93SopCzfKpxTgcfKvJ7mgG7BLkAYPP8qruxVsEf99VZVAv1oKKxyRmpabIcWxkLEgqTnaeDUtQW3RqnprYcdgqtPuDcklTyKs1FLHuUkdcUPYJK6C3GI/qadKAUyRkA8j27/pVaJ9kg5wD1qJ7m+vNSntNKt4JhbIrTGeUpv35wEwD6Hk8ZGPXE8vPFxCnJIW30KxWMrE95bIhI8u2vpokHPZEcAUkmkKIJH+3arPIoJVTqMqZ9FG1lHtk8+pNSxw+IomMpsrNkcAeSt0RIp9Sdu059O3qezba8vRq0lhqttDHMsInVraQsm0nAU5Awchuwzjjvi4c6gubcuVr6Emn6fHptqIVGZDzLIclpHxyxJ5J+tWNgH3fl/3Tipg+/wCXCj+7n+VNLYPKj8qJRUtwTa2IypPJIY+rLz+YpACP7w/HcP15qYH5SwUD3pu9v7x/OsfYRXw6ehXO+pCwD8ZQn34P5GoJLJgxMUfXrgir43N1YgDqSelNIjH3UBP95hS9nU/m/AT5HuinGs6jaIjx0JFT/vu6fkRT8fX8CaS4eFX4T1I4otV7oXuR7kWMEksC2OSOijP6nipY28td3Qt1z71VeQyHHQdgKnij2wiaQ5xwqmnTjy3d7siVTmeiJnkVF+ZcsRwAMYqvPkbZBwelPiO/LHk56mmzY439O1aPVEvWNyNJmVvmJI706WcMu1c+5pVhDL0wDRLAAmUHI/WlrYn3rDA8rJhc4HelW4ZVAIzjuanjAWNQPSjYu4tjk07MrlfcEcOuRUUjmK4Dr1xyPWnrC6yFkHyHr7U5o1Y5YZNPVobTaIJ9xYcfL/CcdaU2j7htwwJxkdqubV8oZ+8oyPz4/Wq1vIVymSGFJpX1JcVfUlySOSfpnpRR060VRqSYEjHZncTnB70jY+8eI14z61WBJuwQcBV4p8kokjxktg4J/X/Gi5LkMkZXkXy/kJYfN1NOQ7yG3M2BjLd6bDEN3XDk/ISMge9SIoRQo7VKXUmN27sAzRS7ojhiOPqP8mk1XW/sd5bWlrYz3l3cxNN5ULIuEUrliXYDqyjHPWpbZBJeAN0Venrn/wDVWd4h0641JoZX0+zvIVyBHcStBJGxxhkkUEjjggAHvntUU7pza2/q5u9khTqllP8AZDc3cdq92AYbe6cRSuem3YTnIPGBVhb60a+bT1vbc3gXc1qJl8wL6lM5xXKan4b1y8037KLyC6drSKJ5jcmIrIjliW+QtIMFcEkcgnAJrZg0u6t5ri3W3sJbd7ye7ju5nLyBpA2B5e3GQW253EbR05wNE76k2SHv4h0q0tp7ptWtZLaFxHI0U6vsYnhTg9evHtW4uoaYt1BZnUrY3cyCSKPzV3yr6qM5Ix3FcTD4X1aZbw3Jtkkk0+K3QG7Z1eRJN39xQinoAAcZ/Cr3/CK38niV7i5w8NzdwXpH20qI2jVPl27DvwU4ORwcEDu43QrJHQRalpt/cOlhqlrcyooZ47edXKD+8QDwPesmR/D+u2c99fyWb2lpK0BuWul8tl4yHKtjaT/C2fpzWBo/hvUvEXg+wgkWGwhgsbqGOZJC0khlyoDLtG1R1IycnFakPhPVImS+aKFryC4glWKe+aVZljWVQN3ljbjzdy8HlRnHZ6voPRG/bXdtehPsV5bTiRWZBDMrBgpAYjB5ALKD6ZHrUZ1HTUktozqFoZLtQ1sv2hR5wPQoM5YfSsDSbXU1uE1C2trXz47nUYZYJJ2RV82dGDK2wlgDF6DOarWfga/hSzSSaOeJrWziuAt80axNCgB+XYdwyMjkck/WlqB0dtq+l3t09tZapZXNwgJaGG5R3UDg5UHPFWnbahPoKztKstUbxBeXerW9oZJsxwyx3m4xQg/LGE2jqeWOeT7AAa0gIbEkahgeOOlHQT8ijNgSFRwqfKKfbMdxXtjNTPal2yVb8ByalFuyRjHA9zjFSou5lGLTuMop7Rlc8g4647VFv/ebMHOM1RrchU+YwDkkEE/iDz/SpZPliO0dB2qFflcqHDMTuGOmfT8asKwdQR0IrnoyesJboqSTXMupRp0O1plBwRmpzbx4JbOPrVdNqShgDgGtLW3OVxtucrZeILy68JzammqWz3I08XBhisShicqD95iQcE46c1reJdYm0R7KWGKN4JLoi63DlYVQs7L6EAE/hTLfQWi0X+yZdXvJrEWwtliaKIbVCgDkLnIArTura3vbmCW4VmEDu4Tja+5ChB9sMaC243M1tak/4TBtLijR7KK1kaSRULSNMoViqgdcK6cDqWpIvEtlKsgW2vPPjmihNuvlM5MmdhyrlcHa3U5GOcUsHhDT4rGG3Ml15aW1zbtI7gNIs+3cxbqSAoAxRbeHbS1vTctd3M8heBvmjjQfud+0AIoAH7w5oD3BbnxBFbaW98dM1GSOKRop0Xyd8Lq23aQZBuJJGNm7OR61Zm1e1stVtbO8guYzcPHGsjBAod8bVI3bjyQMqCoPGeDVe60FZ7mOeDULq3MdzJdBVSN18xhjOGB6DOPTJplx4ct7nUheSXt1uNxBcyKEixJJFswc7dwB2DIBAzn1o0D3Cw3iu1NnLILW9tw1tPLbzyxIyOYgd2FD5yOuDtBHQ00azdpq3lGdRAdRhhOY1H7trXzCPb5ueue2cUkmg2cmnw2bSzhIYpolYYyRKCCfwzxU66XaC5EzNK+LhLgocYJWHygPoRz9armL54ktlrNpqdxEqWt1CtzEZrWWdFC3CDGSuGJHDA4YKSO3WtMWkTru37eemazdM0OCymtpYr64ultIjDaQTlMW6HAxwAWOABkk8fU1rPGV5x8v8qq2g7RYiW0SjKOT2JxVTUNU07SVR9W1C2so5H2I9xIEDH2zV2A4YjOM4/nXnnxd0/8AttfDGnSSeV9s1AwiT0LDA/Uih6LQaS2O/kxFu8xlRUBLMxwABznPpWdDqthf2L6npuq20tralvOmSUNEoADMG7cA5z2/nxVx4putQ+EFpZxE/wBvX0o0NkY/Msudrl+4OzknsXFQ+A1XRfhj4vW1KTrY3d8IzKoZZAkC43DoQccjpSvroO2h6VZX1re28N3ZypNBKodJYWyGBq48eLjcSpXb2PPTHSvOYtW1mH4Zabr2iW9sZ4LdJ7q0jhCpJApO5VA+7gDPHbNafhPxPeeJrnU9Yx9l8PwjyrTfFiSYqMvISf4RyAPf1BqfaX0W41HudXNJHvyHXBHqKZuHqPzrgNN1vx1r+iDxPo0libWSVvs+jNEC0sSvsOZTjDcE+nH4VseI9a1c+JNK8M+Hhb2uoX8DXVxPdRh/ssQz0UcMcgj04/ETzVOw7R7nVIjP9xSfXHaob55rS2RoJIlmeeKIFl3hdzAE4B9/Wub8Oa3qw8San4X8RNaz3lnElzDdQR7BcRHAJZM8EEgf5yejkhguYDFNbQyRsRlWXjINHPO9uX8Qsu5QTWr+W+ht48Bg0ySvHbFw5SQKGA3DAwffBqbUdefT9algaFWt/sqtH/eaZmfaufcRn8albT7OUQo+n2zLDxGMY2DPYY4qxJbxSyebLbRu+VO4nJ+Ukr+RJI+tHtJ9mFkY0XiC7GmtcTJDIYYIJXRAf3peSRGVeepCjHv9anTVb64jQxT2MDrZLdtNKpMZ3FsLnPAAXlufp2q8trbQlClmqGMjbhV+Xbkj8ixx9TTXsbKXylezjYRsTGGiUhSTk4+p5qfavqn9w+VGfaXkq3UUOIVhku5bYRBSZCV3Zk3k/MSUJPAPzA/XU6VG1nbPO80ltCZXXDyGAhiP94dO3PWq0MckWsOkN3cyW9vCrNDK6yCQuDtwxGQBtPVsk+g5ao1lsbKHPd3L7SOy7WORTKcskT/wkHuM9KdtjPRyD/tCuhNNXRjsVivl428KOn+z/wDWqRW3exHUelPdCvDDg/kahYFGBH0BP8jXO17J8y+H8i/iVnuWI/ly5/h6fWmdaczqVCochev1rM1PV/7Ongt4BbPdTI8qLcz+UgRMZOQCerDt0ye3O7lFR5nsSotuyMvWbm3vNbfTZvs26No/JW/UvFNM4xtRxzE4wMYOcsx2nrXRxwtbW0cD7sovO5y/J5PzEAt6ZPJ71znh/R5UvItTF0UgcLMLcwbJcsrERyMDhgrSs2cZLc5456yQhIlSQFj169Kxo3leb6mlSytFdCleA+RGPUlqpVrS/fAHQKMflUEkKS/eHPqKVSgpvmuc7i2UKci7j7d6kMQViDzj1qT72FQY9awhCNOV92RYjbLEBepoSPkluin8zU8cTBsnimSI6sW/hY9B2roinyX6jaFVvLkBPRhU9V8BkBJxjg1PHhgFTn2qqcuhcTE8V+I38O2Fv9kt1ur+9mENrC+dpbjJPqOQMe9Z0eqeLNG1SzXX7K01Cyu38t30+Ny1uSep46fgenWofiUrWl14c1jYz22mX26faMkZZGz/AOOEflWd4n8RsNYsbvw/4pM8d5cRIbGHGI0wASe4yexA61lUk1PXoezh6KlSjaKd73bv911tpqehPf2Eeorpr3Kpeyp5iQZyzKM8j24P5VHBeWF9d3NpaXscs9q22aMZzGenP5VyWvXUGnfGLSLq/mS2tm09086VgqBsy8EngdR+dUPC2oWz67451CJReW2xpQqHiZRvOAfetHU15X3/AEOdYX93zq+yfzbsdfa+J9Bmvzp9vq9rLdudiqrHDHPQNjBP41S1nxtp2geI7XSrkIzSZFzKZdv2XIBGRtOcg5615lrd8tx4OsJ4bjSbctdmSPT7KICWDG75mbJODxweuR6V2/jg2dt4+8M3F6IYoWkk86SUAKQNoG4n096zVR8unS34nU8HTjUSld3UtPNf1/w51uraxp2jwRTapew20bgCMueX78AcnrTI9V06fTW1OG+gexRSWnVsqvTr6H2rhPF8lxD8TrOaaaxhiazAtptRQtbjrnpwDknk9Mj2plnZC18FeMZY9RsbyOYglLEMI4n5LYyMYIZcYyOPar9q+ZqxisHD2cZN6u34u34HaR+K/D810ltHrNoZXUMo34BGM9emfbrU+m69pOsTSQ6XqEN1LEMsiE5AzjOD1HPUV57rum2SeAfCLJaQq0s8QkYIAXDLlsnvk1ttbQWfxwsorOGOCNrA5SJQo+6/YfQflQqkr6+X4hLC0uVuLd7S7fZ/zOju/E+iabffZLzVraC5HDIXPy+zEcD8aoeNtcvtKstKl024WNrm+SJ3VFcSRkE9wfzFcLq2pw31l4kaI6TpaCcobV4t1zcsG+9knOc88Dj9a0dYZm+HXg5mJOLuEZPsGA/QVLqtpr+tzaGDhTlCT72afpf+tzv9W1rTNFw2q30NqJCdiufmb6Ac4qW3vLXUNOhnsLiO5t5JCPMibIOO3tzXH+KdSjX4gw2ajTLCaO13nUtQTdxz8qgkDuf1/GL4Wtv0TWQrq6JfB12LhTx1A7A4FaxqfvOU5J4VLDe166P7/wCu/wAjvaSjr0oPStDhGuScnvQFDKqMAewzRTk++v1rIdinRQQQSDwaKyMAooooAQHOc+tSRJvb2HWmqpZsCrEUezOec1cY3ZSVyO4blQvUHNPWQYyeKjlTa2c9TUTMeg6/yobaY+ZpljeZVbIGB7U0KX4HA9aWJSsTPzg/LUijYnPHrTSvuC13GLEB15NNl28Y6055hjC8moVUu2ByaUrbIG1ayEoqU27diKesAHXmjkYuVkAJ6CnMm1AT1NWNuOlRSAYJYn2FDjYfLZENNGd59KkCMwyBx6nijyyfusrfQ1JBJEGOCTx6VNKcYJ/uiq0ZO7GcL1OKszkuoPQlB/KrWxrF6FdpSeF4pzH5cdhTVXH1okbipIuxschjkBU45/OrRkdjksaz85YfWrYkAUEnn0pxZUGSF2HO4/nULzEH5Rn8aJJOmw01F/ibn096L9huV3ZCbyaTleOlOJXzCe1IP3kgHTJxUmbILqLz7cWvX7W6wkf9M8gyH6bA35j1q7JGZ1eQjLOxIqGxdJGN03WYNHEP+ecasRj6sykn/gI525q9VxRpUSVqfb8ylHuTDDt1q8pEsYU5Geh9KrGBi55G3PTNLNIVI2Njae1NaHPG8VqBxHOuB1HNOKEXAZeh60r4nthIANwXLYH+fUU8dOaClqaDjzX/AHbA8fczg9PyqvKPJz8oDHgH19eKYjAptPXPGTj8jUt2cJGjHcwGST1rXdFFcsSuD09hik60UVAyiRgkHtSVeIBGCMiq8sexxtHBrNxsYyhYaJAowBR5vt+tTiIH7/SoGXJ2quMetFmiWmhrOWptOMZA9abSJHMxc9KtK37pAgP93GPun3/nUMKZ9iaWc+WwC8ZGD7007FptagyiPAJByMg5zmo3fd06U5QsiqpDBsYU54zmounWkSyZcEA4p1Rxt2P4U8DbnmgZOSqDFRKpN2m7+90qOa6UL9O9NtpwJgzdByKa3He7LlQVNuBZtv3R0J7iogM+3qa0NyROFyaUEEZHIqq7tK2FzjsBUtuTgq3GKm+pCld2Hebyw7g8UwDJpWiYsAvTPJp23YxbtjgUtWTZt6irhTgcmn01V7nk06rNdhCOpHU01IR5DqeScHP+frTiw59qSOQ+YOuDwQB1oE0mNRcRbXXHr71EY12tgHpxUsg2tjdu/pSbcISe9JrQTSsRIGHG4j2FK0RbJ35I55qYgGP04pgOM+/FK2hPKrakIiyOTj8KkSMbgOuepp8y7Y/l496jib5QfSpM7JMklDGI/wAhUKxgcnrU0cnmn5uB6UMhOduB6ZpvV6Fv3ndDHkHkqFPIP5YqYN8vPBxk+1QrAVbLEH0AqUR7l9qe241dasTzeM4OD0PrVd5n3HIA+oq0wUqU9qrhZAN25gvfmnexTbQ2BiflxkfyqT7o+Zhn604AvwSfzpwhVV96XMLmfQrOqtyp59MdaYUwo5GauuqhQFAyTShFHYe/FPUfvFFY2YgAVdhiWNfehYAjZ7elSgZpXYXYE5qBxhvrUjFs4UfiaQosZzKSzf3R2+tKzZLTYgwYwD19qikRgMg/N2AqYzkcRgIPYUh2ydPlf07H/CqUSlEjRWZCSM4GTT44i4zwB7kCiSQwhFGUPftz/wDqpykv8zHJ6VRQ+ZMt1ODyOc8VGFC8k0rPjgdaEjzyaQCgDOR3oChRgVIcIKjZsD3J4oAa5I249earF5JWLLwOlWmAYgZ5BzVE/IxUetAupPBIqEqe561ZqqUOflkgTn8Qfxp+ZnBCKQy8MOME+1c6r01pccYTS2EeciQ7eVFDXPHyr+dQEEMQwII6g0ValdXRg5STswByM1L4ZRZdS1mV2PnLLHAv+zGI1YEf8Cd+fb2qBflOKiktmNyLi2uZ7O427TLARll9CGBVvbIOMnHU1UJKLuxRdmZ+uRa3B4H1Ky0yHU7jM12GnS4zOka7im1ncMcnaMrk7cgDJFbl5x4qt5EVomudPZriJiCVKOgTOCRn95IODzj2qsY9ZNwEHiG68rd1+zwbzx6+XjGcfw+vXtfs7OK2jmkeSSe5lI8yeZsu4GcD0AGegAHJOOTWqqRmnY6OVrcWNi27PZsCpmBZQ3XsfrVKMkyNhiByTjvViGQmPgFRnPXrUJkRlclYM2FAOABwBTSjDkqcfSldmJGSTwOp9qI+Gz/d5qixJW8uPB/h5P1qCGTdncec1K2GDA/jVNIzI2B+JqG3ciTaaJ5JwBhOTTBBLIwz1PrUqQqnufWpz+7GP4z19qdr7hyt7kaQxw9fnb9KdOC+FzgAA4HTpQBlgPU0McuT6mn0KsrWK4gYdJCPoKhcsDh2z6ZNXQPwFV5/n4JHXgVDSRnJJIfFOHGDgGpaoY28VNCWVuQdp9qFIIzezJHYwrgDg9PapI/nC89aGUMMMMinWqbW+b7oNUty9UxWb5htyAvAo3K33+D/AHhTmRUVs8npnNV5wTEcfWm9BvYnDBpOOh4H9KpTKRMSO/SnRyoijqDT5jvbzF/iXIHvUt3REmmiCRZBy+T75qzDnylzxxSjEiDI69qS4OxAB3otbULcupWlOZCQadAfmZT3H8uahBzTkJVwV6g5FR1Mupbj5uWGQCibQCe/f+ZqUyRwMAxBJ+8euBVTdsmDHv1pZCgTkhmPcdqtPQ1i7RJyVbBhfkdWx19qVmlkOXlP4VBbD5WPbNT1Lpwk7tGsZuxGwII59lY9j6H2p6tuHoehHpQQCCDyDTOVPcso5/2l9fqKyf7mV18L/A0+NW6koUscCrMEqjEbPwDwSMYPtUDN8qhPuEAjHemV1J2MixfXC282UZi7LyFPFUluXLYmyM9zTLgEOrCnLIkvysOalttmd3exJLI3ABy56ZpyMy4zycc+9RxxCMk5z6VJT1LV+orRp95VGD19RU8bPLZsCxMkfOc8lapvceURswT3B9KntJQbuMx58tsq3scdKE1cV1cryzbchfvVLA3mLvOBjOSemajunKfLtXOTyVFVmdnOWOfT2qW7MhyaZd81AxxKpbvz1/pUMpdyd58uP6dfy61WopOVyXJsk3LuARcBQWyepwKuQJmNQ6MhVR1Yf5FUEO1xk4BG0n0Bqx9oaOLkDzM49ce9YU3atK/Y2T/dplxlwmG2rnnj/PNVJLhAcRr0/iPX/wCtUMcrCXLsTnrk06aImQbBnd6V0OV1oZuV1oM82T/no3/fVHnSf89G/Ojy8fedR+Of5UoMS8gM59+BUamYk3MzH1OR9DTKVmLsWbkmm4BOaBCs5C+1MQ5JJpxGRzScLxSAcfbiijvRQAgYHpVy0mYEguceme1USjKQQDU0WCw3Eqe1UnZlR0ZpB2jUnCtzjIA4rn/Fnhq61/UfDc9jLbxppmpJdyiVmBZVIJC4ByeOhxW2hIYbTz0q2jCPGAOvJ9/pW250HF2vw9Nr8UpvEpnX+zSWnhtFZvluXUI7lSMcjJznOcelR6F4KvtO8EeI9ImubRrnVZrp4HR22KJYgi7iVBHI5wD+NdwznzNi9RgE/h/+qoXnQLhFDkn7uMkfX9KT5Y6serOJuPCGuH4e6b4Wtry0iGFh1G4SRi3lA/MIxt5JHrjoR34n8O+F5PDOsaha2s9s/hq+G+G1dz5kMhG1gMjBU/X0GO9dS02WOFCNjBGdx/If41DJaRyxxvM4QRSBlDMAdxPX05JAxXNGSdRez26mjvy+8cVZ+FPGmi6MPD+iarpkOlLK3k6gyubqKNn3EbcbS2Sfz7cY1PEPhzUptd0zxB4cuLc6pYQtbOl+W2XMRB6leQQST6ZPtXYRqQg5HOO49f8A69RSRty4UBeM4NdHLoZ3Ob8N+GtSg13UvEniKe1fVb6FYFisw3lQRLj5QW5JOFz7g1tB/LlZX6E5Bq7BLjCH14zSXVuZwMZ4HftTa00JlcZCMyAngL8xP0qUKOPmHofyA/rUFtuQmKTvwD6dqmznLDI+h+p/oKa2AZM+4gAY4z+dNjXc3XGOaWZg0hwOnFWCFUgFVHzYyPajdjIiQNx654Hvxisu1Amnv5zyJLpkU+gjAj/9CV/zrSyFdDtYhV3bQMk98CsrTGMWj2vmEM7RB3KnILt8zc/7xNRK19djaHu05P0X6/oWip43fOB0PRh+NCsccfOO5A5H1FOVtyg0FQTnoexHWs/ZNe9SdvyGpJ/EPSUhflIKnt1FOKxyDA+QnsehqAgg5bOf76/1FPQjBaRgFA+8vOacayvyzVmDj1Q0xvHJjaScf99D/wCtWHrVxBeNc2t5psd7YWhVLgysp2OyhtyoRyFVs5BB64BIrQ13UYINNeyjmh+1XEZMNvMgkM4/uhdy9eg+YZPSsrQrFLy6S9ubaKWOONfJknC3GfmJUxytiUYPJVwcHoeKwqWX7tPRmsP52dHZWiafZpCjSOkOQjTSF2Jznljyce9SpmVSh5I5BpC3nMBHyOg9/ehmCjYh+repruVraHO731FI3xZxgrwT6iowNwJUqQOpDDiniUnd5imVSpDR9dwx054rn4NMb7MJX0hkZ7lZrm32xhZE2sFRQDghSVPOMkE98Um7AbscBdm34APJ57etKbYRfMh3KRkH0rn5NHv0TzbaLypYoJRFCXGNryMfJODj7pGOwIHYVPBZakur294YVEcSJbFDJ8xi2/McYx98565wlRpfVCsjY4DbSV3em4Z/KolfdMQvK45qGe2D6xDO0KBYIyyybRmSRvl+vyrn/voelWlAXoAKvVsCqwwxHoasWXErHsFzz61BIMSNn1zVm1ylu7g4JYKCK46a/eWIW5JLFHJBIjIrq6lWQkMGHoQapWWg6VYTG4sdMtLWUk4kjtgpH0IFWnkcgA4OSOoFLFL+7U7AMjPBIro3q27I6FKShZPci1DS7HUo4o9QtbW7WPlRPGG2k+melOttNtrN5JLS0tbV5AA7RRKpcAcZIHIAq2ZMReYwPPAUnI+tIrmaNhj5gOMd61styeaVrX0MlvDuhopxo2nHzTuf/RUIbn3FWb3T7LUrVU1Gzt7tFfKLNGGCnHbPSp5ONo9FH+NNZwIVzwMmiyH7Sd73ILyys9RhEN/Z29zEOVSaMMF+melNhsbKKxayisrZLNuDbiFfLYe64walKmT73yr6dzT+FUZKqOgyQKLIXNK1rkMljZS28MEtjavDAQYY2hUrER0KjGB+FOa2tmvhetawG7Vdi3BiXzAPQNjOOTU20nGMcjI560bCenOemD1osLmfcoy6NpVxdvdXGl2UtxICryvbqzMDwc5HPHFWZNOsHsLaA2Fo0EDbo4jApWNvVRjAP0qXac//AF6en/Hu5ypUkAYOeaLIfPLuUr3TbDU2RtSsLa7aM5QzxByv0z29qls7WzsmkFraW9sszZlMMSpvPqcDk0+iiyvcOaVrX0EUFGaM9UOPw7U7GeKfEqS7i5IKAAt29h/n1p7RLtcKCGT1PUVT3IRBtwaay5UgdadUsZCqWYAjIHNRyoZRkztXP0P1H+RTKszR7ZHXqD+hquoLNgVhJWZk1qJRTmjK475pyRtuBIwPelZhZ3sOtxkk/hU7DBxREOSadKQqE9+1bx0Rso2RDIygfNgntVbA5IFPkB3euKZWUndmUnqSxSNuVScrjAFSyLvQioAjLh2GADVmrhtZjjtYqFSrYI5qxEmxOep604qCwYjkUtOMbO40rBSMwRcmjeNxHcVWdi7Z/IUSlbYG7D/tBz0GKeZkABK5qn9p4mlmiWKzjlaNbkPkAodrFx/Cu4MNwyOOcdTKylThhis+ZlSjOn8Q+WYyAKvyqO1RqSjAg8g5ooqTK9yXzAUKhVXJxx6VNM4VgvfaB+lVRjcM9M81LdK3nFjyrfdI6EU76DT0GMxBwKjblTmn4ZscGk8hmPPApCs2RICzgD1q5sXGMD8qbHCI/c+tSVSRpGNtyKOMEZP5USnGAPSpCVQc8VCzeZIPSjZCdkrIbg5GR1o+649jUjHLAH60wKXcgVJDWtkRWq7LRkPWO6uE+gMzMv8A466n8auRTZwrdfWqmDFqDoel1HvH/XSPAP4lCv8A37NTwDMwqloOtf2vN/Nr/n+JZkJEbFeuKhWISR5bp2FWOtMbCqFX6VdtSXG7IEEkQ4+ZR1HY/hVrhkV1GA3b0PpULHbhO561OoxCR7j+tC3FFWeg6Lb5ybzhc8066DC4beOpyPpUa/fGematXEMs0pZMMvbBHAq+hZUqKaRkxtH41ZNvMvWNvwGagmBEZBBz6VLvYUtiNbkfxjB9qfMCY/lGe9VSMHFPSZk46j0NRzdzJT6Ml+0rgcEnvUbSl2+Uc1ETkk09WwuFHzZpXbJcmxfMwcMKYxyxxVgII1yQM9yaJHDRnj86LFcumrBZAvzdcioyjyMWYY+tRgkMCO3SrQcSDa3ykjpQrMUbPcibJT5VJHqKcZ8yLk/Kfv4756/jUso8uE444wKqiFGwXkwD2Hanaw2rOyBkaKTDjofzp7DevBqeS1AcucsrHIOeDTHQJjaOKOVoOVpEcdsrfM/NOVBuwo/OlDEDA6Uwy7G46joaknQc06hdoBYDjPrUmB5R4xkVVkx5nAwCAcemRUglLREHjAqrlKXRjoRy5XjsKmUYyT1PWq8DhFbccDPFOkdyoKAqPXvTTViotJE9ROfmqIvLF94/nU0Mm8c/e707lKSbsPByBTS+0/OQB6UrBjwhA9TTFgUEljuPvRqN36DDKN37tST71Ytc7yW5BHzH2qq5Eb7E6k9fSrcPMJA655HqKauJX6kDSEnA496cq/u8kk8cZNOaNT93IpAmD14qLMm0r6ivgKF74xUHKz89B0qbbvbJ6UyYbUBHY1T2KktB5XeQW6dhS7F9KihkLPjtipWdUGWOKStYUbNXFAA6AD8KGOFJpevSiqLIo8vI2eg/WpHfapx1piMd5AxzTO/r9alau5EdXcUA8tnpRnOc+nNRTTHOFPTrRHnaSxOWqmU9iyAEbrxikB8w5z909KeSNue2KhiG5y4baq8Env7VC3M1uOcMJFKrnnmpRy3NBlAG1AGOeW9fzo8w5P3eOvyirsaJWFY5IVRk/wAqMhBgfOe5PApN5YlMgewGM1DOdjDOaWi1E2lqLJLNn92gU+ozmoNs3fA+tTjzGA/hHqetNJ4OAWPrRcOYFjbb8zAmlKEe9V23K5z+lPSdxwRupcxPPrqRtI4+Vh+dTQ72XnI96k3DbllwfQ1LGV254z3qrl3QxYueakZgi00yZOAaY4JPPA9aBiE5yzngUiKzt5jjA/hBp0aZXzJBkZwint7mklnx0O5qXmS31YxG3XLHsBiq0n+sb61aP7qP5up5JqDyWlyw4B6UIcVoTShJJCkaZLng/Wo5JJS5y5BHAxlal8oRf6oiRiCAM9O3TuaYZPlyEAPRief0PSspQjJ3kjPnklZaFcMxb5sk9yadUhAkTcoAZfvAdx61ASxbC5/Ci1tjN3bHEZx7Uk8iwRAsS0jfciUZZv8APr0FMS4DXIijUuVPzsOi+319qtC3jTcyr+8lb5mJycen09qpIqMboW2Lts81Qr85AOcfKD1qaU7YmIqKUlWLL1V1b9DTpZAYyMYDDK1nR05l5s6Kjsl6EUAzJgdSCB+VWI0eNSr9QenpVVHKNletX8+YmT94D8xW0TGnYRu30pfux+7H9KULv2gEZxjmmyHOcdAMCrNStNIwQAfxdTTrYfIT6mopAS4HtxVpVwAq/QVC3M1rK5IDsUN/Eent70yllcLk/wAK8Ck61RoOT72fQE1GzhfrUqkohYcEnAoKI67iAuTgjGc/SgTuRq6yx4yBzTRGFfOcnoKikg2zYDLgnt/D9asLEVUADgdzUrUmOr1GsisQWGSKdSspXGe/oaFUt0/HNUWJT0O0Lnpu5pNnzMGONvWniJmjBXDDJz7UwGzEKADwAD/OoFfzY2xx1FS3xG0L3AGaihAEYwMeual72Jvd2EECbMHr61GpxkMeQcVM8qp15PpVdfndmNS7ESstieNwp+bp60+T5v6VCeRSxyYUqeStNPoOL6Fdhh2+tKgywprqfOJP1FOX5W544qOpk9wdtzU2iigRdjXbGBTZJlVTg5aocu6qucdsDvUqwIvJ5+tXfsbptqyGxPISMjK+tSspOCvDA5Bpomjx1x+FPVg4ypyKLJqzKi7bMarYweiscAf3T3FPqKThjjuASPoRipayo3V4Poaz11I5k3xnHUciqmcdKv1Sf/WN9a0kc1RdR7fK5DTHI4O0GpUkyMHe/HZP/r1B50n/AD0b/vo00szfeYn6mlcjmaJfJx/yzlP/AAHFSQN5MyuFIwecyDn9Kq0UXFcvagh+0MqqTzu4qmyOv3lYfUVbl/0nT0l6yQ/I/uO1U1dl+6xH0NOW45aslt0O4lhxjjNPltjsMiLwOtN+2TY+9+tNE0jvgtxg7iew71MpRjG7LilL3URhQRubhM/99ewoZi7Fj1JpGO5s4wOgB7CpbdQZDkZwKxpwk3zy3HJr4I7DEjMjYH4mrVy4jiEY+8w5Pt6VKgGckcDk1SlZmmZnHPvXTshNcqI6KRjilrMyCkZtuKWmkbjz0FAAX/u0wDJqTAUUxSS9AySiilKlcbgRn1piJoZv4X/A1K8auvT8ahii+YF1yD0qwcgfLirW2pvG9tQAwoB5pyuyfdJH0qMuR1Q/hzTf3knGNg9e9UVcc7NI7cbzxgY4A9cDrTmiZcCTd04HQflSyoD8g42cKR296WGc7gJfmjccj0I4OK5eVKr7+tza7cdCPd/DEoIH4AVBPdxxws06kKpGcc45HP4HmrjoY5Cp7H86q3awrbSSzpuRFLMAM5A56V06mDuW0uY1AUEPz0PGKkbbMBsbDejfyqoIYx/D+tPAwMDpTTfUav1HMpU4YYNPhk2Nz90+tRkk9TmnRgNIoPc0xjpWVpN0efyxT7mXLL5fDAcnP6U4ROjrymCf4RnH41G0a+UWQ5wfXtTAiUkcnk5qwk6SHqFYA8Z6/rVemlQe1K4Fvz13bWyw7EnOKzr2KKCZ57Yl4Xy1xEq8oe8qj/0Je/Ucghp84I44qOTKMJEJDZ6ioqP3Rqbh6DYhiMYIYHkMpyCD0IPpT6rB1tA0gwtmT+8Ha2Y/xf8AXMnr/dPP3SdtnnJBBBBwQaqDVrGjSsmtmFZfiKZ7XQriaC5ltJE2ymWDG/ah3vgEEE7FbgjB4BrUqC8hM9uQmPMU7kz6jt+PI/GprJum7blU7KSuYFto91qMz3OsxQQ295AqXKq/M4BJicgE+XIvHIYg5zkbQK6IJEqiNYlhG4sNoxlicls9yScn1rPiuC6iAfdPzR8YwOm3Hsf6VorEVQKvPGCp5Brioyc1emrrrc1qNqfLIA7w7sYBbq3r9fSnK272I6g9qRlMTBcjPdCePoDTRH8pb7gX1HI9vcVrGfI7R27f5EtX3JKmhcA7X+7nIz2NV1fd16/zqVELZJOFHUmuyMlJXRi01oxHBDkN1zzUUrlFBGPxq5sE0eQCNo4J/iFVWQNgHsaHe2ghqxkNuZsmn0UU0rANdA/WrKJ5NuEWTBLEnI68VCBk4qWc/MB9T+v/ANalyq9wI5mZVzlGAyTwM9KmSNSwUxgKAORmqjFWPzf6sZDf7XbAq5JMyqAPlJHT+6Kyg1KpJryNGrRQkn74fIcbeNp/pUAlCQsSGU7gOVNKynyVyOGbI98f/rqYNuWNZBu3Hrnkc1uQQTyfvmAyzA4wKjlXaIwcFguT+JqdtjyHbJyT0Ip0sGZC3y4HHXpgVL1WgmiEfdFUNZtzdWKQCyNyJH2u6orNEmPmK7j1PT269q0vLJ6FT/wIUGJx/Cfyp2urDMWTTXN2TDYFC0tu9vOSo+zRoF3J1yOjcDIO/wCtQW2napp7Qm2hMqhJpFQsMxytwB/ung+3zV0CozNtA5p5YRjEZy3dv8KnlQGVpmm3Nhpd3p90oYbD5DRy5zuUhhkgc7gTyP4qfpNvLa2ckUkJhjEuYVdI1crtXJYJ8vXIz1wBV7B70lNRSAKRmx7knAHrQzBepAz0z3p0KgyI8g2op3Bm4yfQDrV+bE2SthphGMKgbGKPMHmvvyA3HHaq6OZJHbPGeKnm+8p7soJqU7gHk5/1bB/boaRwFxGOoPzH3plJTGSyRs0pIXcM8YPaoBCqMcZP1qWP/Wp/vCmnqc0rJiEoqOZmXBU4FJBkksSanm1sF9bE6tt7VBcS5YKKfI+xc1XXl/Umpm7aIHJ2sPUAZz0WnQqCWbHfinOuISF5NKo2R89hzQo2YrCSfMVT1OTT6ZGMjeep/Sn1a7jQ13CL79qhaZiPSnhPMdiQSO2PSlKLjoKzk2ws3sV80jzrawy3MgykEbSsPXaM4/Sp/KUjg/jVe6iDfZrYnIuLhA3+4n7xvwITb/wKosx06d5q+36dR9tHJYW9vCW/ewRqrsO79XP4sTTViMY/0NNyd7PIUfWInhT/ALJO09tvOZ7jaX3Kcljk81FRtoYe2kptvW+4isskfmRMWQNtOVIKt3VgeVPsaKV1Esnmh/JuAu0Thd24dldeN6/iCMnBFNDEyiGRPKnILCPO5ZAOrI38Q9R1HcDjKsa8sZrmh93VC09JXRSoOVPVSMimUvG33oMyUXOOsaH8CKniuS3ZQvQqB1qlTkba3t3pqTKUtdS1INjsPQ1CxcLuzj0GKsSchH/vL/KoiAwwapmrVysTk5NOjxuyak8lfU00qFyBU2M1FrVgMk+7VIibc85JqPJVlxzTjMB2OfehWCNt2Q3uRHBIo/epdRGIerFghH0Ks4J7Ak1aEGybKtlQeKrLmfVLVD92BHuW9jjy0H/j0h/4DV+rSvqaVUnGK+f9fn8wqKVgjgmpScdahjJlUMwqjIZCwM3UnnjNW1OCQeh4NUwyi5z0GafJONpCcn1qU7GcWktSbPzFcEEe3Wlp0ZDBUPI6A+lNqjQcs7hiFdhj3qW5fdYLLL94MVGf4qZsjtkE85Lbh8sY7+5qvcXLT4aTp2UdBQ3ZESlYqe9FT8FOOhFI8IWEN371lYyswIVR93P4VHv2yblGKC5K4NIo3NigRPktgt+lDRM68fzp0K7Qe/17VLVpXNVG6uyusDKMkZP1pQjEFmGAOlSl1X7xApsmXi3RnoaLIHFIWZgI8HmqhOe2KcGzIol5UHke1SNtiztTLZwd3IFQZvUltXUw7GPGfypJsrIBnOCQajjQPIrxttXPIPb1FRuzLIC5yTyD61d9C7+6Ss3djUb4dgq8sTinPtI+Y0qx7drAHg8H1qCAaHdMQp+UADd68U4wIF5JqVQACAPusV6+mKRl3DFXZGqirFVV8uYGTlOxq5VfzQw2txjg8cVMuNvynIpq3QcbdBk6B0APr2ohjVFz39akIB61HM+xdoH3hQ7bg7LUkVgygjoaWqsMuz5T3PFTFmYcDihO44u6GN8xyfWje2CoyvPWnqhzyKcxG4AjOelDB7Doz5uc5VvUng0EYyCMetFDzBEy4DY6E9aYbIQDC4pskYkHXGKkVldQWGxsc4FDDaxB7HFAaNEcUITOOT3OKZccqBj3zVgEpC7qcHoD/n8KiBWa3zKdrg44HJ/Ck9rEytayCL/VL9KVzhD2p0QWSIbMgjjBPWoShkkYN0HSjoPpoLENzFgfaoHmxwn51KgaKN9w47VVRC546dzQtgjsLGhdgAM1ejjCD1PrTLeMIpIHJqXBYfJj0yTipepN7jUOYzmnSrgAHhRyAOlMSCVWw4O3P3h0xRIzSScn/wCtVRQ4gCFTK8UiZXGf4iaMFsAcCnlQce1G7GtXcY3/AB8c9smkdfMKsvY8ipGGc46mkUbVosHLpqOpknC/jT6jdtxwKZRC/wA2c/w9KcIGC5VyCfSlkGTjvgCpF4Y88AVNtTNK7dyEB1B3DkdyaZ52OFGSe9Ss4d9v6UqqoyxAAA5p2sUopAGCLuYcnoKjkd2YBhj0WpIgZJC5HsoqfylR97/fHQelLVid5Ijl8wqsQ4I+8ff0quiYuAp7GrdRuFRvMPBxTaBxvqMl/eKQPwpN7oqqB0HNJbhmZnPI7VN5aj7zcnk80SY5PsSGMZ+YqPxz/KorxOFYc8cn1qSo5pYxH5Tn53z5ajqxAzgD8Kb1QSV0VFkWJt0pCxgfMxPQd6DIJ7VljMsaMeGztLj1GOgqKW2WSdXl3ME6IT8oPrjufr0p7nis7mBZWMSW4kjGHU846Hr+vFSIGLbn49AO1Q2DkSFOzcY9atVS11NopPUjdfmz/e4/w/z71HsDwt5fIX5gM8j1H+fSrDxsbdpAMhSD+RBNU2DRSZBwQetYfDVa7ouprC41W2sDjOKsQyF5yT/dOBSeWkkXmMfLY9ux/wAKW2ikE2egx94HgfiK2V0zFXTsWfuJj+Jv0FQu2MZ6d6kc7nJHrxmoZVPlsTyatmz0RFGd9xub61cTjLf3Rx9apxQkuCegq43yqF/E/WlEiF7EUvKY9SBTwMkCmSgmM469RToGcoXYYxwPr60dSupK7BAAdqgcDuTUbTjOQWY9ieMUybhhzxioyrhd/wD47Q2yG3eyCpYjuiIBztPI9M0rIjxjHQio4Y3imyPmU8H3pJWYJNMsL8yle/UUONgCd+poZghKp2P3u5pArNz+pqzQkjAdSWHbBP0qSLYPlVt2Pwz/AJzULyHGxOFH6+9MRtrZ7d6dwGTNun+fvT1XNNuyhyQwPcY7Ukb7owR361HUlb2FdFJwRmkSJQu0fnTuppd6K20sM/WmPQiAAU+uKqrJ+/OeAeKssmVJHSoEQD52rNmT0ZPIoRVY1WZtxpJJS7YFPiTAy1D1ZMndgIyevFIu0H5qV3zwOlR5GcUhFqL5mLdhwKlPKn6VTjmdCR/DT23ydWIHarTSRqpJIib5WI649KdFL5b9Dg9acUCgknmo6gy2dy2AS2G68M39BUlQx7iq54YjCn19j/jUqncuRWdB2vF79TtnrZrYWoZ48ruHUdfepqK6XqZNXVihSqpdgB1oONxx0zxU8MRBDn04FZJXZhFXYLbf3m/KnC3Qep/Gptjbd2OKStLI25UPtikT+Wwwkg2txVGaIwTPG3VTj61bpb9POgjuR94fI/8AQ0SV0TOOhn09U+RiehQ8fQimVNGcoOPbHsOf51y1tY8vVjofFfsNmQJJ8vQjNLA5D7exqNmLMSepqzBDsxI/3+qr6e5rdavQzWstCdvkXb36n/CqLNuzvzuq1I+xcnr2qo2WG8kc1UmVUfQbRRRWZkFRTS+WPc09mwPeqtx2qHUXOogTK29QR3qRVx9abEAowO1SVoMFfEy8Z55q/WVGzfa+c7e1atXE1p7CEhQSeg60wZLHK5PU5YgL6DHrSydV7jOSPoCf50zzRHgEZJ5J96wn78+V7I3uoRuOVghJ2gY+8vYD+8KtgSiQEqcDnHUYqq3Kh4+WHT39qXzPKj2NkITlSemPT/PtTg/ZS5JbdP8AIb95XQsjFVZiORzihIjuxkYjUKWPrRuZwDJkLnKqerEfyp6lfs4JOWkO/IH4VKkqlVNbIduWOvUkJjdBuLZUY3AdRTJLYS28gSVcMjLlh049PxoTGxx3xx+dV57xoGt4V2/vXIYn+6AT/PA/GuwyNIRgZALHJwMAHFIBB5hLnLEAgNxiqTXSyMMtjA47ClznnrRzIS1JpPILnbuUeo5FN8oN/q5FP14qOnIQM54yMA0hk4hJffwSOSqkE5pjNhDuU5zj5utI+3y8ggk4HFIs5BVZCGUnGG5xTAc0aZJU4Xs3UGmSqVx0PHUdDUhHkyNujzGx4/8A101pCzfL078cflQBCzBRk1WLFmOTxnIrQu7ZUhYg8gcis2uas2nYymxUYxvuQ/UHuPSmL/ooRFOLZmCRMf8Alix4EZ/2SeFPr8vpl1PGDBIroskb/I6OMqykHII7g1lGb2ZVKpyuz2Y5H3Eqwww7U+quGikSJ3Zw3EEzHLNgf6tj/eA6H+ID1Bp/nMBg8mumNS2kjd+6U7mNre83RDkkyxj1b+JfxHP1ye1asEitbrOhyHGU/wAar3MJnt8LgSL8yH0Yf5x+NV9PmG5o+Qr/ALyMH+Hn5l/AnP4muaH7iu49Jfn/AF+h0y/eUr9V/X9fMvEbs55z1zSLGWYIuGXPRj0980tTBSqhB99+vsK7J04zXvHOpNbFVYsMSpJUHO0jkH2NT+cODP1zhUAwP/rUS7WAQcqvQ+p9aYiO7BCPMB9eorm9nUou8NUac0ZbkqO7TqR1z+Qp0sZaQlOv93oahANurhct2652jvTkmO0YIZfQ8iuinUU1puRKLQ0gg4PBpKsqVljO7jsN3OD9aaYVi5mOfRR3rUkSOI+YvK9QSM1DcNlypOFUAMR3PoKc905kyGwqnn0+nvTYYt7bnG1F6D0/+vXNOTm+SHzZokkuZixJtAlkAGOI07CpI03kvIflHU+tHM0mOgA/IUksm7Cpwi9BW0IKCsiG23djy/nEqQB/c9vamkYlA6FFz+OM1GBlgPU1YJEgkZR8wGOO4zVCK1vHmZSeOc1I7MkrbWIyc8d6I+A7ei4/OlKmSNWBGcbcE0oxUVZDbuN81j12n6qKBK46YH0UUjKy/eBFNqhEvnyf3v0pPPl/vmo6KAJVmLfLKcqevtTDDIZMDhB1bPB/Gq7TFzth/wC+v8Kci+VEcnPei9ib3JlEMJ+RQzn+I/55qjNIZLklmLc8ZNTLJvlBPAAquoIYk8VyVm52SJb00LUKlVORirU6MGz2AA61UScH7/HvVx2G4bjw6DmuiNraFq1iEAk4AyaVkZPvAilMiQqQJAWb0zwKihuMuyO2EYcZ7Gm5JBdEinEo9mFI3DH607y9xzEwc/xYPQ06ZSG3f3uuPXvTAhZQwwaUAKMDpRUczbU46mk7LUNtRlwwOFHY80kIy4+tRHt9amtx8xrFPmkRuyemSnEZp9RynG3P96tpbFvYei7UApsxxGeafUM4PB7UpaRE9gt+Nx9sCkfLvtHAohzg/Uf1pzybWxjNZdAVuXUaQqcByD3qDO/UiSci3tf/AB6V/wCe2I/99VMSZnVVHPQVDByk84wVuLhmQg5zGgEakex2s3/AqRSfLCUvK33/APAuPooopHCFKdrx+XMnmR5DbSSCpHRgRyCPUc0lFMak4u6GbLhP9W4vE/uSkRzD6P8Acf6EKf8AaNEcscsxhQss4GTBKuyQD12nqPcZHvT6JAk8IiuY0njByFkGdp9R3B9xg0HSq0ZfxF81/lt+QlPjQMTnt2qJcxzfZy7yRvH5kDSNuYbTh0LHk4yrAnJIJ9KerFTkUtmVKKi11RdQb4yg6jlf61HTYpiZBtB3Z4xU0q4IYDAbnHofStN0WmnsRn7pqBVw3JzUsjbVqFeMsalkzJIucn3omXOCOucURYWPJP1qG4uTb2810F3eShdV/vMB8o/E4H40dAS5rRW7JNPG9ry56iSbyUP+xF8v/ofmH8auVBa2v2C1htmfcYY1jLf3iByfqTk/jU7fKuTwKtaIdSSlNtbfotiKY8HnjFQR7i21WIzSM5kYnt1FSWw/eE+gqb3Zyt80hqKFm2vg9qm8hM9D+dEkOW3J97r9aYZT54xkDOCDRtuOyjoydBsAwenTNPcdGUcH9Pam05OflPRunsas1JZFEtim7+FiprNl4+X0rTm/cwrCPvH5n+tUbiPem4cEUpoiSuiBWIwO2elWWCy5XuOahjXC57mpInXe2Tg9qlER7ERhKnk8etKibec5q1UMxCYIFDVhyilqMjm2yENwD+lWaok5OaUO6HAYihSsKM7EjFfMckYwe9WohuhPoFyfWqTEyNkDtzT45nVlXIGD19KE1cItJkohVuqnJ7Zpt1CQwI5OMEZqY3AB4I3ew5pF+Y7j6cCm7WKaVrFe3fy5NrDhjz6ip7iIBVZsMozg+vP/ANeqsp/fEj1q1FIZIQJFDDPeiL6Ci+hUwCpOefSrMBf7OQrEAnnB6f5/pTZo49mU44yKW1jAUu54wRgHGaVrMVrMkiaMptHQHqKSZMZBfbjvTI4w0+VOFX5jjvROwx8/OT09aq+had1qVsAzYU7l7mpE3xyFY+QecGmvdw21tPczjbBbxtJI56Kqgk/yqnp+uxSaI2oarE2nzRy+RPb8yMkmRtQBQSxYMpAAz81KyEo9jUUOc79uPQVBgSy43YA6e9MsNX07UJhBZ3LNKzOmx4XRgyBS4IYDBG9evr7Gq6a3pMUcEjXTMtwqukiwSFVVjhS5C4QE8AtihlOL2NEQgckDjniopZyOF4+lUvEep32k6PLfWlrbzxwKWlWaZkbqAMYUg9ao6xq1zo2mzzXcFn9qitnnEccsjghXVe6jj5uec5xwecD8hNN/CbsL4BySacG3XAz2HAqgmsWMu0WsnzfaUt3juI5InQtkj5SueR0JAB9afZajY3d69tbTs86qX+aF0DqCAWRmADgEgEqSOR60IUVI0qrM/mTqB0Bp9xv28fd71HCvzBvehvWwSeti1UhKlV3jt94dajp3/LMexqzQZNMrbl6Y6D2qFFMmecL0+tNlDPJ90gDjOKdGTGwUcgms93qZXvLUm4UegFPDCQcnDevr9ahYlmwKEBDc1ZqPeEv3H5imJbFRhVJyeSKkpDJsOe45oYntqLnIO3r/ACqIzoo2jJC8cd/egSGZiz7QufugcE1WuWRm+UYYHB96jYz1Sui7HMsyhRhCvYnr75p6hFBbKsx6DORWYMmPjrUsMhjwCcr6U1LuCn3L6ktlWOc8gn1plIrBhlTkVISr8tkN375qjUZRTivBIKkD3xULuCmAygn3z/KgTdgaZVYg9RUXzmMuDj2AqRLePB3PuIGTgHFK6/u9qDAP6VOpHvPciTcse7qT0FRhpX6DApXkzOAp+UcCp0Xd16VS0LSsrEMcW05PJqz5XyjzDtTqfelCgdKZeA7Rg9AOPwoewPYkSaIHCklsYHNGaoJKFcHp/SpTKuOMmpUiYyutSZ5kTqeagG65k54UU9fmwVHJ7kUrkhCGOPoKfMhuSJGYRIuBxVZpWZiRxUseZISrDoODUZiYelQzOV3qTLcRvO8KNl0GWwOF9ifX2ptvarAxkZjJM33pW6n2HoPanQpHBEscKMFXoNp/r3qlr1xNBoV5JbM0Uqxkq4HOfQe56Dg8kcHpR7WF7XOjll2L09vumZgQMnOKjFse7fpUFxougWU1nY3TXwW8OxLUzTPG7Yyd5BIGcHgkAnPWql3YaTNpWrS6bLqU9xpivsR5ph5UgXcCm773bn5gRkc9K29mZcsS8ytEwPQ9iKljuiG/fDzB+RqIM8lrb5kWZjGCZEGA5x1A9DSGNwMlTWWqehm7xehp/ehBhJKnnkcgf5z+VUmRWIVun3T/AEpLe6aP5Qflz6ZxU0uHPmIMlhzj1HI/rWVVpxU10/pnTTd/dfUYU3sMj5FGAPWpwoiTavBbr7U2NlyrDleDRKHDEdz3roXci1hpb5gB+NI5z8oowV4UZJ708IsQzJy3pS3B66CwrtGW6Lz9TSE5OTSGbdxzjsBTTIq9evpT2DRIfUnRAo78tUFrGzOQeQTk+1K8xJOBgnrSvpcXMrXHSQh+nFNVSFwxzUaI0h+Rmx7VYCbf9Zx7dzQtdQjZ6karsGB0zwPSndKcZG7HaPQUbyR8wDfWmUKfnUn+IdfekkJMhJOec0quFIJUfgajuCS26LPHGD3FN7C2HZG33pKieX92eCGPFRoCFGSfpU3FzXehI8AkPBwTTRA0ZOT+VTg9CKbPJiPPvSaW4pRW5HvbGMmopDhhjqKhlnA5NNWZW/rUGLdy8GwuKrSHGQDwKZ5pHTP50Bs8EUXG3cWFMtk9KfI4/AUwttFIFMlAhQc9KckZY5NPWLGMmiRiuAOKAAsE4XrSGQkcDFMqnNq9hb3jW00sgaN1jkkFu5ijdsbVaQDaD8w6njI9aAV3sXM0IN0gDcLTzDIOqGliiYyKJEIBPenZgtyyy7kI9uD6UiNlj2yA2PTP/wBfNZ8GvafLeC1Q3CEzvbJI9s6xPIjFSofG3OVYdecVoiJ1YfKcBiPwPP8AOonpOMl6HZH4WmKzBVJPQVE8yGMgHJI9KSaQGZrVWBmVBI0Y6hSSAfzB/Kq1w62ccb3KyBZJo4F2gH5nYKOp6ZPNau/Qwk3eyFq/bjCjzCDtxkegPQ1V+zSltoQ9etX4Y2SFV27nA6nuO4ogncmF7kpO1sHnPb1H+fwqu6bG9QehpxmVbiG2KSsZgzKVQlVC9dx7ckADv/KZY/O+QnAHIPp/n2rTc2KyqXYKoyT2qyY0jgeJyXL4DBe3/wBekaZYPktx9XPU03GACgBGPlGfzNAihLbi3V2lcbVBJI6Y+tUrXXdIkiLrqVsFjXnfIEx74OOD696seJIkfw3cwOjF5wkMK5xmR2Cpz6biuRzU8F/cX+pNs0q2ns7W5NrJO0gEiFVyzhSMbQ3y4DZ7+1R7FOSl2GmoqyM9Nd0dy0kd9b7l5CO23A/vYOOPQ9D1p9jqtverLJaTpcYbDMDnB6/rmmDxWupeGNQ1eHSre4fTy0yxyzDDQbPMSTO04JQj5ccNkZ4zUmrReV4yEkij9/YgRFeOEf5wfX76Y/H3zUoWV0ZNW1RIzFzljmkoorEyCgnAyaM461E75bpxWVSaggAnJ5qKVTIvy9Qac33ge1KchflAzXNR1qXYx8fXnjilL9cU1Djr6c4p4CnpXaARJuYYOPmA/WrLSIpICb8HBbOCfxqKGNlcHPcYUd+atBQ28Y+Usf8AP51jKPPU5X2OqF407rci81NpJdjgHClefz6VFGGncnoPX0pZQokwnTvUkUvRQAoA/OtKdPlbu7mcp8+jLEEQVlQc5YUshZpXYOwycnv/ADpXuVh2onyllBLd+R61LAYymGwSTnnvW7jGS5WXF22IJLUtAXRi0hG4Z6kg8D9KS3lj2MjMB1ZMkDIIyKtSuEj2rkEjGMYwKq/ZhsAV9uTnYRkf561jOnKMlKmvI0Uk1aRJH5e0s0ijIIAzTGtYzdrK6g7UKrk54JGTx9BTpImSTy12nA5yMduarWtyklvvhbbHJ8wV+PxHsaXtpQf7yNkHIpbMlezU8oQM9Of8aiMEsRx1HoeKtGcjmRfkA5w2ePoRTy25mQ4IxlQe1axlCesWZSp2epSxJ/zzH50FpIuoBHtVxPvfdUcdQ3I/WmTRl8sMspXk/wCNXZis+4wMD0NRSEmZFHbmmeS8Z3Lz9KWNis26UYz61NyW76Mu27lXKliqkHOO3HWnIzRz7X5AOT/jTncSptiAyTz6mnugkXYh+dQAT6itCyO6lBjU5wOpFZz7TgoeD29KvSqk+VTcOO/TAqgy7Wwa56+xExtOH3CPcGm05fuv9P6iuVbmYhCPG8Uy74pBh1yR3yCCOQQeQRyCMimBmSYRTtvlCl0kwB56AgFiBwGBIDAccgjg4DqYB5uplf4ba3Cn/flIY/kqJ/33WlO70Omg204vbctg5GRWXOPJ1DC8fvY5B7bjtb/PvWoAAMDis1z9t1ILCP4kVSe4RtzH8zj608Z8MV1udmH3faxqxgcu33V/U+lOJKqWb77/AKCnEDdg8JH19zUTMXYseprvOYbUxLQW5ZR+8fp7D1psagnc/wB1evv7U5m3sSaT1Q0rkQjJUbiQ47g81GwCtlvlyfvr/UVMx7VGzY4xknoPWsKlOFubZ9y02tEWVkSKAYG5gc9O/rVWSRnbLkjPQfxH/Cpo4mWEfLwB2pZI0xvjGP71YwlUqe63b9RtRjqMjhEirtGGXouePrTnYABE+6O/qaXPkrgcOep9PanoizMG6Y+8tdcYqCsjNtt3YCNlt/lGWfrjsKgII6gj606Ry8hLcH09KBK46MfxqxBF/rAfTmlVike4cEt/L/8AXTkfKuWVTgdhihimxAQw4J45/wA9KAFk2+QGUY3nJFR9YT7N/n+VTyohVEMgUqOhFNWBtjBWVsjjBoAqiZkYj7y91PSpQFkUtH25KntSPaSY+VM/Q1IqC2UbgS559hWa5r6kq9yB3CLlj/8AXquzNMwXoD2/xpfmnl9FXgVOqhRgCqu+gviERAg4/OopZNzbR0/nUznahI9KrwnEg4zUS/lQPsKsLH73AqMjDEelXKqMcsT71MopITVhWQqAeoNXOfs8JPXbj9ahhOUwR071YPMC+zEVcF1KS6lGQYkbPrTalnxuHrioqykrMh7kkPD9cf1q2jBo3UEHGDVCp7Q/vWX+8p/xqoStoOL6EtRTgbQe+alqK5P7v3rSXwlvYrjnn1q3GmxffvVaL+H6irdRTXUmIjEhSRyQKpqzvy5yO2auO22Nj6CqSZ49KyrN88UEieOY5VW6dM0sr7vkXk96ji/1q5x17mrOIoR1DnPJzWibasC1QiLshx6moyUVyTyaln3BcqMqOB9Kpu6xRtLIGZVxhV+87E4VR7kkAfWk9NCtW1FBMDO/2YEp5ibpnU4McPI4PZmPyj/gR/hqRm3HhVRQAFVRgKB0AHoKaqNDGyylWnkbfOy9C2MbR/sqPlH0z1JopGVaafuR2X4vuFFFFI5wpxjbIA5J4FPRMcmpQpDIcZ+YED1pjSK7IygEjg9CORTaeGMUjAEMucEHoaXYJOYuvdD1/D1oAhmSSWDEC7p4WE0A/vOAcr/wJSy/jSq8cqJLA26KVQ6N6qRkU4EqwI4IORTIkEd5Jb4xHIDcwD2J/eKPo5z9JB6UHVTfPDl6rX5df8/vHkGNwQeeoNWknM8bqwAIAbj8qZgZB9KIeWlftjaP8/hVLRlWsxHUMvPFRuoVQV6GpWIC/N0oGGj9M9qHqNpMrjnikuk/c2kR6SXkOfcK+/8A9kp5UxuOfxpJn8zUNNX+7NJKcf7MLj+bipRVDSd+139yuSSHcCxO49z6U2SRm2qTkKo/Xn+tTuVCAKOCfSopYiERuvHX27VTWhxuLSuEKh+D0HXnrVhUVc7RjNU1Yq2R1q6CCAR0pxKp2FqC4GcEL9TV2OFTF5kr7FzgYGc0rQxPCzQFmK9Q3pVON0XJXVilDKX+VuoHWrtuoVTPJ91eg9TVWzh33TR9Bn9K0GETxrHFyAe+acdhRvbUqMzOxduSTyaaeR0z7VM0Y2AJ1JyQTUTKV60MorSSbE24+amRQMX3PwB0q0VDdRmopgXwidutRaxny21EkUsm1Mnmi5HyqfwpgWROAce1PWDcMk5z3JpXJbuQYOM44qRbdmGTgVIRtOKliG+MZ9OaSVwjFN6lXLKgx+dIo3N83/66knIjwB6c1BnPWkQyYBU9qbJcnoD+lRFST1wKlESqOTQBEH3H3qWOXapU8D1pjyIAQB+NRpKJM4o2BNp3RbZ0lQRgkNjAJ6H2p2GWBARt65GOtVsDbknnsKmQnywDnHpTvcq9ySDgyj1AP60y5TMZfJyBUkHLuo6svFSPEfLbPXHK96tK6NErxsZ2oaauraT9jaYxQSyRmbbkM8atuKAggjOMZ9Cayb/w59iWa80ya6ciWC5WKQyXbCZCVLne+5lKEAgHICjHpXRxLsjCin0WLV0jlNF0fVudUaeG0vXvLiULPattaKQIOU37lP7sEAnp168R3vgq4uNJisjqsLRR2kcB863ZtjISS6AOAC2QDkHoK6+mSAFeRnHaiyHdlDWLIazol5YLN5RuF2hyudvzA9Pwqt4h0MayspF2LfzLV7YZj3Y3SI+7r/sdPetQKqdR15xUcu53Hc9gO1JvQzcuVWMuLRJrjU2v7y8ikuWuIJGMUDIgji3bVwWJyS7HOfQdqh07w3NYazFqF1qEdw8MM0WRCwllEhU7nYuckbccAD+VbCsyE4OD3pCxYkk5Jqb6Ee0drDkG7qeB2qZThhUMZIbGOtTYxJg/w8mhCiTU5uFVfbJ/H/IpqEBctyT0HYUEknJ61qbh0BJ7VFGmTu9sCnSvtUgfU01PmUYOF6VPUnRyHoCAc06kAI6nNIXAOKZQwEs4qnc3BDYXkseBV2R/KjyoqMwx3ADkYOaTVyZJsp+eYoyrHLHniq2ySXLYLe9XLi1+dj09DnpTrfEcJ44BqetjO13YpK7wnHb0qaOYvz0I7U+QLuIA464ptSQOWbyW3c4PWp1vGePIXHoahVMjPWpVZSgUJ+VNMuMrCs7gA8EEelIbhtuMVOiFlHG2kktt5yDg/StDYLaUEneWHGDt70t35rScEYI7H/GnRRCIg9cHJ461L5StyGye+44NMCtHDgdOfWrCr0UUMVjHzfMewU9KaZG2/Kqrx1pAK8scecDd7k4FQTSsxyOp6e1RyEBfvZx1NLbAuzf3fSp5tSOfWwQwmRizcAnmrBREHSn8IvoBUEkmcHovYk1JFhZHAX5RgVG2I48tyx6DPSomkJbIqSCIytufmqSLjHqx8ZIi+bq1LnPWpCgPJOB2qEuAcUnuRJ6mg0EeSdp244BYntWfq9m02l5toQ8sE0U4UjG/y5FfbknqdpH41a3HbtycelQmdAccn8Kq0FrY2cu7GXetaJqcthjWbS3lguVm8ieQRyEhWG0oxDA/N3FRLrmk2t3qVxZalbalcXbKY7S1kEjkqgXB2k4BI6nAHenXDpcRNE8avE4wyuoIYehBpodgAASAOABVe1Rm5obpVg1hpFlauUZ7eBImYA8lVAJ6+1Wih5yFA98n9KII3VsueCOeaJ5QDtXtXM6NN6tGvtZJXA/dzuLAd8fdpwO4YJw3Xj+YqqsjKSVOM9acrvjhNyjsO30qHHk1gtOqCNVS0luTxDLHkKSP1HWpWByuf7uAPxqsJON4JK8ZYHBB/pUiO5b5zuzjB7j2IpUK0YrkfyNZwb94sAY5PRf1NQOeST8zH1qSZ9i464/U1GoI+aTg+9dj7GDfRFVgQ/JyTUsSZcKnzE9ajl2iQ7eRVqJQtuhUY3Dk+vNZpXZjFXdibhV2r90d/WmNCHO58oO59aVRxuboO3qaaTkkk1ob2FLALtQbU9KYzbR7ngUO4RcmqjuXbJ//AFUm7ESlylwDA5OaX6VTEsg4DH+dL5jhvmJ+nSlzIXtEWHdkxxk+1ORtyhhxVR5eOOpqZiU+UsAR23AYoTuOMrsRwTOxPTtSBlJwCD9DTJifKbgnnBPoaakJRlI+Y9GUDlaL2YXs7IkNwU+Xbg9iTRuNxFsB+fPGO9LKyIuxxuLfexyVH+f5VCpiVwyiQcfdPf8AGk9yW9dytPG6Lhwc5zyMcUkagR/XrVuIbsRN8ysePY+1R7OakzGYwuf0pUHzZpOrYHSpPurSAj8wGTB7VMrbelRog6kUuSfu0wJN7etNJyeaKQtigQtYt/b3yapNNpdndQzyzoxmjnRrWdBtBMqMchtoIO1c8DBNbG/I4HNLGPNmVWHBNCKi7HHXWi6tcapdTQ6a0TzR3sU0iCMLMro3lDfuLvk7T82Ap4AA4rpNK0pdH1eV7O1jt7aWzgV9mAHmVn3EgdWwRlup9eKzbXxSk3gf+3zZbbjAT7F5nWRsFBux0KsrZ7A1o/2vue2EUUH76a2R1JZmQSoWPYDPpgn3xVI2fOZNppd8uqxFbTUFki1ee5aSadTaiJppG3KhY/MVcYwoIJz61Rfw9rMzXpXSpLdrqxuYbnZ5arLIWQx/MHLv0bDPzz2yRXVWGt6TeSboL3K+U0yvLBJErov3mVmUBtvfBOO9WW8Q6ZLbyzNcSKkTpG8UltKsm5/uhYyu5t3bAOe1HLdFRct2Yup+G/L1G+Gh6ZFbGfTfJimgVI9sisxZSw5UsrABh/Skh0ac3Jk03SG0ux+0WTC0JjX5o5S0km1WIHylRnq236Z6e1eDULVbm0nEsBYqPNjKspBIKkEBlYEEEEZrAi8Sm58P6tqFvaCKSyQywLLIWE0LDMUvBHDAHj2NQnNfFE0sujMo+HtQNq8cWmNFfiC6W8vt6Yv98bqi5DbmyzIw3AbduOKmufBqNp1+tvpEXnNoqiAKq/8AH6A/zj/pp935+vvXQR61YyS6kJVngXT7hbdy9tKxkZkRgEXGWPz4wMnoehBKSeItKit45o7hhFcFwqLayvIdhw+5Au5dp67gMZ5ovL+X8UFl3MSLQNS/4TD7ZfLOzfakmS7jjiOyMIoMZctvUZDAoAQc57nHbo8YgmYuW6A9vwqnFMjIjRskkMke9WToynBBH1zTiW6LgD0xUxqzu0o/iDirXuSefAWJ2rxydz037TG2c7eRgbW6UbG4HmEcZJwOB+VNOSxw7Y7dKvmq9kK0e4zU4o9QsTBHMIpNyyxuFLbXRw6kgdQCo4rGuY4biSV9Q8Pal5lxu81LO9TyWcpsLhWkQ7tvfaPXrzW8wUMVYNweocg1HMvlyYiXLE7QSc01KtfW1vmS+RLqYwn0llvYrTwvqEcd7bG1uEhSGAMg3cYMi8jc3zD14JqxO1zqGqJqF3ELYRxNFBBvDMAxUszEcZO1eBnGOvPFpUAugN27jOfXj/69RbiQAe1L20pScTKXwXEprNinUhGetTK9vdMSMknrSU5lIqEk59DXnyUr+8Mc57CpVVSoHpTbaIOxeT7icn39BVnzEY/vIV68bDjH+NXRk03ZXNFTTjdu1yPGOlOiQSzAEkYGRx19qUNEBjyifq5pHUDDJ91hkA9q3lNy91aXKjBR9697DzLtyEUq2MbmPP5dqYHYLgMQKdIxMcYfl8ZJPXHaoicdadD4ebqOtJ81ri0qczIB70g56U6NWibeVPB71ujBblm8j4Rx2QA1XSVk6Hj0qxcy77aJlHDAqfYg/wD1xVSqlvoVJ63RdRw65H/6qtwMow7HhB0I71lwPtkx2PFX4nZdyqxUt0x61cWaxd0SytIylthwTgcdv/r1AESO3SJIxGqnGOwAHSql2WluLaM85k8xs+ijI/8AHttXhNuGJRvHr3H41RRHOg8/coBwApGOoxTInO0lQrqRhTn+dWJRiQSryrHIPp7VCyozA+WOPUZzXNOlLn54OzLUla0hQ7Lk+Up47MafFIjvnBV1HCk4z/n8aQQxM3yxpg+h5FQsmEG4lkJPXquO9S3Wpq71Q/clpsWX9ChbA5OMGoJVB+XnDD8qkhk3HZKMsDuBH8Q9qfNEWPXJxyM+nFdEZKceZENNOzKsTrsAzyOOtWIJM3OASX2k49eKpywD7ydu1FscSE55xxQm07Gd2nZll5mSNsAZPBOKqMxY5NXg63W5D/rQOD/e9qoshQ81jWvv0JncSgHAPuMUlBIVGchyFGSEQsT9AOtcyv0IHxp5kir0ycZ9Kh01vOtmu/8An8ka4/4C2An5RqgqrNqFrPpswhlmWSbzLZALdzIGxh2C4z8oJOfUYqyup6cvmrHcLthjSQKik/u24Uj17V00ly6s66a5ab7t/l/X4C39x5cZjVtrMpLMP4F7n69h70thbeTF5jLtdwAF/uKOi/571Ws1S/v5D+8by3bczQsELK23aGPB2nP1PNWzqNktpJcm4/cxSeW7eW3DYzjGMnr1qacXUqOtPpt/mdE5KMOSPzLglyu2T5l7c8igxE8x/OP1FMYbWI9DT41f7ynaB/ETiu0wIrify2Eachep9TTIC+4sTwe3rVp1hm4Y4b+9jANRSo8XGB9ewHrWUvd96T0Ek2xruc4UZY9vSlgiaZ8IeD96T1+n+f8AGkt42aQMpKgcknv7n/CrpOICYhjPQf1rJQdX3p7djW/LoiB5NpCxfKi8DBpYi0WC7D5s4z6U1FCLvcZ/ur602Ql8MPmcHIH9K0qRurrdbExeuoMG3kHls/nUpXBWBPvMRuPvSJIsUajPzAYUEdP/ANVEZKq8ufm6KT61cJKUboTVnY4u3vPEPivU5Z9OkuYdJhZ41FpOkcmQpK5yQSSdvXjmtHwvqd9Lf3mj6+Aby0USCTcpYqSBhiuQT8y/nzVZ7P8Asa1ms7KxaeGa5FwT/aK27IR0UblwVHqCc+3StLTrNTqt3q7Q+Tc3qgSIsvmKoHYNtGc4B7gY6nPGcVK/maSasbvlKYyEY8n60jQkyKMjAwOajxkRr68/r/8AWqWFi9yeTjk4zW5kNuSnmMWfGOuRTYWQxyFHV/l7VHKBIWz0Y0W0IijmKk8qBzSAASOhI+lSrNkbZvmX17ioc46015AnXk0NpCJXhEXKco3QimUtrKZleFuv3lpKSaa0BDJf9Uabaxs7HaCTTpjiM+9SjKQog4BUE475qbXkLqDRuo+ZSBVZ4CD8vIqyrsv3WI+hp3mk/fVW+oqnFPcbVyJV2qAKlf5Y1Tv941JEsMh6EEc7c9arl/MdifWnsBXn/wBZ+FR052zvchyFGcIhYn6AVXh1GyZPM3TN87RiMW7lyV+98oGcDufXjrXO9WZ7smqxZkeaFI5J61Ta/snkkC3SsUjSU7VJyjfdI9R0qdJYFluYFnHn2yh5Rg/ICMj68fzFNXTGk0y1TJE8xcU0X1rOltJFKW+1Z8tVjYk4OCcY4AyMk9M1KRg4rbSSL3KZBRsdxVpW3KD61UfImYVYhO2IlugNZwdnYmO4spURNuxjFU071NI4ndFUHAPJxUYGyRkPY1zzkpVE+gpakqKrHHUClaMhGwMjI/DrT0AVeOfejzQrcHn2ray6lcqtqNgLMCoPTnH+frUKESTmcf6qBmSD/af7ryfhyi/8CPpV5Sp+7hSTk+9Z1lhbDB5K3N0o/C4kxRsW7wpOS32++/8AkSUUoBY4FSLHhsnmkcAnlfL705UCj1p1PRedzcKOpNMqw0AnoKWZ2jXapxwOn0p7XCxrhBj+dVZJTI2TRsN6DKKTd82Kbv59qkgmMiv/AK7hv74/rTLpJRCHiUyTWzefEqnPmAAh0H+8u4D/AGgp7VExy1TRyMpRlblentTNKc3CSkPeRZFQwOHSRQ6MOjKRkH8qnVfLt0XuxLH+VVbNFhuJLQDCD99B7RMeV/4C2R9CtW7gsWG0YO0fhxVLudkopSutunoQbTNcCMdP5Va3q25Mqq4wpI6UxVEMP+1J39qhkVm6Hj0o2J21JQ0DkrhiB/Ef8KrlP+J5EqkERWcrZHq7xgH8lanY8s5HI70llIf7YvZV/hhghAP/AG0c/o60buzNIaKT7L89P1JxGc81LIQHI7A4FS7FlYNGVUk8qTjH0pv2eSRyoQ5z3rSxzlFoz5+3pnkVbtbRzklgIx1Y9qm+zwxOHncMw/hXmmy3BfqNsa9FFJRS1ZCik7izTRiMRR8IDnJ6k1WivfJnyFJXofcVFJudiwP4VB061Dk7kOb6GrHNbKHeAPvYY+YDiq24s5C4AHU1Vt5QrsW9OKlt2Jds9+armuUpbFxH4Ib8Mk06UZC7Mbe3PXt/SoakHMWCM84HOMVRoMKlfvAj6imEbIyVIBz1NPKsOSpA+lVZ8tIAAeKl6EydlcllxuGOeKenCc1AAVTnmozI2fQelQzLm1uTE5YmpVIRev15qoZsDnrURmY0gvYlmYPIT2plMD5ODT41JfB7mgkKa5bNTyfLgdwaUqGALcUAV1iJ/wDrVNFCEBJwO9NJ2nCnik+YjjNAAzAtkcVLCpkyS3HtUBhbqamtAQ5XqCKa3HG19SVoh97cwx6VNA37tyxJI747f402SKTP3T9MUOfLz/dU8Ad/etLWN7JD3ABG3oRkU2oxdxsAjZUjocVJjpjkHoR3o3BNMKKkGxGIbkjvjgGhpTjAOR6sP6dqYyuIgSWflj+lAjEakry2OppzTdkVR74zn86cXYR87c/7opWQrIqFBu5ahIw0oAOR1NPy24nIVcduKfbkbS0ij/eXj/61RbUy5dR/lF5Q4HQc0rBRnLKCe/X+VNmlLYVRhQeg/nUeKs2sTnbxsHAGBmis83jpOU4CnpVmKVnG5uAO/ai9xJpj3A3Z2A+5FNA9EX6gUv2iLGS4H1NM+2wbsb+fpS0D3SVchvmPagKr/N61XkmBl3KRjGKPtDkYDAfSlzEc6uTvHkccj0pwwqDsAKri4YKAAOPWkkd2j+YjFHMh86FeZWkwpUjvmkZwOE/Oq8SYZj6mrEcO9SScCldsjmctERFN2SB+IqFyUdQRweuKvBlRdqnHrk03Ecg5AJP50co+RhCwMeVGM9ak2qVz91h3qCVGDYCnb2AFIZG2bSDnuTVGllazJBcsGwQpHqDUol3DIwRVIDNSxP8AMVIIyeKNhXs7FkOSen5UBhI2FfBHUcVGzlGAIIB70hg3nI4PqDQN+QSyMjYyDjviqslx82PmdvbnFEsDByPMb8DUtvbBeg+p9agwd2xio7gZGParsCBIzTDgdOlDsRGR2pAtCOSTcxJ6A9PWo38x2ywP5VNHgoNvNSHG0ADmtFsbRVkV44cjdJwBU3nqq7VBFOkGItvfrSmFSuCOfWh36Cd27IrPIxHFNpwjYlgATtBJA6mg2d1Nh3uWtsjiKJVIX6kg5P6VFjJRb1LtNZQ64NOorQ6CD7Nx97n6UwxFGBBBNTTEhPl4JOM+lMAJ6VDsjKSS0RLG244bg05lweeaY0eF46igTMBg4P1pp9ylLuPxTJXEUZJKjA7nAFRi4PmHcBj8qyfFcTS+HyvlRTs97ZgQynCPm6i+Vjg4B6Hg/Q0X7D5r6I0UV8CSLkHoynINTGN93mcKGGw4z17GuYmim8O293ef6HpAvpYIFisGUxxMN+XLyKqKWyASUPCqME1QbxVqEmiW076rFAFa7SSSNod9x5Um1GBdfLcY6qpQnIIIHFYVKMJavc1puUNOh3BBba7/ACgdj61WldicueO3pXOz6hc2d9q8y6m+9/sbETRoPs8TkK8oTGQFBPUkDvnFLb6nfXmqQafZ6w09q18Yvt8cMLNMggLlc7dhIYYyB7dQau7+0RKClszpY4VdRuYqWGRkcVeXattt5Kg4/Tr+f864S08SaxPe3hkuba3Ma3W61maNvs3lhvLIjVfN4wuckgg5AGRW34P1O41OO7juL9rtoCn70GJlG4ZIEkWARx0KgjvnIrSLj0Fycpuuf3e7oi+9VGnJ6CrMmZC5PzZ456AHv/Kq7W391vzod+hEuboRO5c/NSrExXc2EX1bv/jUsVvht0w+RffqfSql1MfMduoz0FTbqzOz3ZdHkwrxlj3PSqtxfQswCxs2O+7/AOtUTM1wg3cfSgWydMZNNy6FOStZCC53N+6TY397dkj6UVMlsAegH4U/yB/kVJALdOSMAA854+8fcUnlluTjJ9akjjVW5qQfM3y4G2nqx2bIBEfYfSgxHsRUx3MxypqCSRkODwfalYLDhGFUs56cADuaZPN5h57DHXJ/E0shKwqG4Yktj2OKhRSzUCHBQvNG0ydKl8tqkVQowKAIxD8uCaVofLXk/SpKZJllyPujqaB2IRl87e360AhhUdvJi72k8HirN1AY9rgEZ68frTtpcfLpciAA6VJEwSVWPQGo1bIpQcEEjPtSIMOHwYn2WCL7cQkemC0KiM7XnWIxLPjPZGYY+npWlD4c2XET/a1OyW1fHlnnyUK46981feYtgL8oo8zC/eLfWqukb+0OZ0Tw/qL6BYrqV79ie2tZ47ZYYGSaF5AV3sS3JUdMAdc9qsWnhGXbfu1zYs94tuNn2NjGPKLn5gzljnf94EEEV0Kxs7Zl4Hp61aQL5e0MF55z6U0ilKTM2HSrv/hF59I/tFjPMkifaiGPlByeF3MT8oOFyT0H0qjeeDbaJZodNu54Fnsms5UnmluBtyDGV3scbfm4HHzmujQAjcciJT+LGm+dlyWUHJJA9KuyHdmPqGg3dxJqYg1CONL+6iuQrRNyVjRGRiGG5GEa9MdT1HFZQ8ITQab5KX1oJBcTzhjauoTzCPuFXDoRjHDYOee1dHLePvOzA5645qONt8w8wk/X1qG02T7TWyHRoY4o4XleZo1SMyv95yBksfc4FW403v0yByarxspYFmCnGQD3yf8AACnG4AkEcZ+U/eb1/wDrVlRaac+7NJtJ2LDgtwvIJyWHc0/nHXKZ+owOn51WMgTq2KUHI4rouSNmXzVPrnIquZ28rYevTd3x6VaqpMu2U+/NRLuZzXVDs7JElwSu3nH0xTGiIUshEiD+IdvqKktpSrFMZVuoPSpZgMqYW2P6E/5H51hKm788HqVFxcLSKdFWJIs/61PJb+8PutUMiNE2HGPQ9jSjUTdpaMiVJrVaobTWjVhTqKtpPcyHMNkMSgfKRuz6n/61Np8WXhkDA+WAWDehqJDleaxo2ScexvWV7SFLAHFSq0bRr5jY2E5XH3hULLk56UpUHrWlSHOrEQnyMUv5rs54LGjFIo29KsC6jZcOPwxVxikrC+JtthbKOT37VZiVTMMnhTvb6DmoUmjIIT8sYqS3y0jE/wBxv5VrE1ilaxVknlmAEjlhnIBpDC4/h/KnSRGP5gw68VJHOCMPwan1Mkle0iDawwcEVbjfeoYUj/NGSvPHGKgS6S2hYum85AC+pJAH6mmlZ2LS5XYtHeZXLbdpIK4+gzn8c0VII4g0apxHtC8DHTipg0UR+XknjA5NXY0IY32Eq4JU8MKV7dlfaCDnlfcVjPf38Ul5MJLeeCJ0gRzCUHmtIFJ4Y5Vc89MnI4xSTa3e2lwLaZYrhILhluJI0K7o/LVyQMnBG7JHOce9K66jsaoODkdam3Kz59sYx90d/wCtc+/iUeZpu82+LgbpznHys+xCvPryfZTVq+1G5s9agtY40MJEQlYoSR5khTk5+Xpxwcn060cyCzNB08rBT5V4I/2Cf6VYik3jAGH/AIvf/P8AnpQDuVty5GSBk8fT6VXZJImBBKn+Fj1Psa5pJ0Jc6+F7mi99We5YlQFTjGQM9MVln93LlfwrThm83GBjHUehqKe3QoWPGDyPT6V0u0ldGEo3KcTn7SrA4Jar1yoEzDH144zWey+VKO+Oa0hKl2hVBgqPk9fpSj2Jh2ZRlj2HI6VFIJGt5Vt5RDMyEJIV3bD64q26lsVVkm+yQy3BTe0K5WPP33Jwi/ixA/GuacLSug5G5JR6lOC2nj8sW9xbRyWO+2QiBirbgpfOWyWBC8567hVE6PbzxxxWt0wf5Ehk2Z3KgAcn1U4/PHtWrJbGz0YI0rO42xtIDgsSw3v7ZJY07S1RpJsACVTt2dNiDp+B6/8A6qznKTqxpfM9FQioufRaL/Mbp2nHT7i4fzInWV5HBCsH+Zy3JJxxnHAFTvpxntNQhWXAvGZtxXhMqo59fu1cXylb5zuPrjgU2Xfxu5XtjpXoKKSscw5mjVyQN5z36VGzs5+Y5ptMZtw6kKemOrfT/GpnUUFdjjFsGfrtOAOren+JqW2yWAIOP4eeR7077MCq7cZH3QOh/wDr07BH7qPlj94/0rOMJSlzz+4ptJWQl9I0Nm8kEXmsCOASA2TjJIBwByelR6bdNqUCztF5AjOzaJVcEgDOGU4I7duhrK1GUXWpC3ht2laNTFH5qkL5hLfMroSyHKEZKj7p5Gc1vLlLSFZAy4Qbt2A2ccjjjPriugyvqLIFYFwodvfv9BUBmfoDtHooxSGRi+4cEdMdqVwGXenH94elBRAwwcMflJyG/umpnkUhY0/gHPHekVA7bT0PXPpUO9JG2qgyB8pJ61xzfsJcy2ZorT0e5JRQYJQAfLkHfKkNSLkOA2evQqRmr9uvtJoXJ2ZP0mH+wv8AIU624SRvQcVB5jHe+0HIOMHPerKK62bbQdxPTvWsKkZ/CS4tblapI/8AUS/QUm+UD5tw9mFTQkPERJjDHHAxViKE28jAHA5JqN5N6gHqOtW3UqxU9qr/AGc7uvFZyi+hDTEtX2XUZ98GrtxHslOOjciqqw7WznoeK0GHn2wI5YD9acE0tRxVimE8xgMZOeKluMCXC/wgCltv9dj1HFQux5bqetWMKKRWDLu/P2oVw2dpzii6AUv5fzDqDxUVxGYnJQ/I3I/GpGG5SD3pyqTb4c7th4+lTJNiauUXEjQSpBKIZWQqkpXdsPrimw6dPbpbNBcW8c1srxpiFihRtpOQWzuyoOc/zq3JGuwnGMelPXlBn0qYxs7MErGVJ4chNuI4rlldBGqSFedqgBgfUNj8wPSrNppf2XUxffbHeVnkMqlRtYPzgcZ42p1J4FXaCQBk8VfLFalGPcaJHNFBCZ0DRI8e9od2AzBty8/KwxwfetuUYlb68VTZt0matyvi2yeqnArGnJakplSbHmHH41MsYaJVbp1xUCDdIAe5q1VRSldsS11EwqLxgCq0vzyb16AelSzk9OMUqgeVx6VM/efL0Q99CDB2k9qnjTAGBzTIsKrM+dvAwPXr/SnvcEqduAD2ApKyFFpahLuVDwR+FQWaB7W5U8GO8nIP1fP/ALNTozmQA/xcH8aZaEq1+gXcwvHX84oz/Wncu/NSl8v6/ElDKgwOaVXLN7VFQDjpSOK5ZUZdQe5xUUk7P14HYDtTVchgeuDnmo2XIoC4nme1ALNTcH0p68JzSAOFHNR0rHJoAyQOlADlTd/SrTQoiqvAJP3iaSNEiOWbJ+tNkfzHHYdqrZF2SWpZu7RJljMUjQSwj93MqgkbhypB4KnA49hzmoftV7bD/S7YTIP+W9mpb84/vj/gO+rRfMYX0pT8igDg9TWljrjUsrNXX9f12KsdxFeIZraZZ4843I27B9D6H2NLUd3DbzzebJGRcAY8+JjHIB6bh1Hscj2quDcxt8rLfD/gMU39Ec/98VFyrwlpF/J/57fkW2IAyap2/W8f+/eMB9EjSP8Ampqa3mhurvyg5WUcm3lUxyAeu08ke4yPeq9i27TYX/57NLP/AN9yuw/Qik9RVFKFKV1bZfr+hbhkfzAM5B9a1XkMtpmM4K/6wevvWMrFGBHWtGylEyyxjh2XgZ6mrg+hyQl0YyoJJskqMAA/nT1kJkZGUqR2NQSxlGyTkGk3poOTutAV3ZsKBmpNgj6cnuaiik8ticZ4qbdKY92VIPalGwoWIo4Aznd39KtpbCLcA25h1GKhR9qMx7elTLIXl35K+vy9/wA6rQvS48x4x8w5GeQaCoEY3HuemD6Uqxs0gz84J6il5WM/Kox+PNUUIQqqMjcW9eCBSFFbGNpHucEU3cd24nJpT8sjd8GgBssLbuOvpUBHZqvEEqCeCByCKpMcsT71ElYykkV5I8Y5pBAfQj61aiRSqt1P1qYx5OXG1R0Zu9Ll0FyaXKIhKjjmkBKnitBkwo4yD044x+NRm33MPlPPQYpWYuUpkknmlkkG0frT5gqjK1W5dqRJLCd7cDvjmrQjPfiook2AY61OzMFG37x6CgpDVG6YKFHqeaVYGRjkZLHjbzUcZ2budzHGSOmPTPenSTSKnH3CfWrWiuWtFdkznMjemeMVGzYbriq5nlC/XvipITv+8dxp3uWpXEIj6yAflTonxMEg+bcM7ccVNGg8xmK5CjIFQT3LOSoIwepA60PTUmTsWQwmbB4k7j1NN9qgjMnll/MZcemOfr601N3LMck0XuNSuSp940O3YU0MVbNBOTTKK7Nljk9DU7OscKemRmqki4dsdM024l3w7fu/1rO5gna4+S/UMdiE89zUqTs+Bs/XpWYn3xxn2rSt2JUKE+lNPuVGWupXIBbJGT61Os2MZyQBwKcYQvXHHtUe0UloQmk9SrdcyBvWmJGX9h61fNuGxuA4ppUH/wCtQwk9Sk6kNtyWIqeGMqPmP4elPWIKxY8k1FPKR8o4pCJjKitgtzStKNnJ4qhSqpb7ozQBYE4DYB49alQjqcn0wap+WwIB4z05qzGf3Y7YGOaatcqKV9R/GeeB7CrMUWE3J19T2qKBd7Yx9TVmWQJhccd6bZbkN2s3G5j+NRSIYnxnNWg6kgA9RkVDcqcg9qGtBSjpcb5XAJNAjAPegSjHNRTXO1OKkjQnlkHc7sVAXDNwMVBEXmyT07VYjiweaBbj40J+b0qx92Ljv1pqNt4PQ009eOlBWwVBLLzj9PWnyybRgdaqFC8oYUElqAEfMG49jUnmKpz19hVcDAxTiCMZ70+axSnZaFmQedGCh/ColnZQQRk9s9qbE/lvnt3ourf7XtRMiNz+9YHHHp+P+NPfYrfVbkdpN5lwLgSkxFSAuMAnP3s9/atLbuweR9DVdrdNmI1C4HAHShJGVAAaew17ujIfNYuGY5watggjI6VSONxx0qSJmwRnj0qU7ExlbcsZV+DURbYDzxRSqNzY6UN3Bu43zMJnpntVea6CDGOaumIbTk54rIuf9d+FIl3JIrgtIMjjr1qYXTE5XGM9MZ6Gq0MeRk5BPvVyOADBNO/YaelkWIR5sZyMg8MpGQalPPDKpAO7BUdfX60iEKMIMjvTGmBcjv8AWrT0No7EsTlpWzjJUjJx+Waia1fbhfugfKAowKEyWJ7VJTeu4NXKuZIpfn43fKzY5I7c1ciCLbjO3djlVGBu6Gl2rOu2TrjnPcVV3HzGOCuDjd2P1H9a55XpT5t0y46rlb1LLMzdenoOlIq7j6Ack+lJ9o5IxgD+HPBFMaYsu1RtHf3reMlJXQmmtGRXVwd2EGFA4qukRfluakkYFto6jrSAsBx0FRJ3ZhN3ZIqKo7UgU+ZntURZi3PNG91+7SILFCyquehqJQ7j5jxSuoVeOtA7gJMv6D+VSxfeL9Fxj61VJwKIiHYh8kAE7QcZxTW4RepPJKqpkLvLMQOcAdP8armUjhVVfouf1NDzPI2WYkA8DPA+lMJJPrQ3cbk2BYsxLEknqT3qeAhWXPQ9aiWMsasrGAuMZpEmWNcY2cbfZQLx7/7B9m38Bw5y2cZx5YL/AEq7/amnmCKc3aJFMsjxu6sAVQZckkcYAPWoItEhTxUdZaclTF/x7beBNgIZc+uxQv51mTeFjdWosLzU4nsI4riKNY7crLiUHlmLEErnsBnFUa2iX5NftmWH7ETIWuooZkmgkR1R8/MFYA844OCDg4zSw+IbC50lbwrdRRtJJCsRtZXkJQkEhVXcRxknGB0PNVdO8NrAyM01qsi3MMrNBA67lj3YB3O3Pzn2FTS+HbwW0VmmoQGK3up5BHLbuUkSRtw3qHG5lJODnHsOtUti0o20HTzx2unrqUQ+2LMYltVjfCzGRgqfNjgHcDnsOavSaxNYW1w3ii1itbeIxBZ7eRpo23nYAPlDBgcAjGOQc9cVYdCaHwjZaL9sYvZRw+VcKnSSJgyttzyMqMjPIyM1n/2F5t9cXdxJYw3FxNaySfYrMxK/kziUs2WJZm6Z7cdaNhe7E0ZNR06O8ht1nkVpyoTfbSqFZhlUdiuEcgj5WIPI45qGDXNKuXIivcARvJvlheNCqHDkOyhTt74PFV9Q0CTUtbS7kv4xCLy3uVSWFmeIRFSURt+1VO0n7vVjS3XheG502DSrq7IWGK4hdlQgt5oIyPpn8amxHLFiReJLKXUbqI7orWC1hmEstvKkjPJI67QjAFs7Vxgck8ZrRtbqC8t/OtZC6bih3IyMjDqrKwBU+xArKvfCV3q0s13q+oWrTSRwJEUt2jQGKR3BIL5YHeQcEe3rWrpekf2bYfZ1a13tIZHMHyKScDozMTwByTSswklbQt/aW29Bn1qQRS718+QRA8kE84+lSqiwSDy1UsoH7wnPPsKa/GSCAx6k1dn1GlJ7iG4BYqcoi8Kp/n9agadtzbTwemaaY28wg/nSlFVTmobZDk9iOlQhXBPQGm7hnGabcPBHYXL3ErQqsTEyr1QY5Ye460luStywjwSK4MqHywFJDD5cAVW+0wGATiaMwtgrJuG0g9OaiGm6TpnhnTLrVPD6zzskMc4jjUlWbALSbiMjc3Odxye9TJB4futclthoEXzvJElw8SeVLKq/OoXOQcEjdt5w3tm4UOWKjc3mud3LEcJkUnOPSlhk2Ntfp/KqHhyVl0O1ikLvKoKSbzyrAkMv/ASCO/Tqav3CYYMO/Wla2xnayuh0lxg4TB9zUJZpG55NNp8LhJMt0xSvcm7k9SeGLZy3X+VRyv8AvxnkLipPtCZ7/lVd23OT6mm7W0Lk0lZF5XIHyng/rUchX7keMnrGx+U/T0qssrIu0dKkScDgrge1KSjNWkUqnbQV4URQZIpI/YMD/PmovMVT+6iX6v8AMf8A61LLKZDgfdFR1g6Mb7tg6rT90WR2lx5jFsU0DHSlpAwJwK0UVFWRi5OWrFpFjLvwCx7AClq3ZqoVnLYboB/WrSuwiruxUIwcHrSEA9RWjKiyRkMy7iR823mnJDFGmVCsQDliefanyF8juZyRbj8vGOrE8CrtsUSKSTJwgI3MfvEg8AU6UBmwQNoPApowMr2ZGyPUAE/0qkrMrl5dSoHzJufkZ5qSaIBdydO9QVZgcMmxuv8AOoWuhEbPRjIJQikNx3qKJopr0RMhZ0US5xwOSB+PWpnt8KSp6etVdNVhJJLIGDTOThhggDgD8hn8apX6lK6aTNeQARrt6ZOOKoXmorYSKDbzTYiaZ2jK/IikZOCRnr0FXnYNGMYBHb14FUL3TkvXVmuJoR5TwusYX50YgkZIOOnUVT8jZEOnjTJdSuLa006EKQUklymHBUMflzkg5HamLq+l2VmzwWvl/Zbx7VY0QA784Zh7EAnPsau2GnRWuqSXUUrKr5YxeWnHyhcBsbuw71Ul0CzmleRpJwzFycEYy0pkz9fmZfoaWqWg9BTqGm21t9nTTiEnL26xpGMTlJDHs9u5Htk9jT7i+spbprmexZ0tTIv25olYIY8lh/eGMEAkYz9RkbRLaeRN006tHJJJCwIHlSPIZCw465OPpn1NTHSYGeZZp7j7LO0jPApAQtICGzgZIO4nBPBOewp6i0J7HUBcmSKS3ltpo0V/Ln2/MjE4OQSOoIx2NW5E8xMPkFux6j/P/wBeqMFibC4eV7iW5ldFTzJcfcXJAwAPU571djbedwOcckk9Ke6sxehUVvLkJPUdf9oetXWO9fmUlMcfSqcsbKscxKgZPGeTxViIKkKM3JRF9s8Vz0U4TlT6Gk9UpFW5t9rHjHGR/hUVu5XO3IOeo7VcuJVMI2k5zkk1VMkcdu0jMkcajLO3RR6n/Dv0re3vGPL72hZu5VaCLYQzOcGVe+P61ntE02pRwKpK2wE0mf8AnoQQg/Abm57lTSx3V8qFIDHZx4GHm/eS/wDfIwqH6lvcVLax7EZEZmDsXdictIx6sT6n06AYAAApSkpOyOiMHT96W5Zljj2+XIBINu3Z2Prmsq5sHgceSzSqnQ5xJH9D3Hsf1rYynmHBHmAdexNQMpU4YYPvU1aEKq94qFSUHoZ0GoADFyRgHHmgYA9mH8J/T6VorLsUnIKdwelVbq3ST94p8uYcK4Gc+xHcVRj320m2JQjrkmAnKn3Xtn/JxnNcbr1MO+SevZ/1/XqbqnCqrx0NSUq5G0NyM+Wf6+1Kq85b5mPf+gplvJHLHvjJOTzkYOferKjygD1c9B6V104J/vG7tnPJte6PQ+VhMFmbqAen/wBeotSlEOnTkBnZk2kxuVbaTgtxz8oOSRzxUiqVO1T85+8390Vny2btqH2u2NvcJHcKzqcCaLapUKrjtnnBx1YZ+augzZBogS8jgummW6MSCKN3QM6kqCcSj7wAYr0yDuyTzWk53SMfU09WJlJLbtoJzUVALQKcjlGyPxHrTaCQCBSGT7VWF3XkMMAenrVCWPbjB4/lU0kzwLuT155pFu1m+WSPcTx05/SsKrhL3XuS7CRzMAXDEEffAP61bjnkwxLZAXPNRShYI/Li4bOSxOefSmRnETeWMgkfL0K+1Zwk6Puz2Nrc6v1Jy6tHl4lOTjjjNSzSJHCgbcoPTYeRUAG4Rr3J5p96MyoP7ozXRpa8SOuoizDotyw9nXNTMwWFSzRHJ6ltufpWe+AelV9dtzc6Xb24smuRISHdUVmiQ9Su49T0B7de1Sm9UN9zUuVLKjgDcw+6CDketQhSQMDr0561kHTXa8xDp+0vLbtbTkqPssaBN0fXI6PwMg7/AK1Xh03VdMaI28BkUJNKqFxmOVuAOf4TwfY7qq7uI39pzjGc+lSws0TjdwrHB5rJ0SwuNPtJbK8VDEGBjZZCwYMMMM4BzuBb/gVUbnSLk6XFBHabysN3FGoZf3Tu4Mb8njAB5HIzTu7XsI6doil0rJ91jmqx+8frVqOUOzRE8H7pqs6FHKt1FWBE0eQdpwT196gVmRuOKtVWyBKSRkZrGatqiJE8ZLIC3WpU5VwOuP61EjKy/LxjtUittYEdq0WxSGP/AKtvpUUL/wAOM1YkXa3HQ8j6VTHcHg5qJtp3QnoyZ5sEhRz61CWLHJOaDj+9n8KXbxlTn19q5puctyHdjatzDdat/ssD/Sqqgs2BVyNhlo5OY2GD7Y71VHZjjsVIl3MD6Ef5/SrDttQkDNQS7rb5NjSySOFhRCAZGxnqeAAMknsPXpUotNVkHzyWNmD2AadvzOwA/ga2jorGsIaXbt/X3lclnbuSae7pZQ+ZeSxW6Z6zSBB+Zp66SGOLq9vJh/dWYQg/QRBSfxJp4s7CxYtZ2VvHN3lCAv8A99Hk/nS5WtWFqcNW7+n/AAf8imb23nUCzW4uhknNvbsyn/gZwn60mbtvu2kMA9bm5BYf8BjDD/x4VOzyTNl2Zz7mkVCzbR1qTJ1ofZh9+v8AkQ+VOf8AW6gy+1pbrH+G595/LFPiRbeN0gMgEj75GeQuztgDJJ9lA9OKklQI2Ac8VNBCTgsp3HkAjt607a2JlVqT91/hp+Qiq0i/vVz6NnB/+vQiBJFzFxnksd1WSo6bhu/u0ipuGSSFHUj+VXyi5EV3tWU4B596Q24Cj5uf0qS6LSbAq9OOKgeN0XJbj2NS7EtJdBhBUkHqKaRnrT/mkf1JqUwqq/MSTU2uQot7FfYPSlVQDwKFDM3SpYQDKB6UCSu7EohBA38e1RTSK2FToKsMxAbA5AqlVS00NJ6KyHqzkgKTx0GalCyyffJUUkcP7vcOG6g0wzSH+L9KNtxbbj3t8J8hOfeoDCYyN+Mn0q6xIX5Rk9qpsSzEnk0SsE0lsSbILq3EN5GkyKcqsgztPqD2PuKjKxxqkUCBIokEcaDoqgYApKcoGDu/CpuDqSceS+gzPOKcrFWDDgg5FJR1oMzTuY1aZbhOkig1WuD+76d6nt283Tcd4W/Q1VnlBGxefU1pLa5s2uUiDnbjqakUbY9p6nrUSkqwI6iq167PImevbFQjOLSNILth+pp6cIMVWtw/kDd2qxGcp9DVJ6mkXdkw5iIHXOT9KP8Alicf3uf6f1piPzlamQKx+UfKRhlz096s0Iakz+8YnkEZP400hMnDH8qkVlDffUbl280AIzhZT6HOfxqFoV5b7wepiFeTDfIT6cg0cyOY+meFz2oEQ2gxGGJAXJA5pbhTyFO4nBBNMuMxRqqAbVPXrz/kVIp3RhJPwI7UvIS2sU5XMWFDlu+PSo/PbszD6U+6g8uYjIJqFEz97gVm9zF7lufYYN5yXYcFT8vv+NQQR/xNS+aIjgfMp6qehqZFDAGP7p9T92jcNw6U9EITzH4yPkX196FhBcFzkDkge3NNZi7ZY5NUl3NIx7gCqglu1OBWaPp+FRSYVTuBqEMyncpwf50N2YSlZlg8dakg+QlxxtHGPU/5NOtXLrlsEsD1FKcEYChRnOBVFrVEbN5s4dduzrjcBzT2AkyJNnsxYZzUE42EOuBnrUB+Y5PNTexm5W0ZamXEBC9BUX2hAvC89hmmtO5j2he2DTYYxzmk32E5a6Aplmkzkj2q0sZC5c/lSKURDtGDURkyCffikK9iN2HmECmGJX6jNMb7xqxbjP3uPekSLFaBRk/KKlXII20yWYk4XimCVwcg0D0QspJxmmJguN3TPNBYueaGXb1oEXSoK4IGPpVORAkrBTx/KpI5WCc9B3pAPN+Y9Ow9ap67Gj97YhzyABkntT3iK/fXirESgZwKWcgQnPOeMUcugcllqZzW8bfd4PsahOYZeh2/zq2FAoZQwwwzUmZUlkDLhefepYgxjGRUiWik5xxV+KFY145PrQNK5FaxMnzN+FTSJu5HWn0yRwiEn8KCrWRWk4II602SYso3kYFVbi4LOVXpRDBJOuGyOeM0EDzJ5inYaasIfCnk+tXBarCoGc0iALcBchvpQOzJYYFiTkUjuu70p85KjP6VUJycmgHpoTgg9KDwp+lEaYj3ZFS3AAhB6cYpjtpcypyWmCdj1q9DGFTOeapRqXk3n8Kv5AhGB82KQkRSffNLzJhVHSklTaPmfn6VCknkhpJdoABJOeAKfKxqDvqOu5GtLcEKHkkO1EzyT/nmprOM28IDyNIcZZiep68egqKNTcRJcSIVdgdgI5Cn/Ip+SkezFVoitIskWbYT/EDz9KcG3c+tQKpY1IIGP3TUXZF2yKlUkNx1puR60tIklMeepJNPijw3B4qLzG9qeG+TLf8A66ZWhYZ1wRmsy42B8nBp0sxLcAn6VTZmduevpQDdywlwg6cfWrcL+ZndyPTNU7e3LPlsDAq6luo53/pTSHFPcdLNhSFwD6VDHEWbLggdyalMKk8E+5NPiABAbnjgVd2aczvYkGeMcL/OhWLE8cU6m7wWwKZY9TtYEdqVk3fNHnHcdxTaA5j+cHGOc0ARyx+WAOBk/KPQ+lIiblBPcZqYW0k6CQbRkkEZ+5x6fjUbkRRjHQcCuelu5L4WaTdlruVzF857c0Mf4UH1pryZOAcUgJGQO9WcQ/y/l96kHTmoljJ68U8IF5oAdUcv3Qaa8vPBwKry3POOpoAa8hZwsfzOxwAKmjxGrlnWR+VG3OOhBPSqtsrfaYyBna4P61ZeJ4mCuOcce9PoPpcaBkE+lSwoCeaSVNgUDv1pyKSOKQmrMeZVU4AFIZSRwMU3yccnH4mniL1P5UBqQl2Y4GaesbhcmrEaIDyPpmj/AF06xRDljigdhYFxGDjk81Zn+8rHgsoJpJp/IjK23AHVsdf/AK1UpmeWPzJZCSTWm2hre2iLO4HoapTHEp4wDQ0wCrs69xUg2yxgsOtJ66A7S0GRxtI21etXyiBTLMsaXK+rbwT9B3qvGoicAdGHFT3SjzDIP4gGP404qwoxsZ84kaQvI5csepqSAASAMO3FTbQwGOe+abINmD3HNS97ias7j5XZF+Vc+/pVfzX3Z3fpVoug6sKikEGeuD7U2OV+jAepOSe9V5Sec1I8nHy/nUKI00mFqDPcRB3qK/tRfabc2hbaLiF4i3puBGf1q28TR9entSIhkbAo1uKzuNuNctL/AEn7JrMN9azZQy+TaSSrlWDZDIrDaSvfBx1AqrBeaTHqz6jYS6pfDe80Fqlo4iEjqAzLIyAYOCeXx8ze2NVU2KFX15NNXcFxgn5ACMdMcZx6Vc6zg1fqdMYtozdPhlt7X9+V86SWSeTb0DO7OQPYFsVcaVnXDc/hU32ePoJNxx27VEIHJ5GPrU6vUwcZIjoq0kCr975jSPAGGRw1HKw5HYrkY6HNJQ4ZeMc+9Iue9IgWiiikAUUZooAD70gAHSgjIxSjigAp6StH06elOeNUiDZJJ6VFjFPYeqZKbl8cKM0sNw/njzMBTwfaoajViZKd2PmZsMq7VLHqMZXnNNWLeW2Nn5WGMc8iqUc3lqQRn0oS4cSBySPYdqvmRpzqxMLUSYVOD61HPD5L8dVPPtWlbSxyyBnwHPRh0P8A9elntVdyRnc3Bz3p8qa0G4oyrudhDGkJAkncIpPOO5P4AGiEYmwfwolsWF0sytwilVXqAT1OfwxSeVIrAgHPXipfQmV7ot0oG5gB1JxUMQcsWfuOhqeL/Wp/vCqWpondEvkbWG18NUO1ixGCSOtW+D8rD/gOetBTIJ457bQOfpVWGVASrA9walGwuNpwWOPlH8xT3jVsZ6jr2z6VA67G4z6jPBFLYCVz5kjY5Vmx/ummwoxZsY24IZj0FKLgHPmJuYjG4HBP1qd23MY9oCRrkqO5xTAqXu14V2bs7WVBjrwOaVpVeJRH93rVhokuI9jAKV+ZSP4T3qiUMchAG09Snr7iuWbdKo5PZ2NEuaNluivcybWGTgE4AJ71FI7S3VrAVGyNDcsh7sCFjz+O9vqoqZwVZMD943JOMnPoM9O9MhG7VNQfJPl+TbZJ/up5h/WaiE5VFdKyf3l04KEnK+qX/A/Ulw4H3yx9wOacmRKDGAvHJ6Y9c09F6sRkLzTZAAu5vvHkmplRW8S1PuIZVJ6YHTP+NS+dtT5/mUdj/SqpG3kfLn8j/n0p6KWbaMg5woxwTj+VKOInH3ZLUHTT1Q9Y/MlY5Kqv3mzyPYf40lxFHcRiMoFRfuY6qfUe9SsQqiJDkJ156monbG0Dua6I0oqL5tb7mbm73Rnlbi0ukcEFs4DkfLJ7MOx9/wD9Valvcq8CTgZeQZw38NN+yxXfyTZwvzAqcEEdwabHGsUSxxjCoAoHoKzo0ZUptJ+6aVKinFX3H3dy8FlNLawCVo1Mnls5Xdjk8gH8BisXSYkl1ea4zaZihUoLWbzsb+MGTC8fKTgjqxOT21rhmWxuGRXYrGWAQuD0x/B83ft+nWoNMXFpKfOnmDSDBmSdD07CZmPfqDiuzoc73Ly8ROfXA/z+VR1I3EK+5JqOkUFMZSWp9FS1cRU2yXExRMnB9eB71ciRLZQI8M/dyP5U7b5Ue0DBY7m/pTKyp0lF8z3EkMf5nApQSZginBJC/n/9akTlman23M5c9FBf+gqauqUe7NY6allUDTMsZIx3zUEwka4I3ZbpyODVmE+VbNIep5+tU+epOT3zVOmr+7p6C5n1GsOf3isvv1FWJuNgHZAKbkPjzMg9nXqP8aZJE6/MRvHZ04NTecHdq5XuyFqcH7RCVP315HvVRXPT72PQYP5VLDKBIGU5wea1hUjPYhxa3G0VJMmyUgdOoqOtBC1YP+kw5H+sX9arU5HMbhloASq8se3LDp3q9OgYCWP7rdfY1ARkEGplG6E1cqKxU5FWkbcgNMMSiMjHOOtJFuQ7XBGRkZFRG8XZkrQsCTC7XG5f1FQzW+4eZEdwzzTjUaO9uxKjg0SfRlPYFhXaN3WlWIiZRGCc1Msu5Qdi8+1KZDtwoCg9cd6rlVtAshBBtJJCr6knpUbSQxrJNJcIkUaMzswICjB5qK5KoUARpZZMiOJCAWx1OTwAM8k/qSBUQjxIslyyzSoQyIgPlREdCAfvMP7zfgFqJO2hVlFXnovxZPZOIpvtd0HScgLHFtyYos52H0ZsBm/Ac7c1YtbiPydkr7TnIY81SJLEknJPJJpQhIzSUmjllVcpXLdxNLFgKoVD91lPB96rO+V4PJ60RzyRKVU5U9VYZB/CnC7lHTYB6bFx/Kk3chyuRq+1T60+NXSZdykbvUdRTxcqDuEEYfswB4/DpSxXjbsXGZEJzk9V9xQrArXBU3zSMBuK9Aeg96kQFVILFsnJyetOkBtpFlhUPGwzuHenRvHImQpwoySatI1ja5XuAcK6/wANNWaR2y8hwoyc81Ok6MjFF+foF9R6iqMsrMoXCjJ5wMZqX3Ik1e6L0bCb7mQB1LUThcMB07UwzJDCqDlsAtTPtI7qaq6L5lazHRxiJdzdaYZFGSTk9qGk8zIX9e1RuqqMDrU3tsS5WVkLuAwFPXqanWNEIx1+vWqu04zjigknqSaSdiFKxdOBkn8aqInmOQOnrSec7jZngfrTkcxPyOO4ptplOSk0WT8kZx2FUquhlkU4OR3FQyQBVLBsfWnJXKmm9hgmcJtH51HRU6FVULIo+tRuZ77kFFWXt1P3eDVcKxJAByOtDTQOLQlFFNH+sP0pEl7TpAszxuQFkUjn17VBPBJA5EqFfT0NRAZ6VegMlxYzQHc7JhkHWrWqsUtVYo1HtEjgkdKs+QQrrKCrjHB7VGi7ZNpI4NTYLNK5bI2KqL1PWl24TAqDeTOoJ6GrNXE1gNVdo96lyFTgcsOvpzTKc3Ea+vJqyxtIyhxhhmloHvSAjy0AwRujPTnkVOjOzqTGWwQQQPvD/GoZ1LphO3aqoL7uCQRx16VN7GTbiy248yV4s/Nn8/8AOakLCFcsQH7DuPes/Yx4xT0iwcnrS5hKbHyhW+YnBqMRFmwpzSuhZuOlNIaP8akh7j1tDu+bgfWp4VVJ9hPysOfaq6TsvvSJc4m3EZ5prcpNXLcsjlio+mPT2qMIc805eFLck98jFOJwM9a0NwYqFJfp9KhKRseBtz3onlHyKO55FMlk2LnqTS0JdupLZuAxQng55pZWYZVeCPWoIEBi378Op6Y7VK8wkkJQHPHJ/nST0JjKy1IpYizjPp0pQoQZNK77R6moiSepqWZt63FY7m4oLbWO3pUhhCxqWViSOQGx/SiWBY8kEk54PrRZhyvciIbqRQQ5T5RkZpSxwAegq0nzRjK446UJXHGN2UHjZMbu9TwjEdSSRFsDtmnsqxx0NWY3GzKuOSDnPakII6jFWUG5ww/OpHQOMNQo3BQuilSlWlPHJqdrb+634GnQIUU7hjmjldxKDvqZ08xT5B1rQgIWEfQVR1JQLgMP4hV6EbkUjoBVJWZcVZ2JEXA571E4M0m0HCr1qVztQkdcUkS7Yx6nk03roU9XYZ9nT1b86Gt1I+XINTUdKLIOVFUHbGKmhYmM8VWkYHAXoKehPl4XiszFPUmBd+hwO9K0QK4/MmoFlaPIIB+tMMjFic1V0iuZJDzZRK2SRj6U4N5eNicHpxSJIojJbk1A8jOeTx6UKNylG+osshkbk1aghVFBI+b1qtAu58novNXlGBz1PWm9FYbslYguX6KKhVN30ok++aWMndjtUGO7Jeg9qWW4QxDofao5Thfxqqq5k3f5FNOxSlYkQegwDUjzrGy59f1plRXifLGAPmNJCXcezF2JbrSiy+0PH5pHlA7mTuxHQH2/wqq8ckUH7tsySMI4xngMe/4cn8K1IIY7K2WNOijqerHuTV3NeZkr7QMsOKzLi4w+BzUt1OxQ4/CqUS7mJPOKgybuaEByuaeZtpwM1Ah+WkIJPXFArkvkryenoKRkZPvDFSsjRyBicrn8qmdQ6EH86rlLUblMDLAAZp88Z28HoORQVaGQHg+lWVIkjzjrQkEYp6MrC0DR/K+W/Sq7xmN/mAz61oIgjyAevrUF2nRqGtBuOlysjlGyPxFXB8ygjoarohbtz60N8pxnPNJOxMZWLSgPwDn1Ipj53gRnnPWkX5Y8j0pysNuAQSeWp7spe8x4YKOpY+pojGTmo96g4J/AUx3bOc49AD0qm0i3JRLLOq/eOKbMwCc+oP61XjGZATzjk0+UkoSaiWsGVTk27l6wywkhbo2effPWonTqrj6g02NmGfm43nGKuBftcOTgSrxn+9Tpa04+hUviZlPCscmcHbSyl4sblGG+6Qc5q8kHm7lY4x1GOai2m2mEI+aNjkcnjOP8KfKYOJUIlYAupUHpkYppLHgc1clVEQgKoYMThj6/WqwWV+EC5/2CDRyh7Mqz5iOMZJpsMB++/Wr0lun3jLnoMY6nvTJGCrtWptrYlrWyG2D4ujlQdoJBP0p7Ez3TO55XGBRZbfP2sGO4YAX68/pmneS/24AKV3DJHpV20RpayQ2UMWzt4A9KQSYXAFW5UKxkH5QRgHPFUaiSszOasxu93PtT1Mh7/lUiRgDJp4ODSJI9hAJLYNSf8etvluJZhgD0X1/GnRna5cgEIrNg9yBx+tUnkaeQu7bmbkk09h7E3nsAcnOfWq9zM0u1YshR+lBXbSxx7nAAxk80XYXew2GInCDkk81orEFXGe1LHGIxgUqElcn1OPpVpWNoxsRkE3KL1wOKsXTBdsfUqNuffvUdoczSTn+AfL9e1JcYXYMEvk5/Q4o6XFfRsap2r2qpcXOPp/OnTOw+UjbVR4mdsk8VFzJt7EqzbhntUcs7BsAUFMRbVqFtxYA9RxSESeZKSOOPpViNsHjg+tOSHdEzngDpTCu0deaBl4OgjAZt2ePrQGijHHH8zVSHmXk9uKdMrM2QPlHervpc05tLlg3Ax8qkn3qPMksnyk8dxximROYz6+tP84SybednLNj0ArOckotyCN5PckJHqWwwwx7HPIB+maeJVZ9q8moHifcDOVj44X0/CkVo0bKhz75A/wAailFxTb0uXOprZD5hIpJDHb9aIpgq7Xz9abJOXXG0AfU1FWt9dDFys7otuEmXgjPaqrKVbB60gJByODSsxc5Y5obuKTTI3bnApuT61KRnrTdgzUiGhCfapKQnHWkLjtQIN3zYqQIzDIGRUA+8PrVhZGRSB0NMenUkgywZHX5e2aiddrkDtT1m2qeMt61ETk5NN2sVJq1kFRg4bmpKib7xqSCWgDPSgHIqaAryG4JpoaV3Ykt2zHjPIq4Zi0W47meIFto5Lj0+tUHiaNg0f6U37eY7mKPy8u2W+gGOfzIrRO2jNk7aM0ipWEgsTyS2fc5quQ2wuB8o61elCyYyvbPPH4VWvc/Iq8L3x61bKIutFAHHHTFFSMUKSRgdalBmAB/AZxzT4iTCAoJzxwfepCqLIqgtuHHXH9KpICI72X95xnnleAP6UuA/B6HgY56dcdx/9en7EzuDhccfNkEcfrQwCrt3pjOM8jPr+NMRH5G50KgYPLY6Y9acmXnkkXoSQKWdituUjORn5yO9Nt8smB1Bo6gTryCTxk7fT61WuIg6sw6p1PTNTb0bcR/q1wOeahunCxsoZix9e3PNKSTVmNaFKKIGRAMks4ySc/56VX07MtvLN/z3uZpPw8wqv/jqrVjJUls/dXI+p/8A1Uj2H77NpdS2ryHcyACSIsT12N055O0ryTUuKSSRrTmveUnuPLYI2nAHSopmO31JNRw3iSadDeXG2FXRSwGThzxtA6k54AGSTxSPM8TGS5s7iOMdHUCXb/vKmWX8iB3IqG7ot05bfL+u5MzZQJxlhznsO5qWJkUblDBsbVBHAFQIVlRHR1kSRQ+9DlWHYA+lSVnG8p876bDl7q5Qj6E+pzTT80w9FHNMjkbG0DJ7VJEhXduOSetbp3sjDckViudp6jFJRRzn2qyivqIjOlzecyqgKH53VQSGBwd3B6dCRnpkZqPSIRBpabZnm3YyzReWPlRUGBk9lHIJBOcHGBU10l+8Y/syYRsoJZQFDse2GYMB9Mc+oqS0DNawLIZt5Hz+c25wxPOeSOvpx6cVXQnqTS8FV/uqKjp8h3SMfemUigJwpPoKdGN7KPWo5P8AVt9Klg4cDuQQPril1AR23yFvU0xjheacQQcEYNRvywX8TQ9gD7kPHXHH1qWEYhfH8TBB+FRSHGM9vmP4Vat0wYUP8I3H61h8VX0X5l7R9R1ydkaRD05qtUkzbpmPvio63IClV3T7hpKKAHExycSJtPqtNEROHiKzAdM9R/WikUbDlSR7VnKnGW41JrYmZzLGCybSBgVCGzn1BwR6VMJdwKzDcCMZ71A6NHIBnc2PlP8AfX/Gs5SlSab1RSSl6jqKAQygjkUV0bkEsMgUlX+43WmyxmN8dR2PrTKnjImj8pvvD7p/pQBUuJ1tbWWd1LiNc7B1c9Ao9ySB+NMj024s7dTHK11c433MLycSOeWaMn7pz0X7pGBx96n3dsbq0mtt3lvIuEf+445VvwYA/hVyyvBfafHPjYJUDMuT8pI+Yfgcj8Klq71NOZxp3XfX9P1KccqTx+ZESQDtYEEMjd1YHkH2NEjAKQep7VNLZG5m3xM0N0o2iZBnI9HHR1/Uc4IqkzMJ1hu0WCdzhMNmOb/cb1/2Tg9eo5qJXQmlJXh939bkkD4JBPXpUskqQxGSVsKCBwMliTgADuSeAKgdNo96iU7r9O6Wa+aR6yuCEH/AU3H/AIEppRk0rEU7a82yLcELiaS6uF8uWRBGkRIJhQHOCRwWJ5OOOAMnGTG6COQ5GR2qaOYPweD/ADqF5TIoBXnPah2sY1ZqepHS7jjGeKQjHWioOcKKKKAClALHApOtT4CLTGS2zGKOXd80QXJB9e2PSkE++BwFCnHOKbM2y3SPoz/O307D+v41XDFQQDjPWqvbQrmtoJ9OtWIU+05M3BXkuO//ANeoACxAAyT0AqVnMcflK3OcsR0+lJCXmWHIyWC/lVNjvYseBmkyeeevWkobuOUrkoZVXioicnJoopEExGYwDx61C7Kq8du9OLlhg1DJzxQMlgGWJP1p0p5H0qOMlVBFK3zZz3oAEYs+EzntinOznhyeO1SWke3cx/CiYAzj3HNO2hXL7tyGnFywwaRhtYikpEEi3TCTDDIxUsDbi5PUnNVCPmBH41IjlGyKaZak76lsop6qD+FVpY9j8D5e1WlYOuRSSNtQ5Ge2PWraTRrJJopg4ORVuy8wXUcmcKTg4PUVT6HB4NWYHCR5ZgOeKiO5lHfUs3C/6VIW5JNUJkAkLDvxWrIyTRrcogIJww561n3Me4B142npWkkaS1iQM2WyOKs+cgUc5qrT4gGkAIyDWabMotp6E5nQEd/epd24A5yMcVB9mG3rz606IOh2MpI7ECru+pqm76ivKqjGcn2psU2eH4I9e9WNmBl8r6cdaikiWTr19aNRu+6FJ/ukZ96qNIS+44BqY2w7HNNa3OOAal3IlzPoNEw79fapDIpUYwKh8nntx6U4xEdCDUkakwePp1NRSkBhgce9IiY5NEo6HtQHQaVJI4HPpQLcmQBTgnvnpUgGYwPanR7iwBU45BbtjvQCRMfkTag3ep6ZqL7Rg4ZStKJwSoHUnmnPGsg5/OtN9jbV7MrTBfODo2e+Ka/7xxx7AVK1uV/i4+lCx7CHDZx2qbMz5ZMsQRBYXQ85HbioFUKMCrELfKxbsKgmkzyBinIckkMkxjHftQsDtjtk9KsxKixqXzkjOBTy/BCqFyMcUcoKHUryTAvtOSBgBvWi4nOFEZKADnB61XuGSEg5YmofM80buce9S2yW3sWt6S4ZmAcH5s/xVYDpjh1/OqEYJHFTxRhnw/XsPWhMIyadkWgY24EgJpfKz0Kt9T/jTAFj4GB+NNk/euI4zjuT0/GrNW7E3lv/AHSB6nigtGi4bDNn+HtUBdmOwfdHA9/el+VenJp3HclLrydoA980fK67kP1HpUZBeHBOCR1qCF2guAWUlTwcd6VxOViWeESrn+JRwajsn3I4PUNU88JYZQ8r0+lVItyNuXJ9aT0ZLdpFxvuHjmkTO3kYx0pVOVzTRkuT2qi7a3HMdqkgZPoKg3tLweB3A71YqIEAnYOvU0mriabK8qeXyelPi+7TWzLLgnKipiFSLIPNQY2V9BsjJuGRio5nVY+vSpzCXTI5+lUZ0LJjoaGDuiusrGXPXPYVbCjb3zUdtCF5c8mi5kIIWPvRdgpNLQtwODxwAPQVNJIoTg1RgJRB0zilkEjLlc0g5mOJySafFjB9apBpwcFSffFWEJ78GgQ+XDNikAyQB3pKsxgRxg/xNzTSuxxXMxzpGF7L6+9VyPOZn644WnyhnXAPXqaaEaOF/LwzAEgMcAmr6mttRtnMj+auzmF8BiP4sc4/P9aHcseajhXybcRg5PVm/vE8k/icmnVDd2ZSldkc7BY+fyqvBGzuCOBViVd3XoamttsZHGPrSEBj8tRnvTaLydmHyCoImYR8/rQBrdaTaNuB0paK1Okhn24QGiN9kBPYHikuV6N36UmQ8Kr0FR1Mm7SY3zN5JPUcikZzM47D0pIx8/0pzME6DrUkXYrERrVcZkkpJGLNzVm2QL82M+9AbiSfKmB9Kq87verEzfNmokXc2W4FAiWMBIyacIGZSx4PXFIXAwByM1YWdM8Hn6U0kXFJ7laRSsS447mhZNy89iMn2zSzyq2VXmq019Bp9nNdXjbIIl3OwUkgZA6D61Uo3i4m8dLGrBFvhbBy6kkgenXNSw58twM5BDDBx7f1qtFDIGUKD1IB/wBnsPzrTYZjZT1KnjPfFTQu4WfTQc9xD8yrJsw7ZDcUxgH4ZfbnHAqEXCW8PlzyCIyuEiyfvOeg/Gn20Z3MzKTxjmtyBk0SrlZDuH8PqKounUINg9ccmtWa28xgQdvsRmoJLXysu/zdhtpOLDcoorx7k3MVCE7c+vH9agY5wqnvWkIGkUmLkEYYMvWmmxCKSECt7Nx+tSoiUUncr20P7wcnOOSKkdW58w+WON7Y6Dso9f8APpUi7IdxZsFOpA6H/GoXl2rh1B/uRnnb7k+tJkyaCRmAJdgIyCEUHO73/wDr1FDHvOT0qNmLtljkmrUAwpFRuZrViPjdgdqbnkDuasCNGyznaqjLEVXa8VJQ0cMa4Py5ySP1oGyV4zFZyyO20sm1UPU8jms6H/Vg+1LcStIrHJZj60y2b93ihkskbqB71Zt1Bye4qsqFnq1CuxjzxjmiO5Udx7SbeSMr6jtTEkLpsA56Z9BUP2gnKqOD61LbMNwQD5mOBVX1L5rsuxIqWvHTdnHrj/8AXVeNt91Irc7ucnsatSL5dsoPUn/P8qpQEFnPcmqfRFPdErwk8spH4VH9ljc4xj39KlBI6HFNmmdYz8xJPHNGg3a2pVktdgJQ+YPUdjVK4nhtLd7i6YpGhC/KhZiScBQo5JJOABWxF8kQXAI6kGqms2yXOlPGLNrwb0ZoUl8qTAYHcjZGHGARyOnWp5SOREVldwX9rILQyb4mCSxSxNHJGcZ5VgCMggg9DUn2WV24Uj61zl1Y6teWRjm0+4vbE3alIrwQy3Kx+WeWXcEcb+BvyQDnHAIpWnha8udGlTVdP825j0loLYSlWZJRJKU2kHAYKUwR07GluxuKbO1t4ojLLGjrJLCwWRR1QkBhn8CDTrxvIhZ5SUjRS7nGcADP9K5q40a5gGs+RoyTSXj28rOEQ+amEEoxuG5sh22tw3fOcVJoenX9v4Z1GyltXhDzXH2WBhGpWNkG0AISqjcTwOlPyKaVrGzEPPjSWDLxuodTjGQRkVYjgZ2+5tBjIJx0rm2N/d6PaQR6RfJNZvaysknljeI2XcE+fk4BPOM4qA6ZdXN493qWiTXdhJezSNp7mJ2YtHEEkKltpxscYySN+e2axnZrl7jpx5XzHVSKkl+1uHk3rHvLGIhAM4A3evBOP8RQ1nKDhNr+ytz+XWuXvNKvhBdKmmmSOWCzjaB5RMdqF94+ZgJCuRwxwffpVvw3Z3VhorW95C8AW6mMET7AUiLZUYQlQOeg4Fau3Yyklua7IyNh1Kn0IxTalW5mRcCQkf3W5H5Gp1hF3GTsEUg6EcK3t7Gla+xFr7FOilZWRirgqw6g0lIkKQkhhxxS0UgCo2U545qSigBicHnrT8c5pCAetABB65FAC0UdelNkQsMZIpgDN6VHUMkLL6tUkMbgHPSgZY6VKkJI3MMD+dRRHy5BuGR/KrnmccCqirlwinqAYFcDiq8Fu32yaaVcHcqxkkH5QM/zJ/KnSyiNS7/dAyajsZrme0iklChnXcR6Z5x+VXc0bWxtvIFXcxyMcD1/CqU0jSOvpnPXNM2ehIoCnOSc02yiZGC4qRzvUbdrkdRjmoFxuGemeashAv8AAFyP169+KaAWMCMkjPygsc8Y9KY8wTjHUcnP+c1KoG4gg/MPmJ4xn/6/9ajuI/3ZDdV9Tk0+ggJChdzYA9sA9+lKzAxnLA7cNt9f8k1VifdCUc/Mhx9f8/0qVZRsAJPQj/PNK4LUb5rlSrHOe5qSJfLt3mPU/Kv+NQAZOKs3ZCJFGvAxmku4x0SgWuW9c9P8/wCRVKVhyAePU0pldBtBOCOmahPVSfXPP0/+vT0Ynoh0e2WU45RQMn1x/wDrxTp5CF3Z+YnNIrhYC/c9z+lRrG0oDO3HaobvsRrbzGRxw/azPHEI5OTu3sQmepVSdqk55IAJyafPBNcWci2+fOdR8gbYfLzhlDfwsw4B/DI6hxVVyoGQBlvVvQfjVtB5KgPjc3zFxz83+ArHWc+VbLc6YylG05O7KUcsUkO6AbEjPlmPbtMRA+4V/hIGOPTGOKjeUtwvSrN3aRzOrlniuQADPCwDFeytkEMOTwQcZOMVRj8xZpraeTzXgddshVVLoygqSFAHXevT+GtJXRUkpRcostRptHv3qpc6jLaXsyyW8T20ED3EjxyMWRADtyCMZOOmexq5UAsbYXU0+2Umckyo0zFHyu3leh44qk7LQmxVudYnsgUurAGYeW2yGUvlGLZxkD5htPHfiluNeghtRcJEJUM5QFX48pRuaT8B29xVqHT7SAgpG7MGVg0krO3y52jJPQZPHvTF0fTFP/HlG65chJBuVdxBbAPTOBVe8ItTXTWLwskPmrJMsTNv27AzAA9OetMtbqVtWktZbZY9kbSKyybiBuwu4YwN3JGCehqaK2ha0ETKTHB5ZQFjnKfdye/SmWVrDBeyyxeYGnYs4aQkEn2/Qegp6gLnNBOASe1Nqu7HJUkkA1HPYUtCbeJcBfqakqG3/i9Kmqo6q4LYl3b4m387cYPeqyjMzH2FTSnZbgDqef6CooRiIE9+aoYBfMnCjuwX6dzV6I8Sy/gKp24+9If4V4+rf/Wq1J+7tFXu3NYUdU592XPTQr0lU59TS1vmguLaZI1ieYzblZRGgyWIByB2qObW7e1jZry2ubdlKFkYKSEfOH+UngbTkdRituZEGhRVO41aztohJJv2m48jjB6cl/8AdA5NWbmdLRohKkjCWURAoBhSSACcnpzTugH0VXjvopNQlskDGWFA7sPujJ+79RkH8asUk09hARkYNOUb18pzx1Q9wabRQ0nuMjyUY7hg5+cenvT3dIomllcJGgyzHt/n0p07RiFriSRYvKUtIzdAB1NQwp8yXFwhUp80Nu3/AC7j+8w7ufX+HoO5PPFul7renQ2spLmf9f1/XmxdRsmuFt2uo4rhjgQTHy5M+m08/l17VZ5VvQipmX7RbtHNtmikUgxSDcrr3yDwRWdJHNa4SzlWSPtBcuQV9ll5OPZgfqBW3NbVke5LbR+f9f13NCVlaEzllTYMyFjgADvmqmlMVs3kC4jmuJZYlIx8hckH6MdzfR6hYS3gENxatb2+Q0oldCZschF2seM4yxxwMDrkaLOGXzTuI5LeoqJVIp66DatDlWrYr3ZSbb12jG30qM4uo5Y7lVlik4ZHGVP4U2Vdz+YByetIrZQrjIGMr/fJPA+lKpU5FdnNBNzKzRyQZ8rzb62XqgO6eMfU/wCsH1+b/eqKFJYYQlwu2eRjNOPSRudvuFG1R7KK0jE64LOWA7ocAflUTgMp38lMAn1U9/w/p71jKU4WcludE37SLit/zKtKoJPFPEWQ/wAwBU4GeM9aJFaM46A9K1PPsJIct+FIq7vYU2lz8uO1AhDweOaKKKQCqxU8U4KzjJPFMqwzYj6DimNCXPzLFJ/eTB+o4/wqCrEZD2kquOE+ZWz3PGP8+lVwNzqo6sQKbBkpPlLhfvsOT6A9hUVOkbdIxHQnim0gCiiikIKKKcgy3HFACbT6Gon+9+FWnbatVGOWNMZIBgVNHAXGTwKasTtghGI9QKulSuMjHpVRVy4RvuNVQqgDoKpyNm4P0q4ehxVIrunP5U5bFT2HS9RSAfKTTnBY/KM4HNRsxCYqDIKKYgJarO1UXkUARo5Rsj8anRzLIDjCr/Oq+7rjgHtUkU2zgjj1FNMqL6MdNGM5Xr3FMgQO/PIxmpZuYy688VHanDY9qbtcppcyNG0YCTyiPkcYIqMou8qG5zjkVLbRruErEgINx4pWb5fMJJ3E456fmPrWvQ1KrWySbtp5XqRwO/59KjjtmEgIPH0zT5GNvNu6jPHvUEty8jcEqvQKD0qHZGcuVMtSuttnndJjjjpVF3aRsuST70hyeTmkqG7mcpNli3k/gP4VLIcRsfaqQODkdakeZnXBxTUtClPSwwOwOQTmrMM2/huv86qgZ6VLHDv6nFJNomLaZYG2QN6g4zUVM3GLIU9aQI2OWxQ3cbdyypRumKiljJ4X6ikTbEpJ5PameexbIP4Ugb01EUNvCA4ycCrhjVQE+8AMGqZdt4c9c5FTL5gdwv3QxwG9KqI4WJBGinhRmh22ITTJFZpFCtt4NRm2cjHmcdhVehd3skRS3LOMLwKlt1Ah3OeDzzSJaY++c/So3KjIBOM8VOq1ZN3HVl6MrLGQufm4HtUbwoH2M43j1HH50sMhh2oOTtJK575z/IVExdxjI/AU21YG01qLK2MlDj0NBmygIIzj9ajMZPVqjIw3vU3sSpNA4Ehy4DfUU3yx2p6IztwPlA5NPWMrJuJyO1FmxKLY1W2dqRmLNmrExUHJGeKckWHBdAB1HvRboPld7EKsScMMYqVnEUGcct1+meP8afMm5jtx0qtcpIoRT02jOP8APpinsOziOWTd90EZ7+lITuO1PxNMjUs4VTyaspbMpbAJz04oV2CvJ6jcn8KkCggECoWJVsBct6U3zJS+M4PpjpVXNHJLQnuWYRKRnkYPNRpjyB65qwMSQMDyO31qs2Ixj9KOtwtZ3HBiBgU9GzxUIkQjJJHtihGZs44FF0DkiWY7Uz2HpVYyM3HTPYVIiMQ24nZ/Oo4yDMPTdxUttkSbZK0DDlSKbsLL8xOatUyQbWG0YPehoJRSFt2KxkN2qpKHbkKRx3q1uATKiqklw28gYI6U3sNpWVyAswX5evvVdpHJBIwR7VYowG4NQZBahmYluhNXyCOopLVAFzinSSZ4Az6e9BVtCu2Gf5RUuAq9OKI4mRssuRT2BZgzDAWnZgosie3/AHPJ+ftUMty0Y5UA+nrTpppC2IRn1aoxFvcNIdzHuab02Kl7uw+GRpGDMG+gNNMrT6gUBxFbr84BPLnoPfA5/EVLJJHaws79AOwyTTI1WNXCjl2LEk9zRdk8z6ik5JxSU3Pz49qdUEAeKcsbtjCnmmEgfeOB3NWI5d/+rOapK5cY3DyFQc8tUMsfz/KvGOwpZC0km1c4HU1MSqnDNg+mKrQ0XKT0UyRyu0L1Y8UkrlVO3r/KncrmSHSKGjIPHvVT5lX0FNyaKhu5hKVyUrn5l6/zqMkk5NOWQKMN+FQmePcct+lIQEZkqwZPKjxnHFVxMhGQ1VppjIcD7v8AOgB73ILcAkU/c5X5Rj61VCkjIHFXkQsuUGRVJJlximJHG7Ixzlh2HeljWUrkjAPvSgtG3oahOoxCMym4j8pQS0m4bRjrk1Vki+VJ3JxC5PIxWT4gtr6+srrSrbTpJEukjWO7SRNi8gvvBIIxjPAOa2TcRgR7nVTIcJuYAGldtoAQnHUe/vWU5+9yRNdIrmZz8elXg10SpYmO/wD7ReY6vuQj7OWYiPOdxAUhNmMZGfeo7bQroaL9ng0WW21AQRx3tx9pRf7QYSRmQZDfOXVXAd8Eb8dzjoQSGyOtXIZdwDr1U/ka0jYzjO7OTbQd7faIfDyw2Ud/BNDpxSLcqgYlZU3bVB+X5QeduepqvN4X1U6hqjTwzvcyC8IuESILOkiSCNC+7eQNyYQjAKjsM13kkLM5aNfkbke1WSMCOUjc20Lgc8+tXyovmOMvPDlxYx3SaTpUZgns7VZ4UC4ldZW8wldwDvsI+8cNwDnpVHSvDUz3FtBrWlj7BDPdtHb3CRbERxEUGxSVAyHOBwD+Fd9GWVSCkjHO7O3qar3VoJJndztAPY5OPpQ49iW3bQ8t1qzey8M3cOr2P227OjRQ2rNLGz2bfOrcM24bjjlc7sEc4xXRy6ZdHW3lbTib3+0lnXVtyYW2DAmPO7djYCmzGMnd711D2NtK8MkttE7QnMUsqBmQ+oJ6fhTXtGabC/d7nNRytCblYBMZeABvX/V+mPp6/wCfSq6gu3P4mrZWOBcR8uf4v8PSoQAo44qWZNdxAijoKniHBNRZFTQssaNLJyq4wPU9qECG3j+VbiP+JjuYeg7VngbjTby5Z5iSfmJyTSK5MefakxPUU43DnpRHuMnOMdsUyCJmbce9Xo4wg96BAibeT1p4ba4Y9Ohpybed1QzOOQOlPYexXfAkO3pnirlhIqSs7IH2oSAfUYNUWG4/jmrVjzNt/vKw/NTQtwW5cL+ZaLxghcgj61SU+XJn0NToxELICcA9KrMcsfrVSeiLk9Ey6CGGRyKqytukOTkA1LuCWwJ9KrorOOOw5Y9BUVJqKuymnKyRPJcgcR8n17CsrUNdNlq2k6fJBvi1DzQ9xux5RUoqcdwzyKv1IrVSFR0UN/tOM5+g7VT1XQ01eVWmnKBbOe3Hy8q0jRMrj0KmLP5VMZTnrayNOVL4mZz+II01jUrFYYxHYRITcySMFeQsoZcKCcDcORnnI7VcXxLbwmeLUGZZRdzQwRwwyStIse3JwgY5G7n/AOtVePwf/o7j7eGkls1hnkaP78vnGV5OvAYseO1MvNI1O18TWNzpjxHM95NJJNAzRxh1TCsAw544Oa05ZLqCUVsaMuv6bFBDM14pimRZFljhkkRUY4DOVXCDORliBwfQ0v8Aa9j/AGkbBLiRrkOY8CFhGXC7inmbdu7HO3Oax9R8Az3WiLYW+qI0D2Ztz9ot2bbIWdmkRQ4Cli2OQcBRWj/Y0sXif+0UvI0jaUyNHDEySTfIV2OQ21lHB3Fc8DnvUSg7e8yk10G6trS6N9m/0TzPPcmb5+YbdSBJKSeyllyPei+16PStQuobm3keGFrRI/IiZnJnkZCTgH0BAwM9BkkCmahoNpqupXF1qE08sTwLbJFBcSwhU5Lg7GG/cSOvHyiq/wDYdx9idH1JZLkpZhZnhJBe2k3gsM87jjOD61FOEL8yE5pe62aM2pWLasLITt57tsXMLhC23ds3427sc7c59qhs9VsdRLCwuDKVXeMxOgdM43IWADrnuuRVC50GW416LUJtRidIrxbpQ0DmQAKR5YYvgLzkfL/9eXR9Kk0ueV2vI3jePyxDBC0SE5zvZdxUN/uhRyfbGpg1Hc1SjtGGQZB71pIQ9uFYBSvTnrVOB9oIHrU6vuOMVUSoLS4yW5BYLJGsoUYycg/nTRDFN/x7ttf/AJ5uev0NTFQeoB+oqtNFsOV+6f0od+pMotakbIyMVdSpHUEUlTrckrsnXzU7Z6j6GpHs1XDK5aNuVOP0qbX2IUb7FQ9OKaAwPUVc+zp7/nSfZlweT7UcrK5GVqKVlKNhqSkZjlcrx1pjv68mmO5GcA01W3YJoGPUbjlqlYqFwOfemAg9KXr1oECAuCVGQOtKGK9DirdnHvj2qQOuc0q2OJMMPfnpVcr6GnI90VZIBdWssbybfMQpux0yKtEbU+Xiorm2ke6tlEeY42aRiD0wMAY+rZ/CpyOOau1jWKsNQ5WnYOCQMgDJp0Q/eoO2RVry90bhV2kgck49sU7DKWQy0qzvGu1lDAHgnrQq5IVRyTxT5YmhAL4wfSgCeFwyFpV2r0BPrRcMPJDBt24bcj2//UKYSqskQXIDA5J65FTfehIbGMg/N+X+FUIy3YpJ5gwVxjipEYmPcevWkntcSnb8qk09V2qB2ArPW4o3uOi+8pPqKW6cteEHovyin23+vQds1XkcvcFm6k1XQojcmTPzMq5wNpwSe5pfKxlnYk4wT3pr8qFB/jI4/P8ArUpbJJ6hacm726GaV3qVndiNjHhafGskZUkHngL/AHqmtokCNPMN2MkD6f8A66mjtpZE3bsNwGI7D0Wuabaso7sqnC/vS2CC3YsrBlY5JODnDdB+AqcjGFABwMY7H0/n/OowojyF2pt4XsRUqSFo+u8g8nBB/P8APrW1OChGxcndjWRXGW6/3h3/AM9aybtPs+qW0mciZHtmPqwzJH/KUf8AAhWy6dOM5GM56euf/rVma3EY9HuLjd89vtnXP95GDAfjgj8aqS0NKPxpd9PvERw44p1NChJZFHRWIppkKuRjisnJJai5tNSaigHKg0vXpW4GffXVwmoR21tdxo0gULbhotz55JIYhscHp6jAPONOPAuFx03cViXY36vJaiWaFLi5jYgSxfNIgTkIULEDahIDdDngGtlOJE53EYycYyfWmShjDDEe9VpP9Yaty8TP/vGqkhBkOK55DnsTxlQoUHmpANzADqTVeD75z1xVxBsXzG/4CPWtYO6BbENy2X2r9B/KkfiPaOM/KKaDvm9lokPIx2HH1PAqKsuWDZcVeSJbXcXGw43N29P/ANVTXT7pcDooxS2qiONpCOFGBUBOWJPc1cI8sUhN3dymdOR7q7kluZpIrtSksJVcFdpULnGQBn1659aE0yLzBLcXE9zKGT55Nv3UzhcAAY+Y5PU1bqtNOzSCKAZY9T6Ch2Qikmg6ap8h/PkhHmBYvMIC78ZHGCcAYGe1aEkUTQQQzSSP5TRsH43OUIOT9cVWtibn57GaK5UNgtDIHAPocdKQ3UDTrBFdsjMELXEUO/7xwoDEFVB/vHOeMDvWaasNRd3zaWGMNN0+/muFuooJ9hEkcl3wpY7slS2cknpjvVqK7DRhyyPGSR5iHgEdQR2I9DzTFvdOsba5eOYIti+2eQqWcOx5O48kknqPp2qO+uLNGeWSe6WQMqSTWSE7sgbd3BB4YYOPai7Ww7wbsr+v/ALomjP8Qo81P73PpVEqPtMNsNXuvOmjMqRXFtETgeuEXB9j6GhzFBcCC61K552hxBbiMDecKHkVSVyemCp96rnZXLD+b8/8i0x+0XaRj5oLZxJOQesgwUj+oPzkdsL61eLR3ON7bJR92Qf1qkt3bIs9vbZP2LarwQRFiu7kYA698n65pkWq2jWEN3JI8cU8ixxM8TLvLDIwD2x36UnZ6MzlO7XLsi3iSF/L2hWI5XPDD1U/0ppVhJuI2ueFzg4Hc/0qBdYsxNPZ3ckmEcruMTbFcLuwGxjOOcUR6hYGSVEny8TRJICpyDLt2fgdw+lc/sW/dv7v9aDU7621JDGA+WIRv723Ib3x2NL905AICxkID+HP1NLHcwTXFxBDKHltmVZVAPykjI+tBO5sjkFlXP0yT/IVnVoxS39Coyd9iVVwABwBUQ/1mUGQ5G0f3sZz+FKx8xscbewPQ+59vbvU8USo5clmcgZLdc/TsK1d6srR2X9aGbtFa7jt+6QqrA8fLg9PaoJiCpJAz5b5x36U6WBlw0YYtjggY5oLB9p6Sq4BA6dcH9M1pXV6bQqbtJFTO6I+781LuWFSG+cn5gpGQCf/AK39KiYbUIHTzCB9BSyRsWyAcbR/IUou6TRzNNNoccTR4RVQoemex9z/AJ5qFlKNhv0NOwgRSwYk+hx/SkdtzZAwMAD8qZI2iiikIaFIY5p5YkYNMOdwx0p4bCkYpgTP8ligHWRix/Dgf1qML5C8/wCsYc/7I/xqWCdVTZLHvQHII6qalSzEitIJBIv97OPz96q19i0r7FKirm0Qo3HTrmqZOTmk1YUo2ClyQCKSipJCnIQGyabRTAc77j7Co4wGuEB6Fh/OlYZWpI0Ecfm4yScL7HuaBoazlzk1aExLqhH8Ix+WaqVOpAeNm6Fev6U0yovUdOx2/K3Hekt41KEscc9qbKvy/SlhkO3aq596p76lu3NqTKgTOO9VriEjkH5SefapVL+cS2cYqRf3ikGjdDspIqoBGoJ69hTXfPJ6UkjYY59aeLd5CowQDUGNmx9soYFiPYU9LcK+4nPpSiSGEKGkRAzBVZmADEnAAPck8VIWRXRGdFdyQilgC2Bk4HfitEkbqKsRzsFjI7moIs+auPWkkJaRu/NT2MBnuB2ReWPtU7sybvI0QStkg6Fm45xmoXw7McMcHHB/z6U+ecPJmIKVT5QQc4Iqo5x3PPYd61bNh9ztWHbg5xyD61Ti/wBaufWpHkODkYxwBTYo/MJJJGPSsm7sybvLQtVScASMB0Bq7VJ/9Y2fWnIqpsCIXbC04wsuCRkd8VGDg5HFWI58DEmfrUqxnGz3GuBE3A4Ippl44FOefc3A4FRPMegFDB2voJUhk44HNRjpQDg5FIkcYJH6CpY4vK+8uaFmAHBx+FKsu5ueR/OgrQZMwJwBimRyAEISQc5DDnHTjH4U6dhu46CoogoO9s5zwBR1Bbmg6YbGfunr60AFjgcmno28APzxwe4pWwg2pzkcn+lanQRSI20r0JHBqv5PltufB2HkAE8+hqw7ShQIiR+OMVWaQoQEbOOp9SetTKxlO1xIWxcKzevPvT5VaN/54701Xj3byhBH8I6H/CmtKzkknk1HQjoSA5GRUaquWaVsKOp6kn0poYjoaJBm3XHZjn8hj+RoEWWmRojtOFAwq5qqkr7uTn6imoMqaUADpTcmynJsnByPmOS1TQMfLZM5AII9qp/XpV2PbEuUOAe/rTjuOGruOYqMDoaeQsmeucdMcDFVpWzcIVyFbBAqRnbyjt43HGfWrTNE7j41HnKcc1wNlbSH4bSXtzZXEckukKxuZb95hMWRSTsJIXPX2rrxNLFLvI6du1UbXRtFt1bytKs4tyGMhYsZU9vpU3TGpok8RW815Law20iufNd3s/tTW7XKhegdeflJBx0Pes2x1S5mUWOkyqjW0Ms0r6sDK67ZWTytyuM7SCC5Lcbeua27i3g1WPyr21huId27bMgYZ9R6H3pJdF0ueCC2uNOsnhgz5MTQLtTPUAY4B7+tPd3GmjP0vXb7VlNzaR2drZxi282G7DeZJ5saOcPkBcCQAZU7mBHFU5/Ed+mnw6m8Vm0F7FcG3gCMJITHG7je27Df6vBAC4JA5rpTpthPqMN5NY20lzFgJM0QLqAeMH27emahbTNLhmuJ/wCzrRZrhWSZxCu6QN94E+/f170NaA7dTGm1PU7Np3uksZYrTTP7QnSGFwz/AOsxGhL8fdHzH8ueLljeXi6gbHUWs5We0F3HJaIyhRuwVOWbPUYbjODwMVqQ+WztKIoxLsEZYLyUGSF+nJqja6faWHmJYWVvaeYcuIIwm7HTOOw7CpdjOTjbRGhkeSPcVV8sx9OR6+lTR7ypTjC1Ii8Hd3FPdDspIfGXZcjC+5qG4dkHPP8AtYp0DkghuB2zUmQehzRug+JFBrh2XFRNnacdccVpNGjfeA+tVJ49nQgipaZEk0RWyGXPmcY9qna3VF3Bs8+lMhlCcN0z2qUzbm5GF7CjSwvdsNBkReOBTEdhKCelOdtx46VJF94IVVge9JbiW5ME9GptxIUj+UZJqUAAYFRzR+Yq7euec1o9jeV7aFOBWAPmN9RTy2WyB0pXhdSNvPrTOlZu5g7rcguQ9xdRIVIij/eMf7x/hH58/gKnqK0kaW3SV+d/zDj+EnI/TFXZUDIHUYPcUws2V6azhacelUXZmfoR6CkSWX+fg9Kkt4xjAOMdTTFQlQTwfSnRlkbj8c0IpWvqWkiGCA7UfZh3Y/lSpJHjJOD71LuX1H51dka2iyuXztOehH4VJMFK7mbCgc+9U3cIpJNVHmdxgk7fSpTM1LuStdYb5RkUjXPy/L1qFELt7d6fMgUAqMetIkQM8jY3H3pjKVbBqwq+Whxyf50kMbSOWYc9vagBFgzH05x1qII27bitExkLUTjBz2oAjjj2jC5NTR5jbPY9ai+0Lu2gVJvFAaopa8WbRrny2dJXUJHsOCzEgKv4kgduvatS703QtO1HTkfw/Ez3UgiWSKFPLiYLkbgSMnC4BAJ47VR1BJJ7ILbhRNHLHMm7oWjdXAPsSoFW7vxDpN0LV9RF9YvazC4KyWchVSAR8zqpTHzdQce9bw0WptFMoXNpod5/wkFho+iQm7sbUMsojAVnbfxGQcgq0WDjHzDGcg4ns5FlsYJI5WnRo1ZZW6uCPvH69arWUuj6Td3V14bh1Sa6uYFhSG4W4EKYZ23Zl4AzIScZ74HJzPYWosdNtrQNuFvCkQb12gDP6VNSxE2WKmtidx9MVDQGZXyvAxWa3ITs7mujKbYbjgA7T9OtSiRVtwVOFD44z6VmWk22UrKx2SDBJ7ehrSSElHt2653Kw9a2i7m6aZUkkUzDJPzHAzViJz5zHK4IJIA/GqTowuYzg8MAfbmp7eVDC7puJGFORjr/APqpJ6hfWwry7mztA+vNOklzlCOnBJPpTgyZyJG/3WyaZPjymPc0+gyvhp5sIMk/oKe0qwAiI/KOrd3P+FMDMkKqhA8xju9SBjA/OjylIAYZqFsQldXAyI0AkmhVpMcHpn04FLcx4smkiwUMgPy9uP8AGmSH5selOlnWCxWNMbpPmYjt6Ut9BWu7GOYZGOT3NW4YPlANIvT2qZCxXCioZDtfQmEcaLgHn1oCBl4P1qLa+eTipASmD0oGNlGxSKqM2TT7i4BbrioqCRGO1Sas2D/v4m/2xmqzruQirmnQ4lQnlUO4/Qc01uNbjGZombuQcGmD7vNPuOST+dRpyAOpJwB61LdlqGr0Q5A8zBc4Uc89APWrMSq/K/cX7oP8z71A+FXy1wf759T6fQUiGVDkcD0xWMPflzy26G7kqfu9epeprMEXLVUMjls7jmjdu++WJ+tdXMR7QfJOzrtHC5yRnrTlupFjCjGQMBiOagPtSqu4nnCryzHoBWcp8qu2RHmk9C3Z3DnzYixLOuRnnn3phjL7ucZ4Zscn2HoKZAyu2xMhV5x3Y+pq/Kyna+wEuMnP1x/SogvbLmlt2/zOhNRVkUZxtAVRgYp2EjTY3AI61LMgkh+VcHcMEmmOmQoxnHrXRbUztqyjsw3HIzUqxtJ0GaklhO75F4x2qaEARDFQo6kKOtmV03RSDcMDoatj2pkm0rtYgZ6ZpsD7kweoqlpoXH3XYlpCAVIPSkkyF3DqvNNWdGOOn1plXWzKpGCcHNXrNz5eyU/u26e3vVPYGm2qeM1cHHSlHczgtbiupRyrdRSVKx8yDJ+8mBn1FRVZqV5lZ5AAOPWh4gkYHViasVWdmklwo6cD2qGjOSSG+Sx+6MioZINwwykVdc/wikVcn2o5Q9mij5RiHGfxoXluavSpuPPPp7VV27WPGDUtWIlGxPazGOTg4z0rSSZZAFPBJ5B6Gsartq+9lz94EVUJdCoPoSJeK1xKkPSFth9M4B4/MVI7eZh2G1QMY9aq2sV1Bb7rreskrM5BbO3J4X8BgfhUhJJyTk1ozUeHAOdi/rVkOCqhyNzdivX0/p+VQQQGYnBwF61OzY2IyhWVhtA5yOlCEOjiWP52QDHUgk4ouWR0MTYBPOfTHehnZ4w8Gcg8jPJoZw4VwNrFefUDNUBVfIEZ6Hbj8Qcf0qdMKNyj5TzyeMd/6/lUU4O0Z7HH6A/41EGCEM3QHmp2YyWcOCR1QH5TioasTXCxIjcElQBg5zgkVVRty81LauJMmt+LiP8A3qr3ETJI6E4ODgirEHMy44Pb61Jf4KAgd859jVLa4yrEFaNdigKRwMdqmjhDfKOncntUEXyMQvTaDjP1qeKTyycjIJHeh2uJbDLhhEqoqnaoMmD3PGP1P6VLHK0R8uCQEgc5ABJPfmq90Q5fbgjCgY/3if5VEs37reF/eKAN55rmg/3spfIqb5YpFxrwSXBhniyQdoZeCKeImQb42DR55YLnH4VBZQl2aWQfN0GaumUWpxjdnGTn610rXVkRuEZyoAPHr1wazdcGbGK3xj7RdQoeMZAkDN/46rVfkaNkSdFKEtg4rP1Uh9U02IHJUzXJx/sp5f8A7Vol8JvQ/iJ9tfu1AnLE+pqNEDMSeoNPpV+lZ2TeoNC1HcXCWls8sm0naRHGZAhlfBwik9zUlUtRtUu8xC8hgmktpIRHNzuRyN20Agg8AZ56dK2JZFocj+QY/ttzKkIKlZBwW3MOSw3bsAMQTxu6DpWmPvDHWopxNJhpcbyMsqsWCn2JAz+VOtXIYluQgzz69qy9p73K0Sn0JJ8ee+PWqgT5yF65wKlDZc0kaZcZOMnk1L1ZUiCzvLGSaT/TbdvKQySDzB8qjqT6DpVlby3ufLaK6hcSkrFtcHcR1A+lUPsF7cR3jXMVuss0iNHJ5xYbY5Ayx428A4OTzyTxUc2jTXty1xO8UEjzGYeW27yWCKqkHAycrk/lVRulsCVjRieL5MTREzsREA3+swOcevQ1JA9v54S4ZfMkyY0LAFsegzzWIui6iY7V3uLdJrOMGJQCQz797c5+UHCr0PGa1ZLcSahazKUxBLIST12lWGB68tUS1lG5a2ZbF9bXcBFjNHKinDGNw2PyqOqNlbzW091PdCFDMsaqkchcDbu6EgYXkYXtz61dLqq7ieK2TJI7hyqhF+81QQQR3Pm+au+2jcxlO1w4+9n1RT8uO5DZ6U2WSV3UW523E7eXCSM7OMs59lXJ9zgd6vRQpAqQwjbFCoRATngep7n19zWb1ZTbhG63e3+f6L5kc9nb3svm31pbzSYwGeMbsehPUj1HQ1UvrCafUYrsXCRFCmWERDgKc7QykfKemCDjJxWnSHoadkZNyaSvsYMOjCEY+3SOZAvnl4xhmEgkyMYxyX65+9V230aOG1ureG5JjnuI5YgVz5aqVIT6fLgegxUzgCTB4Bp9vIsco3dyOalWTsZqpJOzIpdG+1as+oC+KyxyxsigKURFGNp75O6TuPve1TPYzxalNPaXccKTsnnAx7mynGFOcDIGDkHHJrIXQJxbyzERrcbpdscUQRnDS5+dsndwMjpjNNm0TUDIY4l/dXFzdyyB2/1bMsyow9mDrx2x7mn8jb5mtpWifYdQW4N28kjownV1GHZm3ZXHI+bd1zwaivPDqzaZYWtxdssNnZ+SfKUAu20Lu5zgYB9+etQtDfvew3506cJEbdDFlC52LNuIG7GP3g706a21K68QLqn2YxwArbiORwJBER8x2jj7zZ69Ep6WtYWvcqDRVMz3Mt0HuJJCzNsO05iCH5c4ByM569qtReH1usSRXJE8VzDMSF+/GixAofxiB9q0XjUQlew70unHEkmOWK4C5xnkfrUpK9mZc0k0Z1jpH2Kf7Sbp55JFdZ1aMFSxbdkADIwc8HPBq/wxAR9znjOfuj+lXXiWY71ysvXK8bh/ntVSTcWERmOX45Axz+Fc86VRNtWfmdHPG2oQkSbdgwu/GfYYwP5/nUBPlSNxuB4571aikW2tweSD1OCNx9vpUE67hvH3eprdRUYpI5pvm97qPLysqMqfMw49AB/+o9ajjjaKZXk+XaTnP0NWonR4chlG3jBJH6Ul22QF7FDj8doqK6/dtmlOK50wihK20YCBmHU4BOcA0TEjjjcF55AApQw24I/I0hCdlOc9z/n1rdKyshPyKjIW2qnzBR1xgdaYyMn3hV2gRed8gGanlIdNFCip5bWSJsFT7VBUNNGTTW4mecVLFF5jjPC55OOlR1chZFhyFD4H3c800rscUm9S0YE8siJAVxwc/wA6WyxbqwI27eSSOvoKRJJDGpjAiT1c9fzpLmfCCNmBxyzY6mttFqb6EFxGXjYx/MOv/wCuqPTrUpncSbkYjB4pJh+8JHRuRWMmmYyaepHRRRUkDkG5sGmsRvIFFFACFc96ekhT3U9VPQ0wHI6YpaYEjIpXfGeO6nqtSwLuXy5F4b7mfX/6/wDhTLbBkKsM5U/4/wBKdMxMiqB0Oc1S7lpaXIZiVPl+/B9qlt3YAqv546VanhR234z0z7GmAADAGBT5Xc05Xe45jupijYp5/GnVFMSdqD+I81TKbsiPb59xux8q/rVTxFez2Ghzy2W5ruTEFsi4y0rnauMkDgnPUcA1pKgRcLTRcQvdy2gbM8Ucczrt6K5dVOfqjUraCSsjibM/YbNNFa0uLNbXU7SW2iuXRn8l5R3RmBw4k78Aiq8ut3c1/pt+LwXmpxLfv/ZWI/3DrE4VMKN/YA7ic9sV6CLbDZ24wO4zim6chumin2OFkVX/AHkZRxkfxAjIOOMHmlZ7BdpnF2HiK+Ol3M9zqkTRt9nCXCS27vE8jMCCQAiKcDBcMRz97itfSNUk1nwPqYu7hysbXVu93aAPIyLkBxsADMAf4QAcZArY1XV7awmjgljmc3BcpDbWzSlguNxIUH+8OvrU+nXUOo2JubA742YrkoUIYNhlKkAgggggjPFUlra5ZxNvqNjo63v2E6aHjtYh9u0faIiGlVB5kZOxG5yGJYAbj0GDNo2s6nrF1FZLqxVVvri3a7gEMjyIsKOvzbNmQXIyFxx0rtfIdEbCKFYncAByff1qJ5EgmhjdkjkmYrEuMFiFycf8BX9KLMLmTpN7Nf6LZTXjK8zpiR1XbuIYrnA6ZxmtYADoMVCsTNJukXCjoMYqekjOOt2FVJxiU+9W6guV6N+BpS2Ca0I0hZsEjAq3io4W3Rj24qSmkOKSWhG8Sn5gOajMag4IH4VYIzG2KjdVVMk8+/epkRJakLRAjjimiHHenI25yO1WQgGPUVJCVyqIsHk5pjklj7dKsPgOccUwoCcmgLDI4hLkE4wKLeAknzAQPSmhirZU4qQ3Dn0H0FNWGnHqXImTfsJALcdac/B+ZfmPJz2rNyc5zz61LId7E+aApOQCTxVcxfOWTKWLJ/DjpVORQrkKcihgyYO7IYZyD1plS3ciUrhRRRUkD0CsMEc04L95OoZc/iOajBIPFXYUCMO7NwTVJXLirlLfsQ4HNRl/l461dlhV+SuTUEkarygGO9DVgcWhqJ+7yevarkaDYBIPuiq6nEanGcHNWIwJ15GF9/SnEqFhMIESRsscHavtk1AwkkbLvgdgvapZ2ZpAsS8AcZ7CgukagHDN7VWiLVkLGvOe1DpH95lBx7Uz945+Y7Fp3kfMWBOMd6Abb6EYuBuzsFIz/vfMX9ah53e1WIVRl55Pf2qNWZJuWgLckSAkEAHse1KLZ8kyZxnAPrSNb/Nhec9KskY+UdF4FUlfcpRbfvFWON9+RlR60ssJX5lLE1Yop8qsVyK1iosrIx45PrUwb93zyzdaZcMpOMfMO9QCfHFRtoZ3a0LakBcKMsabJlID647UoYKuF6+poZSBkmqSNVHQznuNnHU09XYoCy43DIplzDmclOAetXdu63Ve/BqeUy5e5VVc/SpVIHUZp7RbRjvUfSkSLtJBIHAoDFTlTg1YhZWj2d+49aieFkyeo9aduo+XS6JDcDauOvenxyiQnAxiqoUt0qe3BG6mm7lxk2yY4HJqpc2qT28sYkKGRSoIHTNWHbPAqlKwk1CGMtgRKZT9T8q/+zflVmjS6lpUjiULEuAowPakk3OpAPJpQcjIpyrkZJoCysQxoRy2M0ojUMTjOf0qVmQKc9v1qsJAsxJ4DdqnRaE6R0CcYYFVwO+KQfMwA5NSecp4UFvwqSOABt/TjpStd6E8qb0EWEFiSCFA/Om+WtTO2eB0qJnCnBpOxMrdDLmcvIc9uKdEispJHOcU2b/WGprZC0Zx68D1pC3FAwAB2qKVGMnqD0q1BGrSktk8UrxbZSo6Zo8wtpcYqljxVqOLaOPxNIiBR70rlguen86AQ6QBVPOeKpTqWGAcVMST1OajlXchxwaBXK6w4OWNS0yMtyHB471NGAXGQSPagZIhHzNjvxmgKz716s2MAnrz/wDqqxFEAgLdugpMhmJwMdgampF1FZG0ZWkVyCGIIII7GipDGSFJ/hXDd8cmmMpXr+B9ainPmWu5FSnyPTYSiiitDIK1LQ+YiCQ4lT7hz1HpWXV2xhfzUlPCjJGT1xVw3LhuXJ0/0mNwMCQg89jUM0YhjMUalcnO49/pUyzSIqhgJB7nPepjENrbASMZ8s+vtW1rmxkrKEQB92R60nmmdwm5Yx6scCluM7QoU5z1x0psFn506hydmecVlrsZvm2LixQ+SXVxL5a7VI9Sck1VmZ4/mU/L9OlXFkjO1PKG0cKueBUJBHUY+tU1oXbSxRkaTy92OPSov9ZjPT3rRKKeoqmRtYgDGDUNWM5Ll2FRN30qUyrEuBwahDEDg0JFuO5+akhDvNJ54pGcnrxT2KRjkCqs1zuB2c+/pQBXYbpyD61MAFGBUUS7mLtU6qWYAdTQBNb2rzk4wAOpParc4aztEVRnzOWcdDzwP60xjsAgRyqqC0jr6/5xT1uJghjVlmUjlGGD69DXP9YSk1bQ6lR93fUzy5brU8amKPPSRhn/AHR/jRJs3jfbqDjjqtWIIxNPtkYKG5PsAKNarS6ERSh6lVEZ2CRqWJ6AVN5EsUgSdCAQSFP8Xtmp/tVvbq4tEcORje3aq32mU4DnzADkBux9jWtWPuNR3Ip8qknIZmNl5Bib1HK/l1FL5Mh5Vd49VORTHy5YnALHPFVrmeCxtzPe3EVtDkKZJXCgk9Bz1PtXNapC3KU5xk7NfcXfs8x/g2j1Yjio5DvYRQ5Kg8f7R9ajtfLvI45baVJ4JBlZYmDKw9iK0BboGDBOnSmqdSrrLYFazUVYZBD5QOTkmrTswjjAJA2/1NRjn7pDYJBwc4I6ikvbmCztBcXkyQQxoN8khwFy2B+pr0IpRVkUlbREjklUz6Z/WmVUsdZ0zVsppt/b3TxglhC+4gZx/OrmD6GgYlVBIUkOOmelWJX2LjncenFUkdJfM8mRZDFIY3287WABI/WpkZzfYe7l2yaRWKnKnBpCMdaM84qDItQsXjO455qKWHYuQcj0qW3x5fHrzUU7ESFcnHXFU9jR25bsLcZkJ9BVqqKsV+6cVJ5oEQVM57mhOyCMkkXYyDFLjnAH86idwi5NFkv7qU+q9PxFDxh8bu1Xui021ciW5H8Yx71E92xb5QAvv1qd0wMADHpioXtwenymp1E1Kw6NxIM9PX2qcFRgCqSfu2yOnerUYy2e1NO44yuiWobhAV3jqOtTUhx3x+NN6jaurFGmSXDW5Ty/vSOEH8z+gNXHgVuUOKovHu1A5ORAvbpub/6w/WotZmPK4u5vSSi5sg4IypG6qtQW04jGH6HjHtVsRDPJ4P3fervc1i7oWGbyVbHU4xTVbdJud8HrnrTKKZRedkEe4SYycjjNN8wOAZExjgdjz2+lU6cJGHfIxjBp3Akd90O3aEXOVGeTWfKW8zDHjtVhw0kgZmOOv40x0JjwBk5rOd3FkSTaF48sqzA7V5X39RSxcLUW/b1X5sYzT4Wzms6clewRauTxrvkVfU81buF82HHJOOMDHPWq9upaTPYDmrLbQvzHGCSDz6AV0LYozYz+85/uj+ZqQ9eKSeBoY1lHzKp6juO4/wA+lNcgjGcKQWLD+6OtTUkoR52OKu7DRyQR0aTI9wFx/Ooidsjr/eIqwo/iIxxgD+6PSqwJknyPX9K56cWo3e71FVaukjVgOIiFxnHGR3PFRzqUABxzjgdsdf1pgdsKq9jkYqWOMSSnz2y3cV1bjGzHbDEn+zu/Os4tv1yUnkQWaIPYyOxP6ItaN1xOVHRQB+lZlv8APd6jL2a68tfokaL/AOhBqiRvS2k/L9UT0opKUULcQ9RlgD0zWLcomoXEseoWQjPnR2zG3njl7HqrqrDiQ8jJ4yOOu1GNzgevHFZem/6RqJu3ykhjZzFKX8yIn+HbKpO3nqjKvA4rZGbNRjuYn1NJKdkAA6t8x/pSqu5gvqaJWDsx7dvpUvVFFUOOg79amQfKD61EVzGeMmnxtiMBqyj8WotblgbWjVd20jPUUnlMfulW+hpmaAc1rcYrKUBLAgD1FRRjnJ6gfqeTUjSMqkKzDoOD702P7pPqTWEveqpdtS1pFsjm71FHHvXc7bUXJO44AHrViQdO5qBlW4dotubaFh53pNIORH7qOC3qcL/eFU1qKMdeZ7ILYgFrxgVMqbIFYYKRZzkjsXI3fQKDyDVsOBwOag8p5iZZD15Oe9OWP5flyRSWhzyqOUrtehOGVjgEGphGqJumzz91R1PvUUMIg/fSYLN91O31NKzF2LMck9TVrzGrtajLu3BVXTkEZH9RVFhkVqx/PGYz16rn19KhktC4+7g+tKUb6oiUb6lSG5KfLL07H0q+Cs67ww4+9z+tVTbOFYPHkDqRzxUW1U5RiD6Ckm1uJSa3NhWAII24A4OQP89KjnmVcMWwFB+UjrWY88jxhGOQPbrTA2FIpufYHPsXvkuIyyDj+JfSq8SCO9iDcrvB/WpYGAAaPg96tFINoZ48lx1B+7z2/Ki19Smrq4kJDRHOdysd2OobNI5E3zoypN/tDg+9MnmVbhFi5DybiSPwqBpmnYFG2t02nv8Aj/jTcraC5lsyKdJUbbKANoyMAYx+FR7jjGTj0q0u272RuSkqggHGQR15qpWbMmFWiPlXzGwNpBb0PB/pVWtCNGlHAzxz7VLhzxcTWi7O4wMQQsgCt9eD9KdTpIYYV+aQ7cDKKNwP58VFHPDzuRlXPY5xSUpw0qfebvlb0H1MFK22VHL9foKjURuQAxRj90N0b6GpLqcQfICRtAGQe9bxlFq6ZD03GJK6DGcr/dPIprJbyNl42X1KNSRXUbn94ACPXvTmTA3LynY0bi0kIRDHhYkBHq6gk02SWRceWwQ/7KgVXnkIkG0420wysWJPcVLkZyklohZSzEM7l2PcnNKjb1MbEdPkJ7H61GQRwaSoMxSCCQRgjqKtQwrLbAyHGDwf6VEjJKwEw5A+8DjP1qX7QrMsUa/KD1PeqjYqKXUhnjEbDbUVWZbZvMPPynkZ54pfLjjjOfTkmhx1G4tsq0UVLAu6Q5GRipISu7EVTx2xkC4bk1MbWJT8/B7gdqeCscZVMgdyT2q1HuaKHcgEccMuWlB4OABzVjKdg35//WqhIcyMR61NHOMBW69M0JoIySdi2zKBwD8yjqajp/3o/df1pCNsfP8AEc/5/OrNRtJgEgkcjpQc4461CZijYfB+lS3YTaW5PWPPLc2Pia6ul0y8u4Lixto1e2CHDJJOWB3MO0i1p/aEx3+mKja5Y/dGKLoXOkYUdvqC6hbWradMI4tYlvGud6eX5biQj+LdnLgEY7H2rOt/D1/Hb6LJ/ZTz3Ntp9nAWkKMkLJ9/5tyvEw7shIbgYOMHqR8zDPc1n2ni2P8AsnVwbMxXFldOixM/E8SzGISA+m5GBHYj3FJWe4Rk5Mtatp13fa5p09pdXFnHDHcCSe3EZYbvLwuHVhzg9u1ULzR7jSpphptjdaglzYTQu6yoX893LkvuK8Eseg4xjHSthNa0waobP7UPNVmTLRuI96gsV8zG0sACSucjBqv/AMJZoTQM7XbxosQn3NbSruQsEDjcvzKSwAI4OfrVaF6nPW3hvVE1+2nvIpyVltnhnjjiPkxoiB4y5YOgyr5VQQwbuScWdP8AC6WVr4al/seFrm3nBvGVEMiFo2AdiTyFbb0JIwMDit59a04TwQyXEqyTlAu+1lUKX4VXYrhGJIAVsE5FXGlRWEMYzjqcUrJCbOO0TS9TsvE6Xk+nNZq9vOt2wWMJI5ZCnIYu/Rvmbnk9MkV1YuR3U0b3km2ggqPUA4pZbfcu6Icjqv8AUVOvQzbk9USqwZcryKjn5TaAST6Ulu2UI7g1NVbor4kRwx+WDk8mpKKKZSVlYUcgj1qsY2kbLHj3NWR0NRyjp6VMjOYxlSNeDURuPf8AWmTP6GocE1Bncl3bjmlLnHJ4piK3v9KVuFOaCQByOKWkjUkcUtIAoHXnpRjjNJt56mgCafKtswAo5XHcHvnvUVPWT5Njjco6c8j6U5YlYgq3y55B4Ip7j3ZHgnoKSrZIWNsDgVUptWHKPKJzu9qt2wYt5r5IXpk9TVWpIZmiYfMdueQO4oW4RdnqWz0qmWO3b+dSzSsuApHIz71AOTzTkypyT2JEOI8mhZWW3whwCxz+lRS8fKp4q3HDGsKrICxAyecAZpK4opvYbEU8vDMMnrk0o8mPkY/nUB8tmOGZR2yv/wBel8ttp2Ycdcrz+lO4+ZjxcKZjkEDHBqdzvUBPu9z61VQRptafIz0UdcetWGuINuF359cf0pp9yk7rUgVP3pLrwD09anKhFLKoBxTYZFYcIAR6nJqYsSAPlGDnpTSVtBpK2g238zzAZhhR3x1pzIy/eBH4U3IHU5PfJpYJT5uB/FxTRSVkFIzBRljgUp6nnPvUUqsWBUBgOxoYN2Q2WMMN6nr+tRrFHwQM++ac0x2EMuG7cVGjMq4XkfTNRdGd43LCruNIQQcGoVkdc4PWly5G5m7U+ZD9ogaPLbz07ip4xsjDEZYmoY/mO5+eatDB+bsOgpbhfmZAwczAnGKhkGJGHvVtsDBY4xUTtGfugMzcU2lYJRViFSVIYVZ8wiENjcSKjwAuO1JBIR8m3P07VKJi7aCxxuevyjNOOBwvA/nU1RyEZ4q0rGqikRtngL1JxVcrHKr3EXPzFGYjGdpI/LOanmleG3kkRS7KpYKBkscdKLe38iyjjY5KqAfc9zQ1cTjcSJw0YweQMVKQAoJbAPrUQtmViw4A96SVt3HU/wAqV7InmaQyYlm+U8CoSSetTxruchuAOtS/Z0fOMips3qRaUtRtttK4Hbk5qUsW4A4pkUOHODwPSrCLu5B4B4FPV6Fq7ViA8MQeCKgkcFqtzMu3a5AJ6VR3EcAkUcouTUgaAu2c4BHFWre38oHdyeoNSIo2LkdORTx1GapIuMUtRwiwcgAZ60hjLTknjHT3qUsAwB79KikldHxgHPSh2CVrDcsqnP3u1NKlsbuB6U8ctufn2Han7MjI/AVO+xnq9ERnaqcD60RKPs7FuhpWjYr8xCj86kG1VVQMg8UJDjHuZ7Ljp0qxboMcnFTNAjdOPpTGgKrlXpcrJ5Wh0sypHhetNj4Ueo61SMm+TaO3JqWIEuMfjVR7lw7lpmHVuMdx1pu0ucYGSCT/AEz70gOWyOdvA/3v/rUpdoG24yDzk9652lOrddDeT5YWfUhdWTqvPb3pM56U+SUyYzgYpla6HG7X0Cr1lM7uUZQRsIBxjHHSqNX7AdCOoDH8cVUNyobkhIIXCDp7+tc9aa9eyeMJA0iDR55pbG0woB+0RKGZt3fcfNXr/wAsveuiEk77kjm2OVYKzDcFODg4789q5tfA+mQaXaw2myHUbZklTUfJLSNKhDFyM87jnIz/ABGtNehurFtfF0cl4fO0e4+zJqH9nNd+YmPNLbFO3OSCSBnHGaz9L8VX92kw1C1+whNcSxjNsyEkbh8jZB47EjBOeMVqnw1/ob2/2xvn1hNS3eT0xKsmzr/s43fp2qCDwrL9rnH24C3k1VNVjXyDuDA5dSd2CCQMHHHPWj3rj0Gp4sBuY2TTrl7KW+FlHdmRArSbyhO3O7aCGGe+Knh8RW89rY3Rt5At3fvYKpIO1lkkXcc9v3Z/Oue/s/Uk1W00ixhuGsbfWPtmyTT3Xy08wyMfP3bGXLHAA3cgHGK14vCOoxz20a6lCNOs9Re+iiNsRIxZnYqX34wDI2CF9PTlK7B2HxeJIpdeh06WymtjdPIkDSOm4lFLfNGDuQFVJBP44zV2dcS/XmsjTfA95p+pWE/n28sOnzyyoY7QCafzFcHzJC/JG/qAM45HPHRNDPnLWkpI/wB0/wBafJJrUidmrFHG1vnB+lD3SJwMk9hT7jzS+17d1OOmOcVEtrI7f6lwfVgBWEmo7tfeZKMm9ERyOGb58n8KkFuZITjoRwBVj7I5AaV40A/H/CpYDAmFEhYnoGGM1Ht4XsbqnLsUFt5OFCEfhVlY/satI/3+iA/zq284iU+UitJjIUZyB64zVBHLzeYTvYKWzjpwcVjUqxlF8pUafJJX3AEoxEgYhhhgeD65FP3SIwy3mLjIzyGH0pokJG2VmdD1zyR7inqMHAJKhQoJGM0QU1Utb/ImTi4XT/zB2CkZZjE45DHJX/8AVQwKRtuOckKSO64z+tIVMkfyjJDHOOw7f1oSURxtHKhYdh/SirTcXzRWnYdOd9JfeRE5OaljgLrknHpUQ6CrVuwMeAeR1rrjruc8Um7MjNs3Yg1m65bqkFpM73cTQTmRLm0h80wNsZcsmCSpBI6cZ6jrWy7hFyar32oxadpV1qEoZo7WB52VPvEKpYge/FVZGijFM4+9uNRbSUH2W8tXlNy6XFpDcQieQEbHMcfzhm5OHO3gkg5GLkS6tc2s2pTy6il5HLYNHGskioAyw+aPLHykHL5BBxz0PNa954psrLQbPVmE7x3rRpFEoG/c3JBGeNoDZ9MGrMmtxRX0cEihEZ50eZ51xGI1DEnGcD2JBHenZGhzkMD2Eb28h1SKyXVbg3pie4Mmw7jEQwO7acgkoeuMnrXS6BJef2RB9safPmSiI3GRIYfMbyy4POdmOvPrzmp7fVNNubeeW31K2lS2/wBdJHcqVi/3iD8v4099W0ZdPjv5dTs/sR+Vbo3KCNjnoGzgnr+VUkDOatlvrfwQkaJdQ/8AEynNwIVYTCA3chYqB83KkcjnBJHOKgt4r291aztkl1YaO93MI2eaaORohAp+ZyQ+3zN2CxyfpiutedBGbiSVREEMhlByu3Gc59MVl2/iSG60S21KKCZUuLlLZopzseItJsJbr0znHcUgMCEatZW9hcI2q3c8tlefaEeZ2LMgHlAK2VV+MA7ec85qpbyaibTVYY59RjtVNrKkgiumOWZ/NAZyJdvyrkp0zkAc11Ca9pk2nPex6taraJM8LzSTqih1YrjJOOcZHqMGnXF/bwvBHNqFvE9xzAr3Cgy+m3J5/CszNyd9itos0smiwG4S4Vt0gX7RIzsV3nacsAxGOm4ZxjJPWrm07s0oRnkIbOe+an4jX3pGT1dxschjb2P6VJI3yHd1PQVWL8+tKDkU76WGpNKwtTRMiN0LHHYVDUsDqAcEbs4ojuKO5dt2CyLleDwR9aJo/Lb5eVPKn1pIpY5MMqjjtnqfY05ZgiiOTO05JGOla9DoIQ397g1HIqMeRu+pq00G5cxkSD26j8Kr+WfalYNxVRCv3B+VKqKn3RinrGQo3EAe5pdnoyn8cfzosFkRMGJ+X+dRtHKf4h+FWCpXkjj1pUjZ87FzjrRYTVyi0Usalg54681HDM0tsJCmBJhiccnjv+GKs3qPJaPFH1fCE+ik4J/LNSoRtwowBwBU8pPJ2KsS75AD0q+obAeTOBwo9ah8oCQMOPapAxXocU4qw4xsIzcknjJozTjsbkqc+xpCEPUN+dMojaQKpPp+tRPI4YMAQCMYNNnP7xk7KSKnWRWTI5IGcVO7M78zsJG7MSGTHvUlNRxIuV/GnVSLWxFMu4Bhzikg6mpulIAB0FRyLm5hcuty1b8Qk8cE9fpRE5ljcOepySf8+1VwxClQTg9RUtu23d9Qema1TKHtcKuYimQSBj1qiBscRjnY+FHqD/8AWz+VW7lSArk/dbrjGRVW6Jjupv72z5cdhnk/rWVd2pSQ4fEiPflPLTnqAc9u36U+KHy+Scn+VV422yA1dogtFczTUnzFoFICPlB+XkkkGpICrBpAX6nK5zVWdiZmBPAOBUluVETlwSAwPH41snqUMz5t1nsz9/rWTpTeZpME3/Pxvuf+/js//s1a3ngRTTXUu2FELSsTgKoByfwFZ1ijpptokisjrCilW6jAwM++MZHrms5bnRD+G/VfqTgZpary39nbOyT3KI0ZxIcEiPv8zAYXj1Iqz1UMCCrDIIOQR6g1UbClGSV2iK6eOOxnaaVYl8srvaURgE8D5jwDk9fWqehoqWDPFcJJGxKhI4BEqfMz44Zg33+qnFWryO/eMNpc7RyRhi0S7AZPT5mVsY9OM56jrUkBc2kIkkmlfblmmxvLd8gcD6Dj0q+hn1J0G2Jn7/dFRVLN8u2Mfwjn61FQUNC7aCueop1FRyjuNHTApRTQfmwaf2pLcBknTHduKQNtXI/iORQQZHIX6f4/pUXm/aY99rJ5dvyDdgA7vaIHhv8AePyjtu5xgpJ1HLtoaqLcQdpDIbeB8XJGZJAMi2U/xHtu/ur3POMA1ZihjiiSOJdkUY2ouc4Hue5PUnuagTEUKRW8Zjj+9tJLEnPJJPLE9yeanllEFrLPKDtiQuwUZOAM8VcJKeqMakk3yrYtxwZQPJkg9FXqaBFEwzvZMdQwziq9lfR6mHT7PcWrwAZWULzksuRtY90arBgbacPwOTmt7WMhJJQzEhjtxgKahpzKFVSDnNNqWMQnAJPQVUeRnbOcentViR0HyuetVn27vkzj3rORlUYscjRSB0OGB61fQRXSmSNdkgHK44/CqS27uBjGT0FXbWIw7QT/ABglu2fQU43CCaZSmAViAOvNRgE9KnvE2T8dCOKWNF8oYb5snj1qWtSGtQsQjSlXzz05xVy8BjhRU6gfxHpmqlpC8lzwvyA/MTxgU++cMmdwJdt2Aeg7fzq07RLTtErvJtkXGG2gfTOKQS7WBWNVIOQeeP1qOis7mdxyO0bhlJUjuKt3kfmYeFC4AwZFIO76gdDVKlV2RtyMVPqDimn0BMTHfHFaRcC3RQcbmOffFVVufMXZdF5FJyG3crUitz5cYaNYycnPJJ9/wqo6Fw0FuTiM57gfyqrHEXYZB2+tOnk8x+uQO/rUkcyAKgz6UnZsbtKWouzaAgOFJ4/2W7H/AD61LcjzEDMNpZQSD2P+RTSA6kZ/LtTZHeVQjYDYxg9D9D/SsXalJvo/zOj4426lSnxysh6kj0zQYmHB4b+6eP8A9dSC24+ZsH6VpF82qOXkknsQk5JJ6mkqUwODxyPWoqCWmtyxMi+SjKPmzyfr0/lUawk8t8opwlaIRlccpgg9DyatIwliVpMA+gXtVJJlxSbIDEhiO0c44p1tGrqNmN3fJxVpo44V3SnsMLnBH1pBAHP7lgQT0PBFXy6mlle42T5cR/3ev1qpPIrLtXnnmrUuS5DAjsAR2qrNEBgoOScYFKQpXtoRiJ2XIXIq5p8OGLvxjmm26O6hQpyOOlWBN5Q2x888k96IpLUUYpaiTxlHJzkE1UmjZ+VP4VYmm34LcADgVArkqWPAP3RTdnoU7PRjBGirhhlu/NPSJCoOORSAFmqaNQDjqME8/SlZD5UPDbE4HLevpTJ22yDvubv6Ugk8wkYxt4FR3hwV/D+VNvQTelxZAo+Z2I9s1VI3N8gPsKGYt945q3Z8RsUXL56gdBUfEzP4nYbHZEjMrbPUYyRTRbDdy2R9KubcR/vDgZyB3P8AninxxLJH5j/Iint3q+VF8kSKK1Eq5b5I15LVzmq+F47rSUt0uzDPFeTzx3Cp1jlnaVomHcYIH1UGulmnMmFUbY16LVG6DZX0zRKyQ27K6OdTwjanVLmUvDJb3Es0xVom84NKG3ANv2jliQdue3vVSx0vUtUvlOoMYILWyhtkkltDCzMkySYwXO44j5K/Lk8ZrqFUt90ZoII+8D+NZ3IVSSMnXNAk1bU2n/tCIQtLBKqSws7xeW6sVQhwoDbeflJ5P4bHmESMy/xE0yihslybLcMexeep61IelVI5WEg3MSO+TVurWxrFprQrb1dsvlJP7wHB+oqwuSmTg+45FBUMCD3qCJJY5Mqcc889aWxKTiyxRTjgruAwc4IptUaDicRjNVLq4VVxmnzzYXYOvf2qlJD5zAc/hUS3MZvWwkO6ds4wM8VbEQTgjmnwRCGPJqKabk1JOyHZUen4VWkO5uKVST24p6KC3pQIFbauAPxpASetSSADGOtR0CLEMe1dzDOegp5RZD8ykH1pICTHycjoKk3D1H51orWOiKViIWy56k+lIIXh3lhk4KgA5z71KHVt2CPl6k0glaWZiB8meuKVkS1HoBAjhI7YqoEYqSBwOpq1KpZAo7nmnFf3ZUccYoauOUbspU9UIKs65TPOPSpJI1WMKPvZp8GQpB7GptqZqOtmRmPc0jPIGIBb5ec1DVxEEAL9+i+9QmLK/IjMfYZosJohAzKn1q7KpKEL1wB+lNW1CYLthvbnFTOQSMc4GM+tWlZGsY2WpVjt+cyflmmyRFH+Xp1FWCwDYNRznKYXH50nFWE4K2hXABcs5JPqTmpfJLKNq4+tUxIXkKrnitMN8vzcVKVyYxvuUwdkoDDkHNXFbeucEfWqinzroEdBV2qiXBDDHk8HFPixGwJ/MUUVRYrLt9weh9aYrq33TmiSQIUVjgYLdP8APpTIAMMw6E8Ur6k31sR3GfMGemOKLY/vCPUVO6B1waqoGEoC8kGpejIatK5Yk8tfmdck9KjaJ3HGAO2aLhcsCTgYpsbMsg2ksD1oe4O3NZjghjXDdetPNwgHAJ9qJwSwUckiknQCMbQBg0arYNVew0pJN8xwB2FRxj5+e1WIW3RjjpxQ0SOc9/ai19Q5bq6K8knZefUikRyhypqwyIsZBOMiq6x7hySB7UrO5Li76FkSAxgjqRUXmLv2bhu9KciALgcAVVcZm39AT1FW3Y1crInuJcXFvGhGZGO7PZQCf54H41K1wivtPPqapmJZrxpGcDamxPbnJP6D8qcLSTHDBvfPWk2+gnJ9C0zBxgOdp9KaAF+6MVWjhlikOQSe2e1T7JcDJA+goQJp9BqiR5vYHvUsg5C9h196iO8Pt3c+1TswMa/3u9DdxOV1YZu2qecCm+ds+4eali5DZ9cUyaNduQMH270rO1ybO10VZ5S75c9KqGZ8n5u9WbiIbsE5HWoSkS8Hr9aWpOqZS/t3Z4lXT4rWJzLJLDA/2onMiKWIfCFVGFPRmI7qKh/4Sq4tfCumajeWlvNcXFiLuZVuSmV2gkqoQnJz0ICjpurbTw/p0WppfJFMJoppJ0U3MhjSRwwchCdozvYnjqarN4U0trWO18u5EMcLW6ql5Kp8o/8ALMkNyo4wD0xir1OhWTIptflnhvmtrVo7S1ntoluVuAJJGk8lwAhQgDbLg89uOuVWPX5pryH7RpqxWk15c2kc63ILF4TLklSoAUiFud3B9ua0l0iwS1mtlgPlTSxyuPMPLRrGqnPsIk/L3px0nT2hjieDKRXEtyqlz9+XzN59wfNfj39qLA0mjI0jXl1i9ntXgSGSOFZ0MUxlR0YlepVRkEdtw54JrZJO3ljxVaw0XTdLnae1SYymEQBprl5cRg5CjcTgCruRnIAHv6UuVkOOug4DKDd1xzTFYFmkbhRwKkzVTaXkKr60PQJO1i2rB1yOlUbidi7DdhRxV4DaoA7VlygPeSITlAc8UO4SvZEcJBkcjvVuIgggjgDJ9/QVWWLy5vlOR0q7AnC9PmbJ+g/+vWNVvlUVuy6Pn0J0TGCcZHQAYA+lEsfmL7jpUKzHzuT8uanSRXzt7VrGMYrliLmU9ymBlgPU1aMcfGQBioWiHnhF6d/aphCg6jcfUmhIzimJN90Y6e1UtZ1SfS9Anu7YRi4eSO2gMgyokkkVASO4G7OO+KvGFO2V+hpuraXDqejtpk8kkfmBWWVCN0bhgyMPcFVNUk73LSfNdlKGW40jVJ0ufENvqiw2sks1tKYo7mJwAw2Kij5SM/e5HByamTxDE39m/uLlv7QsZb1Ar7mVUWM7cDqT5gxj0qunh68vr5dQ12/tpBDBNAgtLQxNJ5ihSzFnbPA4A/OqEXhW7kigh1HWEeK206bTofs1oY3CyKi+YWLn5gEHQYqtS9B1/wCN5U0zVfs2ntHqFnYtexxyXKSAKoIJbaThlOMr37GrP/CWPFbWSPp0k9/LYi7mhinRRGhyAcsRktg4Ueh6VWtvA8gFyLy7tFS40xtM8uysPJUKwHzk7zk8Hj6enJceEZpfsV3JNps15DZLZS/arDzomVSxVlUvlWGTnkg5+lL3g0LT+N48TTadpdxf20FjDfyTJIq4icMeFYg7gEJx/Luh8THULwxzade24aza9tlG12miBAOFU5D/ADLwfX61Zj8MxpHqyrdKv23TI7IhIAoi2LIu8AHHPmZ2jGMe/FG/8OR30aob6SILpUum5SPBIfZ8+c8fc6e/WiV7akvlM/U/FckmiarFbpJY39tbJOjLMknys+3qhIDAggg+vetfU/Fg0m+aO4trhYFkRGn8xVzvIAKITucAsMke+M4NYzeE2mS8+0X1nCbmzW02WVh5SIFfcGxvOT/9b05dqnhZtQvb+SO9to472aOdnlsvMmjKbQFV9wwvyDjHGT61F2LmidZLI0knzOwI4zk1EevU8d8mh23FmTvyKiDsp5qHGLd7GfPLuSHruOSwHBJzUQHmNzyO9OMoxwKRX2jGKLJKyJcm3dsUp8wKfLjuOMVIzM/DsSPTpURkJ6cUm9vWpcIt3aKVSS0TJtgAzx+VIxAU56VGJT3GaRnLfSrJugjkMUgZe361ceNJ49y8HGcelUamtpSkqg/dJwaqL6McX0ZERgkHtSVbuIioK7PmzVdR8rg9qTVmJxsxhJPU5qrq1pJqGg6lZQlVlurOWGMucDcyEDJ9MmtA27beCM+lREEHBGDS1QaxdzB1DwtdXk9+La5hNtv8yxiLEeW0kiPOTx/sNj/rowp+saJdJY6jc5jZAL+bCtklZIcLxjrkVtoxRgRV5W6Mpq1Zm0Z3OUtdF1e+sFvAlnZypp1tbxRCXcJAsiuSSY/kOBheDtJJoi8O6pHbzyskLXLak93EFv38yJWhROJSmCchshlIINdjK2xfLA5OCzE9TiqrO/8ABGSPU96ppIrmsZdzo93c+EYNGM8McjxxQXUsKqiiPjzNi7dvIBUDaBz07VVPh2+ju5dl+13BNd214z3OxXEkbAPwiKuCiJjjqD61tPcNjAXae+aj8yQfxGpbRDqIwpdM1SKBIYRbERahcz8XJjZ45Xdxh9hKEF8EDqB17VRt/CuqR6XYQxfYzNHaJbSzeeSuFdmwyMjLImDwMKQc888dQx7mnRuUOB93+VTdXJU9dSd423swYAE55qnI+Sec+9JM08j4Xhf50nlFsA//AK6HYmVr6AOelTxRdz0pyRBRz1qZUJ9hSsJK5XaMsSFUke1RRp5JOFzzke1XnxGg5wO/vUO8MMBNxPTIqrWL5eXqMiYKvzNyx6elTUxbfLfMR7igwpG2clsfpVLRFx0WpKjlDkGrC3O5hv2v65HP51SaQAAqc88jFSYIxmmmNNMuONnI+eJunt/9eomG1sDpjNNW5MYPAKnqD0NSLcJMMSIF44ZRTGNVivQ//Xq0JlgtRIqjJPQHvURtyY98bBx7dfyqv5e5uM89qNUAB/PYxxkAqAXULk89OevY0oUL0pEhjhuZJQwZ2Cgr2XGf8aeSWYljkmgBKKKKQBRRRQAHDffVW+opBbxOOPkJPTNLRQKyYsSbCY+eeOfWkqZWQhSfvAEHnrSPAyruX5k9R2p2GRUUUUgCpYw3kuY8bvrgioqVdwb5M59qYDSSxIbOe4NNuh0Y8EwEH8yB/n2qXzGP3vm/3qSbY9wsef4QW78AdPpnNY1ruPIupcdHfsUFBLDHWr1SMkUcYCL8x6E+lR1olYyjGw+WTzJN2MEjn3pbckTKB0JwR6io6t2QwzEjtnNUtWUZd3mW4tbUA+XKzzSDqHWPGE/FnU/RT604CW7uGgtnKHOJrngiL1VfV/0Xqc8A2tShgvCIrqCORFO5ck8HHXIPocU+K3WONEhxGIwBGsaYVfSly6m6qRUFbdfd6k8Cw2sEcNsixxKvygc4/H1Pc/U1nz2MtoXk02BHic7pLbeIwj92TjAB7j156k50FbzEDAYDDlfQ55/UU9m8iPewy2PlHoPersZRm0773Mdb+W2BFxpV/Ex7iNZhj6Rsx/Skj1bTTIMziKQdI5g0RJ6DhwCOSKusJJSZD8xNPfb9lERAZZRhlfkEdMEHj1qdTRzg18P3P/h/zMWDUTHaK+oyebNJL5SxwxAMCCAxyGIKgkc8cED7xxWgw2sR6Gmz+HNNlICWkVvIskbLJEu0jawJVcdFODwOuSetUkinEL3UVzJBY+eYljV3nlA3bN2XLAHPITafTqeLdyIuPVl6iqD3wguI7VL1ZzKiOk88SqgDLM2Tt24x5Jzx3qWKe9ki8yO2s7uPJAe0vM5I68MoA/76qb23NFFPZr8vzsT7cNT1G5gvqcVWe7ZB/pOn6hB/27+aPziLVYWZBGLlGDxhS4YdDj/9VToNwkt0VIEGpWyTTDNrLlo7Y/ddc8NJ/eJ67fujPO7jE7lppGL5ZQdvu59B6Co9NVoNBsUP3ks4V57tsH9asBfLO1ctsYfUjbjNc1RKEFK9rv8A4cc5OVRx6K5IkLcNtyccY7Cq2uxJFpgZ7wWzKyuCbjyQV3AOvJCnKkgbuMkVeDIYyQDjAGaoazK8a2MMDvuklB8vz5IA6n5eXQEgb5E/SumnGMUlHY5pNt3YuiwyNa3NwGGy4nMsbERb2G0ZLGIbSd27nJ4xzWmeCx3KzAY5A+nWoNPUtpdq8RDRuu8sXDcNz1IBPXripHZdpOASx5/yDVsQyRt0hwAAOBim7GIBCnB6HFSRojsMHBx909zTHbMjEHg1IxnkIvzSDc2eFJqVUSTh4lK9sHBFR0/JSHH97n8KSsKyIribyvlh79+5qfzEWMEt6cAdv/11nTEmQ57cU0Mdw71PNqZ89maEvlTTbWyRjcuB1B5/P/Cqs8hE3ACsh6r396m8sSzxkSR/MgXaW56YNRJah13iVUi6bn459MUO7JbbJI5pGsZgzFgMAZ9z/wDrqCVfMLSpyvcd1qcxtBZusmAd4I568GqisUYMpwR3qX5ifmBUrjcMZpKuEC5t92ArA84quYHHbP0NDQOL6EdFU9W1A6Xb27eXDuuJxAr3MpiijO0tlmwcZxgDHJIFK2qQWlkk2rxvayHeSkKvcKVX/loCik7MEHcwGM80rByuxbqdm2xlGYbj146e1Zrazpkd6LZrsmQPGhKwyMis4BQFwu0btwxk8k4q5dMLeG4myr+SjvszjO0E4/SmFmhKKoQa7pskFo1xMYpbiGKRkWN2SEyAFVeQLtXJPG7GalOvaWqTMk7EQzm2bFrK5aUMylFG352BVshQcDnoQaVg5WXlR1wwZQSM4LAVbTaYsvtYnjGQRWLJrmkm3S4W9kcOZFwttKzjyztclQu5QpwCSMD1rUtuYgysro4DIynIYEcEH0q0aRTiyYRMY2KnKqMlW5B9qIlXjc+Iz93P3vpUsYMibWbagOagl2+YSvyj7w9sYH6g1hUgqbVSPzOiLcvdZJcpi3EkCPgg57496qQ25m5zhc8nFWmjmDAxNgocjng1BJeSZAizCB1VDjnvXRK19Tmla+o+SJXzgY4wOelSWilCN2DtBP6VVF5cD/ls/wCJqZLyWXchbkjAyaE1calG42UmSdQTnu1SbgCBnntVeMSK5IXd6nNTQptbfIMsTzSQ4u5YaZ0wu7hRznmo2u4wMskbHtgY/lQ/DnJzz19apSbPM+Xp3xTk2gk7Is/b2br8gHQLwKlSdLskY2y4yP8Ab/8Ar1AsMfUc/WnA/vBs4K8gjtQr9QXMQXGfM56Y4oJeTGTtUenersscNxk7th64I6fjTY4Iy20ToSOMc/4UcuocuowfKoBqRcKpY9TwKqXsbqec4HBHpViJt9pG31Bp31KvrYrS7kZgOjc0tw+8Rk/3Rz69v6Ujs82MIeKlSJXt1Ldclfpjn+tRvsZbuyKZOGFTCGTbkce2aljh2MScH0qahR7jjDuLb5lQIep6Z9asXThQsCfdTr7mktwIo2nbqOEHqarkkkk8k1psjQKayqy4bpTqhlc+bHHjhjyfWkDdkFsp2scHGafK21MDktwBU5bYwUchRjHr60RrH5yuOCvZuaLaWFaysU5oPIjAf/WNzj+6KhAzUly5ediTmniINbho+WX7w7/WsZ3s+Uytd6EDDB9u1T275XYeo6VEeRTQSDxwRShO+ok+V3L1FMjbfGCetPrc6Nxw+434GmjrTl+630/qKbQBAyMsx3GlBwcinzff/CoZbpYV4AB9TWb3MHoyQyEKd2CKpSuC+AefSopb1nztXHvmnWtqzsHfv0pC3J0QlRjipVQKfWpGGwgL6elRyOA3yUBaxG5y3FNpR15p8aCR/QCjcVrsYpZeVOKSrbRRiNmIxjpzTYIotoaXknoPWnysrld7EY/1AA6F8P8A0/rVtUAXJ4UccVB/rWAQhVB+ZOmPf3/nUzuuPl+6vAPrVRLgDPGo+bI/H/61K2N3y9MD+VU5+ee5q3EUkiVt2GwARjOMcf4U07jUrsjaIMp9Sc5pyLsXHX3qRwOqfd6c00ckY607FWW4syeYYwQRwA2B0FVvNCyMWHT7o9KlkvNtwNoDKnHXrVQnJzUN66GMpa6D/tbCTBAxVoHKgjvWe44zUlrMZl8sNj370KRUZPqEmdxAY4B45qJldl27zj61bNsNvyk5quSAvPWk7ohprcZFGIsFeoOakJLNk8k1GCWPoKlTG8bumeaQh9tEySEt0xVqkGMfL09qWtErHQlZBRRRTGRSr5t0VPRABSyERRHZx6U948Ts4JG45pk2PJOaRFrJsrF2OcknNTIDFCxIwagU4YH0NSM7zdAcegqEZxfUX7Q2OQDUyyKVHIGe1VShC5PHtTaOZgptF+mSBTGd3SoUuCOH5HrTbi4DLsTv1NVdWNOZNEJnfbtBwtJ5j4xuNMpyruHWouZXYqyZzls1NCzEYI47GqUkJVsoeakF1JEhATzSv8Knv/SnHccd7l751bgblYVTnS6aQxwIqDGTKxyB7Adz+lSQw+eyyXjh9uCsSk7FP/sx+v5CrLMC+B9auxryp7la2tTHHtkkJOclm5JP4VZjURZ+bdnsKakke8q/BHrURnCyEYyM8EUtEL3UWsbgWP4Codm98O+TS4LqNpxnnpToYQhLFsmnoymk9xBGiSdSRUbSHdx0qXBbJ/GmsQBzUGDHQuNpJOCT0onUllIPQ9KrG4VJAT9BSGdiT2B6Y7U01YuMlazFuB84PtVQwMzEj1q35BKhi3UcCpVjAXkUnuTLcwbjUr601GXTrzWGgtUvhE+qSxxB41MAkCE7PLBLEgEr046nNQw6pq+oRTeVqrQJb2VxPHPFbxH7TsmZY5PmU/KygE4xnOQRXaGRWjY/LIr8H5eCff8AwpUYtyCC+CDnv7fStbG9zhrvxVcprNisV6ib7mzgls2MSq4mCFiqkGRseZncCoBGMHBJ7JhhiKs+XufdsAKgBeB82ORj8eabJFnnhT0OeMn1oswuVW2quMZqBwSvJ+gFWmXnDLz7imMER1BUZPtUNESTYRjCBT1A5qO2B+YkVMFAJPrTtoEW0ccU7DtsQlzI5VDgDqarSWwLBojtOec96uKgTPfPWkZBj5etFu4JdypHGrFgw5B65qWEZQ56FP6mmMPLbeBkHrzTkbCZXsCvX15H9RWNSynGRpH4ZEVTwxurA9AetJD5f8WN3vVlcFh3Ge1aRRhCPUjWBvODbuSemKtPCkbYaQ/gv/16HDBi3mbfm9xRMC8i8gnavOevFaWsaJW2DZGnzNvPPQrjP61KFLyGaQqsec5x19qjjiEjvI5xGpyT6+1MmmMreij7q+lPYY6acSEAIAq8KKj3D+4v602lC5XJIA96QFlmCgkrxuXp9KYWXyevb+57mllXMbY5+631GMU1kc2eVwpxnJ+vpVCHnEdtNKejqAPc96yXc7OM8da1bhVEccTMcqgznvUPlIAy9h1G2okrkuPMZAd3bCqc5wPSmmd0bDoRWzJCI8dCOnSqMqBpTtXI+lQ42IlFJFX7WB0DVG1yx6cCrn2P/YH5U8QAfeHNSQZ4nkPAqxGGIBfr6VeS2QcnrRIUAwOKB2IA6r0FIzbu2KV2B6D8aZQSFBOBU4eFlwV2/hS+V8v7vaw96di+XsQohkzt/KpIIma4QFTjcM5FR/NG3oRVqJ/MTPfoaaSCKTZOofO1lO0+o6VSuFaOYMy4zyMirNI5/dkHJXuBVvVGsldGD4o1HULKx02bSSQ5vsyxBQTNGkEsrRjPr5eAfXFVZtee68YQR2dwp0lLaTdt2gTv5YkJ3HoFVo+4GWOeldDLDDLc2khTebWXfEQ33X2Mh/R24PrVOPQdDsrKFBBDFa26TBN02ECzHD5yeQeAPTgClqxppqzMaLxWjtNC1ihuwYBBHFcFo5vOcouXKDGCpJIBGOhar9p4iuZbz+zotMhGorePbCJrw+UQkSSM+/y84/eAAbefbtJP4WsVs7hLWN2upEiQSXd1NJgRvuUBt25SCTgr0ODg9C7RfCcENjMNQlkkupbtrwSQXUoeJiix4EmQ7Aqoznrnp0wJO40orYxrbxfcaf4Vtry+hW8mCTz3HmXJEgRZXGFAVixAGMttXgc1bufE66ZeairZuWn1JYrVZpWSONPscLnJCsVGSTgKeW+pq/N4Q0Z7cWawXCwiJ4Csd3KvmRsSxViG+YZZjz6mrdxoWnS+bmNoyZhOZo7lkdHESxhgwOV+RQCOh5p2kO6MV/Fkj2k95b6NvhtLFb25MtzsZULSqwUbDuI8kkZxkHt3t3PiSO38Qx6Y9vG0Us4thKs5Z1cqWG5Au0DjHL7uh24q+2kabLplzsVpob2yW2kf7Q0nmw/OR8+STnzWOc5OfpVY+HbGW+GoNHKJROLkILmTyxLjG/Znbkj2paibWxOF3HgUEEf561JDEWJzwBwfeptmZQT0UcVCjcwUG0Rpb5GX/IUiqBMUAJ9z2qzUX3dzMeT1I/lVWRo4Id8i/h3prTDsQPxzTcF25H0HYU4W6jrzR6Bd9Bv2kD7wOPWlaZduQeD+tMljRV4xn680kUUp+4MDrz0ou7i5mnZjoWYoWbg9uKlSNSm+U4XPHGc0BFQfvZNx/up/jTXcu3TAHAA7U7dyrXd2ShIR0ZcngYH86TBIIcYIPSmmMZ9qlD9A3zL059KoojWJSwBJA9aeYPLyRyPX0pxib+Ebh6rzT0cRcMSfYHpQA2G4XaVJ24HBqZoVlJkjfG45AK4phSOQ4QDB9sY/z+VLHF5aEo5YA5wP5frTAprFJ9su5GQhd4UEnrwP8akqeUBvPMYOfNy/GMnaP6fyqDp1pMEFFJkHoaWkAUUUqNtdW9DmgACMeik/hT0gdjyNv1oMpPVnP0OKbIcyE+pyKegEwhXzCrDAA+8TSBADiGbBPbOP1oVyQqnJBWkj28lcAgdSP/r0xDS3TeFbPccGmsuMEcqehpZf9YR6ccUitjIPKnqKQxtAJByODT5YygBQ7gehxTKQBLh9u3AZmwR/X8s1GpMlyzDgKxyfwxj+tLvw5cDOwYA9WP8An9aIgVDLnPPJ9eBWEHzVm+iRctIJdy4ojmXOz5x1wf1qGZAj4X05poJVgVOCO4oZi7Fm5JrouQJWjDwvqMAcn8az1G5gB3NaAChSCV7AfhTiJlKdw8pK9Kc3yyIPbn2qGnhy0wbAJzwKQy3CR5hVz8y5fb7H/wCvVYTOFyTncxz70+SURSoy/wAIOc+npVO81dLO8a1ubKSOJY5JjMChVY1HLEA5+nGfyqmwLwQTLwWGT8u4/wCfWkZx5p2qG7A7+aym8QW9lC73ltd25UpmNipIV8gPwSONrZ7jFPuNas7aISt5mPtPkcKp6DJfP90DJNTzILMvvNKOi7R246VTmsYJ4rjCLC87IZZI413SFWDDdkfMOMc9iaku9QTS4TI8M8qKC8jxqMIoIHOTyeeAOTUkV39quZ7SNJBJbFdxkUYcNnBH5GnfUDOfw3ZOiKZ5sxxqoyFxwJQMgAD/AJbtkdOlW7YpYKYW2Ss53O+GwSRj+JiRwAOvarjvIpJZFZe3GeKpTbCh3HkdKJSZL20LuRMr7Q6kDOA2QaydTtZ5LW7/ALN2C5nidWhkbakrFcbgf4XHr0boexGrbIVsVPO52GOKrXDjzC/bJNJq6NadRwfMgZAskcKcqgHI9FGB+uKScBhzjJYAHHvRGpXLPy7dfb2pZcKFIIJGWI9MD/69Z4hpU2KF3K5NE+bVQhKlnJz68/8A16ztciMkkJkhRkjORJNKsSZJ4AcMHVvlHQEexPTThDKsSgqcDJyOf1+lZcmkWNvrdvdwzW8NzJKXaFwu6QlWBKn72cM3GSPYda0prlikTLV3NETJaRiNI0SNAFVVGAAOABVR7gn7gx7mifdJKQoJxUOCTjHNRKTMZSd7IvxXIaLCKA38RPenFNx/d4+maitoSsgPU8ZqZWYN869j94e1WttTVXtqRTYRMs+Of4Rk1Waf92UTIBOcs2TVxolkTjv/AAk81QkgYMT2U8g9qiVyJp7oQAseKlRNvuajD7VwB+NTRSGC2aVcby+0Me3HaoRkh8cYtpBLcnac5WMfeP19Kimk80qkalUQYUH9TUO8uSTknPJPelDbTkU79AuKylR9abTXmLNSg5HNIRNBMYm55Q/eFPllIygGGz1FRIqlWZ87Rxx6/wCc0kjBnyucYAGfYU7uxXM0ht7Fd3NugtrmOJ1J3Rzw+ZFKpGNrLkH3BB/OsCfwrI1jHaxajAE/fl4TbN5CmQ5zGgcY28gZJ+8eldF5px71h63ql1putaQY5Nth5c8l7HtHzJvhjDZ7bTLu+gNG5cZN6Ikt/D6waTNZfbAxla1bf5Z48lYx0z38v8M1b1S3vbwOtjfxW0csTwyxzW5kGG/jXDAhgCRzkGsZPEVwPEGoMx87TkSOO2gBC5/fiFpN2P7+/wDBR61o6nr8GlfbZbi0drSxnSKeVJMsA8YZWC45+ZguM980DtK5A3hwpbz2dpfCLT7sRC4jeAtJ+7RI/kcMANyxqOQcckdanu9MmstLtrizeSW6tNSnvI2jtzKAJmlJDIGDEbZSPl5zg4xmqM2tanZanqs1zZK9tZ6dbXNzb/az/o4/fF9ny4dsL/s529a0B4ojt9et7DyI3glnECzJOWcOVLDKBdoBxjlt3I+XFNWKXNfUyrPwhcXdnFfXrQxXry3TvHcQOVKSzGQHargq3fBY9cHkZrqIj5MEVvbqqpFGsahVxwBjp26VT0C8ln8M6dJO7yzSWylndixY+pJrYht1iXMhy2cEL2p77BJuTsiKKQtlX+8KWRSxAHBYFfzBprfJeYPHY1I/8P8Avr/Os6qvTki6b1JWl/drK4wAuUQVnMxZix6k5NWiu63C9wgH5D/61VQMnk4qm7pMxqb2Ep8ThJkYjIVgcU4wNtypDD2qSNY5Ext5HWhJkqLuTF4VXdkkdqcmyQfLwT0OeKrG2G4YPHep7eMqVA5wc8Vor3NVe+pHdtk4B47e9UyQOtWrhSUBAzg1BFCZXy4IWod2zOSbkEckmMIMr70rGQff4B6YqeQmNR5a/jjpUGHlJPU0PsD00HNO5GBxTVSQEFQfrSqjrIPk796tHkcHB9aEr7gouWrHSOZrWNnHzkEH3AP/AOuo7ZGjt2DHg9KRd3l+WHG9GyN3dT/9f+dU21xftUsEenXs0NpKsFxcwhCsbsFONu7ecB1yQp4+hpqScrdTVRdk2aFKY2a33RnBV8n8R/8AWphvNMN1cWy6na+fbIZJ4vPUtEo6swzlR7mpLO9sLxJzpl7b3TRHy38iZX2E9jg8GrsDKomkEm1hk5xitExw2/8Arf3kn90dBVBrmCz1rT4LiNzJeNIIyMbVKJuyfwFINW067juLmDUrOaGA/v5Y7hCsR/2iDgfjSWgop9S3LM0uM4AHRQOBUdULvWtPtdHbUxeWs1sRiJ1uYwkrdlDk7evvV/IIBUgqQCCDkH6HvQUFQ3GR5T/3XBNTVBITcP5MeMA5duwwelUiZ7Fh+Hb60jsIY97ckjgU/h5vYnJ+lVbpzJKB+lS3ZBJ2RByzc9SauRIISCv3vWoRblZFIORnmrFTFEwjbcbNErqZE+UjqKqsMrnuOtXV5DL/AHlIql2NZVLRkn3FNDoZSnykZHtVqqKnawPoauqwZQRWsWOm+g5Dhhnp0P0oIKsQeopKS6YpuKnvx9KroaN2GXDBFXPXFZ8i+ceRxmpixY5Y5NIOKybuznk7u42K2TPQcVcEkaJ8vWqtITgc0CuSPP1z1+tQFiwpBy4GM+tTDGRnpRZhcaiMakTcjbsdOtKXLcIKfgldvUkYoAJvnZMHg1OABGuzoMj/AD+dQqgi929fSpimIwntkn61ol1N0urIhEEySdzGiRtox6fzpFfygUbkj7tMZGI65Pepb0Ib0sho/euATipIAFmYZ7cU63TC7j1PSnsncflTS6jjHqOEqxtiQ4Vv85pJZVijyh3Mw4I6D3qnJuWQ7+/Q1Yjc7RuQ8DggUX6BzNtogXaPvVIIvNAYEAVJKytCcEVWWRkYBDgmp2ZFkmTXES+T8o5Hes+ANDKHOB2HPWtQHgs5+XHOaqpCrKG98iqa1LlG70LZXfyDVOSJVkIByKsNIqptzkk847Cn+Uqqdg5I70PUcve0RAQI48DqajJxTpVaPG7knpUXLdeBUGLLlswMXHXPNTVWt4wfmz0PQVZrSOxvHYKKKKZQ6Tghf7oxVe4DFRgZGeasSf6w569TTaHqJq6sUhGxONp/KriqEUAdqWiklYUYqJHMiFCScMBnFVKsXJwR/tDmookV2IY49Kh7mUtZWIz0OKRFx1FXVhRe2frSGBc5Xg0crHyOxV8rJ6Ggps4qw0RByXx6ACnqAYyBx6k0+UFBlC5dorOd4xmRY22Y65xxTkit4owkKlMdcc5PqfU1LckQ25l2KcFRyPUgf1p48nbkAZHtinqkOzj1IAgOcnHpxQN0bZ7fzpHcl/kHHcmplTKiQfKCMHFCbsNSla7FKLIAzDnFRyqvCqMY709H2E4PFEQ3S/WpbuS5J7C/MsOH6fzqSI/uQBx6k1HOfm29hSnKwg+1FxX1JWdVQgdKz7ifbnHU1MST1NUDmSbHvikK9xUQytk1dS3ZsYBxVi3twigkfhT5ZfLGB1oC3VkZURDBoByM0FQ2C1LQBDHI0bZQ49fer8M8ZjZ9uCMDBPGaqXTIqjoCO9NhJkhZWXgAsPUf54q1dDvyuxpwuDHuQkAe+R/nmpSw5Mi54+96cVSizDCEU4b+Ij+VTBw8O1s7um7rmtE9DZbDZWKx/MBkEBcelQBSW3P17VcWMm3I4YjkY/z9arVLQWuwHTmigcmnkhRQMiYArzUYJ3cdae5+WmAZPpQAOOSD39KiKERlVBJDZwB1GMZp/mKAT1PYYqItvZfMY+x9Kxqx50ktxKpFO3cmhCvFhgM/rUeJIG3DI54NOQSMcP8ANjpu6/n1qVYJJ4+DiPg7mP6Z71MZyuoyWoSgnG8SISTSODk8nrWspC7pCM+Wq4GeOlVFgKqBuTj/AGhVpdhScs25Pl+4QTXTFWElYjeWSRWXjCt0ApoX51ztAI56VIVgJfmQk9cD3oCwZB3SLs9V96oZDJsBAKnPqOKVzEsQJKqBz8ze3tUkot3+YzhcDnKmo0jtzIsr3CtGg3bdpHPuP6UWE2WkX5CqqGIXo3GAexpqxMZWLuhDDAG73qjLeosbx2yt8/3pHPJqG0dvtkWST8wzmp51exPOrmhdt+9LADrg8Zqk90TwjY7ZUcmpHSbd8jKoPXJHNKY1Rcrtx3x2NJ3ZTu9Cs0rMMvuOPWm/a1HRfxxU21DkZB/GqrxBG4JIqGjOSsTC67kDFIZwxzVd0dh8ufyojhdANwJ98VJN2TGY9F6Uwkk80h460UEhQKKKQClsjoB9BSo5RsrTaKYFhwJo9y/eHamRS7MjGc0kL7H9j1p037uYMv1qvM0vf3idG3rkAj608feH1quLkfxLipwe4qkzVNM8/tGubNr/AE61L7vEGoXawSLz5MouZElb2xEFYe6NTLSRV8JwQxRokQ0tWUbBuA+1YA3YzjHbOK7sSMGLr2YkDH5/zqVZoyoHygYxgqKSsCmjlLXxBdya2Y/7VW4m/tmSzOm7YuIAT8/A3gqBnOcYGMZOaq6f4uvriS8FvqkDLLpcl5G9wIz9ldXRRuSNSUGH5Vy5G3k8GuqhtrfThOLPcHuJ3ndiQTlzkgH0z2rQhlVId+AHIJJ2j/P/AOoU1vuPmV7GN4b1U3mn3j3N61wLeba88nlHauxWI8yLCMOc52qR0I4ycDSby5i1JtSvNPu7aLXopN0szRlGYAvbgBXJX90GU5A5A+ldnC4aPCqqoMgKBx+VPZ8AlsYHPIoC6scTp+oHSbeaeXUZlC+HLKWKArGwH+tBYKQM7eDkn+L5sjADIPE2oSWN7H/a8I8i+ij+2GWEs8bxFygkEflBgw4LLj+Hrg114lYtkY3fdXjoPSnpE24owXy8YI2jB9sVPoSp3exDod0L7QrS7klaVpVJLmNULYYjJCkr26qcHqODWkrpjbjaMd+R9aizmo5HCjBIFaXsUST7GyYWyAMkVXyWmCjsKBKgVgd3PHHepIx5LgISN5yPdccfz/Spepm3fQcq7R6mnbC/Q7R3NOLjqVX69KaZd3HQD8hT0NAEcSfdBb36VBJJI83+x6elSGQfw/N9Krk5bB5/2Vo9BehYVO5p3l7Tkgj0zTI87varsxZ4EHBY/MQKYytRQQQcEYNFIAooooAUEhhg4PrVl0Bjzt3Y6EcE1VqxCwZQvK4PX1OapAIg86SRtsitGwVtw+9wOR7dvwqFlUpxnrU8U2V8wMPlc7sHg9j/AJ96kmwc+Uqv3KlcHH4daYih5Y96fUm+M9Ysf7rf40YhPd1+oBqRkdFS+QW/1bK/sDz+VRlSpwwIPoRSANp27sHHrilfnB9QP8KkWb5Qm0Yxzxmn7SdrCNiQOMLxTsBEH2onU49+KkgUFeect0K5zSNHK6DeMYPcgUJETJGA6ZHo3vTAY0efmVgcnuRUdTEB2G6Vcj0BpCIST8zgk8HbxSAbHKyAr1U9RQ8yKpVQu48kkfdHqfb8qGj+Rijq5A4ABqJICysxOVU8nH32H9BWNScr8kd3+BcUt2NRQQG52j7uf1J9zRG37x199w+lWZY1cfJ8uR8vHUVW8sMgzkEdCOorSnCNOPKRJuTuSUVF5hj4mwB2fsfr6VICCMg5FW00JO5JEdsyk+vrU9yzBUZTlTnnr/npVWrFvIQ64zjIUgULsMr0VJOFE7hBgZqOpAXa0zBRyznH+NRXOkot5dPPdzTRXilJYCq4K7SoXdjIAyeh6k+tXrXbFGZn7naOKJCrTYd8Kn8JHWqtoBmnRolKTzXM904ZMvJtyAmSFIAA/iOT1NVrbwzpzMsEhnkg/ehYjIVCh8ZGRgkAAAZ7VrK5jlYN8ynhh60ZjjVthLsQQOMYFTZDuyvc6YJ7e0T7XKrWwDEFVPmMMAMwI6gjI9+eww4QrFey3ALGSVUDA4x8ucf+hVPFudSvB5AGc/0pZHAiKEgsDjAzxVabiGNLuTbtxxjg1SmTdOAOrVZpsOP7QQt0XFQ9SZK6sWp3MZSJDgRqB+NUphuHqCQpH41PKCJn3ddxzUGMyqg52/Mf6Vot7jexNj5cmo5UxNtyCeB+vP8AKlmOAqk4HUn2pyR+WFaVFOedo7e+c+5rkqNzl7NLtc1j7q5mTv8AJHI4h88pH/qkxl+Ogycfniuf0GOCO9mNhZ3FpatACqzohwdzAhWQnHIwQ+WyO2MV0A8twxCspJ5wQailjjjuJDGiqXILkDBYhQMn1OAB+Fdd9DIhjBDPu7nNS+T5jb8KDnA5xUIZpZ9iNtUDJNWPMxjaOgwCRzUKwlZiovJDY2nqc9KeG2RHZ0I+8e/PTFQUU7lEuQz7Sq8DjtTWR25K5BHYZFSKNzuNuR0JGfWkwgcD5l2rn19/60wK/lr/AHF/KnQKkszQYyjKSRjjPY+31qYAO0aliQT39P8AIpiCJg0cW9TIAeee2cVNiJGbjbx6VGys2e1XWhZfvxsv1XFN2j0H5VkY2KUVsQ2Sdx9anKMOgqfGOlSxZkJCorbRk8gYH40DsVkJ8vZIhxnOV60joFClWyG6ZGDVponZvlQY9iKVxDCqLcZZwc4XHyj0Pr9KdgsU3jaPG9cZqJ7G3vX3XEAlIgltzliAY5Nu9SPfYtaqxLMu+GZ/KUksBw2fekAVuOFb19apRLjHqYg0LSlhFtJZlYxapaDErAiNW3LyDnIbnd1zUi+HNLjVi0Etxul85xcTvL5j7NmW3E7vl7HgflWo8YLfOvI9aCQCM9+lOxor9TF/4RfTZsebDcbfJjgdftcmJY0ztRwD8w5PXOfxNWJdA003325opvNWcXIUXMgjEuMbtmduce1adAj81gpOF6nHU+1Fg2RRsLeC1W2tYE2QRKI0XOcD6mtXlslQFDDIPv8A5zTDEsa5QAYwcZoR42QSLuIVulNKwoqxXuowFD5yexFQ+exUhscDOfpzU16cbUUYUE496i8keSW3dVP8qzmrppCV+fQtrzCR3DE/+PH/ABFURE5YjFW/OwXUnAYggkdeB3pC6qfmIHtmopyi6adzSpC8iJYnj5Vhn09aHXzF3x8N3qczblI8s4A4OMY/OouX/wBr/wBB/wDr/wAqUqsNo6vyBUtNdESQxsEDysSPQf408uT7DsB0qHDIDjPPdOPzFJ5hHUr/AMCypp+2UdJqxXs/5Xcry6tM1/JbWdhNftAAblotoMefuj5iNxI5wO34AhvL8ne2hXqQHhWDIWJ903ZA/wDr5A7zeH1M+saxdFgrxtFaqB0wsYk3H15lI/Cue1jWtXsdDVE1VzcLfXcZuJWhh3LGrlQWK7eoX5QMkA84BrrilJJmb0ZtW1+813JZXtpJZXITzFikZW3xnjcCpI68EZ4P4GriosUZ5GBycnmqE+T4is5id7X+m7n3oV2mNlx8vbPnHjtj61fihJkA3BQTztUCuebmpWjH8SkovVsau+TOMgryQoHH50ZZJdrZ67TnGQcZ7VZhtzHgscKOpz1qtMGZ2cLu3dRnH45rKUKkFzXbfYvmi9CCZt/mZBGMJ+uf6VlahpOo3Wq/abSCzinMsbR6lFM0UyRgjKOgBEnG4cnBz0FaMrblG3d1yd2PT2q9DOIUUyrwQMNjOPr6fWijHnbk+pDmk7JnJXnhfXbq8cytbhAt6isLghWEyOEAjCALyV3HJJIJ5rpLTT5bLWDeBYxD/Z8NtiNecxs5PAHTDcViar4qurLUtXSDVNNWaxlRbbSpIsz3YMMb4XDhsszsoIUgY74NazeJBHdPaLa3d/cNcXEccdvEikCPbkEvIB/EOSRn0HGd+Xsx38jO1LStW1x1i1aS1tlghuYkureRi0jTIY1OwqNuA2TyeRx61HdaFqF+Jnu7TT4WW1jto7eK4fbJskD7t4UFMbfk4OCTn0rQk8Sadc2NxfRLcGG3tIrx/wB2AxR8kAAnqNpyDiojrz20N9NdxTXXl38sMawiNdqDGMs7Kv5nJ7ZqYtttSG+ljLk8NatILS6aZPtMMs7NFHciNisgQAmVY8Mw2dSvIbGeOek02zXTtIs7JQFFvAke1XLAYHQEgEj8BT7O7g1Cwt720ffBcxLLG2MZVhkcdjU1aEkFw7b0ijyC/p1+lTLGsMYij6L1x3NQoN2oMc52Jn6f54qynGW9On1qnfYzjq2xs0ohTaOvf3qjuO/d3zmngGaU5OKlii2owcday1kTrJkqsGUEdKWq0W5Zto6d6s1Sdy4u6AEg5HWq0igHK9D29Ks1DMvGQcjI/DisqyvEU9iAjNCu0f3Til6U0nJrKm3Yx2LcUnmLnuOtOkiE0YJYgpx+FVoQ+4FRx3q3KgKqhyCOcjqDXVHVamyfMtSjImx8ZzTCQBknA96sm1Rsl2Zie5P9BxUItwG4AGDwQOtJxijKUWiMuAcdT6AUcyHCg575HSpPKCDClR7dKdGp60rxWxNmEcIQc/MT1NP2r6UtVL/ULbT1je7uEgDttUucZP8Anv2pO7ZRaGB0xTQzht4GR0rNbW9NW4ERv4N57iQYHoCegJ7Dv2rSsNT0+6MsdndRTyQLlgjZA989+c/iMU0mVFXLeP3akKAe+5ec0x5Agy5JJ/M1HCzE4Zzt7Kw5qOcbZD3zzmnzJq6NJNxQGUM24jmnRjzWOeFHb1qChZvLfI59ajrqYp66l7hR6AVC10AcKPzpJJ1aA+p7YqkT3NVKVjSUuiLUr+bGOMv2AHWkguduFk5XsfSmxEhXPzL8mQ3TGKPllOGiG9gfmDHrj0rkeIak7K6Roqd0nezZbLIcHg+9U2QeYeeM0bRGu2RmLEZKKMY+poYAN8uQpAZc+hFaKvGbSSJqQfLcSRmZeWz+NOEgaILyCP1qMnc4xU4j2xknGfStTHUiO4/dBP4VchYtCpbriqscoUlX4GetWDOigbPmqlZalxslcSeFpMFcZFQvGyAbu9W0cOMrTSgLZbc3oO1Nq5UoqWqIIWIkwOhq3GCW+bnvxSemBxTo2B3kfwjH9P600rDirKwpToUBIP6UoGzlsZ7CofMbPApVJPUYplDqKKKACmu+xcnmnVXuHz8gHuaTdkKTshGfzsDGMe9Rsu00R/fFTIAZhnsKjcw+JjrfcIQG608sA2KQusQwTTZV82PdG3Pb3qzfbQUo2fWl8vjrUKzug2yDJFSpMrnHQ+9F0JSTI7yBp4FRO0iMeewYH+lKIcZOPzpLmRlmtVQ43y4b6bGP9BUrtgYHWmOyZC8Yc5OaRXZowmMAdz3qQDPJ6Uk/7uPJ6ntUyJnsVXJzgVYtxsG4jPGKihTcSzVcO1U2njioMkisSXmz70SyE4Qc+1OY7FJFVY7k+ewC7ge9AFsoHBAA59qpxwCM56mreX2k528dqhptjk09iwJicKOw6iovvyfMaZnHSkZttIm5YZtopnmn0qNDvYAdTVgWw/vfpT1Y0m9irtJILnJHYdKntv8AXZBII5GKiqaIZUY70czbFHctAZ6EH6GlI28imKgVgc5qRzxWh0q/UQOytlWIPtTwFkUZ+VicZHSoqcnRh7ZH4UwEKlTzTSN3WpWbB5GUbnHp9KQx5GUO4frQBXDYJHag/KcjpTjGO3FLgBcUgKsi4bjoaZ161ZVQ/UZU05LRVG+Q5H8K46//AFqhx7GMoO+hAiNtB3FAxwMfqfpSJOfMLj7p4A9B2okJ+YltxfgH/ZFMrni+abl20RpL3IqK3LjSAR7x6cUAmHSsg4aWTqPQf/XqqiNJIqLyWOBVm/cCRYI/uQjb9T3rpvpczcr6jYLiUuFZi69w3pUstxHFG2cjjoTmqkUixMWc4GOtNEb3EhkK8Z4B7VUdrsFJpWW4paWcbmBCjnbSx8kj/ZNTxRlUIbv6VCu1ZiCfl5Gce2KiWommrNjFUswA6mrVnCRcqzjG00yGMo7buoOKtRHa5Y9ArH9DTiupUY6XYzzIj05/4FUNzJxsUDnrgmq1SRJkgn8KTlcTm2rEgXC5HQVG7fMB+dWmwqHsMVTz+8yeRmpJehOpKnIpjz54FBdcdahoC5MArjpTGj28jkUwEjpxT1kxw3NAiMkDrS08qjcA4phHpQIKKKKQC54PFTOfMtw3detQU4FlXjoeKaKTBCAeeh4qaNt0bJnkDj3qvSqSp3DtQnYIuzFDlRgU2nr87ksOtMoEFWpGxb8dwAKq0pYlQCeB0oTsNOxbhXbGPfmoJZPMbAOFFOiYpCxPTtUcY/eJxmqb0sW3okLEN0wwOnNWJW2R5HrUUmROPL+9jmo5JHfhuMdqNkF+VNE32hDwDg+9QykM3HOO9Rhccnk05VLfSldslybVhrkkACpYSWkQMSdowKkWJETdJ+tLAgGXxjPQegppajUXdCzOFAHf0qONAp3SDJ9KmKDzA57CoyRux361VjS13qEjOy4XApkcW33JpysG+7zUyDC9OaZQ5QBjPTvirMjCRwS6kFeh7ccVWop3AlYSIoOcqeB6UzcD95R9RxSBiv3SR9KXfn7wB+ooAMKehI+ooMbAnHOOuOaVSm4HBBHPXOaZmgB6Jld20tzgAU/MwxgcDsADj/CmK5dgr/MCe9ACZyH2j360AOtUfbIsqosjOxAAySO3X6U6Yk7JV4PTg5wRUNhN5kHmNIZDufb5gx/EcfhUx3PCwKgYIIweKfQQmUlUmT5GBxuA6/UUxomUbh8y/wB5eRSlcRgEgHOcGkXzIzuTI91NIYyniaQLjcSPfmn4Wf7uEk9OzVGyFF+bg56UAO86U8B2+gNEwcMA2cDgHPWkj4y/Xb/OnBI2VSGKk9QecUANY4iVffNPixHG0jDOflHP50xwxbOOCeMc0s3ykRjogwfr3oASMZkA5wf0pdo+YbcAD7xNIQyxDAOG6mk+9HyeV9+1ADPMMbNjoEJb39v8+lTRc223HzKMfU+tQRDzJE44kYMc/wB0f/Xq8AFx8uOvTj/P+eKwo+/KU/kXLRJDYUby9rD14PYdKrrExzgdDzzU8kgwVDEE8j05OaSMs2ApVs/eIOCBXQQRSR7Oh3L0yKrj91IQfuOeD6H0q6YmO4j+PrxjHeoJoSqEONykdqa0ExKl27YAynknJ9qit5lgJFzkoekg7fWtCCQMCC3yjkEntRy2C5VbbNlgSHC5II6496hqxLJEpIgXJOQW/wAKr1LGXLRg8DR4yQc49RVeddszDBHPGaW2YrcJjucGp2hLxFF6qxKZ9M9Ke6ERrGr7d+eg6Z/z6VHKgUgqPlPTmpD5wXGQcccVHL5gCiRcADjjrQMSNwv3s468UylwQMkHB6GkqQCkgXzLllPHIz9KWkA2sWHBIwfpQDFuJN8hbpk5pYIGWASsPvfMefWoJFyQgOS/6DvV2AMflJJUfw9qvp6i6lS4H7whuuMYB9Tj+lTyuHfK5CjgZqOTm8O8ADcM7f8Adz/Wp5VVP4Dxx0/WualrKcvP8jSWyQifdUBtpZvzqLUNwlwo/wBZyMd6m6YxjAXPOM+tNSUBdrruA6Huv0rd7WM2roZFCIIyHxuYc89PQUlWY4VWQPuBUfMORkjrTfMcoMSBiT0bn+dFgWmhBT40Yup2kjOalbB3Hykb5uNv/wBakYxq/wAyOp246+1FhjQQqcblJbvz/nrSg7Q4EnHTn/PtTlxlAspAAzhhRsYoMeW+T2IH+HrTAbLILeEGTaXPC7ccDH/16zJZCzEjOCemelX5rnLuAg4f5SeRiq9wRtDFR8wzx0zms5O5jJ3Ky3Lp9x3X6Nipkvpj98h/UOM5qMRB1yTio2jKnANTdkaotmSBuR5kR7gAMP1IpbfyhcL5czBjx88YAPseaoZIPvThuNFwuS3IEV1IijhWIFNjYEgsOM80gj3NyST3qVlVUpB5lnzDbLuiAHqOxqZQtxHvhG1u6f4VTYmS2GD060+OdVVfmww/StEza+pOHYcZyPQ81FclTBngNkAj+tWZIzK5eLDBueDUf3CVdevUEU2U9UQwMWj+b14qxC0asN45z1puwEfu+fbuKaQR1GKFoCWliaYk27bePl+vp0NZ8TzL/qiwHtVxWxkNnaRzin+UkeEC4x1z6etDVxON2NkHmKQ4B+UHp34qCQfu9i/xfKBVpjGke6QELt5IPH0qqWLvwNrY7fwD/E1lWlZcq3ZrCOtxSN0kmGYc4x7Y9DQIyP4to9EGKaybMc8dAe6/4ipUcFeUAI4IyeDWFOnC/JOOq/EuUpWunoNEag5xk+p5p1O3eiqPwpCpAGRjPSutRS2Mrt7iU5D8rDtj/wDVTacOEY/Qf5/KmIzha3sF693p90tvNIoWQSReZHJjoSoKnI9QR75wMTgeInfynuNJCfe8z7FI2Tnuvm8cjruOfQY5sDrzVlJDKzELn0H61UW1oK1igllJFcNdXtz9qu5FCmQJsVE6hVXsM5PJJPrwMW7cfvCfQU6dV27hwemM/WogR5ZHfIND3GXOjYx0HI6k1lXbMk5jU/LzViS7aNQMDB9OKhMkc+QTk+9TJ30IeuhVqzHMCNrcHp9adHEqc9T607avmAjG48VKTQoxa1G2FqtjNfTqZdlzMJ3JwRkRJGFUdekY/WmWek2kWprqEc8hk8yaQISMHzdme3bYMVbnP7zYOiDaKrMpizJHnjkqO/0961vdl7GVc+DbYaf9lg1G9ghktY7WZUEZ81U3bSSVOD8xzgjPFOufDUUrC6S4uYXW5lmDIkb8yAbgA6kdAMHGRzW3GPMlGTye9W5o1eGNTkDrwOhrKUHJXjoy1K25jaZYwaTo9pYWzs8NrCsSPIRkgDqccVO0vGRhR2Ld/wDPrU6WfBcmM9sqP61JJbKbRljwXcFSzDGay/fSW1vxH7q8yhAGTdu++z/N+WT/ADFWXO22JHrz+XH9ahikXlgpcMc8Hp+H+FSNIvlsAjDcMEucCiNaPLeb1F7NrSI2JQqDHcdafUEbFBjfER2+f/61OEpPOV/DJ/pQq9PuCpyS2JMDOcc+tLUQkwfmYYHUbSDj15qfC/3j+VaQnGewnFrcbSSHELk9+P8AP5U/aMEhs49qilKBVEjY5ztAycf5zTlfldiJPQruDkKAemelNTAkG8celXg0ZUFVJ+pqGdwjbo12sRjI7fT3pcqSIcbakqMV5ZCp/hBH60hdQ2Cwz7mqe9wMZIGc4pACze5o5g9oWJ5Nq7VPJ601TlQTTdiDr+tIZRnAH0pN3Jbu7gMPIfTFOLBcelQ0ckgKCxPYVLaSuyVduyJiw25FQaXH9o8ZGREH7iwKzFueHf5APT7j5/D2w4pKCAYzz0wc1BFLcabqrX9pB9pWWJYZ4AwViFLFSueMjcwwcZz145dKpBy0Zpyyi/eRJe6+1hY6nHLpVrEtvdxW6R+YWSQSlcOwVM5+bO0BunXuIJLmPU28O6nLAttFdW8sUaowPlyOoYDIxldqPxxzjIz0W71CyunmE+gaws88iT7o5I1YMqgKyusuFIHGMjOTweaiDvM9jHBZvp9np5Z4o5pBJK8hUruYgsOjN/ESS2TjHO85pwdtS7pPU0XmckMMbGGQpGR7inkLKFyz7e2F6fjUG8NHtVAuWDHngH2FIclePwry6dOXK+j/ADNJ1Vzd0OZHEecdufamIhzyDnGeR2qV5l25CMT12sRgH+tDufNOCTtG3J7nNaRqyclG3qRKnBRckxywZUl+npUajy1ldQNwYBeM7fercY/dAEdu9QONgwx+XzDn34zWmIjeMV3ZVNJajZFby1LOxz1UnrUTc4A69c+lK8hkcYyAOlPWPCkk4q+SK0SMJSbd7jUQk9ck9SacoY5jC+Yg5I/u+4NIoBOM4pM/IoGQT85I+uB/KsayTSgkXSdm5MANjMB/CxGfWpFDSOFPTqcUxELcKKkiyshGQp6cit4ppJMz3lfoSSIiKTwB3qB9nBU/lVkRZJMh3mqcq4mKL0FXIqd7D0kMZyPyqdpR5RwfmqJISybs4FO+zkjIYGhXsJcyREHbPVh+NSQSsknchuGHXNMeNk+8Pxqe0XCvJnttFJXuSr3sHnFJGWQcg9RU1RtAjc9D7U7BCYU84wCatXNldbjJ32pgHmiAYjz6mmiB8/MQecmp+gpK97iV27sCcdapzSb5Dj+HipHnQn73HanRwp98Hdnmh67BL3lZEKKc85FO5ibcvPrmppiAmB97PFQqGBy+QPeptYzasxjtvctjGaspIojzjao4HvVcjdLhec1P5RZgZDkDoo6U1ccb7hIglTcvXHHvVAF0wWbnPBrSVtx+XoO9Z+oIY9uPusTRJdRyXVFlVWd4HL/NGScepIx/Wp3A6scCsS3dv7QjIblYmGPqV/wq+zFzljmnzWQc9kWWfONvAqvcknGTUrMFHNV5CXIqWyG7k0fEYqTOec5/Goo8NtT86s+WCpwAKErlRi2jOnaSSTYnA9afbxiMgDr3NOkAQ8U+DH3npEBNJyF/lVa4kKKNvU1LNIqkntVKZi5DEYHagC3HzGufQVIEDISe1OiX93z3pzLiMgCgLEKYRwwHSr9UkGXUe9XauJrTKFOVyMDsDSMu1iPQ0lQY7FyRyibhzTgdygjpUET5iKEZ9KfCcZU9uR9KtPU3UrskJwKa7ypA7wqhlCkoHOFJxxk9hT6o6zBPdaHfW9r/AK6W2kROcfMVIH61RZWs4B/YdjqF74lmtEv1RiJhEoLuMhY9wOPQD5unHPNW5NJEd0NO/wCEmvlkMLTRwBkM+xSAW3bdxUFl+ucEmrVysHiHw2i6UYuGi2q3Bi2upZSOqkAEYqkdIutM8ZSeIb/U7P7D5E6SNLCUeNSYiiby+No2E9ByW4y2RtZEjNJvLq+0m0urz5pJYhI0iNgEHocdBwRxk88VabcwGWVgR64NUNNLrpaqYmiSSaaZEYYIR5WZBjthWAx2rSicm2AMXmBWx6AfWuF02pPll+pXtVe0kNifYRHPlR69xUbGRpypO1icHB6VM4jYbV255+QHp9DUUzKV+X7zAKexA9/0FZznNLla1/AajH4r6IiLb3LDp0X2HailjVpW/dgbR1Ymp0tnJ2gq2T/cOf51vClyxUTnfNN8w/TFzebz0jUtSyOicvjJ5xjk1KLc2dvMpctLKMAD+EfWqAdlJxwehOOT+Na6RVmNPlQ1jvkL4x6D0q1CSIsvgADiqtXGXfGADgHrUJ3dwhu2MebPyxck98UsFmTteUgJnp3NTwwfMu1DtJ54qwrKoKuQxA6KOB+NWo33L5b6spyq0isFBLHnAHWiGzmVZGZcHyyAuRk/hVmSQhSIztXPIAxTY3VDGQy7hwctz+VFlcHFN3MunByPpV69tB5gkX5S3UDpmqZgcds/Ss3FoycWgeYsvP8AOoC/oKknjZOOtQ7Se1IT8x4cE4p1MVAvOOaUuBSEOopnnJ6/rTgwPSgBaKKKAADJwKmKAj+tMjIDc/hUp6cUxohZdp9aTJ24/GnuQyAj1pEPUHvQAynx4OQe9Mp0f3xQIQEq3vQw2tilcYY051JUE9R1oGMAycCgjDfSnRfe/CiUYIPrQAskpkAGMAUQkeaufSotw3YpaL6ju73ZbKqjmQk9KrO25yemaUF5SFzmmU27jlK+wVYhxt3HgLUAOD0zVlYz5O09TREILUiYtPJ8vTt7VNHngDoBQzrEoUEDtQjqF/zzVpGqjbUWQ8YqsY5BISoJHqRVhfmfJpzbj93A96bG9isfMDY5yKmRzgB+vrSFdpwOfUmkUEtjtSSEo2JiwXqcfWl69KRlDfeGaFUKoA6CmVqLRRRQAqnBz1pcIehK/Xmm0UASLGwY4wcDjBqMgg4IwalXD7iBhscc8E1HLK0VqSD/AAlvWmBDbxiG3RFbeAPvevvViV0iXyQ4LZ+c57+lR2EbNZ24ZFPyKCV47Dt/9aqNw5N1Kc9XP86yqVFTVyJS5UX+vSgHHSs0SMDVuCbcMMeexqadaM9BRmm7Fz5gpL4PTGcE1KxV0Pn8YO1WA5//AFVWa4EMTPLIiRopZmkICqAMkknoBTpL20fRxei6gNmsfmC5Eo8vbjJbdnGOvOa6DQdJGUjXHK9dw6GkjUEfMcbuAfSs8+IdKtree4OrWfkwRpLMyyhwqP8AcYgZ4OeD3q2l9p93fS2VvdxG6t0R5YlJ+RX5Un0zQBYVTbs0jH5UXOexqu0m5vnIRjyQASfx9KkucxwxxP0OZG78D/P61X8+3ivFs5Lq3F88fnfZvNHmlc43beuMjGfaueblOfJF2tuWrJXZKHk3FkKuPVDgj8P/AK9E0ilBlGX+8em7/ZApkcltNczQrNDJNbhTLErgvHu5XcByM44p6KA2NgYk9T1/Op5KrXK5afiPmjvYeiFMFtu853DP4YqyFKAKrcgY5/z6g1E65m3cbRz1/Gli3fdPPdT710xSirIzbvqRznMpxjGO1MRtjZoY7nJ9TmkoAsJKXnGGIXqQTUskqp8j5ORyPSq9uu6XB6YOadcAM5ZSCeM4OafQBsqRhd0bAjoQTVT/AFRXyzlGONvp9Kti2Zowwxz2NQvEyL5hXAQ/Nkdjx/hVRvexLFooorMoW2cnUI0HTqfyq4Jin31KEnhiOKy0lNtfCTGcHOPUGts7JFVlb5WGR6GqhqQndsjeXahYMAPVe9IULRnzATjDcjgUJAkWWK9OhPahZA+DGeR1+v481XqUIVMgxg7P5+1VJVCyEL0q4knmSuAq7QMFu9U5m3TMfwqWCGUhIVSTwBS1ASZ5No+4p6+tJLqDdgR2JLAEs3/jo9KkMvlph25PUDvSn5IzjjA4qmSWOTyamUne5m3yk0U+yTeucqSdvqKtreRuuVOxjzkjOa57Vnv0azFgVSKV/KmmJjBiJdACC5xnZ5mBg5bbV21Mh0+0NwVMzQr5hUqRuxzyvy5z6celcsXOm2lsayb5FM1mljcOV25J9TnrVeV9iZ79qhjbEg9+KSdt0mOw4rdT5o3M+f3RUuXQ54P1FTC9XAJQZXpx/hVOijmaM1JovRlpFTKsAzHofpUpfLHbIwye44psEylEYMVKjkdqerB1XDRtzya1Ruhxzub7hwuPT2oBKbTtKgDJwTio5cFTlcFm/haoZSd3XtjHpScrCcrEdPDxyKqkMFHUYHXvzUQcEkUpYL1NZmIjIY5cA5Q9CBwaiY5Y1Ozq8YRW2kZ6jg/54qnklxn1pCZJRUy8R/hUNAiQOiL1qGSUtnFKV3UgjyeKAI4t+Tu/SpqkWIBeetNZWA56CgZehTLIhPoCaWR98jN6mm27bDGxOcYJp0i7JCuc4/UVr0OlDaecOAc4OMEGkVC+7HYZptMB2xsZHI9jmlkcpGfMbnvk9BSKditITjaODVZ3JYf3uqg/w+5/oKyqVFBabsqMb6vYdJJvkVR8pH3FP8Huff2qRV2rgc+571DbLjcTy2eSanqacGveluwcuZabARkYPSoc+W30HPuvr+FTUyTop/2gPzOKK0fd51uhwetu4+imxqREDg7ckKfbNOrWLukyWrOwUqspVkzyORSVHLFvwQcMKZLv0JCcdagEhe4GzJHSnRozZ83nBwAaa8rLJsTAqWS3pctO7kBX/hplNUMB85yfpUcsjDIUYx3qmym7K4yYl2O3kL1qEJvOFHJqzGf9H+Xr3quisDycEdT6Vm+5jJdSzEjpwzZFQs+Z92eM9aaXY8FifxoRd7BRRfsDleyRoXbFZHfGQeRjuPWoIpfMz8uPepZj5VtGP7qfzJqOFdsY9+a0e5rrcbFa+bcLGruEUZY7sbV9OKdcyyzy7oS6RqNqbXI4/Op5R5NqkaDBnOXPsO1R9Kpyl3J5UyCJrmCUSDdKOhVpCc/n/nrVg3M0oHHk+4OSPpmkoo5mNQSGLEoRVxnaMA96fGiiVTjnPUnP60UjHCk9cCoaTfM1qXsrD8qmdxIPIxikyQMY/MVHBLNPNnPC84Bx+dSOcuec89ad7oSdyKQcqT0ztP0PH+FOjJMak9cc0kv+rJ9CD+RpkbgKccqCeRz37jrXM5KFXXS6NbNx0JWLhT5f3qqsr7t0mctzk96so4ddy9O1R3B/dj61tJc0TCSurjoTmP6GnkZGDzUVsflI96mqo7DjsRtErR7fTofSoYoRIMk49qnL8/KpbBwTmoYn2zMNp5/hxzWTqU77hKDutB32fnvj61DLbbWG0k5qz5nJyOB12nOPwqOWXeVRO560nUpuLknsOVO2liAKFHXn0pMkK+OPl/qKkwki/u12vngF+o/GoLlzDBtOQ8nJGOgFcsqiqLlS1HGm4Pmb0BWdRiNiOc4B4zUsnOZIzgBvmB/hJ7/SmQMQiseadJOEYMQMEbSD3FaVKbXvU9GRCon7s9iSXCYQHcQMHjGPT+dVicmh7kHLEglvSmwuX5x3q6UHCFmTUkpSuiVQQKRWJbmlYnoBSxRknJ4FamZYWFTFu5JBBxQ8YbOcDcSQQCSf85qWPaIwM4I9agkk8qRwuBms6lJyaknbodEZRjGzVxZGUZwiA9gV5/MVVnuP3eBHgk5zkntSyMQNzcA9/WmYzUKhBWJlWmxYdxGWGDUzOzEDGaIo/Wpd6jpW5iMEZ6twKAocFF5Kjcn9RTWbccmhWZG3IcEjHTNY1YuUfd3NKclGWuxZR/m2LGflOCQeP/r0ycow4+8O2KiLkgyyneVO1V7ZxnNDRSjLPtJI3deT+FZQxEk7VGdE4KUfcRLbbiTknAHSnyJGTljtPrmoYJQue4P6VYkjWQc9fWu1arQwWsbEHm7MqvzL2zUsUqsoB4PoapMSshz24p4ORS5mQpNF+nL/AKt/TjH1/wA5qikrJ0OR6GriNvgJHqDVp3NYyTCiikJAHNMoqSXBL8NgDpirMZ3xAtzkVXljUpkAZzximw7kYowxxmp2ZmrqWorWjc7Tx6UsbGFsMOO4qSo5/wDV89e1DVtUDjbVEuUXLBss3TPaiOQlTnnnikgjVo1c8k0rAIR056Chdxq+7IJI/wB6CvU81MvmSjBO1Rwcd6XzFTkjLGmJcDcQxxnpS6kJq5J5iIwQdB39KguykygDnac5qF2OcUr/AHRS5hOTasU4Sv2uRQPmVRk47EnH8jWhAN5BNUIUYXc7FcDCqD68E/1q/ADtP6UuoiR03d6iGATu5oyRkZ+tG0lS2OB3oEKi7jwcVaSUCLaeSBzVZkKKpz96mZxRsNNxCRjJKMc808Rnf83THaiz2yKSPXmrTKMccVaiaRirXZnTx4cq3I681A5EhCJyc1dmgMzZz165NENr5bYI5/nUtakOLTJbZSRz0FWKhi/dsUYYycimNKUmODlc9KpOyLTUUJ924+fHXmrVR/u5OOCcelNWAheXI+lC0GrrYrE5OTRRRWZgSQ9TnpUoOJGI6AYFRxo/ULkH3p+NvXr3q4o1gmSRnqKfmmIvy896Ty/erNStdaNpl7MZbzTrWeUjHmSQqzfmRmoYNA0i1mjePTrYOD8sxjBkz7seSfcnNV5tS1Se81CHRba0kj05hE5uWYGeXYHKLjhcBlGTnk9OKmXV4DdTRXDCF4zbrseMl43m4AJzt69x0xzWNS8lyx3LiravY2Z0wrBkUMpAU4zxWfIXLYkJyOgPanalrdnbKyb5ZJ45ktDFHEXd5fLWXaoA5+RgSegGc1l2uux3Vr59xDcySPdXEUMFvauZGSNyMleq4GM5xyfwrWSuYyjfY0FJVgR1FSxwT3shCYUAfM5OAKz7vX9KttOFxbeddvLZG8iEMDuEjIO13A5UEjGDzwfQ1bu9ZmsfD1hfi3iELPAbscjbHJgM4+hYHvwDRFWd2T7N7M0IbK2jwDcFz0xH0+mamWdUUrbxhMDhjyaw7rXPseqX0MaQx21ibZJJpEZyZppQNgAP91lOfVx2Bq7H4i086n9gbzAGlNuJhC3lGUAkx7+m7g/iMdeKvS5oo2RLJJtUsx5/nVKqLeILI6VaXs0kswktBdSva2kjJHGc/vCOqrweOvB44rXNtFGA0s4IYZAjGc/0rJ3ZnNO5WrYgXyoV875cnpjk1REyQEGGAgj+OTk/4VOreahO7JJByT1qo6BBFmfd5b7eB3AFRZCKBxjGeW9R6CkkkPAVs5HPsf8AJpA2VGCwwMHC1ZoP3DJHy7QAemc9qoXYCz/KenFXg2VzuY8EYI4OB9apywtJKWBHPJqZbEyTa0LSTCaIo+4sqq/145/nUUjoh+926EcipIYjGUdsMpG1sKOnT+VUJYzFM0Z6qcUm2kJycUTecjnaVyPehgrDoAB0FQJwwOM/SnFmPRSPwqL3I5m9xxRT7fSomtPM96UFl5IOPepUnC9iaQtCsbELyR+HNSJAAvp6VOZfMHA6dqQ80AQMu04zmkpxUq2SMinblZuRigRHU4Pygn0ppjB6cUOCI6AIyCct2zSVJHyCDTGXa2KAEp8Y+bPpTBzUyjbhfbNAIUkKMmmCQlvYmklYAYpqOA2aAJAu1ye1RSyZ6fhSS3KBeGz7A1XE6sctxQBOg4zUiLucD1NRLKjHANWYMDk9ScAULcaV2ThFDbgMHGKqshMhxwCcirEj44zj1quzbmwDVSLnbZChAThVLc8mpJ59mVXr/Kq8t15K7U/D3qo1wSOBye9NWQ1aJYJJOTzUq5ijy3c8Co4VO5QTk9zVxlwAao0I0uBnAHX1FLLOVGB1NMaEFsg49qbIv7xM9DxQAzzHLZzz6VNE7HOeCO9O2r/dH5U8r8gNAB5hp6tuHIpiLk54+lS0AFFFFABRRT9xWNQCRnJ4NACjcsOVbBJz/n9aS6aNYJDcqGjWNi+e4A/z+dTkZXkE468fX/D9agvLcXVrLGM4kGwsOwzyf8mqET26oNigED0B/wA+v6VhyA+Yx9T1reSQCQANyBwCKxKwrw50kZVCGnquee1LsFO6dK46dF3vIyLNu4cFJQGUjBBGcg9RXlrNPF4dm+GyysLg6yLOMg/OLJz53mfkDn2Nek1RfRNOfxNHr7QMdSjg8hZd/G3kZx64JGfSu65vGpZanF+Nbt1t/HGmII1tLOxsVgRYlBUEjgsBuYegJOO1Xk1JtK8TeMr6O6t7V4tNsSs9yrNGh2YBIUEnrwAOTiugvfDOlam+pm5glZtViiiudsuNwj+7jjjpVq68GaTd/wBpG8tZJP7TgjhuR5mRtj+4R6EYBz6imrvYuMkzG8Ja/rF54xn0DUrm6vIhpwvopb3TxaSqwkCFQgAyp6888YrJ8X6bf3nxaiuNFkK6npmgC8tlxkSus7KYz7MrMv1NdboXhmx0XWV1WKe/u742nkNPe3bTMyFt2OfQgdMfqa2G0Sym8Qf8JBCGF99j+xn5uBHv39PXPelC048yNJaOx5aPF73Fp468SeH5fs032XTmTcoYxPhlZSGBGQcjkV1Gr+KL/SPFJXcJLOHw7NqLW+xf3kqHg7sZHTHXFa6+CNDCa1mzPla7tN4Fc7SVydwH8JyxP1pNO8D6Vpt4LxpL3ULn7M1nvv7ppg0RxlMHgADtgdT1rSzJujlPDXiPxZqWo6ervqE8OqW7+dNJo/kxWLlC0bxybcOucD5s549au+GvF2q65qWiWBnWC4tbW4l10GNAGaNjEoJxhcuCx244rf0jwZYaHeRS2F5qTLbqVgtbi9d4YARj5V78dM57VZsfDOl6Vqmo3lrbAT6s2bzcdwbrkAdgckmhJhdHC6X4u1o+IdEFxqL6haarcPDIBpvkWwGCVaCQgO2P9rOefrXo4BJwBk1ztp8P9E064sLmCXUJfsUpks4prxnS2/2VU8YP58DmuoGBCV3DLDPWkk+oMjVmjfOMEdjQsjICFOM9eKVlJIIweB0IpUhZuowKeoh3nlVHl5X1HUUhm8ziQcEEce/tTpU8tAVI644/xqLzH/vN+dPVARKrRfIcuucK4GfwPpT6cHYkDPHp2NQwszId45DEfXFN6q4lpoOMal9x5OKt2RLW8wIwinK54we9TPEskW1fT5eOlQW8qqDFMMLnOT2PvSSswEe5O1kThTUUZbO1DjdxVmWBA2WyuTwV5GPWq67FmG7LIDzjvRqMuACG2IB6jJIqhVybLggHrzn0H+f5VVZGT7ykUSBEE7YjxnBbjj9f0qSCJmT5QPp0x6Cobj7yZ6YOfzFW45PLRtuNxxjjtR2RP2mMe3kZGVRz04Oar/ZJEYb9o7/NxxV6O5w37xQec5Axz/WsDxLrK2t3b2y3/wBmUoXlNs8bzquMKxiYEsnUtgZ4HbOM5uMY8zKVPnlYxr2f+3Jvs1jdyu3mFopHtsvb+YmAxj+UsmHGHXlcjcMZNblnbfY7NYC5kbe8jyEAbndy7HA4Ayx4/nUNnphtJVuLsq14qyIFj/1UIZst5YI3LuwpIJOOgOBVysIxad3uTWqJ+5HZCjI+Ydu9J1qzCB5B3dOarVo0YtWSCiiikSOVyhypp0LhH+boRTCcngUhGOtMabRZMyhjtI6VCXLuPTNL5XvxTSjK3HPvQNtsdKOlSRwb1BPpxUThgQWpwmwuOaAVr6ivCF471AFy2aezlvYU2gTJpDiMAD2zVYNhjmpS5ZQDUB5NAMshQY/eiMjGO9KozHiowSrUATE7Rmomct9KR3LCoss3GaAJdxxjJx9a0InUwIsqkkDAYHnFZwqy04TaFwwxzzVRdi4NLVl2JVEmUkUgjBB4NRPG6ffUr9RVRrhjwgxUkF2ZEkKOwSFyj7cgMw6gev8AkUTqRjG7Noe+7IV38zYAMjqoPf8A2j7eg71E6MJsKSxYZJNTqDyznLN19vanVnTpv4p7sqdmuVbDUQIuB+Jp1Nc4WlHQZrckWo5WwVzyBliPXA//AFU9WDZx64pk7rFC00jBUiBd2PQKBz+mayqpyptRKg0pJj4wUjC57c+9LWZbahfS26SJol68co3W7KU+dT0LZYbDjnn+fFPN3qqpt/sC6NwoyyrJHs/B93Ptxn1ArWMXyrQT3NCioLK8hv7OO5tmLRyDIyMEdiCOxB4qegQ0yKGIJwfeqr4d3YHjtVmRA6nP4H0qnUSMqlx6zOvfPsanm/eQBhwR1pluoZGyPbNSuMRYHpimloOKbWpTgmZCR1HoasbonOcfN3FVzAUj3dxU1soJLn8KSvsJXvZiTRhv9WAD2qe3t9rFiAxVCQD0zTtoznHNSRybNwK7gwwecVdlcvlW5DJ58yZdFxwDg44+lPAyQB1PAqZmWPZsXKkZw31/+tSQSCXUAAuMfMfbAp21DYLt/wDSvLXoiAVCzbVJPak5Mkkj9XJJ9qYkyvnd8v1PWk2F+4omQkAHrUlUTjccdO1XI23xg/nUp3FGV9GOqOTzMHYB9c1JTXcIuTVMp7FMEqeMg1MpkRNx+YH3qJPmkHGcnpVxflAwMY7CoijKCuRSndb5PB4qFImZSyHBHHBxVq6A2v2weKgtwd5I6d6JRTdmU/iQ9YmIG/YT3JTJpTDkYKofplakZggyxxQDuUEdDWf1en2Nud7ESoU+6rD/AHSD/OnbmHc/imf5VJRR7G20mPm8irIpYoCvGTgHqc8k1OkWfvbRwASOrClK/vA3tinUKhDqhc8rsa6qecYx0I6iocB4ZGV13Ly20YLCpVkBOCw68YNUGkxqBQH5Xyv59P1xVTpwk7tEOo0rJiE7zjoPSmsoc5b5j6mnmJ1GWUj6imhSTgAk+wpWV7mF3sPQbYgB2FV5wxwcGrccZbAFSGHBw3pTEZQRm6Amr1pbnbzVgQgnAzUygRYz3oGkIUSJORUL3CAdMUty+cY6VRlUuvv1oBvsWJLj5TjgVDvD8g5qOFWyQw496l8vYOBx7UCLbQq8AVqja28tQynI/lTY5WO1AM1b4xtJ+tVo0auzRFtIUBfxppjAHWnySAE4H4VDkse5qTIVI2c/LUvkbMEscZ+bA7UkcUgOc7RVmm4c0bGsIpatFVlTauchFbPyrwf6n61CDh/MPysWySO1TzSk5TGOeahrmWHhG5U6zbVhZP8AWscghvmBHpTjM5Od2KafuoRjG0KfY9aSnQlemiat1N2GsuWFOIKqCRx2oHLAetTMgKbe1dCVyIxuQKS7YXj3q9APLjKt0IOT+tVEiKMrDn1FS3DlisaZxjOB3JprQpe6ixVS5kJkCIcY6mnKZgMAH8RVYkpNk9Qe9DYSldFmOFjhmPQ9+9TOmeR1pwIZQR0NLVJWNEkiNUz1pzIpByB+Ip1NcZXpk5pjYm9VXA5xUcjllxsB96fIiFCemPQ1BG53qDyM96h3MpN3sNEbUwgA5PWrrRK3qPoaqyw7H5OQelJqxLi0RkbxkUhJUDnNOY7V4qPGcmpJEhczPJkcI+1ffgH+Zq4o2J+tVbGExhycfNIz9fU1ZkOAB60xkXU1YtjlWU/WnxCMfcwT+tKgUFtoxzzVJFxjZ3EmTfHx1HIqiTuGDwRV95Vj+8efSqzzJLuGDz0olYJpXCx2IpQdSc1aYZU1RT92yt6datvJ+5LLgelNPQcZaEbOONh5P6U7OBnP41GigDcaeT8h9MVN7kXb3HRt5yEPg4pG8pflUAn+VRpC7LuGAD60GIhSc9Keth622GkkSEjrmnefJ/e/Sm+Wduf0ptTqRdoSN45pZo4ZA7wSCKVcEbGKK+Oevyup49an8nbIoY5Bqlo0M0FxrL3gbe97Gd5QqH/0SAEgemQR+BFW5Zd7DHAHSqskaOKiW6MVHC5dOeoOKkqzVO6CmSNgKP7zAcU8c9KSVdsZJPzZGAOec1FS/I7FR3RinTNSiur6XRp7SOPUHEzfaAxa3k2BC6gcPwqnBxyDzzS3Hhu6kurye1vY5LmRrOWEzqfmaA5O/b/e9R09K6GC0ZQsm9RGSSc9h6VZWZUwsYyc7cn29qqnFcibCT1OY/4R7VYrptVa4sf7SXUDeJD83lFGt0hMZPXOFzux1HTnFQv4Z1d4IM3FncYuLmee3k81IWaV9yt8vUpyMHg7j04NdQj/ALxlBAOQcKACMjHuetI0gXlskjH689/pWlkTdnKW3hXU9MsRDYXlkzz6alhcmUPgbN+2RAM9pGypx0HNdD/Z8Evh86VefvYZLUW0pAwCpTaSM1aBZerABT2Pofb61BKf3nJyRwTS0QbmDH4cli8InTbq/Se+lvIru5uthxKyTI/Qf7CBR9BVW38PQWGrz6gyWlxaJeSX5lZJWnjJYuVCLwSGJweuONpPNdLSFQWDEcr0PcUtA1OLtfC2q3/hHS4HMMato6WrQXgkzayYOXCA4LEMAQ2CNo9xXWRA7oo2Iby0CkjoSBjP50khaaY4B/Gp44xGvv3NRuRdyfkP69arbmhkKjlc8CrNJgE5I6U2imri1zPiFJTf3N0XnuLa1tFLxWd80E1m3zMZQmQr5GD8x/gxg5NdNWXf2el6nqBhu7S0vLq1jRmWaEMyK5bbyR0JVuPah7DbtqZx8U3KavbJAIrqwluorR3FuwbdIgIYuSAD8wJUKRg9QeBa0LWNSvZ9LOpR2Rh1O0knRYInVoihTgksdwIf0GMd+tWJLLRxq0Ut1YWp1N0M6SNbjeRGUBbdjqC6D1/Kp1vdE064tIJ7iwtJkTZbRSOqMqsQMKM5AOAPcgU15gmitr14rQ6cLK4UldXggl8lz1D/ADIfw6iqM3iRjpWl31wlqhutPnuZiQ21WjCYxjJx83PBNbkFpo82sXN3Da2kmqWrCOaYRfOjFFI+YjrsYc+nFRW+j6LK91LZafYM8xljeSOFTvO4iRG9ckEEetNpg7WOdtvEGqSXbaeYLWO7+2RQ+bLbOi7JI3fPl+YTkFP73PtWzpl9NdWLNdrF9oiuJoJDCCqNscruAJJGQM4yceppLbSrHTwGtNMtrf5g4aOEL8wBAb6gMRn3qwkQAIiiWNWZnO1cAsxyT9SayMZSTWg8yD0zSfIx9KPKPtTSMHFIglxsX5RUZck5o8w7cU2gCdP3g6e1BgAbFMiLKeOlTBiTyaZSsxvQUZyuOopGXcuKYgYH296BDlXbmkkXIBFPpCcKTSAiwVw1I0u3kkCoZZwgwOT2qq7s5yxzQImM+6THb1pXUsuAcVWBwwPpVsHKg+1AFSnrEzDI/WlKAzEE4q1GuWGeBQAyOAIMt1pPtRhf5Bkj1qe4kVU47frWd1NAFhrx2JJC5NQmRy2SxzUjxKqZBxj9ajjbY2SM8UAJlnPcmpIE3Nk/w0K5aTCKozUgh6kscn04qkVFNst2yBmJyMj9Ktlcriq0Vuqt8pb65q0OBVmyv1Iwhzz0pDFk9jjpUtFAxhQbcd6cBhcUtFAETKV5FAcjvn61LSYHoKAGByT0qSkAx0paACpMfvgOu3qPp1piDLgHpnmnxvtZpGGfx75pgT/xerDupz+n4frUTN5cWF2sy/KMsB1P+BpyyIWBY9OeR/8ArqC8EktjcLDgO0ZVTvzgnimIfG265Vj3fn86zSMMQexq+pwwPoap3A23Uo9HP86zlsZ1COpfKHk7yeaiq4EBiCt6CpSuTFXFg08yIju4AbHA6ipprGOJPl5x1yOatRnzIU2HaVGPrTXQkO5YnIOARyBW3KrGiikV7a3iTDkHd2pJmxJu6cflVlcCNMFRgc5FVLnmfa33fvMe2B/n+dRUkqcLlxV3ZDIjtIDJk+WoOfTn9asRMyNuiYD1DHpVdMnLngsc/T0/SpFGVPuQKzoRcaaTKm7yMu2tYb+61fUNQuLtXtbgxxz28jrtjCK2xVXqQWIPByR9AGNB4cg02yv47vUIItUmjgRkuJw9y8h2ruBO4H1JwQB2Aq3peqWWhR3Fjq9xFZEXU0scs7BI5VkkZxhjxkbsEZzx6EViXdhocljpY/4TG3tpbNYvLaOeApIqzpISAwJyTGBkHsM55B6zM3NFgFrqOp2MbkWlvOght5SWKAoGyGPO0knA5xg89hpYc9GyTwARgj8PSqWnN9v1m+1WFGFrLFFbxMVIMgQuS+DzgmTAPouehBrRkJfG0gnoOP1qWMjliUxtIHzwMD2qAIxx8p56VcCeYo34bnd70kuCOwbHfvwaTQFQxsvUflzT4mCrzt79c+1TNtDFnwD0zVeVVUjYevvmlsMnZRNwuMDnKjPrTRbA/wARH/Af/r1XqeOTFuRzkHnBxRowGmD5wiPuY9sU4RW6Eo7lnLEnZ0Bz0p7v5EK+WMNIMlieQKpIdlwfRvmH8j/SmtmhGmirCeZW29MMOn40k8CzrmLBbHUEc1RYbWIzx2p0S5JYttC9x1/ClfoBfSMpbqjnLrzgHJxVAD925I5+nSjzGMu9chu2KuxsJFzLGNxGGx3/AAp7gRSkOW2nrGGyO1NILQqDglyOf61Z8pScwkdAMelRPAS6hV2gE5HrRYCtPDG0mQMfIfl/EZ/pUYU44HA9ulXBHI9wpKsPkYZJ4HK0SXEaZQKZMcZJ60NIEZWoXf2HT5bnarbNo+dtqrlgu5j2UZyT2ANZWoaJHeahax3RDveeY9yVh3ROVEX3VLZQkRDDcgfN3YVt6tqcFhpZlktPNaQ+WiJgZznqTxjg/wAsEkCszw+mm+TcTWGkR6bcxSmCRAiAqCqSYUoSNp3qe3PUVzzSlNRN4XjHmNN4kdyzDknJ5qCaIJgr0NXc+YMMfm7E96q3RIwpGOea0klY5pJWHoFeEDtio3gVVJ3Y+tFs2NwJ9xTpZI2Qjdk9qWjQtHG7K1FFFZmI6MgEk0ctljTaKYDlcqMU4TKOvBqPyCfX86PIPofzoHqE1yrycnHoKYz+lJ9iBbJ3fiamW3CjGaAK8cpb7ykfWpqkEIB5/lQI90m0dKAsR0zZ82e1XRaqx4bH1pklq8a7hyPUU+VjcGiJG2n2pCcsfrSU4rhQc9aRI2iinAkqVUZoAbRUiQs/PQe9W0igtlMk7Kqou93kYBUX1NNRbLUGzF1C/Fq/2OB/L1GeHfaLIAomOcFY2Y7S4/unuR2qvoNp5N9fXMct8beQq2bm3+z+c7E7i0ZRRlcKd6qud2DuxmqZu7nxFrEkRtEsjd23kSJcQfaIwiqJQHQ7Cjjzhz8y5ODyAa6nYsMcESMxSNQgMjFmKhe5PJ6dT3rnnqnNbI74xVNcvVjjKi5y3NNV5HzhQB2zUdvICy7o1Jx15q3uH91a6ovmVzl1ZAku5tsgwwqQ5wcde1SBA+dnB/ummEEHB4NVYaG2+0Q4bOQTkCq+rXrWWi31zCqlre3klCeu1ScH24p7l42baMhuc+lQjY6vFON0Uq7XB5yKnmtoRzcuhLqdvcaN4Ss4tOvpIfsZt4y6qreau5UIO4HAIPbB9CKgj1KV/Hf2FNSNxbyxTCSBXT9y67MDaAHXgk7iSCWA/u0yEa3YxpaWt7bPboMRi8tWlYAdBuV1yB2JBPuamB16dHaW9sbVnADm1tGMij2dnIOPUp+Fb8yKWpDoX7rRY4CRi1kktQw43CKRowfxCg/jV55CF4Ug9tw61HZ2UdpDFBCoSOPgHJY+557nue9Pkj2Hao5bIOe5x/OuGdSprK1kbcsXpfUiNwxUggc96ipxGckevSnRRiRuTwP1rRPm2ON8zdmTwf6kUn2qD7XLbb/30MUcrrg8K5cKc/WNvyqQDAwOlY07XFh4mubr+zLy9guLK3jWS3CHaySTlgdzDs61psbpWVjTnZ2hO2NsHvS20bxxnepAzxXJS6ZqcnjKG/i01oWW9fzLhfLAeAxuFBfcXPJX5cYUjgcA1f8ABui3WnXE8baa1pCYURpJQgkkcE53GNisnH/LQqrH37JXbEo63ubZ1G0GrrpZmH21oPtAiweU3YznpnOePY+lXo4iMvIpKr29T6VyUuk62dSfWkMHmLfiZLIwnzjCuYtgk8zaMxlnxt+835RHwzdxWUEmm2y2WpyNfpLdAgOFkEpiLMOSNxjIHOPaqLOzZWlwdu1hxjoMVJFCYklfHz7do49a4NvD8twpjstDbTLRms1uLZnT9+6XUbu/ysc7UDZY8tnviprvQpYBdWVvoyTaU+peYkEccbqkZt4xlI3YJjzN/UHBJIHenfyCx08wkOVRD7nFVgCegNcp/wAI1q/9naTJd6VNdXsNmkIMzRukbByeTvVo2Ax86E5HbgZ9EFuu75wcseBmp5WzOULvcxtrYzg4+lKkjJ90/hWlNCFChQx3ZBBFVnhUKw24OKTi0TyNaocj70B/OoZ0brklfT0pIHVN244qUzJtJz+FGjQ7qUdSK3YBiD1PSrQJByDiqUT+W2SM1aV1f7pzRF6BB6WK07EynJJ571PDgQjH40kwj6v19qieUeXsjBA75pbMXwttiv8Av5QFPAHU09i0KDkMOlIkK7QxJ6Z9KJ8CJQvTtR0uGqVxJJ8gbCQe4xUsT+YmT171TqSJ3XhRkelClqKM3fUmkberxo+18cH3qN+IEWQnzAozmnMglUuMqw6ioCS3U5puTtYJMFbawI7VG/zSHtT6iJyc1BBeguDJJ5cjbi33T6GpWIQdKzoztkU+hzWnJhmb0Jq4u6NYNtEKsqqx6Gq7vualuAYzgEkH3pkalutQZu+xYVtrcGmvL+89qayqgySarPNtGTQF2TysGFVHkCcdTTw5dQTVYBpGOOvWgRbjOUz3xTlB2896SH/VL9KViR0pCJbd1jVgfvdqeEPdjnvg1XjUs3FWypXrVF3bIjGoGcmpLdcAsRyelEZDMxP8I4ppuAkgDZI7+1NLqVFJass0hOOtRmQnp0qOQydVwfY1ZqTSbdu4qG9KqMMMcjFPEx28j8KidvzNZt3MJO70HJ83mKBuJTIHvQI22ZOFOCQpHJx1qDFWI3Y+Xl2J3jr25rjqQnFuUGb05QklGQ1o3BDIc/Sp1JKjdwafEgMS56jj608MBkBTgdSK7OaMUpN2BQs9CPIHfHBJx14pYwFZt/3yTye/0pGKq24chckj9MfrUTDy2VMkKyYI6gHHXFcspzVRyjqlY1tGyuWHlVGAOSfaq07KzDOQM85FTk8B3TOB94HjFVblcSDp0rpVSM1eLMKilHcuRnjHYCnBlJwCCfTNReZui3KCEAJJHf2pSuAobHUAKB0+lZyravkV7bmqjpqS0h6HvSRsWjUnqRSk4Ga6E7q5D0KryblKqpHrULZyCvUGp2YLnux61FWbOZttloTrsBbr3AqvI/mPn8qaTjrRTbbG5NjWBJA7U8psUe9PCYwWznsKkkjHl7mOD2FKwWZStCwurhGYkKwIz2BUf1BqZmycmo40H2xirfPIoBX2BPP6/wAqW4Hl5zzt9KBDqUEjoSKijfcB79KlTAI38jvQBJGFKfdyc85ps0Kom4cN6CpRJGgyOfQVBNIWJb/Iqnaxo2krDVORz1p3JX2FMQcZqYOoGMcVJmJGMqwqZQibVc/N7mmbhtJHFQyyF2y3WnsNNIvEZGKhm+WPaBnPU0yC5/hkP0NStKIzh269Ku90bXTRCFcpgK1J5T+n6irO4sAyHIpSgPJ/Slyon2aGXciEbY3Lj37U1bbgFyfpVercFzcE481io65OaSd3qSnd6k0cDFfkQ7R37U7y0X78gPsgzUkchI/fklW6En9KrXHyMwiI29dxHQf1NVKUYRuzZJvREnmRL9xC7jnBaojIZVGxIx33AHA+mev1pipuX5xgZztPOT6mpax5Z1NZ6Lt/mXdR2HNI7gB2JwMVK0iGMbtx56A4HaoKcf8AVj6muggaCQcjg1LI67iCpx2wf8+tRU5+Qp9RQA/zF5+Un8fbFRs25s0lFABSHOOOtLRSAghDGRmbjtU9FFC0ElZBRRRQMo60b1dAvzpW77aIG8naMtux/D/tYzj3xXHTR3cd7qs+gDU/ssi2KyTXQuTKYw02/azfvOCVzt5AJxXf0u5vU/nStcdzldHgvnvtOkupJp0Wzvgsskco2qZbcqpMg3HgHBbkgd6bduLaLxHZ3Fhc3M2pkm3EUDyLcK0Coq7gCFwwIOSMde9dDO77ypckemaYjshGCcZ6Zqb6mTn7xyiwXtjrOo+V/aI1RryzFuY/O8iUCGBZS+PkYYDZLcjHHNP1SfUxZxSPNqYKXN/tjiM6+Z/pLeV88eSCFA2hlKEHpwK6l5Xc8scemaTe/wDeb86VwdQ5Se+vbjXNSSKbVDqMd7aC3hDymFVMUBlDhf3eMFyc9M5GCauWD3y6tbCVtRN99pmGoJL5n2YQYfaVz8gGfL2leT3710CwxRRTTwxhJbibdOwJ+chFUE/goH4VLAsk0ZX7yDsT0+hp9Q5r6FXzj7/nSg7qllh27iOQpwQeoqBhjkVJkSE8DinJjJ3Y/Gqj3BRsYzTftR9P1oA0cgD0FIzhSB/kVnG6bsKPtT46DNAGnkYz2oBz0rN+1H+7+tPju8H5hj3oGX6ilcFeDxjmovtqf5FQS3O4EKOD1NAiByC5I6Zp8SByc54qOrdum9BjC/1pjSuReQM9ePSpgdq4xUjR7SA7df0p5iGzlgaLMfKyllXmGM59atL90YqEQ7XJHT0p4z0FIkiuHU5HU02BAeffFMaNw3IJqaMYQcY9aAJBGHfGCQKY9sFYqPqDVm3+6x75p0v3Nw5xVW0NOX3SlHAA4yec/lU4A3dTj6U9kzGrLzxk0kcZZsnoKpKxcVZFyPGD60+oV3fw07c460yiSio/MOOlCMd3WgCSiiigAooooAKKKKAFBKkEdRSNINrKFA7ls8D60UwHdgDuSzfngfyzWNWUlaMd2XFLdhweQ0xHsFH86iu5JE06cwEs23IIHzKeeoqxRLtWISghdgwxI9fX1FS6c4q8JXfmHNF7oKr3q4umPZ8MPxp6HaDxhR1X+77/AEqS4iaW2WRBny/lb6dv61cZqpHTczqxaRRq/VRYXJBxj61bq4kU00Wof3luFBwV6j1FSjb5Z3nazDGPX8aoqxRsqcGmmQ4Kknb/ABY6knsKc6ihG7NVFt2LU0+3ciYLD7wPRfrVNV82QAHIY5Zz/Gf8KlaIFtjcLtDKg6A4zz60sW3zBuz7Y9axUJ1Jc1TbsVdRVoiOQzkjvT4ifkwcDdzzj0qI09F3/KCA2RjJroIFLFDsKhhnIz3q0sSRF5IYER5m3SlQAWOAMk9+B+lVpspOcjbjoDUyXalf3gwfYdapCF2eVKTC2GboMdKcSsjFUISQDp2b6VDPIpGY3J3dj2pFALiNh93+L0P+FFwHo8kY2yBsg8DGSBSO48xU+UjO36DvTorvJ2z/AIOO1QTo8cp3855DDvS6ATFN64I24IHTv/nNVSMEire8SOrhsEkCoplAUHGGJ6UMZEuNw3cDPNT3ECRjKk9ehpPs/ON3P0pmDH/GRzgYoAfd8SKv91AKqS/Ltf8Aunn6VeniMk6Y6FQSagniCOUzuBFPZ3FuhDzGD6cGpI4t8WM8lhj9arxytFlJP4hgN6//AF6kEjg5DHpjrSatuF7ihXjlAxhu1XWOFDHnA/M1WhjkVg4Xjvn0qwx29SB6A8U0AEgk/XA5607c4yC5qubpF+9KNwGAo/8ArVDLc70VIC4bPLFcAfnVWYrklxcOZtgY4CkNz3OD/L+dQUAHtk+p61JHEHKqW2lulQ3djWhzniC+vLW//wBZcW1soCiWKUDJVVY5WWIxjl+u8Zwe4OL+ipHFpNqltBFDE8fmgRRxoDuOQ2IyU5GDkHnrVHULXVTqs17pMFtYSM2Hke9YrOBwC8IjIPAHIYNgYzgVvcZyDnPf1rnjrNs1n8KSClkUTxFW+8oyDSUbivK9RWxm9ikPlbBH51bCKF6A+uaa0UU3zq+M01k3LsW4U+x4z+NSlYyS5SGUqX+QYFMpWRkba4IPoaSoM3uAGTxUqx7TkmowcHNKZDz2oAe0m04FNM2B0qLO4+386HPGBQA5pz2pybic+nrTI48sM1LIQFCigBDLxxx70sc8canOSx61FnKknpUajLCi402ncuC6UHkEA808XKdVZsj0qt5ZYZxmnLDgelVzMrnkSqiXJO3CSenZv8KjMEgbBFOSL5hzzmrW9v7x/OhJMcY825D5C7MHr602OJkm9RjrVje394/nShmJwOp44FVZF8qARueit+Vc7rOqvJqMmnQ3oeNvvw20KtMMDDphwVmXnLKhDr75xWlrZ1CGKBNOW6JaQiZrPyvNUbTtC+Z8uC2AT2+mSMnTbSHV9Umup0t1S3kjkMdpOJ4ZJdzyDJKgh1Zyxx1yn0OdSTb5EdEEkuZmppumppVmDKY7m72BGuvI8uR4x9xGJJY7RgZJzxzzVidj8w77QPoCcGpZgXjb161UX5mYE/wj/wBCFZ11aFltoZxk3UJbdMvu7CrKYaQDPfnBqqxaJCgzyevtVm32GNS+VOOoFbx7GMXbQsOxEaMy4fd+YpGKjcPvBR/F257UyRgz/L07YpWYkuM5Hb860NAMYZS0WSB1B6ioiAeoB/Cno5Rsj8aeyBz8vU8jj73/ANeluAsaCVfmJBX09KY37uQgcj370RuYpOVz2IPFQXEreYrnueQKG7ITdtSbcvOF59z0pXKSjDjaR0IpmcdeKKW4xjoVYLkk/wAPPf6+4puxS2UyrA8jpUzgNGuRntzUHCP8pGR05/SuWSdGXMvhf4Gmk1Z7k1FIGz7HuPSlrpTTV0RsQXCDaGA6danik/0HJ6ljk/Qf/XpQnmNsAzntUE0yoghh5Vc5f1PejbUzfuu4w3DHoAKY0zsME/lTKKzuzLmY5XKsDnOKnF2AvEeT6mq3WnGNlXcRgU02tgTa2Nq1u0mQAkBmHK56VDcSETEADK9DWUjsjhlOCDkGtWBheR7yAGHGO1aKXMrGkZX3GCd1XAwPwpjEsxJ6mp3t9zZjwFPXnpUMieW5UkHHpTdzQoSALIwHSm1LMMzYXkmmqhMgUgisepztajKfCMyr7HJxTpogmCvQ9qkLxJ8y4yRxinbUajZ6jyIzKc8t2BpwUDoAPwqAQlsMx5PJBpzO8b7QNw7VVzRPq0Stypx6VSJJxkk4qdp2VsFRx71H5m9wZPujsKTdyZNMRI2ZhwceuKkMbQfOpBFTLIr/AHTmorhxt2985oskg5UlcesyMvJAPoaqtjcdvTPFJRSbuQ5NgTmojxxTmbnApjsCnzce9IQIwL4HatTP7tSf7g/lWNbthsfjWvsJtkXOCV/rVRLhuVXcu2TTs+WBx1oWMhuexpSBIeeg4+tLclJtlaSUFtueTTWQEDcPwqd0VBkgZJ9O1VjMGk20mrA1Z2GyS7eAOcUkCblPvxUhj8zjFXba2CKCRQG5HDAcAY4FPaLJx0/CrG9QcDp7VDO/zDae1A7JBtEXO4H3qGSctTHc465zUdBIsVwFn2t0PGacU8yRtuSM9aEj8w+1WhHswoOOMk099B6tWIQGjA+bp056VLHIjL8xwagnXa3HQ1GJOqg8ii7Q7uLJ5nTflfSo4U8yYDt3pFAYZPNTwR7m4O3HpS3YlqxsqhJCvY0gUgp2ywx+dS3IwynvTUYtKmecHpU1U3FpFqyqIlVysJbYwHJHHvSogY/N1Xjr36k0ixfMd33zyWBp6JsJ5znk1nClNte0tZHU5LWwbM43MWA5ANI64y4+90BPapKAMnA710KCirR0M27u7ITFv3L90Z59Wqu6f6QsRzgnqKsyAJMNnYnbjuO4/rUMiZuBIzbCpBC7Sfz9K4eaNODhtL8y5R55KXQfEq7EwSwXnJGOKkz5qqy8YORUbMBE4T7ucLTrdgY8DqOtdFGEVT5e5E5vnsIAI26KuDg49KS4Y7gAakfhgR/wL3HpTGgygP8AFjvSp3UpQWyCom4pkSRGXPOB3NLLGsZAXPSpoI2Tdu71HKGYliMEdq3toYNWiQ+WX/8A104KVwSOBTo1708sF6mpIJkdZPu/rUcuGlCnoBk1IqKVAYc+tNZArEjJJ4+laam+r3K8sZjuoplIwEZCPqVOf0qN8bTnnNO1Fyi2xG7/AFwBA75BHP4mmkZI9qmRnPcaqhQCePSlDgmlK5NAUDpUGY5UZlLKCRTW+6alhmMYwRkZp8yAqJF6HrVW0KsrXRXX7oxS01OAQfWpNh257VJI32pHTy/vfMD3qSFS0n0FPuMABcfU1VtLl8q5bsrqgZlweCattbI3qPoarKCzcDjuauoQFAB/OnFFQV9yMMIPlbJHUGpVYMoI6GmO6Btj96h3vGdqfd7cU72KvykVWrf/AFX40UUo7kU9yyjsIWAOBkVVTm4kTA2x42gDgZFFFcktcSkzsX8MmoooruMQpf8AlmfqKKKAEpx/1K/7x/pRRQA2iiigAooooAKKKKACiiigApG+6fpRRQBRooorE5QooooAnj5t8Hp5q/yNW5QEcoowqngCiitI7G0CncuxbaTkCoaKKh7mctyKZQIzx2qvEoZjuGaKKBDZAFkIHSk/h/GiimAlFFFABUsSKwO4ZoopARuMOQOmaswMViG04zRRQAMoc5bk+tSRqNvSiigB9SMoCZA5oooAj69ajcAHiiikIfASGOPSp4OYTnuDmiiribRGw/6kVIOoooqlsXHYn6dKKKKYyE9TTo+9FFAElFFFABRRRQAUUUUAFRp94fRv/QjRRWFT44Fx2ZJTX+7jsSAR680UVuQTQKDLk9Qp/lRIxUeWuAmAcAUUVjLSpG3mUvhZHRRRWxIVGnKx57l2P1zj+VFFc9X4oepcdmWHP74/T+lCcQsw+8CADRRXSQR0UUUgLKEy2cnmfNsxtJ7VWoopsAqcMTbZ7jPP5D+poooQEFaMSh4gjjK7Ace9FFOImVYAP/Hv6GpcDzIRgYIzjFFFNbDIWObc5/v0yT/WAdsCiipAuscTvj1UfhiqdwMTHHfmiiqkIiZQykMMg9jTtNJdXLclQ2CfY0UU4/CxP4kaIGDx3OP0rMu3YCQg8g4HtRRTXxIHsxEUAZA5PJPrUiDMig+ooorMoeJG2MScnIHPNTSKNqv/ABbeufaiimhHlWreJ9Yt/iTbadDeYtJdSS3eIxoQU445HHU89feu9PyyHbxg8UUVw0m7y9TXFpJQt2LinKgn0qOHox7ljRRXWY9UV3/1jfU06BQ1xGrDILgEfjRRWfUw6jGYuxZjkmkoooEFRv8AeoooAcn3fxpQoHQUUUgFqNz81FFACZOKkhGTz60UUxk7nC8VFuJ6miigCe35yTyR0pwY/aNueMdKKKvojVbIlqaHhSw67gM0UVa3NDk9Cu5/7ehh81jHdaWL6RScjzmI3Mv93PPC4GSTjJrpgAFCqAFHQAYAoornpfFI2q9CKFi27cc8011CcLxkNn8qKKVf+EzKjuiVfmQZ5yKdRRW62AahJjUnripZOVJPUoSaKKpbE9CvbkmM5OeamDMAQCQD1GaKKlbCjsG4lcHnHSoLn7q/WiiiWwT+EkHzRjPORzUduxOQTwOlFFAPdE4/1Z+o/rVJP9cPc80UUpEz3RNGN0rI3IXp6j8aCStxsBO30JzRRXkU21VSXc75JOGo5nZJlZSQQOKZfIqXsioMDjgfSiivXlsedMIY1aPLDJzSRIpkbIzg8UUUdikloT4HpUFyTuA7YooolsOfwkFOV2TO1iM9cHrRRUGBo2EjNEwY5xyPaluQBMcd+aKK2XwnRHYgCjzGbHPrTqKKRRA53TIDyPSoGGGIHrRRWbMJDllcEfMauUUVUS6ZSl/1rfWm0UVBk9w6U52LN8xzRRQIEGXGafL938aKKB9Csn3qbMAQ2fSiigBLJQZASO+K07okMgBxkDP5CiiqWzLj8LIj0NCf6lfxooojuOG5Dff6wDtgfzqukaBuBRRSe5MtyzEo3Vbk4Tj6UUUhLYqSk889qiDE5z6UUUCGUUUUgLEH9KlH3mooqo7lw3GXH+rWqSgeaxx6UUUPcUtyZPvVatv4vwooojuEPiGXX+uT6UwHBBFFFEtwl8Rb/wCWg+lPoorQ3CnR/fz6An9KKKAK12SsQYcFTkGotx8+YZ4D8UUVzv8AjfIG3y/MYGLLyc0+E4lXFFFWtznW5KDmUZ7uc8eg4qeiiow/wt+bOye4VXmJ+b60UVtI56mxCGI6GgknrRRWZiXV5UfSloorY6ipeAMg3c4lj/8AQ1pjjDsB60UVD2MZbCUUUVBmFWbb5oPm55ooqo7lw3IHGHOKmUBk59KKKfUa+IfEAM4GKif5mUHueaKKcip9BwAAwOlA6iiiqNCJjmbn1qQ0UVkc5//Z'

  var mapData =
  'data:image/jpeg;base64,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'

  doc.addImage(mapData1, 'JPEG', 10, 40, 195, 76, undefined);


  //INSERT THE GRAPH & CHARTS
  //DEFINE THE DIFFERENT COLOR???

  //REFERENCE HERE
  //https://stackoverflow.com/questions/43664722/how-to-save-chart-js-charts-as-image-without-black-background-using-blobs-and-fi
  // layout A


  // var newCanvas1 = document.querySelector('#myChart1');
  // var newCanvasImg1 = newCanvas1.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg1,'JPEG', 120, 130, 80, 80);
  //
  // var newCanvas2 = document.querySelector('#myChart2');
  // var newCanvasImg2 = newCanvas2.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg2,'JPEG', 120, 220, 60, 40);





  // var newCanvas0 = document.querySelector('#myImage1');
  // var newCanvasImg0 = newCanvas0.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg0,'JPEG', 120, 220, 60, 40);

  // var imgcanvas0 = document.querySelector("#myImage1");
  // var newImg0 = imgcanvas0.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newImg0,'JPEG',10, 140, 60, 100);




  // //another graph maybe?
  // var newCanvas3 = document.querySelector('#myChart2');
  // var newCanvasImg3 = newCanvas3.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg2,'JPEG', 98, 80, 60, 40);

  //LAYOUT OPTION B - GRAPH FIRST
  // var newCanvas1 = document.querySelector('#myChart1');
  // var newCanvasImg1 = newCanvas1.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg1,'JPEG', 10, 40, 80, 80);
  //
  // var newCanvas2 = document.querySelector('#myChart2');
  // var newCanvasImg2 = newCanvas2.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg2,'JPEG', 98, 40, 60, 40);
  //
  // //another graph maybe?
  // var newCanvas3 = document.querySelector('#myChart2');
  // var newCanvasImg3 = newCanvas3.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg2,'JPEG', 98, 80, 60, 40);



  //TRIAL 2 STACKED BAR CHART

  //SOCIAL ECONOMIC INFO
  var splitTitle = doc.splitTextToSize("      Guatemala, a Central American country south of Mexico, is home to volcanoes, rainforests and ancient Mayan sites. The capital, Guatemala City, features the stately National Palace of Culture and the National Museum of Archaeology and Ethnology. Antigua, west of the capital, contains preserved Spanish colonial buildings. Lake Atitlán, formed in a massive volcanic crater, is surrounded by coffee fields and villages. Guatemala City is the capital of Guatemala, in Central America. It’s known for its Mayan history, high-altitude location and nearby volcanoes. On central Plaza Mayor, also known as Parque Central, the Metropolitan Cathedral is full of colonial paintings and religious carvings. The National Palace of Culture has a balcony overlooking the square. South of the city, trails lead up to the active Pacaya Volcano.", 90);
  doc.text(10, 130, splitTitle);

  // doc.setFont("georgia");
  // doc.setFontType("bold");
  // doc.text(10, 130, '1) SOCIAL-ECONOMIC');
  // doc.setFont("times");
  // doc.setFontType("normal");
  // doc.text(10, 138, P_muni + ' has a poverty rate of ' + P_pov.toFixed(3) + '%.');



  //TRANSPORTATION
  // doc.setFont("georgia");
  // doc.setFontType("bold");
  // doc.text(10, 150, '2) TRANSPORTATION');
  // doc.setFont("times");
  // doc.setFontType("normal");
  // doc.text(10, 158, 'Total Length of Road: ' + P_length.toFixed(3) + ' km');
  // doc.text(10, 164, 'Road Density: ' + P_density.toFixed(3) + ' km per square km');
  // doc.text(10, 170, 'Road in Urban Area: ' + P_rd_urban.toFixed(3) + ' km');
  // doc.text(10, 176, 'Road in Rural Area: ' + P_rd_rural.toFixed(3) + ' km');
  // doc.text(10, 182, 'Major Road: ' + P_rd_1.toFixed(3) + ' km');
  // doc.text(10, 188, 'Secondary Road: ' + P_rd_2.toFixed(3) + ' km');
  // doc.text(10, 194, 'Tertiary Road: ' + P_rd_3.toFixed(3) + ' km');
  // doc.text(10, 200, 'Urban Road: ' + P_rd_urban.toFixed(3) + ' km');
  // doc.text(10, 206, 'Rural Road: ' + P_rd_rural.toFixed(3) + ' km');
  // doc.text(10, 212, 'Road Efficiency');
  // doc.text(10, 218, '(% population within 30 minutes of road): ' + '41%');





  //PAGE NUMBER
  doc.setFont("arial");
  doc.setFontType("normal");
  doc.setFontSize(8);
  doc.text(95, 275, 'Page 1 of 3');



  // JUMP TO THE SECOND PAGE
  // ADD ANOTHER PAGE
  // REFERENCE
  // https://stackoverflow.com/questions/19272933/jspdf-multi-page-pdf-with-html-renderrer
  // https://github.com/MrRio/jsPDF/issues/101
  // https://stackoverflow.com/questions/25904440/jspdf-addhtml-multiple-canvas-page




  // doc.addPage();
  // doc.setPage(2);
  //
  // doc.setFontSize(10);
  // doc.setFontType("light");
  // doc.setFont("inherit");
  // doc.text(10, 5, 'DataXLat @ Geoadaptive LLC.');
  // doc.text(150, 5, '250 Summer St, Boston, MA, USA');
  // //DIVIDING LINE
  // doc.setLineWidth(1);
  // doc.setDrawColor(255,140,40);
  // doc.line(0, 8, 240, 8);





  //TABLE HEADING STARTS HERE


  //for tables in PDF
  // VERY GOOD EXAMPLE HERE
  // https://github.com/simonbengtsson/jsPDF-AutoTable




  //GOOD REFERENCE
  // https://mrrio.github.io/
  // define the map as an image
  // var columns = ["INDICATORS", "Name", "Country"];
  // var rows = [
  //            [1, "Peten", "Guatemala"],
  //            [2, "La Ibertad", "Guatemala"],
  //            [3, "Garcia", "Guatemala"],
  //          ];
  //




  // var columns = [
  //          {title: "Subjects", dataKey: "sb"},
  //          {title: "Indicators", dataKey: "id"},
  //          {title: "Value", dataKey: "val"},
  //        ];
  // var rows = [
  //          {"sb": "TRANSPORTATION", "id": "Total Road Length (km)", "val": P_length.toFixed(3)},
  //          {"sb": "", "id": "Road Density (km per sq km)", "val": P_density.toFixed(3)},
  //          {"sb": "", "id": "Major Road (km)", "val": P_rd_1.toFixed(3)},
  //          {"sb": "", "id": "Secondary Road (km)", "val": P_rd_2.toFixed(3)},
  //          {"sb": "", "id": "Tertiary Road (km)", "val": P_rd_3.toFixed(3)},
  //          {"sb": "", "id": "", "val": ""},
  //          {"sb": "UTILITIES", "id": "Sanitation", "val": "67%"},
  //          {"sb": "", "id": "Electricity", "val": "84%"},
  //          {"sb": "", "id": "Water", "val": "90%"},
  //          {"sb": "", "id": "Basic Needs Unsatisfied", "val": "28%"},
  //          {"sb": "", "id": "", "val": ""},
  //          {"sb": "EDUCATION", "id": "Literacy Rates", "val": "75%"},
  //          {"sb": "", "id": "Number of Primary Schools", "val": "311"},
  //          {"sb": "", "id": "Number of Middle Schools", "val": "69"},
  //          {"sb": "", "id": "Number of High Schools", "val": "18"},
  //          {"sb": "", "id": "Total Enrollment Number", "val": "12067"},
  //          {"sb": "", "id": "", "val": ""},
  //          {"sb": "PUBLC HEALTH", "id": "Number of Hospitals", "val": "3"},
  //          {"sb": "", "id": "Number of Clinics", "val": "42"},
  //          {"sb": "", "id": "Maximum Capacity of Medical Treatment", "val": "30021"},
  //
  //        ];

  // reference doc.addImage(div,'JPEG', 174, 40, 48, 32);
  // doc.autoTable(columns, rows);


  //
  // doc.autoTable(columns, rows, {
  //   // header: {textColor: 255, fillColor: [41, 128, 185], fontStyle: 'bold'},
  //   headerStyles: {fillColor: [255, 140, 40]},
  //   alternateRow: { fillColor: 211},
  //   styles: {
  //     // fillColor: [245, 245, 245]
  //     // fillColor: [214, 225, 225]
  //   },
  //   // rowStyles: {
  //   //   {fillColor: [255, 140, 40]}
  //   //
  //   // },
  //
  //   columnStyles: {
  //     // sb: {fillColor: [214, 225, 225]},
  //   	// id: {fillColor: [255,140,0],
  //     },
  //
  //   margin: {left: 10, top: 20},
  //   addPageContent: function(data) {
  //     doc.setFontSize(14);
  //     doc.setFontType("bold");
  //     doc.setFont("georgia");
  //   	doc.text("Table of Indicators", 10, 16);
  //   }
  // });


  // generate table reference here
  // GREAT EXAMPLE!!
  // 0: https://simonbengtsson.github.io/jsPDF-AutoTable/
  // 1: https://stackoverflow.com/questions/19807870/how-to-export-the-html-tables-data-into-pdf-using-jspdf
  // 2: https://stackoverflow.com/questions/23018171/create-pdf-using-jspdf-with-formatted-table-data


  //PAGE NUMBER
  doc.setFont("arial");
  doc.setFontType("normal");
  doc.setFontSize(8);
  doc.text(95, 275, 'Page 2 of 3');



  //THE THIRD PAGE FOR TABLE ONLY
  doc.addPage();
  doc.setPage(3);


  doc.setFontSize(10);
  doc.setFontType("light");
  doc.setFont("inherit");
  doc.text(10, 5, 'DataXLat @ Geoadaptive LLC.');
  doc.text(150, 5, '250 Summer St, Boston, MA, USA');
  //DIVIDING LINE
  doc.setLineWidth(1);
  doc.setDrawColor(255,140,40);
  doc.line(0, 8, 240, 8);


  //EDUCATION
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.setFontSize(12);
  doc.text(10, 18, '1) EDUCATION');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 26, 'Literacy Rate: ' + '75%');
  doc.text(10, 32, 'Number of Primary Schools: ' + '311');
  doc.text(10, 38, 'Number of Middle Schools: ' + '69');
  doc.text(10, 44, 'Number of High Schools: ' + '18');
  doc.text(10, 50, 'Total Enrollment Number: ' + '12067');

  //PUBLIC HEALTH
  doc.setFont("georgia");
  doc.setFontType("bold");
  // doc.setFontSize(12);
  doc.text(10, 62, '2) PUBLIC HEALTH');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 70, 'Number of Hospitals: ' + '3');
  doc.text(10, 76, 'Number of Clinics: ' + '42');
  doc.text(10, 82, 'Maximum Capacity for Medical Treatment: ' + '30021');

  //UTILITY
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.text(10, 94, '3) UTILITIES');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 102, 'Sanitation (% of coverage): ' + '1000 km');
  doc.text(10, 108, 'Electricity (% of coverage): ' + '1000 km');
  doc.text(10, 114, 'Water (% of coverage): ' + '1000 km');
  doc.text(10, 120, 'Basic Needs Unsatisfied (% of coverage): ' + '50%');

  //OTHER NOTES
  doc.setFont("georgia");
  doc.text(10, 250, 'Notes: ' + 'things to keep in mind');

  //OTHER NOTES
  doc.setFont("times");
  doc.setFontType("italic");
  doc.setFontSize(10);
  doc.text(10, 260, '* This data was obtained from ');
  // doc.text(10, 265, '' + P_source);


  //PAGE NUMBER
  doc.setFont("arial");
  doc.setFontType("normal");
  doc.setFontSize(8);
  doc.text(95, 275, 'Page 2 of 3');







  // doc.setFont("times");
  // doc.setFontType("normal");
  // doc.text(105, 80, 'This is centred text.', null, null, 'center');
  // doc.text(105, 90, 'And a little bit more underneath it.', null, null, 'center');
  // doc.text(200, 100, 'This is right aligned text', null, null, 'right');
  // doc.text(200, 110, 'And some more', null, null, 'right');
  // doc.text(20, 120, 'Back to left');
  //
  // doc.text(20, 140, '10 degrees rotated', null, 10);
  // doc.text(20, 160, '-10 degrees rotated', null, -10);

  doc.save('report.pdf');
  console.log("PDF ready");
};


var tableToPDF1 = function(){
  var doc = new jsPDF("1", "", "letter");
  var pageHeight = doc.internal.pageSize.height;
  var pageWidth = doc.internal.pageSize.width;
  console.log(pageHeight);
  console.log(pageWidth);
  doc.save('ReportUHI.pdf');
  console.log("PDF ready");
};

var tableToPDF2 = function(){
  var doc = new jsPDF("1", "", "letter");
  var pageHeight = doc.internal.pageSize.height;
  var pageWidth = doc.internal.pageSize.width;
  console.log(pageHeight);
  console.log(pageWidth);
  doc.save('ReportExposure.pdf');
  console.log("PDF ready");
};

//reference on complete new page loading
// function makePDF() {
//
//         var quotes = document.getElementById('container-fluid');
//
//         html2canvas(quotes, {
//             onrendered: function(canvas) {
//
//             //! MAKE YOUR PDF
//             var pdf = new jsPDF('p', 'pt', 'letter');
//
//             for (var i = 0; i <= quotes.clientHeight/980; i++) {
//                 //! This is all just html2canvas stuff
//                 var srcImg  = canvas;
//                 var sX      = 0;
//                 var sY      = 980*i; // start 980 pixels down for every new page
//                 var sWidth  = 900;
//                 var sHeight = 980;
//                 var dX      = 0;
//                 var dY      = 0;
//                 var dWidth  = 900;
//                 var dHeight = 980;
//
//                 window.onePageCanvas = document.createElement("canvas");
//                 onePageCanvas.setAttribute('width', 900);
//                 onePageCanvas.setAttribute('height', 980);
//                 var ctx = onePageCanvas.getContext('2d');
//                 // details on this usage of this function:
//                 // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
//                 ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);
//
//                 // document.body.appendChild(canvas);
//                 var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);
//
//                 var width         = onePageCanvas.width;
//                 var height        = onePageCanvas.clientHeight;
//
//                 //! If we're on anything other than the first page,
//                 // add another page
//                 if (i > 0) {
//                     pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
//                 }
//                 //! now we declare that we're working on that page
//                 pdf.setPage(i+1);
//                 //! now we add content to that page!
//                 pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));
//
//             }
//             //! after the for loop is finished running, we save the pdf.
//             pdf.save('Test.pdf');
//         }
//       });
//     }
//



// var tableToPDF = (function(){
//
//
// })
