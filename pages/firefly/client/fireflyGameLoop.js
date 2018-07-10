// the GameLoop simply updates the model, redraws the screen,
// and repeats as long as theModel is still running
// otherwise it ends.

function run(){

	theModel.update();
	theView.draw();

	if (theModel.running)
		window.requestAnimationFrame(run);
}

theGameLoop = {run:run};
