Template.userList.helpers({
  'users': function () {

    return Meteor.users.find();
  },
  'connections': function(){
    return Connections.find();
  },
  'connect': function() {
    console.log("finding connections!");
    const z = Connections.find();
    zz = Meteor.call("getInfo",[]);
    console.log("myIP= "+zz);

    console.log("**** connections = "+JSON.stringify(z.fetch()));
    return z;
  }
});

Template.userList.events({
  'click .add-me-js': function(){
    console.log("clicked!");
    Meteor.call("getInfo");
  },

  'click .js-remove-all': function(event){
    console.log("removing...");
    Meteor.call("removeAll");
  },

})
