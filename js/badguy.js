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

function BadGuy() {

var temp = 0;

	var t = 0;
	var sx = 131;
	var sy = 128;
	var swidth = 54; 
	var sheight = 56;
	this.x = -75;
	this.y = 300; 
	this.width = 50;
	this.height = 50;
	var travelPath = null;

	this.active = true;
	this.speed = 3;
	this.rotation = 0;

	this.draw = function (context) {
		this.rotation = (Math.PI / 180) * 270;

		context.save();
		context.translate(game.width/2, game.height/2);
		context.rotate(this.rotation);
		context.drawImage(sprite, sx, sy, swidth, sheight, this.x, this.y, this.width, this.height);
		context.restore();
	};

	this.updateState = function (delta) {
		t += (delta / 10) * this.speed;		
		if(t > 1) { this.kill(); }
		var point = bezier(travelPath.P0, travelPath.P1, travelPath.P2, travelPath.P3, t);
		this.x = point.x;
		this.y = point.y;
	};

	this.generateTravelPath = function () {
		travelPath = new TravelPath();
		travelPath.generateRandom();
	};

	this.kill = function() {
		this.active = false;
	}

	this.explode = function() {
		this.active = false;

		var explosion = new Explosion();
		explosion.explode(this);
		explosions.push(explosion);
	}

	this.shoot = function() {
		var bullet = new Bullet();
		bullet.rotation = 270;
		bullet.generateTravelPath(this.x + (this.width/2), this.y);
		badGuyBullets.push(bullet);
	};
};

function generateBadGuy() {
	var badGuy = new BadGuy();
	badGuy.generateTravelPath();
	return badGuy;
}