Template.game.helpers({
  avatars(){return Avatars.find()}
})

Template.game.onCreated(function(){
  var avatar = Avatars.find({owner:Meteor.userId()});
  if (!avatar){

  }
  var color =
    '#'+Math.floor(Math.random()*16777215).toString(16);
  this.avatarid = Avatars.insert({
    x:100, y:100, color:color, owner:Meteor.userId()
  });
  var instance = this;
  $(window).on('keydown', function(e){
    console.log(e.key);
    updateAvatar(event,instance);
  });
  console.log("onCreated: Avatarid="+this.avatarid);
});

Template.game.onRendered(function(){
  ctx = drawSpace.getContext('2d');

  gameLoop();
  console.log('onRendered: started gameloop');
});

function updateAvatar(event,instance){
  console.log("keydown event handler 1");
  console.dir(event);
  console.dir(instance);
  avatar = Avatars.findOne(
    {owner:Meteor.userId()});
  //console.log(JSON.stringify(avatar));
  //console.dir(event);
  if (!avatar){
    alert("there seems to be a bug here!");
  }
  switch (event.key) {
    case 'w': case 'ArrowUp':
      avatar.y -= 5;
      break;
    case 's': case 'ArrowDown':
      avatar.y += 5;
      break;
    case 'a': case 'ArrowLeft':
      avatar.x -= 5;
      break;
    case 'd': case 'ArrowRight':
      avatar.x += 5;
      break;
  }
  console.log(JSON.stringify(avatar));
  Avatars.update(avatar._id,avatar);
  var jewel = Jewels.findOne({x:avatar.x,y:avatar.y});
  if (jewel) {
    avatar.score += 1;
    Avatars.update(avatar._id,avatar);
    Jewels.update(jewel._id,
      {x:Math.floor(Math.random()*20)*10,
       y:Math.floor(Math.random()*20)*10,
      })
  }
};

Template.game.onDestroyed(function(){
  console.log('in onDestroyed');
  var instance = Template.instance();
  Avatars.remove(instance.avatarid.get())
  console.log('onDestroyed: removing Avatar '+
     instance.avatarid.get())
});

Template.game.events({
  "click #join"(event,instance){
    var user = Meteor.userId();
    if (!user){
      alert("You must be logged in to join the game!");
      return;
    }
    if (event.target.innerHTML=="Join"){
      event.target.innerHTML = "Leave";
      var avatar = Avatars.findOne({owner:Meteor.userId()});
      while (avatar) {
         if (avatar) {
           console.log("removing "+avatar._id);
           Avatars.remove(avatar._id);
         }
         avatar = Avatars.findOne({owner:Meteor.userId()})
      }
      console.dir(avatarColor);
      name = instance.$("#name").val();
      avatar = {x:100,y:100,color:avatarColor.value,score:0,name:name,owner:Meteor.userId()}
      Avatars.insert(avatar);
    }
    else {
      event.target.innerHTML = "Join";
      var avatar = Avatars.findOne({owner:Meteor.userId()});
      while (avatar) {
         if (avatar) {
           console.log("removing "+avatar._id);
           Avatars.remove(avatar._id);
         }
         avatar = Avatars.findOne({owner:Meteor.userId()})
      }
    }
  },

})

var  ctx, raf;


function clear() {
  ctx.fillStyle = 'rgba(220,225,235,0.3)';
  ctx.fillRect(0,0,drawSpace.width,drawSpace.height);
}


function gameLoop() {
  clear();
  avatars = Avatars.find().fetch();
  avatars.forEach(function(avatar){
    ctx.fillStyle = avatar.color;
    ctx.fillRect(avatar.x,avatar.y,10,10);
  })
  jewels = Jewels.find().fetch();
  jewels.forEach(function(j){

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(j.x+5,j.y+5,5,0,Math.PI*2);
    ctx.fill();
  })
  raf = window.requestAnimationFrame(gameLoop);
}
