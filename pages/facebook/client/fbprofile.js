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
    if (name == "Kanye East")
      name = "Not doing anything productive"
    if (name == "anonymous1")
    {
      name = "Mr.Cockroach"
    }
    if (pic == ""){
      pic = "https://lh3.googleusercontent.com/brHd5fX5bARzW6yG9gKw-hSwGJvnXFX5b7hujcxqS6eyOvwHae0E6O5JXzl5DXCNmOfEpjAMHxdhDcvFXp9X=w1920-h855-rw"
    }
    else if(pic == "https://vignette.wikia.nocookie.net/trollpasta/images/a/a4/Cursed_spiderman.jpg/revision/latest?cb=20180526232940" || pic == "https://vignette.wikia.nocookie.net/creepypasta/images/a/a4/Cursed_spiderman.jpg/revision/latest?cb=20180526230243"){
      pic = "https://media0.giphy.com/media/A4R8sdUG7G9TG/giphy.gif"
    }
    else{
      console.log('pic is good!')
    }
    console.log('just read '+pic);
    this.user.name = name;
    this.user.age = age;
    this.user.pic = pic;
    this.user.playing = true;
    this.user.target = "none";
    this.user.location = Geolocation.currentLocation()
    this.user.dist = undefined;
    Profiles.update(this.user._id,this.user);
  }
})
