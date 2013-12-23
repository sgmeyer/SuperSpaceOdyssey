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

	function Bullet(speed) {
		
		this.t = 0;
		this.sx = 131;
		this.sy = 70;
		this.swidth = 20; 
		this.sheight = 45;
		this.travelPath = null;

		this.x = 0;
		this.y = 0; 
		this.width = 8 * game.scale;
		this.height = 20 * game.scale;
		this.rotation = 90;
		this.active = true;
		this.speed = speed || 8;
	};

	Bullet.prototype.draw = function (context) {
		var rotation = (Math.PI / 180) * this.rotation;

		context.save();
		context.translate(game.width/2, game.height/2);
		context.rotate(rotation);
		context.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
		context.restore();
	};

	Bullet.prototype.updateState = function (delta) {
		
		this.t += (delta / 10) * this.speed * game.scale;
		if(this.t > 1) { this.kill(); }
		var point = Math.bezier(this.travelPath.P0, this.travelPath.P1, this.travelPath.P2, this.travelPath.P3, this.t);
		this.x = point.x;
		this.y = point.y;	
	};

	Bullet.prototype.shoot = function(startX, startY) {
		this.x = startX;
		this.y = startY;
		this.travelPath = TravelPath.generateStraightPath(this.x, this.y, game.width, this.width);
	};

	Bullet.prototype.kill = function() {
		this.active = false;
	}