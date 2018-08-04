var ajaxurl = '';
var jsonObj = [];
var mapList = [];
var modes = $('#mode').val();
var count = 0;

var getToken = function() {
    return localStorage.getItem('MIFY_A_TOKEN') || localStorage.getItem('MIFY_U_TOKEN');
};

$.ajaxSetup({
  headers: {
    'X-LVS-HSToken': getToken(),
  }
});

function showlocation() {
   // One-shot position request.
   
   $('.loader').fadeIn();
   navigator.geolocation.getCurrentPosition(callback,error);
   
   initialize();

}



function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

function callback(position) {
    
    $( "#DRIVING" ).trigger( "click" );
    $('#'+modes).css("border-color", "#f0a303");
    
    var t_longtitude = position.coords.longitude;
    var t_latitude = position.coords.latitude;
    
    $.ajax({
        type: "GET",
        url: '/cmscontent/variantui?name=bamboo::branch_locator',
        cache: false,
    }).done(function( usersLoc ) {  
        // var usersLoc = NovaWeb.BranchLocator.results;
        mapList = usersLoc;
        var CommonmapsPlace = usersLoc;
        // var CommonmapsPlace = $.parseJSON(usersLoc);
        var myLatLng = new google.maps.LatLng(t_longtitude, t_latitude);
        MYMAP.init('#map-canvas', myLatLng, 14);
        MYMAP.placeMarkers(CommonmapsPlace);

        $('#branch-1 .outlet-results').html(displayBranches(mapList, 'direct')); //should be flagship
        $('#branch-2 .outlet-results').html(displayBranches(mapList, 'partner')); //shoul be retail

    });
}

 google.maps.event.addDomListener(window, 'load', showlocation);


$(document).on('click','.outlet-entry',function(){

    $('.loader').fadeIn('slow');
    $('#error-handling').text('');
    
    clearDirections();
    
    var branch_id = $(this).attr('id');
    
    $(".outlet-entry").css("background-color", "");
    
    $(this).css("background-color", "rgba(255, 255, 255, 0.1)");
    
    $('input[name="msw_branch_service"]').removeAttr('checked');
    $('.filter label').removeClass('cb-checked');
    
    if(mapList[branch_id]) {
        setTimeout(function(){
            var CommonmapsPlace = mapList[branch_id];
            $('#location_to').val(CommonmapsPlace.address);
            
            $('#location_lat').val(CommonmapsPlace.lat);
            $('#location_lon').val(CommonmapsPlace.lon);
            
            $('#location_lat_copy').val(CommonmapsPlace.lat);
            $('#location_lon_copy').val(CommonmapsPlace.lon);
        
            MYMAP.branchplaceMarkers([CommonmapsPlace]);
        }, 500);
    }

    return false; 
});

$(document).on('submit','#search-form',function(){
    
    $('.loader').fadeIn('slow');
    $('#error-handling').text('');
    
    var geocoder = new google.maps.Geocoder();
    var address = $('#autocomplete').val();
    
    geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        var search_long = results[0].geometry.location.lng();
        var search_lat = results[0].geometry.location.lat();
    
        var data = {
            list: mapList,
            lat: search_lat,
            lng: search_long
        }
            
        find_closest_marker(data, function(result){
            if(result) {
                MYMAP.nearestMarker(result);
            } else {
                $('#error-handling').html("No Outlet found in your searched location. Please try again");
                setTimeout(function() { $('.loader').fadeOut('slow');location.reload();}, 2500);
            }
        });
    } 

      else {
      $('#error-handling').html("Please Input a Location");
      setTimeout(function() { $('.loader').fadeOut('slow'); location.reload();}, 2500);
      }
    });

    return false; 
});

$(document).on('click','#get_direction',function(){

    count = 0;
    
    var branch_lon = $('#branch_lon_direct').val();
    var branch_lat = $('#branch_lat_direct').val();
    var branch_address = $('#branch_address_direct').val();
    
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $("#tab-2").addClass('current');
    $("#tab-directions").addClass('current');
    
    $('#location_to').val(branch_address);
    $('#location_lat').val(branch_lat);
    $('#location_lon').val(branch_lon);
    
    $('#location_lat_copy').val(branch_lat);
    $('#location_lon_copy').val(branch_lon);
    
    $('.direction-start').val('');
    
    $('.direction-panel').css('visibility','hidden');
    
    directionsDisplay.setMap(null);
    setAllMap(marker_direction, null);

    return false; 
});

$(document).on('click','#direction-button',function(){
    $('.loader').fadeIn('slow');
    $('#error-handling').text('');
    
    calculateRoute();
    
    return false; 
});

$(document).on('click','#get_direction_current_location',function(){

    $('.loader').fadeIn('slow');
    $('#error-handling').text('');
    
    count = 0;

    var branch_lon = $('#branch_lon_direct').val();
    var branch_lat = $('#branch_lat_direct').val();
    var branch_address = $('#branch_address_direct').val();
    
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $("#tab-2").addClass('current');
    $("#tab-directions").addClass('current');
    
    $('#location_to').val(branch_address).removeAttr("disabled").removeClass('direction-start direction-end').addClass('direction-end').attr("disabled");
    $('#location_from').removeAttr("disabled").removeClass('direction-end direction-start').addClass('direction-start');
    $('#location_lat').val(branch_lat);
    $('#location_lon').val(branch_lon);
    
    $('#location_lat_copy').val(branch_lat);
    $('#location_lon_copy').val(branch_lon);
    
    if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function(position) {

                var lat = position.coords.latitude;
                var lng = position.coords.longitude;

                $('.loader').fadeOut('slow');
                $('.direction-panel').css('visibility','');                             

                calculateRoute(lat,lng);
                $('#loc_lat').val(lat);
                $('#loc_lon').val(lng);

                var latlng = {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                };

                geocodeLatLng(latlng, function(address){
                    $('#location_from').val(address);                                
                }, function(){
                    
                });
                
            }, function(error) {
                clearTimeout(location_timeout);
                geolocFail();
            });
        } else {
            // Fallback for no geolocation
            geolocFail();
        }

    return false; 
});

$(document).on('click','#get_outlet_current_loc',function(){

    $('.loader').fadeIn('slow');
    
    $('input[name="msw_branch_service"]').removeAttr('checked');
    $('.filter label').removeClass('cb-checked');
    
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {

            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            var data = {
                list: mapList,
                lat: lat,
                lng: lng
            }
            
            find_closest_marker(data, function(result){
                if(result) {
                    MYMAP.nearestMarker(result);
                } else {
                    $('#error-handling').html("No Outlet found in your searched location. Please try again");
                    setTimeout(function() { $('.loader').fadeOut('slow');location.reload();}, 2500);
                }
            });

        }, function(error) {
            clearTimeout(location_timeout);
            geolocFail();
        });
    } else {
        // Fallback for no geolocation
        geolocFail();
    }

    return false; 

});

function clearDirections(){
    $('#location_from').val('');
    $('#location_to').val('');
    $('.direction-panel').css('visibility','hidden');
}


$(document).on('click','.mode-btn',function(){
    var mode = $(this).val();
    
    $('.direction-panel').css('visibility','hidden');

    $('#mode').val(mode);

    $(".mode-btn").css("border-color", "");
        
    $('#'+mode).css("border-color", "#e20000");

    return false;
});


$(document).on('click','.swap-btn',function(){
    
    var start = $('#location_from').val();
    var end = $('#location_to').val();
    
    $('.direction-panel').css('visibility','hidden');
    
    if (start && end){
        count += 1;
        
        if (count % 2 === 0) { 
            $('#location_from').val(end).removeAttr("disabled").removeClass('direction-end').addClass('direction-start');
            $('#location_to').val(start).removeAttr("disabled").removeClass('direction-start').addClass('direction-end').attr("disabled");
        }
        else{
            $('#location_from').val(end).removeAttr("disabled").removeClass('direction-start').addClass('direction-end').attr("disabled");
            $('#location_to').val(start).removeAttr("disabled").removeClass('direction-end').addClass('direction-start');
        }
        
        $('#location_lat').val('');
        $('#location_lon').val('');
    }

    return false;
});