

Meteor.methods({

  getInfo: function(){
    const z = Meteor.user();
    Connections.remove({localIP:this.connection.clientAddress});
    Connections.insert(
      {userName:z.profile.name,localIP:this.connection.clientAddress,createdAt:(new Date())});
    return this.connection.clientAddress;
  }
})
