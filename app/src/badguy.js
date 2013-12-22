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
		this.explosion = null;
		this.t = 0;
		this.sx = 131;
		this.sy = 128;
		this.swidth = 54; 
		this.sheight = 56;
		this.travelPath = null;

		this.x = -game.width;
		this.y = game.height; 
		this.width = 50;
		this.height = 50;
		this.active = true;
		this.speed = 3;
		this.rotation = 0;
		this.shotBullets = [];
		this.exploding = false;
	};

	BadGuy.prototype.updateState = function (delta) {
		if(!this.exploding) {
			this.t += (delta / 10) * this.speed;		
			if(this.t > 1) { this.kill(); }
			var point = Math.bezier(this.travelPath.P0, this.travelPath.P1, this.travelPath.P2, this.travelPath.P3, this.t);
			this.x = point.x;
			this.y = point.y;
		} else {
			if(this.explosion.active) { this.explosion.updateState(delta); }
		}

		if(this.exploding && this.explosion.active == false && this.shotBullets.length <= 0) this.kill();

		this.shotBullets = this.shotBullets.filter(function(bullet) { return bullet.active; });
		this.shotBullets.forEach(function(bullet) { bullet.updateState(delta); });
	};

	BadGuy.prototype.draw = function (context) {
		if(!this.exploding) {
			this.rotation = (Math.PI / 180) * 270;

			context.save();
			context.translate(game.width/2, game.height/2);
			context.rotate(this.rotation);
			context.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
			context.restore();
		} else {
			if(this.explosion.active) { this.explosion.draw(ctx); }
		}

		this.shotBullets.forEach(function(bullet) { bullet.draw(context); });
	};

	BadGuy.prototype.generateTravelPath = function () {
		this.travelPath = new TravelPath();
		this.travelPath.generateRandom();
	};

	BadGuy.prototype.kill = function() {
		this.active = false;
		this.ShotBullets = [];
	}

	BadGuy.prototype.explode = function() {
		if(!this.exploding) {
			this.exploding = true;
			this.explosion = new Explosion();
			this.explosion.explode(this);
		}
	}

	BadGuy.prototype.shoot = function() {
		if(!this.exploding) { 
			var bullet = new Bullet();
			bullet.rotation = 270;
			bullet.generateTravelPath(this.x + (this.width/2), this.y);
			this.shotBullets.push(bullet);
		}
	};
