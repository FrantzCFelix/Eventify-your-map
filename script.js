var googleMapsJSApikey = config.google_maps_javaScript_api_key;
var eventbriteApiKey = config.eventbrite_api_key;
var eventfulApiKey = config.eventful_api_key;


$.ajax({
    url: "http://api.eventful.com/json/events/search?keywords=music&location=Singapore&app_key=7xvLDCCDGL5MnWLF",
    method: 'GET'
   })
    // After the data comes back from the API
    .then(function(response) {
        console.log(response);
      // Storing an array of results in the results variable
    });