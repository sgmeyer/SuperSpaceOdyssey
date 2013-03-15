/*** 
sx		Optional. The x coordinate where to start clipping
sy		Optional. The y coordinate where to start clipping
swidth	Optional. The width of the clipped image
sheight	Optional. The height of the clipped image
x		The x coordinate where to place the image on the canvas
y		The y coordinate where to place the image on the canvas
width	Optional. The width of the image to use (stretch or reduce the image)
height	Optional. The height of the image to use (stretch or reduce the image)
***/

var badGuys = [];
badGuys.push(generateBadGuy());
badGuys.push(generateBadGuy());
badGuys.push(generateBadGuy());

function BadGuy() {

	var t = 0;
	var sx = 131;
	var sy = 128;
	var swidth = 54; 
	var sheight = 56;
	var x = -75;
	var y = 300; 
	var width = 50;
	var height = 50;
	var travelPath = null;

	this.active = true;
	this.speed = 2;

	this.draw = function (context) {
		var rotation = (Math.PI / 180) * 270;

		context.save();
		ctx.translate(game.width/2, game.height/2);
		context.rotate(rotation);
		context.drawImage(sprite, sx, sy, swidth, sheight, x, y, width, height);
		context.restore();
	};

	this.updateState = function (delta) {
		t += (delta / 10) * this.speed;		
		if(t > 1) { this.kill(); }
		var point = bezier(travelPath.P0, travelPath.P1, travelPath.P2, travelPath.P3, t);
		x = point.x;
		y = point.y;
	};

	this.generateTravelPath = function () {
		travelPath = new TravelPath();
		travelPath.generateRandom();
	};

	this.kill = function() {
		this.active = false;
	}
};

function generateBadGuy() {

	var badGuy = new BadGuy();
	badGuy.generateTravelPath();
	return badGuy;
}