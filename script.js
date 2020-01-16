/// variables needed for API keys
var googleMapsJSApikey = config.google_maps_javaScript_api_key;
var ticketmasterApiKey = config.ticket_master_api_key;

/// variables needed for userCreatedURL
var startDateTime = "";
var endDateTime = "";
var city = "";
var keyword = "";
var radius = "";
var current = moment().format("YYYY-MM-DD");
var future = moment().add(1, 'years').format("YYYY-MM-DD")







$("#search").on("submit", function(event) {
  event.preventDefault();
  console.log("search button was clicked");

  /// create  dates, city, keywords, and mile radius for search
  var startDateTime = $("#startDate").val() + "T00:00:00Z";
  if (startDateTime === "T00:00:00Z") {
    startDateTime = current + "T00:00:00Z"
  }
  var endDateTime = $("#endDate").val() + "T23:59:00Z";
  if (endDateTime === "T23:59:00Z") {
    endDateTime = future + "T23:59:00Z"
  }

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
      ///console.table(response._embedded.events, ["name"]);

      for (var i = 0; i < response._embedded.events.length; ++i) {
    
        console.log("event: " + response._embedded.events[i].name);
        console.log("date: " + response._embedded.events[i].dates.start.localDate);
        console.log("link: " + response._embedded.events[i].url);
        //console.log("min price: " + response._embedded.events[i].priceRanges[0].min);
        //console.log("max price: " + response._embedded.events[i].priceRanges[0].max);
        console.log("venue: " + response._embedded.events[i]._embedded.venues[0].name);
        console.log("venue link: " + response._embedded.events[i]._embedded.venues[0].url);
        console.log("address: " + response._embedded.events[i]._embedded.venues[0].address.line1);
        console.log("city: " + response._embedded.events[i]._embedded.venues[0].city.name);
        console.log("state: " + response._embedded.events[i]._embedded.venues[0].state.name);
        console.log("postal code: " + response._embedded.events[i]._embedded.venues[0].postalCode);
        console.log("longitude: " + response._embedded.events[i]._embedded.venues[0].location.longitude);
        console.log("latitude: " + response._embedded.events[i]._embedded.venues[0].location.latitude);
      }
    });
});
