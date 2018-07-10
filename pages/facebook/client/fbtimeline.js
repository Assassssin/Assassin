Template.fbtimeline.helpers({
  posts(){
    var myFriends = Friends.find({owner:Meteor.userId()}).fetch();
    var myFriendsList = _.map(myFriends,function(x){return x.friend});
    console.dir(myFriendsList);
    return Posts.find({owner:{$in:myFriendsList}},{sort:{createdAt:-1}})
    //return Posts.find();
  }
})

Template.fbmakepost.events({
  "click #submit"(event, instance){
    var profile = Profiles.findOne({owner:Meteor.userId()});
    var now = new Date();
    var text = instance.$("#fb-posttext").val();
    var post = {
      owner:Meteor.userId(),
      name:profile.name,
      createdAt: now,
      text: text
    };
    console.dir(post);
    Posts.insert(post);
  }
})
