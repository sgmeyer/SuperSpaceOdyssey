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

function BadGuy() {
	var explosion = null;
	var t = 0;
	var sx = 131;
	var sy = 128;
	var swidth = 54; 
	var sheight = 56;
	var travelPath = null;
	this.x = -game.width;
	this.y = game.height; 
	this.width = 50;
	this.height = 50;
	this.active = true;
	this.speed = 3;
	this.rotation = 0;
	this.shotBullets = [];
	this.exploding = false;

	this.updateState = function (delta) {
		if(!this.exploding) {
			t += (delta / 10) * this.speed;		
			if(t > 1) { this.kill(); }
			var point = bezier(travelPath.P0, travelPath.P1, travelPath.P2, travelPath.P3, t);
			this.x = point.x;
			this.y = point.y;
		} else {
			if(explosion.active) { explosion.updateState(delta); }
		}

		if(this.exploding && explosion.active == false && this.shotBullets.length <= 0) this.kill();

		this.shotBullets = this.shotBullets.filter(function(bullet) { return bullet.active; });
		this.shotBullets.forEach(function(bullet) { bullet.updateState(delta); });
	};

	this.draw = function (context) {
		if(!this.exploding) {
			this.rotation = (Math.PI / 180) * 270;

			context.save();
			context.translate(game.width/2, game.height/2);
			context.rotate(this.rotation);
			context.drawImage(sprite, sx, sy, swidth, sheight, this.x, this.y, this.width, this.height);
			context.restore();
		} else {
			if(explosion.active) { explosion.draw(ctx); }
		}

		this.shotBullets.forEach(function(bullet) { bullet.draw(context); });
	};

	this.generateTravelPath = function () {
		travelPath = new TravelPath();
		travelPath.generateRandom();
	};

	this.kill = function() {
		this.active = false;
		this.ShotBullets = [];
	}

	this.explode = function() {
		if(!this.exploding) {
			this.exploding = true;
			explosion = new Explosion();
			explosion.explode(this);
		}
	}

	this.shoot = function() {
		if(!this.exploding) { 
			var bullet = new Bullet();
			bullet.rotation = 270;
			bullet.generateTravelPath(this.x + (this.width/2), this.y);
			this.shotBullets.push(bullet);
		}
	};
};