Template.location.helpers({
  profiles(){
     const ps = Profiles.find({location:{$exists:true}})
     console.log("sending profiles")
     console.dir(ps)
     return ps
   },
 })


Template.location_info.helpers({

  position(){

    let z = Geolocation.currentLocation()
    var theProfile = Profiles.findOne({owner:Meteor.userId()});
    if (theProfile && z){
      theProfile.location = {lat:z.coords.latitude, lon:z.coords.longitude}
      Profiles.update(theProfile._id,theProfile)
      console.log("updating profile! ")
      console.dir(theProfile)
    }
    console.log("in position")
    console.dir(z)
    return z}
})

Template.location_info.events({
  "click #start": function(event,instance){
    let z = Geolocation.currentLocation()
    console.dir(['in location',z])
    instance.$("#gps").val("hi")
  }
})
