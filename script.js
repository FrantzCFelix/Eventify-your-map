var googleMapsJSApikey = config.google_maps_javaScript_api_key;
var eventbriteApiKey = config.eventbrite_api_key;
var eventfulApiKey = config.eventful_api_key;
var ticketmasterApiKey = config.ticket_master_api_key;

//"https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?q=high+step+society&l=seattle&c=music&app_key=BLG28fCFksPJcL7s"
var currentDate = "2020-02-09T21:37:00Z";//moment().format("YYYY MM DD" )


console.log(currentDate);

$.ajax({

  url: "https://app.ticketmaster.com/discovery/v2/events?apikey=" + ticketmasterApiKey + "&locale=*&startDateTime=" + currentDate, //'https://app.ticketmaster.com/discovery/v2/events.json?locale=*&startDateTime='+currentDate+'countryCode=US&apikey='+ticketmasterApiKey,
  method: 'GET'
})
  // After the data comes back from the API
  .then(function (response) {
    console.log(response);
  });

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