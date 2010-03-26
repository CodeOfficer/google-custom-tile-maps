;(function($) {
	$(function() {

		if (GBrowserIsCompatible()) {

		  var tilelayers = [new GTileLayer(new GCopyrightCollection("CodeOfficer.com: Russ Jones"), 0, 3)];
				  tilelayers[0].getCopyright = function(a, b) {
						return {
							prefix: "CodeOfficer.com: &copy;",
							copyrightTexts: ["Russ Jones"]
						};
					};
				  tilelayers[0].getTileUrl = function (coord, zoom) {
						console.log("tiles/tilez" + zoom + "_" + (coord.y+1) + "x" + (coord.x+1) + ".jpg");
				    return "tiles/tilez" + zoom + "_" + (coord.y+1) + "x" + (coord.x+1) + ".jpg";
				  };

		  var custommap = new GMapType(tilelayers, new EuclideanProjection(18, true), "Euclidean", { errorMessage: "No Data Available", alt: "My Flat Projection" });
		  var map = new GMap2(document.getElementById("map_canvas"), { mapTypes: [custommap] });
				  map.addControl(new GLargeMapControl());
				  map.addControl(new GMapTypeControl());
				  map.setCenter(new GLatLng(0, 0), 1, custommap);
					map.addOverlay(new GMarker(new GLatLng(0, 0))); // center marker

		  // == A line of points from one corner to the other ==
		  // var points=[];
		  // for (var i=-85; i<85; i+=10) {
		  //   var P = new GLatLng(i, i*2);
		  //   map.addOverlay(new GMarker(P));
		  //   points.push(P);
		  // };
		  // map.addOverlay(new GPolyline(points, "#FF0000", null, 1));

		};

	});
})(jQuery);