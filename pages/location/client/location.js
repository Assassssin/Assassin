Template.location.helpers({
  profiles(){
     const ps = Profiles.find({location:{$exists:true}}).fetch()
     //console.log("sending profiles")
     //console.dir(ps)
     const me = Profiles.findOne({owner:Meteor.user()._id})
     //console.dir(['me=',me,Meteor.user()._id])
     ps.map((p)=>{p.dist = distance(me.location.lat,me.location.lon,p.location.lat,p.location.lon)})
     //console.dir(ps)
     return ps
   },
 })
//https://www.youtube.com/watch?v=dQw4w9WgXcQ

Template.location_info.rendered = function(){

    let z = Geolocation.currentLocation()
    var theProfile = Profiles.findOne({owner:Meteor.userId()});
    if (theProfile && z){
      theProfile.location = {lat:z.coords.latitude, lon:z.coords.longitude}
      Profiles.update(theProfile._id,theProfile)
      //console.log("updating profile! ")
      //console.dir(theProfile)
    }
    //console.log("in position")
    //console.dir(z)
}

Template.location_info.events({
  "click #start": function(event,instance){
    let z = Geolocation.currentLocation()
    //console.dir(['in location',z])
    instance.$("#gps").val("hi")
  }
})


// remove all Profiles
//for(let i=0; i<Profiles.find().count(); i++){ Profiles.remove(Profiles.findOne()._id)}

function toRadians(x){
  return x/180*Math.PI
}

function distance(lat1,lon1,lat2,lon2){
var R = 6371e3; // metres
//console.log(JSON.stringify([lat1,lon1,lat2,lon2]))
var p1 = toRadians(lat1);
var p2 = toRadians(lat2);
var dp = toRadians(lat2-lat1);
var dl = toRadians(lon2-lon1);

var a = Math.sin(dp/2) * Math.sin(dp/2) +
        Math.cos(p1) * Math.cos(p2) *
        Math.sin(dl/2) * Math.sin(dl/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

var d = R * c;
//console.log(JSON.stringify([d,R,c,a]))
return d
}

function getAllInRange(playerboi){
  var victims = {};
  var people = Profiles.find().fetch();
  for(let i=0; i<people.length; i++){
  //for (var p in people){
    console.log(playerboi.name)
    var p = people[i]
    d = distance(playerboi.location.lat,playerboi.location.long, p.location.lat, p.location.long)
    console.log('name: ' + p.name + ' distance: ' + d);
    if (d <= 5 && !(p == playerboi)){
      victims.push(p);
    }
  }
  //checks if the next player is both within a certain distance and makes sure that player is NOT themselves.
  return victims;
}

/*function getAllInRange(p){
  var victims = {}
  var people = Profiles.find().aga();
  while(people.hasNext()){
    target = people.next();
    if (distance(p.location.lat, p.location.long, target.location.lat, target.location.long) <= 5){
      victims.push(target);
    }
  }
  return victims;
}
*/

//function killAllInArray(victims){
  //for each (v in victims){
  //  v.playing = false;
//  }
//}


//vvictims
Template.location.events({
  "click #kill"(event,instance){
    console.log('assassination started');
    var victims = getAllInRange(Profiles.findOne({owner:Meteor.user()._id}));
    console.log(victims.length)
  }
})
