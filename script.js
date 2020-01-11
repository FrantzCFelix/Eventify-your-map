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