Template.apidemo.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    color: "bg-info",
    counter: 0,
    recipes:[],
    r:{},
    zipinfo:null,

  });
  console.log("creating the template");
  console.dir(this.state);
});

Template.apidemo.helpers({
  theColor: function(){
    const instance = Template.instance();
    const c = instance.state.get("color");
    return c;
  },

  theCounter: function(){
    const instance = Template.instance();
    return instance.state.get("counter");
  },

  recipes: function(){
    const instance = Template.instance();
    return instance.state.get("recipes");
  },


  zipinfo: function(){
    const instance = Template.instance();
    const zipinfo = instance.state.get("zipinfo");
    console.log("zipinfo="+JSON.stringify(zipinfo));
    console.dir(["zipinfo = ",zipinfo]);
    return zipinfo;
  }

});

Template.apidemo.events({
  "change .js-color": function(event,instance){
    const c = instance.$(".js-color").val();
    instance.state.set("color",c);
    // change the color field of the state object ...
  },

  "click .js-pusher": function(event,instance){
    const c = instance.state.get("counter");
    instance.state.set("counter",c+1);
  },

  "click .js-recipe": function(event,instance){
    Meteor.call("test1",function(e,r){console.log(r)});
    const ingr = $(".js-ingr").val();
    const dish = $(".js-dish").val();

    Meteor.apply("getRecipe",[ingr,dish],{returnStubValue: true},
      function(error,result){

        console.dir(['getRecipe',error,result]);
        if (error) {
          console.log("Error!!"+JSON.stringify(error)); return;
        }
        console.log(result);
        r = JSON.parse(result);
        console.dir(r);
        return instance.state.set("recipes",r.results);
      });

  },

  "click .js-zipcode": function(event,instance){
    Meteor.call("test1",function(e,r){console.log(r)});
    const zipcode = $(".js-zip").val();


    Meteor.apply("getZipInfo",[zipcode],{returnStubValue:true},
      function(error,result){
        console.dir(['er',error,result]);
        if (error) {
          instance.state.set("zipinfo",null);
          return;
        }
        const r = JSON.parse(result);
        console.log("zipinfo parsed as "+JSON.stringify(r));
        console.dir(['zipcode',r]);
        instance.state.set("zipinfo",r);
      })
  },



});
