var googleMapsJSApikey = config.google_maps_javaScript_api_key;
var eventbriteApiKey = config.eventbrite_api_key;
var eventfulApiKey = config.eventful_api_key;
var ticketmasterApiKey = config.ticket_master_api_key;

//"https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?q=high+step+society&l=seattle&c=music&app_key=BLG28fCFksPJcL7s"
var currentDate = "2020-02-09T21:37:00Z";//moment().format("YYYY MM DD" )


console.log(currentDate);

// $.ajax({
    
//    url: "https://app.ticketmaster.com/discovery/v2/events?apikey="+ticketmasterApiKey+"&locale=*&startDateTime="+currentDate, //'https://app.ticketmaster.com/discovery/v2/events.json?locale=*&startDateTime='+currentDate+'countryCode=US&apikey='+ticketmasterApiKey,
//     method: 'GET'
//    })
//     // After the data comes back from the API
//     .then(function(response) {
//         console.log(response);
//     });