
// ====== Create the Euclidean Projection for the flat map ======
// == Constructor ==
function EuclideanProjection(a){
  this.pixelsPerLonDegree = [];
  this.pixelsPerLonRadian = [];
  this.pixelOrigo = [];
  this.tileBounds = [];
  var b = 256;
  var c = 1;
  for(var d=0; d<a; d++){
    var e = b/2;
    this.pixelsPerLonDegree.push(b/360);
    this.pixelsPerLonRadian.push(b/(2*Math.PI));
    this.pixelOrigo.push(new GPoint(e,e));
    this.tileBounds.push(c);
    b *= 2;
    c *= 2;
  };
};

// == Attach it to the GProjection() class ==
EuclideanProjection.prototype = new GProjection();

// == A method for converting latitudes and longitudes to pixel coordinates ==
EuclideanProjection.prototype.fromLatLngToPixel = function(a,b){
  var c = Math.round(this.pixelOrigo[b].x+a.lng()*this.pixelsPerLonDegree[b]);
  var d = Math.round(this.pixelOrigo[b].y+(-2*a.lat())*this.pixelsPerLonDegree[b]);
  return new GPoint(c,d);
};

// == a method for converting pixel coordinates to latitudes and longitudes ==
EuclideanProjection.prototype.fromPixelToLatLng = function(a,b,c){
  var d = (a.x-this.pixelOrigo[b].x)/this.pixelsPerLonDegree[b];
  var e = -0.5*(a.y-this.pixelOrigo[b].y)/this.pixelsPerLonDegree[b];
  return new GLatLng(e,d,c);
};

// == a method that checks if the y value is in range, and wraps the x value ==
EuclideanProjection.prototype.tileCheckRange = function(a,b,c){
  var d = this.tileBounds[b];
  if (a.y<0||a.y>=d) {
    return false;
  };
  if(a.x<0||a.x>=d){
    a.x = a.x%d;
    if(a.x<0){
      a.x += d;
    }
  };
  return true;
};

// == a method that returns the width of the tilespace ==
EuclideanProjection.prototype.getWrapWidth = function(zoom) {
  return this.tileBounds[zoom]*256;
};