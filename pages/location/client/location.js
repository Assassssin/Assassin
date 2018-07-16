/* Template.location.helpers({
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
 }) */
 Template.location.helpers({
   profiles(){
      const ps = Profiles.find({location:{$exists:true}}).fetch()
      //console.log("sending profiles")
      //console.dir(ps)
      const me = Profiles.findOne({owner:Meteor.user()._id})
      //console.dir(['me=',me,Meteor.user()._id])
      ps.map((p)=>{p.dist = distance(me.location.lat,me.location.lon,p.location.lat,p.location.lon)})
      const target = Profiles.findOne ({_id:me.target})
      target.dist = distance(me.location.lat, me.location.lon, target.location.lat, target.location.lon)
      //console.dir(ps)
      return target
    },
    admin(){
       const ps = Profiles.find({location:{$exists:true}}).fetch()
       //console.log("sending profiles")
       //console.dir(ps)
       const me = Profiles.findOne({owner:Meteor.user()._id})
       //console.dir(['me=',me,Meteor.user()._id])
       ps.map((p)=>{p.dist = distance(me.location.lat,me.location.lon,p.location.lat,p.location.lon)})
       //console.dir(ps)
       //console.log(ps);
       return ps
     },
  })


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
  var victims = [];
  var people = Profiles.find().fetch();
  for(let i=0; i<people.length; i++){
  //for (var p in people){
    console.log(playerboi.name)
    var p = people[i]
    if(p.location != undefined){
      var d = distance(playerboi.location.lat,playerboi.location.lon, p.location.lat, p.location.lon)
    }
    //var d=p.dist
    console.log('name: ' + p.name + ' distance: ' + d);
    if (d <= 5000 && !(p._id == playerboi._id)){
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

function killAllInArray(victims){
  for (let i=0; i<victims.length; i++){
    var v = victims[i]
    //v = the current player in victims.
    var player = Profiles.findOne({owner:Meteor.user()._id});
    //I think this means it's finidng the person using the computer.
    if(v._id == player.target){
      //if the current victim is the player's target then they're eliminated and the player is given their target.
      v.playing = false;
      Profiles.update(v._id, v);
      player.target = v.target;
      Profiles.update(player._id, player);
    }
  }
}
function miniShuffle (array) {
  var i = 0;
    var j = 0;
    var temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function randomize (array, backup){
  done = false;
  while(done == false){
    done = true;
    for(i=0; i<array.length; i++){
      if(array[i]._id == backup[i]._id){
        done = false;
        array = miniShuffle(array);
      }
    }
  }
  return array;
}

 /*function shuffle() {
    var array = Profiles.find().fetch()
    var backup = Profiles.find().fetch();
    var counter = array.length;

    array = randomize(array, backup);
    counter = array.length;
    for(i=0; i<counter; i++){
      if(array[i] != undefined && i != 1){ //skip Mr Cockroach
        array[i].target = backup[i]._id;
        array[i].playing = true;
        Profiles.update(array[i]._id, array[i]);
        console.log("name: " + array[i].name + " target: " + Profiles.findOne({_id:array[i].target}).name);
      }
    }
    if(array[counter] != undefined){
      array[counter].target = backup[0]._id;
      Profiles.update(backup[i].name, array[i]);
    }
} */

function shuffle(){
  var targets = generateTargets();
  console.log(targets);

  counter = targets.length;
  for(var i=0; i<counter; i++){
    targets[i].playing = true;
    Profiles.update(targets[i].name, targets[i]);
  }
<<<<<<< HEAD
} */

function shuffle(){
  var array = Profiles.find().fetch()
  for(var i=0; i<array.length-1; i++){
    if(i >= 2){
      console.log(i);
      array[i].target = array[i+1]._id;
      Profiles.update(array[i]._id, array[i]);
  }
  array[array.length].target = array[0]._id;
  Profiles.update(array[array.length]._id, array[array.length]);
=======
>>>>>>> c2cf8e7378dbb1d6cdfc273491750535f1f0ccef
}

function generateTargets(){
  //Currently doesn't do anything.
  var array = Profiles.find().fetch();
  var target_pool = Profiles.find().fetch();
  var output = Profiles.find().fetch();

  for(var i=0; i<array.length; i++){
      var random = Math.floor(Math.random() * (target_pool.length + 1));
      if(target_pool[random] != undefined){
        output[i].target = target_pool[random]._id;
        target_pool.splice(i,0);
    }
  }
  return output;
}

/* function shuffle(){
  Profiles.update($sample: {size : Profiles.find().fetch().length()});
} */
//taken from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array


//vvictims
Template.location.events({
  "click #kill"(event,instance){
    console.log('assassination started');
    var player = Profiles.findOne({owner:Meteor.user()._id});
    if(player.playing){
      var victims = getAllInRange(Profiles.findOne({owner:Meteor.user()._id}));
      //console.log(victims.length);
      killAllInArray(victims);
    }
  },

  "click #start"(event,instance){
    console.log('Game started');
    shuffle()
    }
})
