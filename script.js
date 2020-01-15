/// variables needed for API keys
var googleMapsJSApikey = config.google_maps_javaScript_api_key;
var ticketmasterApiKey = config.ticket_master_api_key;

/// variables needed for userCreatedURL
var startDateTime = "";
var endDateTime = "";
var city = "";
var keyword = "";
var radius = "";

$("form").on("submit", function(event) {
  event.preventDefault();
  console.log("search button was clicked");

  /// create  dates, city, keywords, and mile radius for search
  var startDateTime = $("#startDate").val() + "T00:00:00Z";
  var endDateTime = $("#endDate").val() + "T23:59:00Z";
  city = $("#location").val();
  keyword = $("#description").val();
  radius = $("#radius").val();



//typewriter function
  var str = "<p>Are You Ready To Explore ?</p>",
  i = 0,
  isTag,
  text;
  
(function type() {
  text = str.slice(0, i++);
  if (text === str) return;

  document.getElementById('typeWriter').innerHTML = text;

  var char = text.slice(-1);
  if( char === '<' ) isTag = true;
  if( char === '>' ) isTag = false;

  if (isTag) return type();
  setTimeout(type, 60);
}()); 

// hand icon function

function hand() {
  var a;
  a = document.getElementById("div1");
  a.innerHTML = "&#xf25a;";
  setTimeout(function () {
    a.innerHTML = "&#xf256;";
  }, 500);
  setTimeout(function () {
    a.innerHTML = "&#xf259;";
  }, 1000);
  setTimeout(function () {
    a.innerHTML = "&#xf256;";
  }, 1500);
}
hand();
setInterval(hand, 2000);

  // console.log(startDateTime);
  // console.log(endDateTime);
  // console.log(city);
  // console.log(keyword);
  // console.log(radius);

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
    });
});

