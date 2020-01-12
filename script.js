/// variables needed for API keys
var googleMapsJSApikey = config.google_maps_javaScript_api_key;
var ticketmasterApiKey = config.ticket_master_api_key;

/// variables needed for userCreatedURL
var startDateTime = "";
var endDateTime = "";
var city = "";
var keyword = "";
var radius = "";
var map;
var seattle = { lat: 47.6062, lng: -122.3321 };
var marker;
var markerArr;




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


//call back function
function initMap() {
    map = new google.maps.Map(document.getElementById('mapImage'), {
        center: seattle,
        zoom: 11
    });
    for (var i = 0; i < markerArr.length; i++) {
        marker = new google.maps.Marker({ position: markerArr[i], map: map });
    }
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

  console.log(startDateTime);
  console.log(endDateTime);
  console.log(city);
  console.log(keyword);
  console.log(radius);

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
      initMap();
    });
});
