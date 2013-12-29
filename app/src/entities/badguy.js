function BadGuy(shipId, width, height, hitpoints, endLevelOnKill) {
		this.explosion = null;
		this.t = 0;
		this.sprite = spriteLibrary.getSprite(shipId || 'badGuyShip');
		this.x = -game.width;
		this.y = game.height; 
		this.width = (width || 50) * game.scale;
		this.height = (height || 50) * game.scale;
		this.active = true;
		this.speed = 2;
		this.rotation = 0;
		this.shotBullets = [];
		this.exploding = false;

		this.hitpoints = hitpoints || 1;
		this.endLevelOnKill = endLevelOnKill || false;
		if(this.endLevelOnKill) {
			this.travelPath = TravelPath.generateStraightPath(((game.height)/2)-(this.height) -30, game.width * .75, game.width/4, this.width);
		} else {
			this.travelPath = TravelPath.generateRandomPath(game.height);
		}
	};

	BadGuy.prototype.updateState = function (delta) {
		if(!this.exploding) {
			this.t += (delta / 10) * this.speed;

			if(this.t <= 1) {
				var point = Math.bezier(this.travelPath.P0, this.travelPath.P1, this.travelPath.P2, this.travelPath.P3, this.t);
				this.x = point.x;
				this.y = point.y;
			} else if(!this.endLevelOnKill) {
				this.kill();
			}
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
			context.drawImage(this.sprite.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height);
			context.restore();
		} else {
			if(this.explosion.active) { this.explosion.draw(ctx); }
		}

		this.shotBullets.forEach(function(bullet) { bullet.draw(context); });
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
		if(!this.exploding && !(this.endLevelOnKill && this.t < 1)) { 
			var bullet = new Bullet(8, 'lazerRed');
			bullet.rotation = 270;
			bullet.shoot(this.x + (this.width/2), this.y);
			this.shotBullets.push(bullet);
		}
	};
