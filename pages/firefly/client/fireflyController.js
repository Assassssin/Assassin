

Template.firefly.events({
	"click #startgame": function(event){
		console.log("pressed start");

		if (!theModel.running) {
			// if the game is not already running
			// initialize the model and start the game
			// and change the label on the button to "stop"
			theModel.init();
			theModel.running = true;
			theGameLoop.run();
			$("#startgame").html("Stop");
		} else {
			// if the game is running, then stop it
			// and change the button label to "start"
			theModel.running=false;
			$("#startgame").html("Start");
		}

	}
})

Template.firefly.rendered = function(){
	document.getElementById("gameboard").addEventListener('mousemove',
		function(e){
			if (theModel.running) {

				theModel.net.x = 100*(e.pageX-gameboard.offsetLeft)/gameboard.width;
				theModel.net.y = 100*(e.pageY-gameboard.offsetTop)/gameboard.height;
			}
		});
}
