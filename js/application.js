function HomeControl(controlDiv, map) {
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('DIV');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to set the map to Home';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('DIV');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = 'Home';
  controlUI.appendChild(controlText);

	var chicago = new google.maps.LatLng(41.850033, -87.6500523);

  google.maps.event.addDomListener(controlUI, 'click', function() {
    map.setCenter(chicago)
  });
};

function placeMarker(map, location) {
	var clickedLocation = new google.maps.LatLng(location);
	var marker = new google.maps.Marker({
		position: location,
		map: map
	});
	map.setCenter(location);
};

;(function($) {
	$(function() {

		var myOptions = {
			zoom: 8,
			center: new google.maps.LatLng(43.6319, -70.2928), // South Portland
			// disableDefaultUI: true,
			navigationControl: true,
			navigationControlOptions: {
				style: google.maps.NavigationControlStyle.DEFAULT,
				position: google.maps.ControlPosition.TOP_LEFT
			},
			mapTypeControl: true,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
			},
			scaleControl: true,
			mapTypeId: google.maps.MapTypeId.HYBRID
		};
		var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

		// google.maps.event.addListener(map, 'bounds_changed', function(event) {
		// 	// console.log("bounds_changed", this, event);
		// });
		// google.maps.event.addListener(map, 'center_changed', function(event) {
		// 	// console.log("center_changed", this, event);
		// });
		// google.maps.event.addListener(map, 'zoom_changed', function(event) {
		// 	// console.log("zoom_changed", this, event);
		// });

		google.maps.event.addListener(map, 'click', function(event) {
			placeMarker(map, event.latLng);
			console.log(event.latLng.b, event.latLng.c, '|', event.pixel.x, event.pixel.y);
		});

	  var homeControlDiv = document.createElement('DIV');
	  var homeControl = new HomeControl(homeControlDiv, map);
	  homeControlDiv.index = 1;
	  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);

	});
})(jQuery);
