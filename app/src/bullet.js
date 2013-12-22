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

	function Bullet() {
		
		this.t = 0;
		this.sx = 131;
		this.sy = 70;
		this.swidth = 20; 
		this.sheight = 45;
		this.travelPath = null;

		this.x = 0;
		this.y = 0; 
		this.width = 8;
		this.height = 20;
		this.rotation = 90;
		this.active = true;
		this.speed = 8;
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
		
		this.t += (delta / 10) * this.speed;
		if(this.t > 1) { this.kill(); }
		var point = Math.bezier(this.travelPath.P0, this.travelPath.P1, this.travelPath.P2, this.travelPath.P3, this.t);
		this.x = point.x;
		this.y = point.y;	
	};

	Bullet.prototype.generateTravelPath = function (startX, startY) {		

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

		this.travelPath = new TravelPath();
		this.travelPath.P0 = startPoint;
		this.travelPath.P1 = p1;
		this.travelPath.P2 = p2;
		this.travelPath.P3 = endPoint;
	};

	Bullet.prototype.kill = function() {
		this.active = false;
	}