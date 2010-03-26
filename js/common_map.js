
// == Create the Euclidean Projection for the flat map ===
function EuclideanProjection(a, wrap){
	this.imageDimension     = 65536;
	this.pixelsPerLonDegree = [];
	this.pixelOrigin        = [];
	this.tileBounds         = [];
	this.tileSize           = 256;
	this.isWrapped          = wrap;
	var b = this.tileSize;
	var c = 1;
	for(var d=0; d<a; d++) {
		var e = b / 2;
		this.pixelsPerLonDegree.push(b / 360);
		this.pixelOrigin.push(new GPoint(e, e));
		this.tileBounds.push(c);
		b *= 2;
		c *= 2;
	};
};

EuclideanProjection.prototype = new GProjection();

EuclideanProjection.prototype.fromLatLngToPixel = function(latlng, zoom){
	var c = Math.round(this.pixelOrigin[zoom].x + latlng.lng() * this.pixelsPerLonDegree[zoom]);
	var d = Math.round(this.pixelOrigin[zoom].y + (-2 * latlng.lat()) * this.pixelsPerLonDegree[zoom]);
	return new GPoint(c,d);
};

EuclideanProjection.prototype.fromPixelToLatLng = function(pixel, zoom, unbounded){
	var d = (pixel.x - this.pixelOrigin[zoom].x) / this.pixelsPerLonDegree[zoom];
	var e = -0.5 * (pixel.y - this.pixelOrigin[zoom].y) / this.pixelsPerLonDegree[zoom];
	return new GLatLng(e, d, unbounded);
};

// == a method that checks if the y value is in range, and wraps the x value ==
EuclideanProjection.prototype.tileCheckRange = function(tile, zoom, tilesize){
	var tileBounds = this.tileBounds[zoom];
	if (tile.y < 0 || tile.y >= tileBounds) { return false; };
	if (this.isWrapped) {
		if (tile.x < 0 || tile.x >= tileBounds) { 
			tile.x = tile.x % tileBounds; 
			if (tile.x < 0) { tile.x += tileBounds; };
		};
	} else { 
		if (tile.x < 0 || tile.x >= tileBounds) { return false; };
	}; 
	return true;
};

// == a method that returns the width of the tilespace ==
EuclideanProjection.prototype.getWrapWidth = function(zoom) {
	return this.tileBounds[zoom] * this.tileSize;
};