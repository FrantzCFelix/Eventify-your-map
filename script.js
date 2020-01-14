/// variables needed for API keys
var googleMapsJSApikey = config.google_maps_javaScript_api_key;
var ticketmasterApiKey = config.ticket_master_api_key;
/*************************/

/// variables needed for userCreatedURL
var startDateTime = "";
var endDateTime = "";
var city = "";
var keyword = "";
var radius = "";
/*********************/

/*google maps api vars*/
var map;
var seattle = { lat: 47.6062, lng: -122.3321 };
var tokyo = {lat: 35.6762 , lng: 139.6503};
var userLocationCoord = {lat: 0 , lng: 0};
var marker;
var markerArr;

/**********************/
 initMap();

//If browser supports geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      userLocationCoord.lat = pos.lat;
      userLocationCoord.lng = pos.lng;

    }, function() {
      handleLocationError(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false);
  }




$("form").on("submit", function(event) {
  event.preventDefault();
  console.log("search button was clicked");

  /// create  dates, city, keywords, and mile radius for search
  var startDateTime = $("#startDate").val() + "T00:00:00Z";
  var endDateTime = $("#endDate").val() + "T23:59:00Z";
  city = $("#location").val();
  keyword = $("#description").val();
  radius = $("#radius").val();

  // if(city==="")
  // {
  //     city =0; //
  // }

//   console.log(startDateTime);
//   console.log(endDateTime);
//   console.log(city);
//   console.log(keyword);
//   console.log(radius);

  /// build the URL with user input
  var queryURL =
    "https://app.ticketmaster.com/discovery/v2/events?apikey=" +
    ticketmasterApiKey +
    "&keyword=" +
    keyword +
    "&radius=" +
    radius +
    "&unit=miles&locale=*&startDateTime=" +
    startDateTime +
    "&endDateTime=" +
    endDateTime +
    "&city=" +
    city;
  console.log(queryURL);

  /// GET request to load data
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function(response) {
      console.log(response);
      markerArr = getMapMarkers(response);
      updateMap();
    });
});

//takes ticketmaster api data and extracts venue lat&lng
function getMapMarkers(ajaxResponse) {
    var mapMarker = [];
    for (var i = 0; i < ajaxResponse._embedded.events.length; i++) {
        var latLngObj = { lat: 0, lng: 0 };
        latLngObj.lat = parseFloat(ajaxResponse._embedded.events[i]._embedded.venues[0].location.latitude);
        latLngObj.lng = parseFloat(ajaxResponse._embedded.events[i]._embedded.venues[0].location.longitude);
        mapMarker.push(latLngObj);
    }
   //console.log(mapMarker);
    return mapMarker;
}


function initMap() {
    map = new google.maps.Map(document.getElementById('mapImage'), {
        center: tokyo,
        zoom: 11
    });
    
}
function updateMap() {
    map = new google.maps.Map(document.getElementById('mapImage'), {
        center: seattle,
        zoom: 11
    });
    makeMapMarkers();
    
}
function makeMapMarkers(){
    for (var i = 0; i < markerArr.length; i++) {
        marker = new google.maps.Marker({ position: markerArr[i], map: map });
    }
}
function handleLocationError(browserHasGeolocation) {
  console.error(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');

}