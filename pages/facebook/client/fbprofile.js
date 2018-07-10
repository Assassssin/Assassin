Template.fbprofile.helpers({
  user(){
    var theProfile = Profiles.findOne({owner:Meteor.userId()});
    if (!theProfile){
      var k = Profiles.find().count();
      Profiles.insert({name:"anonymous"+k,owner:Meteor.userId()});
    } else {
    return theProfile
    }
   },


})


Template.fbinfo.events({
  "click #js-submit"(event,instance){
    const name = instance.$('#js-name').val();
    console.log('just read '+name);
    const birthday = instance.$('#js-birthday').val()
    name = instance.$('#js-name').val();
    console.log('just read '+name);
    this.user.name = name;
    Profiles.update(this.user._id,this.user);
  }
})
