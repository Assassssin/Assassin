Meteor.startup(function(){
  console.log("starting up the client!");

  //Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://leiner.cs-i.brandeis.edu:3000/';
});

// This helper can be used in any template
// it returns the email address when givent
// the userId from Meteor.userId()
Template.registerHelper('userEmail',
(id)=>{
  const user = Meteor.users.findOne(id);
  if (!user){
    return("no-email")
  }else if(user.emails)
    return user.emails[0].address;
  else {
    return user.services.google.email;
  }
});

// this allows the client access to all the user information
// this should be removed when the app is deployed
Meteor.subscribe('userList');
