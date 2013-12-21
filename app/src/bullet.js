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

//var bullets = [];

//var badGuyBullets = [];

function Bullet() {
	
	var t = 0;
	var sx = 131;
	var sy = 70;
	var swidth = 20; 
	var sheight = 45;
	this.x = 0;
	this.y = 0; 
	this.width = 8;
	this.height = 20;
	this.rotation = 90;
	var travelPath = null;

	this.active = true;
	this.speed = 8;

	this.draw = function (context) {
		var rotation = (Math.PI / 180) * this.rotation;

		context.save();
		context.translate(game.width/2, game.height/2);
		context.rotate(rotation);
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

	this.generateTravelPath = function (startX, startY) {		

		this.x = startX;
		this.y = startY;
		var distance = game.width + this.width;
		var divisions = distance / 3;

		var startPoint = new Point();
		startPoint.x = startX - (this.width/2);
		startPoint.y = startY;

		var endPoint = new Point();
		endPoint.x = startPoint.x;
		endPoint.y =  startPoint.y - game.width - this.width;

		var p1 = new Point();
		p1.x = startPoint.x;
		p1.y = startPoint.y - divisions;

		var p2 = new Point();
		p2.x = p1.x;
		p2.y = p1.y - divisions;

		travelPath = new TravelPath();
		travelPath.P0 = startPoint;
		travelPath.P1 = p1;
		travelPath.P2 = p2;
		travelPath.P3 = endPoint;
	};

	this.kill = function() {
		this.active = false;
	}
};
