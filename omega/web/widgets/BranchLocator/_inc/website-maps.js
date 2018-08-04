	var map,
		currentPosition,
		directionsDisplay = new google.maps.DirectionsRenderer(), 
		directionsService,
		point;
	var markers = [];
	var marker_direction = [];
	var geocoder = new google.maps.Geocoder;
		

	function windowContent(title,address,telephone,email,address,lon,lat,branch_service,branch_thumbnail){
	
		return '<div style="overflow: auto;"> <div class="div1" style="width: 45%; background-color: #fff;display: inline-block;height: 200px;float: left;overflow: hidden; word-wrap: break-word;margin-right: -8px;">'+
		'<img src="'+branch_thumbnail.replace('/m/cms','/cmscontent')+'" style="height:100%;width:93%;">'+
		'</div>'+
		'<div class="div2" style="width: 53%;background-color: #fff;display:inline-block;height: 190px;float: left;padding-left:10px;padding-top: 10px;border-left: 1px solid green;">'+
		'<b><label style="font-size: 22px;">'+title+'<label></b><br>'+
		'<i>'+address+'</i><br><br>'+
		'<div id="services">'+
		'</div>'+
		(email ? '<br>Email: <i>'+email+'</i>' : '') +
		(telephone ? '<br>Telephone Number: <i>'+telephone+'</i>' : '') +
		'<input type="hidden" id="branch_address_direct" value="'+address+'"><input type="hidden" id="branch_lon_direct" value="'+lon+'"><input type="hidden" id="branch_lat_direct" value="'+lat+'">'+
		'</div>'+
		'<br>'+
		'<div style="text-align:center;margin-top:197px;">'+
		'<button id="get_direction" class="btn-direction">Get Direction</button>'+
		'<button id="get_direction_current_location" class="btn-direction">Get Direction From Current Location</button>';
	}
	
	
	// Sets the map on all markers in the array.
	function setAllMap(markers, map) {
	  for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	  }
	}
		
	function calculateRoute(lat,lng) {
	
		setAllMap(marker_direction, null);
		 
		directionsService = new google.maps.DirectionsService();
		// var latLng = new google.maps.LatLng(lat, lng);
		if(typeof lat != 'undefined' && typeof lng != 'undefined' ){
			var start = new google.maps.LatLng(lat, lng);
			var end = new google.maps.LatLng(document.getElementById('location_lat').value, document.getElementById('location_lon').value);
		}
		else{
			var start = new google.maps.LatLng(document.getElementById('loc_lat').value, document.getElementById('loc_lon').value);
			if($('#location_from').attr('class') == 'direction-end'){
				// console.log('even1');
				var end = $('#location_to').val();
				var start = new google.maps.LatLng(document.getElementById('location_lat_copy').value, document.getElementById('location_lon_copy').value);
				
			}
			else{
				// console.log('odd1');
				var end = new google.maps.LatLng(document.getElementById('location_lat_copy').value, document.getElementById('location_lon_copy').value);
				var start = $('#location_from').val();
			}
		}	
		
		// console.log(start+', '+end);
		
		var selectedMode = document.getElementById('mode').value;
		
		if (start && start != '' && end && end != '') {
			var request = {
				origin:start, 
				destination:end,
				travelMode: google.maps.TravelMode[selectedMode]
			};
			
			
			directionsService.route(request, function(response, status) {
								

				if (status == google.maps.DirectionsStatus.OK) {
					
					$('.loader').fadeOut('slow');
					$('.direction-panel').css('visibility','');
					MYMAP.map.setZoom(18);
					directionsDisplay.setMap(MYMAP.map);
					directionsDisplay.setOptions( { 
						polylineOptions: {
						   strokeWeight: 6,
						   strokeOpacity: .7,
						   strokeColor:  '#d53e10' 
						  },
						suppressMarkers: true
					});
					/* directionsDisplay.setPanel(document.getElementById("directions-panel")); */
					directionsDisplay.setDirections(response); 
					var myRoute = response.routes[0].legs[0];
					// console.log(myRoute);
					
					var directions_a = new google.maps.Marker({
						position: myRoute.start_location,
						icon: 'https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/start-marker.png',
						map: MYMAP.map
					});
					var directions_b = new google.maps.Marker({
						position: myRoute.end_location,
						icon: 'https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/end-marker.png',
						map: MYMAP.map
					});
					
					marker_direction.push(directions_a);
					marker_direction.push(directions_b);

					var options = new Array();
					$('.dir-list').empty();
					
					options.push('<tr><td class="dir-start">' + myRoute.start_address + '<span class="distance-duration">' + myRoute.distance.text + ' - ' + myRoute.duration.text + '</span></td></tr>');
					for (var i = 0; i < myRoute.steps.length; i++) {						
						 options.push('<tr class="dir-step"><td><i class="maneuvers '+myRoute.steps[i].maneuver+'"></i></td><td><p class="step-title">' + myRoute.steps[i].instructions + '</p></td></tr>');
					}
					options.push('<tr><td class="dir-end">' + myRoute.end_address + '</td></tr>');
					$('.dir-list').append(options.join('')).appendTo('.direction-container .mCustomScrollbar ._mCS_4 mCS_no_scrollbar');
					
					options = [];
				}
				else {
					// alert('Walang direction. Tangina mo');
					// $('.loader').fadeOut('slow');
					$('#error-handling').html("No direction given by Google. Please try again");
					setTimeout(function() { $('.loader').fadeOut('slow')}, 2500);
				}
			});
		}
		else {
			// alert('Walang input na empty. Bobo');
			$('#error-handling').html("Please fill up Destinations");
		    setTimeout(function() { $('.loader').fadeOut('slow')}, 2500);
			// $('.loader').fadeOut('slow');
		}
	}

	$(document).on("pagebeforeshow", "#map-canvas", function() {
		navigator.geolocation.getCurrentPosition(locSuccess, locError);
	});
	
	var MYMAP = {
		map: null,
		bounds: null
	}
	MYMAP.init = function(selector, latLng, zoom){
		var myOptions = {
			zoom:zoom,
			center: latLng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		this.map = new google.maps.Map($(selector)[0], myOptions);
		this.bounds = new google.maps.LatLngBounds();
	}

	
	var prev_infowindow =false; 
	MYMAP.placeMarkers = function(jsonData){
		directionsDisplay.setMap(null);
		var bounds = new google.maps.LatLngBounds();
		
		var visible = false;
		
		

		$.each(jsonData, function(index, element) {
			
			var point = new google.maps.LatLng(parseFloat(element.lat),parseFloat(element.lon));
			var shopType = element['shoptype'];
			// MYMAP.bounds.extend(point);
			bounds.extend(point);
			
			
			
			/* setTimeout(function() { */
				var marker = new google.maps.Marker({
					position: point,
					map: MYMAP.map,
					animation: google.maps.Animation.DROP,
					icon: '/widgets/BranchLocator/images/viet-'+shopType+'.png'
				});
				
				markers.push(marker);
				// console.log(element);
				var html = windowContent(element.title,element.address,element.telephone,element.email,element.address,element.lon,element.lat,element.branch_service,element.branch_thumbnail);
				var infoWindow = new google.maps.InfoWindow({
					content: html,
					maxWidth: 490
				});
				google.maps.event.addListener(marker, 'click', function() {
					if( prev_infowindow ) {
					   prev_infowindow.close();
					}
					prev_infowindow = infoWindow;
					
					
				/* if(jQuery.inArray("greyhounds", element.branch_service) !== -1){ */
					
					/* console.log('aw'); */
				// }
					
					infoWindow.open(MYMAP.map, marker);
					
					$('#services img').remove();
					
					if(jQuery.inArray("greyhounds", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-gh.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("live_sports", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-ls.png" style="padding: 5px 5px 0px 4px;">"').appendTo("#services");
					}		
					if(jQuery.inArray("rtg", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-rtg.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("virtual_sports", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-vs.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("telebet_deposit_withdraw", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-telebet.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("self_service", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-ss.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
				
					MYMAP.map.panTo(marker.getPosition());
					
				});
				/* }, index * 500); */
				
			
        });
		
		MYMAP.map.fitBounds(bounds);
		$('#loader').fadeOut('slow');
	}
	
	
	function sortResults(prop, asc) {
		people = people.sort(function(a, b) {
			if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
			else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
		});
		showResults();
	}
	
	MYMAP.newplaceMarkers = function(jsonData){
		setAllMap(markers, null);
		setAllMap(marker_direction, null);
		directionsDisplay.setMap(null);
		var bounds = new google.maps.LatLngBounds();
		
			var direct = new Array();
			var partner = new Array();
			var philweb = new Array();
			
			/* $('.outlet-results').empty(); */
			// console.log(jsonData);
			
		$.each(jsonData, function(index, element) {
			if(element.category[0] == 'direct'){
				direct.push('<div class="outlet-entry" id="'+ element.ID +'"><strong class="branch-name">' + element.title + ' <span>' + element.opHours + ' </span></strong><p class="branch-details">'+element.address+'<br>'+element.telephone+'</p></div>');
			}
			if(element.category[0] == 'partner'){
				partner.push('<div class="outlet-entry" id="'+ element.ID +'"><strong class="branch-name">' + element.title + ' <span>' + element.opHours + ' </span></strong><p class="branch-details">'+element.address+'<br>'+element.telephone+'</p></div>');
			}
			if(element.category[0] == 'philweb'){
				philweb.push('<div class="outlet-entry" id="'+ element.ID +'"><strong class="branch-name">' + element.title + ' <span>' + element.opHours + ' </span></strong><p class="branch-details">'+element.address+'<br>'+element.telephone+'</p></div>');
			}
			
			
			
			// if(element.category[0] == 'direct'){
			// }
			// else if(element.category[0] == 'partner'){
				// $('.branch-category li').addClass('current');
			// }
			// else if(element.category[0] == 'philweb'){
				// $('.branch-category li').addClass('current');
			// }
			
			var point = new google.maps.LatLng(parseFloat(element.lat),parseFloat(element.lon));
			
			bounds.extend(point);
					
			/* setTimeout(function() { */
				var marker = new google.maps.Marker({
					position: point,
					map: MYMAP.map,
					animation: google.maps.Animation.DROP,
					icon: "/shared/BranchLocator/images/viet-big.png"
				});
				
				markers.push(marker);
				
				/* var infoWindow = new google.maps.InfoWindow(); */
				var html = windowContent(element.title,element.address,element.telephone,element.email,element.address,element.lon,element.lat,'',element.branch_thumbnail)
				var infoWindow = new google.maps.InfoWindow({
					content: html,
					maxWidth: 490
				});
				google.maps.event.addListener(marker, 'click', function() {
					if( prev_infowindow ) {
					   prev_infowindow.close();
					}
					prev_infowindow = infoWindow;
					
					infoWindow.open(MYMAP.map, marker);
					
					$('#services img').remove();
					
					if(jQuery.inArray("greyhounds", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-gh.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("live_sports", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-ls.png" style="padding: 5px 5px 0px 4px;">"').appendTo("#services");
					}		
					if(jQuery.inArray("rtg", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-rtg.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("virtual_sports", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-vs.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}
					if(jQuery.inArray("telebet_deposit_withdraw", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-telebet.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("self_service", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-ss.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}			
					MYMAP.map.panTo(marker.getPosition());
					
				});
				/* }, index * 500); */
			
        });
		var directHTML = [];
		var partnerHTML = [];
		var philwebHTML = [];
		
		$.each(direct, function(index, value) {
			directHTML.push(value);
		});
		$("#branch-1 .outlet-results").html(directHTML.join(""));
		
		$.each(partner, function(index, value) {
			partnerHTML.push(value);
		});
		$("#branch-2 .outlet-results").html(partnerHTML.join(""));
		
		$.each(philweb, function(index, value) {
			philwebHTML.push(value);
		});
		$("#branch-3 .outlet-results").html(philwebHTML.join(""));
			
		MYMAP.map.fitBounds(bounds);
		/*  setTimeout(function(){
			$('.loader').fadeOut('slow');
		}, jsonData.length * 500); */
		$('#loader').fadeOut('slow');
	}
	
	MYMAP.branchplaceMarkers = function(jsonData){
		setAllMap(markers, null);
		setAllMap(marker_direction, null);
		directionsDisplay.setMap(null);
		var bounds = new google.maps.LatLngBounds();
		$.each(jsonData, function(index, element) {
			
			var point = new google.maps.LatLng(parseFloat(element.lat),parseFloat(element.lon));
			// MYMAP.bounds.extend(point);
			bounds.extend(point);
			
			setTimeout(function() {
				var marker = new google.maps.Marker({
					position: point,
					map: MYMAP.map,
					// animation: google.maps.Animation.DROP,
					icon: "/shared/BranchLocator/images/viet-big.png"
				});
				
				markers.push(marker);
				/* MYMAP.map.fitBounds(bounds); */
				MYMAP.map.setZoom(18);		
				// console.log(element);
				/* var infoWindow = new google.maps.InfoWindow(); */
				var html = windowContent(element.title,element.address,element.telephone,element.email,element.address,element.lon,element.lat,element.branch_service,element.branch_thumbnail)
				var infoWindow = new google.maps.InfoWindow({
					content: html,
					maxWidth: 490
				});
				
				if( prev_infowindow ) {
					   prev_infowindow.close();
					}
				prev_infowindow = infoWindow;
				
				/* infoWindow.setContent(html); */
				infoWindow.open(MYMAP.map, marker);
				
				if(jQuery.inArray("greyhounds", element.branch_service) !== -1){
					$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-gh.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
				}		
				if(jQuery.inArray("live_sports", element.branch_service) !== -1){
					$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-ls.png" style="padding: 5px 5px 0px 4px;">"').appendTo("#services");
				}		
				if(jQuery.inArray("rtg", element.branch_service) !== -1){
					$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-rtg.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
				}		
				if(jQuery.inArray("virtual_sports", element.branch_service) !== -1){
					$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-vs.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
				}
				if(jQuery.inArray("telebet_deposit_withdraw", element.branch_service) !== -1){
					$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-telebet.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
				}		
				if(jQuery.inArray("self_service", element.branch_service) !== -1){
					$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-ss.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
				}				
				/* $('#services').html('aw'); */
				MYMAP.map.panTo(marker.getPosition());
				
				google.maps.event.addListener(marker, 'click', function() {
					/* var infoWindow = new google.maps.InfoWindow(); */
					if( prev_infowindow ) {
					   prev_infowindow.close();
					}
					prev_infowindow = infoWindow;
					
					/* infoWindow.setContent(html); */
					infoWindow.open(MYMAP.map, marker);
					
					$('#services img').remove();
					
					if(jQuery.inArray("greyhounds", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-gh.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("live_sports", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-ls.png" style="padding: 5px 5px 0px 4px;">"').appendTo("#services");
					}		
					if(jQuery.inArray("rtg", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-rtg.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("virtual_sports", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-vs.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}
					if(jQuery.inArray("telebet_deposit_withdraw", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-telebet.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("self_service", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-ss.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}				
					/* $('#services').html('aw'); */
					MYMAP.map.panTo(marker.getPosition());
				});
					
				}, index * 500);
				
			
			
        });
		MYMAP.map.fitBounds(bounds);
		 setTimeout(function(){
			$('.loader').fadeOut('slow');
		}, jsonData.length * 500);
	}
	
	
	MYMAP.nearestMarker = function(jsonData){
		setAllMap(markers, null);
		setAllMap(marker_direction, null);
		directionsDisplay.setMap(null);
		var bounds = new google.maps.LatLngBounds();
		
			var direct = new Array();
			var partner = new Array();
			var philweb = new Array();
			
			/* $('.outlet-results').empty(); */
			$('.branch-category li').removeClass('current');
			
			var direct_ctr = 0;
			var philweb_ctr = 0;
			var parnter_ctr = 0;
			
		$.each(jsonData, function(index, element) {
			
			if(element.category == 'direct'){
				direct.push('<div class="outlet-entry" id="'+ element.ID +'"><strong class="branch-name">' + element.title + ' <span>' + element.opHours + '</span></strong><p class="branch-details">'+element.address+'<br>'+element.telephone+'</p></div>');
				direct_ctr++;
			}
			if(element.category == 'partner'){
				partner.push('<div class="outlet-entry" id="'+ element.ID +'"><strong class="branch-name">' + element.title + ' <span>' + element.opHours + '</span></strong><p class="branch-details">'+element.address+'<br>'+element.telephone+'</p></div>');
				parnter_ctr++;
			}
			if(element.category == 'philweb'){
				philweb.push('<div class="outlet-entry" id="'+ element.ID +'"><strong class="branch-name">' + element.title + ' <span>' + element.opHours + '</span></strong><p class="branch-details">'+element.address+'<br>'+element.telephone+'</p></div>');
				philweb_ctr++;
			}
			
			var point = new google.maps.LatLng(parseFloat(element.lat),parseFloat(element.lon));
			
			bounds.extend(point);
					
			setTimeout(function() {
				var marker = new google.maps.Marker({
					position: point,
					map: MYMAP.map,
					animation: google.maps.Animation.DROP,
					icon: "/shared/BranchLocator/images/viet-big.png"
				});
				
				markers.push(marker);
				
				/* var infoWindow = new google.maps.InfoWindow(); */
				var html = windowContent(element.title,element.address,element.telephone,element.email,element.address,element.lon,element.lat,'',element.branch_thumbnail)
				var infoWindow = new google.maps.InfoWindow({
					content: html,
					maxWidth: 490
				});
				google.maps.event.addListener(marker, 'click', function() {
					if( prev_infowindow ) {
					   prev_infowindow.close();
					}
					prev_infowindow = infoWindow;
					
					infoWindow.open(MYMAP.map, marker);
					
					$('#services img').remove();
					
					if(jQuery.inArray("greyhounds", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-gh.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("live_sports", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-ls.png" style="padding: 5px 5px 0px 4px;">"').appendTo("#services");
					}		
					if(jQuery.inArray("rtg", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-rtg.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("virtual_sports", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-vs.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}
					if(jQuery.inArray("telebet_deposit_withdraw", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-telebet.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}		
					if(jQuery.inArray("self_service", element.branch_service) !== -1){
						$('<img src="https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/mapicon-ss.png" style="padding: 5px 5px 0px 4px;">').appendTo("#services");
					}			
					MYMAP.map.panTo(marker.getPosition());
					
				});
				}, index * 500);
			
        });
			
			
		if (navigator.geolocation) {

				navigator.geolocation.getCurrentPosition(function(position) {

					var lat = position.coords.latitude;
					var lng = position.coords.longitude;
					
					var current = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
		
					var image = 'https://media.megasportsworld.com/branch-locator/wp-content/themes/branch-locator/images/u-marker.png';
					var marker = new google.maps.Marker({
						position: current,
						map: MYMAP.map,
						icon: image
					});  
					// marker.setMap(MYMAP.map);
					markers.push(marker);
					
				}, function(error) {
					clearTimeout(location_timeout);
					geolocFail();
				});
		}
			
		if(direct_ctr != 0){
			$('#direct').addClass('current').trigger( "click" );
		}
		
		else if(parnter_ctr != 0){
			$('#partner').addClass('current').trigger( "click" );
		}
		
		else if(philweb_ctr != 0){
			$('#philweb').addClass('current').trigger( "click" );
		}
		
		var directHTML = [];
		var partnerHTML = [];
		var philwebHTML = [];
		
		$.each(direct, function(index, value) {
			directHTML.push(value);
		});
		$("#branch-1 .outlet-results").html(directHTML.join(""));
		
		$.each(partner, function(index, value) {
			partnerHTML.push(value);
		});
		$("#branch-2 .outlet-results").html(partnerHTML.join(""));
		
		$.each(philweb, function(index, value) {
			philwebHTML.push(value);
		});
		$("#branch-3 .outlet-results").html(philwebHTML.join(""));
			
		MYMAP.map.fitBounds(bounds);
		
		if(typeof jsonData.length == 'undefined'){
			setTimeout(function(){
				$('.loader').fadeOut('slow');
			}, 7 * 500);
		}
		else{
			setTimeout(function(){
				$('.loader').fadeOut('slow');
			}, jsonData.length * 500);
		}
		
		
			/* $('.branch-category li').find('.current'); */
			
	}
	
	
	function initialize() {

		 new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
      { types: ['geocode'] });
	  
		 new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('location_from')),
      { types: ['geocode'] });
	  
		 new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('location_to')),
      { types: ['geocode'] });
	  
	  
	
	}


		//PHP COVERSION
	function displayBranches(list, filter) {
		var data = '';
		$.each(list, function(key, val) {
			if(filter === val["category"]) {
				data += '<div class="outlet-entry" id="'+ key +'">';
			  	val["title"] ? data += '<strong class="branch-name">' + val["title"] + '</strong>' : '';
			  	val["address"] ? data += '<p class="branch-details">' + val["address"] + '<br>' : '';
				val["telephone"] ? data += val["telephone"] : '';
			  	data += '</p>';
				data += '</div>';
			}
		});

		return data;
	}

	function geocodeLatLng(latlng, success, error) {
	    return geocoder.geocode({'location': latlng}, function(results, status) {
	      if (status === 'OK') {
	        if (results[0]) {
	          success(results[0].formatted_address);
	        } else {
	          window.alert('No results found');
	        }
	      } else {
	        window.alert('Geocoder failed due to: ' + status);
	      }
	    });
	}

	function rad(x) {return x*Math.PI/180;}
	function find_closest_marker(data, callback) {
	    var R = 3;
	    var distances = [];
	    var closest = -1;
	    var map = data.list;
	    var lat = data.lat;
	    var lng = data.lng

	    if(map.length) {
		    for( i=0;i<map.length; i++ ) {
		        var mlat = map["lat"];
		        var mlng = map["lon"];
		        var dLat  = rad(mlat - lat);
		        var dLong = rad(mlng - lng);
		        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
		        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		        var d = R * c;
		        distances[i] = d;
		        if ( closest == -1 || d < distances[closest] ) {
		            closest = i;
		        }
		    }

		    return callback([map[closest]]);
		} else {
			return callback();
		}
	}