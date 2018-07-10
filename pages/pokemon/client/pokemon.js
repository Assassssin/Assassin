Template.pokemon.helpers({
  pokedex: function(){
    return Pokedex.find({},{sort:{ename:1}});
  },


})
