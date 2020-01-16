/// variables needed for API keys
var googleMapsJSApikey = config.google_maps_javaScript_api_key;
var ticketmasterApiKey = config.ticket_master_api_key;

/// variables needed for userCreatedURL
var startDateTime = "";
var endDateTime = "";
var city = "";
var keyword = "";
var radius = "";



// console.log(startDateTime);
// console.log(endDateTime);
// console.log(city);
// console.log(keyword);
// console.log(radius);


  /// build the URL with user input

  $("form").on("submit", function(event) {
    event.preventDefault();
    console.log("search button was clicked");
  
    /// create  dates, city, keywords, and mile radius for search
    var startDateTime = $("#startDate").val() + "T00:00:00Z";
    var endDateTime = $("#endDate").val() + "T23:59:00Z";
    city = $("#location").val();
    keyword = $("#description").val();
    radius = $("#radius").val();

    
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
    });
});
