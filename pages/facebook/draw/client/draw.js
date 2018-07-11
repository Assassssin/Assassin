Template.draw.events({

	"click .js-start": function(event){
		running = true;
		drawStuff();
	},

	"click .js-reset": function(event){
		running = false;
		clear();
	},

	"click .js-draw-triangle": function(event){
		drawTriangle();
	},

})

function clear(){
	drawContext = drawSpace.getContext("2d");
	drawContext.fillStyle = "yellow";
	drawContext.fillRect(0,0,600,300);
}


function drawTriangle() {
	drawContext = drawSpace.getContext("2d");
	drawContext.strokeStyle="#ff0000"; // or green or "#fff"
	drawContext.moveTo(100,100);
	drawContext.lineTo(150,100);
	drawContext.lineTo(125,150);
	drawContext.lineTo(100,100);
	drawContext.stroke();
}


let running=true;

function drawStuff(){
	const drawContext = drawSpace.getContext("2d");

	// fill the background with green
	drawContext.fillStyle="green";
	drawContext.fillRect(0,0,600,300);

	// draw a blue rotated square
  drawRotatedSquare(drawContext);

	// draw a red plus sign centered at (300,150)
	// with rectangles of size 20x10 and 10x20 respectively
	drawContext.fillStyle="red";
	drawContext.fillRect(290,145,20,10);
	drawContext.fillRect(295,140,10,20);

	if (running) {  // draw again if running == true
		window.requestAnimationFrame(drawStuff);
	} else {
		clear();
	}

}

function drawRotatedSquare(drawContext){
	// calculate the angle to rotate
	const time = new Date();
	const secs = time.getSeconds()+time.getMilliseconds()/1000.0;
	const angle = 60*secs; // rotate 60 degrees per second
	const angleInRadians = angle/360*(2*Math.PI);
	// draw a rotating rectangle centered in the canvas
	drawContext.save();
		drawContext.translate(300,150); // go to the middle
		drawContext.rotate(angleInRadians); // rotate
		drawContext.fillStyle="blue";
		drawContext.fillRect(-100,-50,200,100); // draw rectangle
	drawContext.restore(); // forget the translation and rotation
}
