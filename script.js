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
var current = moment().format("YYYY-MM-DD");
var future = moment()
  .add(1, "years")
  .format("YYYY-MM-DD");

/*********************/

/*google maps api vars*/
var map;
var seattle = { lat: 47.6062, lng: -122.3321 };
var tokyo = { lat: 35.6762, lng: 139.6503 };
var userLocationCoord = tokyo; //set to tokyo to test desired behavior
var marker;
var markerArr;
var cityCoords = tokyo;
var eventObjArr = [];
var markerClickLocation = { lat: 0, lng: 0 };
/**********************/
$('#startDate').attr({
  dateFormat: "yy-mm-dd",
  value:current,
  min: current,
 }).on("change", function(){
  var date1=$('#startDate').val();
  console.log(date1)
  $('#endDate').attr({dateFormat: "yy-mm-dd",min: date1, value:current});
 })

/* Promise declaeration */
var locationPromise = new Promise(function (resolve, reject) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        userLocationCoord.lat = pos.lat;
        userLocationCoord.lng = pos.lng;
        resolve(userLocationCoord);
      },
      function () {
        handleLocationError(true);
        console.error("Location Denied");
        reject("promise Location Failed");
      }
    );
  } else {
    handleLocationError(false);
    reject("promise Location Failed");
  }
});

/****************************/

locationPromise.then(function (result) {
  //Should try to put this in a promise aysny-await block in search event listener to get city into the queryUrl-FF
  //Right now this relies on the ajax call finishing before the user inputs information and city is equal to the users location by default- FF
  $.ajax({
    url:
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      result.lat +
      "," +
      result.lng +
      "&result_type=locality&key=" +
      googleMapsJSApikey,
    method: "GET"
  }).then(function (response) {
    city = response.results[0].address_components[0].long_name;
    $("#location").val(city);
    console.log(
      "City is equal to: " + response.results[0].address_components[0].long_name
    );
  });

  console.log(result);
});

/// build the URL with user input
$("form").on("submit", function (event) {
  event.preventDefault();
  console.log("search button was clicked");

  /// create  dates, city, keywords, and mile radius for search
  var startDateTime = $("#startDate").val() + "T00:00:00Z";
  if (startDateTime === "T00:00:00Z") {
    startDateTime = current + "T00:00:00Z";
  }
  var endDateTime = $("#endDate").val() + "T23:59:00Z";
  if (endDateTime === "T23:59:00Z") {
    endDateTime = future + "T23:59:00Z";
  }

  city = $("#location").val();
  keyword = $("#description").val();
  radius = $("#radius").val();

  //   console.log(startDateTime);
  //   console.log(endDateTime);
  //   console.log(city);
  //   console.log(keyword);
  //   console.log(radius);

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

  /************************** */
  var cityPromise = new Promise(function (resolve) {
    //, reject){

    $.ajax({
      url:
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        city +
        "&key=" +
        googleMapsJSApikey,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function (response) {
        cityCoords = response.results[0].geometry.location;
        resolve(response.results[0].geometry.location);
      });

    // reject("promise Location Failed");
  });
  /****************************/

  cityPromise.then(function (result) {
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function (response) {
        markerArr = getMapMarkers(response);
        updateMap();
      createEventObjArr(response);
      console.log(result);
      });
  });
});

/******************************* */

/// GET request to load data

//takes ticketmaster api data and extracts venue lat&lng
function getMapMarkers(ajaxResponse) {
  var mapMarker = [];
  for (var i = 0; i < ajaxResponse._embedded.events.length; i++) {
    var latLngObj = { lat: 0, lng: 0 };
    latLngObj.lat = parseFloat(
      ajaxResponse._embedded.events[i]._embedded.venues[0].location.latitude
    );
    latLngObj.lng = parseFloat(
      ajaxResponse._embedded.events[i]._embedded.venues[0].location.longitude
    );
    mapMarker.push(latLngObj);    
  }
    return mapMarker;
}

function initMap() {
  map = new google.maps.Map(document.getElementById("mapImage"), {
    center: tokyo,
    zoom: 11
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        userLocationCoord.lat = pos.lat;
        userLocationCoord.lng = pos.lng;
      },
      function () {
        handleLocationError(true);
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false);
  }
}
function updateMap() {
  map = new google.maps.Map(document.getElementById("mapImage"), {
    center: cityCoords,
    zoom: 11
  });
  makeMapMarkers();
}

function makeMapMarkers() {
  for (var i = 0; i < markerArr.length; i++) {
    marker = new google.maps.Marker({ position: markerArr[i], map: map });
    marker.addListener("click", function (event) {
      markerClickLocation = event.latLng.toJSON();
      var eventToDisplay = findEvent(markerClickLocation, eventObjArr);
      displayEventInfo(eventToDisplay);
      
      

    });
  }
}

function handleLocationError(browserHasGeolocation) {
  console.error(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
}



function createEventObjArr(ajaxResponse) {

  for (var i = 0; i < ajaxResponse._embedded.events.length; i++) {
    var latLngObj = { lat: 0, lng: 0 };
    latLngObj.lat = parseFloat(
      ajaxResponse._embedded.events[i]._embedded.venues[0].location.latitude
    );
    latLngObj.lng = parseFloat(
      ajaxResponse._embedded.events[i]._embedded.venues[0].location.longitude
    );

    var eventObject = {
      eventName: ajaxResponse._embedded.events[i].name,
      eventDate: ajaxResponse._embedded.events[i].dates.start.localDate,
      eventLink: ajaxResponse._embedded.events[i].url,
      eventVenue: ajaxResponse._embedded.events[i]._embedded.venues[0].name,
      eventVenueLink: ajaxResponse._embedded.events[i]._embedded.venues[0].url,
      eventAddress:
        ajaxResponse._embedded.events[i]._embedded.venues[0].address.line1 +
        " " +
        ajaxResponse._embedded.events[i]._embedded.venues[0].city.name +
        ", " +
        ajaxResponse._embedded.events[i]._embedded.venues[0].state.name +
        " " +
        ajaxResponse._embedded.events[i]._embedded.venues[0].postalCode,
      eventImageURL: ajaxResponse._embedded.events[i].images[1].url,
      eventLatLong: latLngObj
      
    };
    eventObjArr.push(eventObject);
  }
  
  console.log(eventObjArr);
  return eventObjArr;
}

function findEvent(markerClickCoords, eventArr)
{
 // var multipleEventArr = [];
      
     for(var i = 0; i < eventArr.length; i++)
     {
      
     if (markerClickCoords.lat === eventArr[i].eventLatLong.lat && markerClickCoords.lng === eventArr[i].eventLatLong.lng )
      {
        console.log(eventArr[i]);
        return  eventArr[i];
      }

     }
   

}




function displayEventInfo(eventObject) {
  $("#event").text("Event: " + eventObject.eventName);
  $("#date").text("Date: " + eventObject.eventDate);
  $("#eventURL").html("Get Tickets: " + eventObject.eventLink);
  $("#venue").text("Venue: " + eventObject.eventVenue);
  $("#address").text("Address: " + eventObject.eventAddress);
  $("venueURL").html("Venue Info: " + eventObject.eventVenueLink);
  $("#picEvent").attr("src", eventObject.eventImageURL);
}


$("#button1").click(function() {
  $('html, body').animate({
      scrollTop: $("#mapImage").offset().top
  }, 1000);
});