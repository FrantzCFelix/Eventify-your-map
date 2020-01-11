/// variables needed for API keys
var googleMapsJSApikey = config.google_maps_javaScript_api_key;
var ticketmasterApiKey = config.ticket_master_api_key;

/// variables needed for userCreatedURL
var startDateTime = "";
var endDateTime = "";
var city = "";
var keyword = "";
var radius = "";


/// momentJS 
 //MomemtJS display
 //var momentInterval = setInterval(function() {
    //console.log(moment().format('YYYY-MM-DD'));
  //});

/// function to create the URL on click
function userCreatedURL() {
  $("#searchBtn").on("click", function() {

    /// create beginning date for search
    function editStartDate() {
      var date = new Date($("#startDate").val());
      day = ("0" + date.getDate()).slice(-2);
      month = ("0" + (date.getMonth() + 1)).slice(-2);
      year = date.getFullYear();
      startDateTime = [year, month, day].join("-") + "T23:59:00Z";

      ///if ($('#startDate').val() === null) {
        ///startDateTime = moment().format('YYYY-MM-DD') + "T00:00:00Z";}
      }
    /// create end date for search
    function editEndDate() {
      var date = new Date($("#endDate").val());
      day = ("0" + date.getDate()).slice(-2);
      month = ("0" + (date.getMonth() + 1)).slice(-2);
      year = date.getFullYear();
      endDateTime = [year, month, day].join("-") + "T23:59:00Z";
    }

    /// create city, keywords, and mile radius for search
    city = $("#location").val();
    keyword = $("#description").val();
    radius = $("#radius").val();

    editStartDate();
    editEndDate();

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
      });
  });
}

userCreatedURL();
