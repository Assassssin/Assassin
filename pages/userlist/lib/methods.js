Meteor.methods({
  "removeAll": function(){
    Connections.remove({});
    console.log("removed everything!");
  },

  
})
