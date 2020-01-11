var googleMapsJSApikey = config.google_maps_javaScript_api_key;
var eventbriteApiKey = config.eventbrite_api_key;
var eventfulApiKey = config.eventful_api_key;
var ticketmasterApiKey = config.ticket_master_api_key;
var startDateTime = "";
var endDateTime = "";
var city = "";
var keyword = "";
var radius = "";

function editStartDate() {
    
    $('#searchBtn').on('click', function(){
      var date = new Date($('#startDate').val());
      day = ('0' + (date.getDate() + 1)).slice(-2);
      month = ('0' + (date.getMonth() + 1)).slice(-2);
      year =  date.getFullYear();
      startDateTime = ([year, month, day].join('-') + 'T00:00:00Z');
      console.log(startDateTime)
    });
}
editStartDate();

function editEndDate() {
    
    $('#searchBtn').on('click', function(){
      var date = new Date($('#endDate').val());
      day = ('0' + (date.getDate() + 1)).slice(-2);
      month = ('0' + (date.getMonth() + 1)).slice(-2);
      year = date.getFullYear();
      endDateTime = ([year, month, day].join('-') + 'T23:59:00Z');
      console.log(endDateTime)
    });
   
}
editEndDate();

$('#searchBtn').on('click', function(){
    city = $('#location').val();
    console.log(city)
  });

//console.log(currentDate);

// $.ajax({

//    url: "https://app.ticketmaster.com/discovery/v2/events?apikey="+ticketmasterApiKey+"&locale=*&startDateTime="+currentDate, //'https://app.ticketmaster.com/discovery/v2/events.json?locale=*&startDateTime='+currentDate+'countryCode=US&apikey='+ticketmasterApiKey,
//     method: 'GET'
//    })
//     // After the data comes back from the API
//     .then(function(response) {
//         console.log(response);
//     });



var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('mapImage'), {
        center: { lat: 47.6062, lng: -122.3321 },
        zoom: 11
    });
}
  $('#searchBtn').on('click', function(){
     keyword = $('#description').val();
    console.log(keyword)
  });

  $('#searchBtn').on('click', function(){
    radius = $('#radius').val();
   console.log(radius)
 });

 $('#searchBtn').on('click', function(){

    var queryURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=' + ticketmasterApiKey + '&keyword=' + keyword + '&radius=' + radius + '&unit=miles&locale=*&startDateTime=' + startDateTime + '&endDateTime=' + endDateTime + '&city=' + city
console.log(queryURL)

    $.ajax({
    url: queryURL ,
    method: 'GET'
   })
    // After the data comes back from the API
    .then(function(response) {
        console.log(response);
    });
});
