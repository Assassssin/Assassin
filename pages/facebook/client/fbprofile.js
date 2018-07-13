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
    name = instance.$('#js-name').val();
    console.log('just read '+name);
    age = instance.$('#js-age').val();
    console.log('just read '+age);
    pic = instance.$('#js-pic').val();
    console.log('just read '+pic);
    if (pic == ""){
      pic = "https://alvistor.com/wp-content/uploads/2017/11/Chrome-Incognito.jpg"
    }
    else if(pic == "https://vignette.wikia.nocookie.net/trollpasta/images/a/a4/Cursed_spiderman.jpg/revision/latest?cb=20180526232940"){
      pic = "https://steamusercontent-a.akamaihd.net/ugc/830202374696185305/F3BF9FE1B2B483726D5D274E5EF3AC439D881E42/"
    }
    else{
      console.log('pic is good!')
    }
    console.log('just read '+pic);
    this.user.name = name;
    this.user.age = age;
    this.user.pic = pic;
    this.user.playing = true;
    Profiles.update(this.user._id,this.user);
  }
})
