function distance(lat1,lon1,lat2,lon2){
var R = 6371e3; // metres
var phi1 = lat1.toRadians();
var phi2 = lat2.toRadians();
var deltaphi = (lat2-lat1).toRadians();
var deltal = (lon2-lon1).toRadians();

var a = Math.sin(deltaphi/2) * Math.sin(Δφ/2) +
        Math.cos(phi1) * Math.cos(φ2) *
        Math.sin(deltal/2) * Math.sin(Δλ/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

var d = R * c;
return d
}
