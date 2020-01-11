var googleMapsJSApikey = config.google_maps_javaScript_api_key;
var eventbriteApiKey = config.eventbrite_api_key;
var eventfulApiKey = config.eventful_api_key;
var ticketmasterApiKey = config.ticket_master_api_key;
var startDateTime = "";
var endDateTime = "";
var city = "";
var keyword = "";
var radius = "";
var map;
var seattle = { lat: 47.6062, lng: -122.3321 };
var marker;
var markerArr;


function editStartDate() {

    $('#searchBtn').on('click', function () {
        var date = new Date($('#startDate').val());
        day = ('0' + (date.getDate() + 1)).slice(-2);
        month = ('0' + (date.getMonth() + 1)).slice(-2);
        year = date.getFullYear();
        startDateTime = ([year, month, day].join('-') + 'T00:00:00Z');
        console.log(startDateTime)
    });
}
editStartDate();

function editEndDate() {

    $('#searchBtn').on('click', function () {
        var date = new Date($('#endDate').val());
        day = ('0' + (date.getDate() + 1)).slice(-2);
        month = ('0' + (date.getMonth() + 1)).slice(-2);
        year = date.getFullYear();
        endDateTime = ([year, month, day].join('-') + 'T23:59:00Z');
        console.log(endDateTime)
    });

}
editEndDate();

function getMapMarkers(ajaxResponse) {
    var mapMarker = [];
    for (var i = 0; i < ajaxResponse._embedded.events.length; i++) {
        var latLngObj = { lat: 0, lng: 0 };
        latLngObj.lat = parseFloat(ajaxResponse._embedded.events[i]._embedded.venues[0].location.latitude);
        latLngObj.lng = parseFloat(ajaxResponse._embedded.events[i]._embedded.venues[0].location.longitude);
        mapMarker.push(latLngObj);
    }
   //console.log(mapMarker);
    return mapMarker;
}


//call back function
function initMap() {
    map = new google.maps.Map(document.getElementById('mapImage'), {
        center: seattle,
        zoom: 11
    });
    for (var i = 0; i < markerArr.length; i++) {
        marker = new google.maps.Marker({ position: markerArr[i], map: map });
    }
}



$('#searchBtn').on('click', function () {
    city = $('#location').val();
    keyword = $('#description').val();
    radius = $('#radius').val();
    console.log(radius)
    console.log(keyword)
    console.log(city)
});

$('#searchBtn').on('click', function () {

    var queryURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=' + ticketmasterApiKey + '&keyword=' + keyword + '&radius=' + radius + '&unit=miles&locale=*&startDateTime=' + startDateTime + '&endDateTime=' + endDateTime + '&city=' + city
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        // After the data comes back from the API
        .then(function (response) {
            // console.log(response);
            markerArr = getMapMarkers(response);
            initMap();
        });
});
