Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here ....
});

Router.route('/', {name: 'home'});
Router.route('location');

Router.route('userList');
Router.route('contact');
Router.route('fbprofile');
Router.route('fbusers');
Router.route('fbtimeline');
Router.route('rules');
Router.route('about');



/*
Router.route('chat');
Router.route('about');
Router.route('pokemon');
Router.route('pokemonData/:_id',
{name:"pokemonData",
 data: function(){
	 const c = Pokedex.findOne(this.params._id);
   c.ename = c.ename.toLowerCase()
	 return c;
 }});


Router.route('apidemo');

Router.route('firefly');

Router.route('sponsors')

Router.route('draw')

Router.route('graphics')




Router.route('game');
*/
