function BadGuy(shipId, width, height, hitpoints, endLevelOnKill) {
		this.explosion = null;
		this.t = 0;
		this.sprite = spriteLibrary.getSprite(shipId || 'badGuyShip');
		this.x = game.width;
		this.y = game.height;
		this.width = (width || 50) * game.scale;
		this.height = (height || 50) * game.scale;
		this.active = true;
		this.speed = 2;
		this.shotBullets = [];
		this.exploding = false;

		this.hitpoints = hitpoints || 1;
		this.endLevelOnKill = endLevelOnKill || false;
		if(this.endLevelOnKill) {
			var startX = game.width;
			var startY = (game.height / 2) - (this.height /2);
			this.travelPath = TravelPath.generateLinearPath(new Point(startX, startY), new Point(startX - this.width - (25 * game.scale), startY));
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
			context.drawImage(this.sprite.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height);
		} else {
			if(this.explosion.active) { this.explosion.draw(ctx); }
		}

		this.shotBullets.forEach(function(bullet) { bullet.draw(context); });
	};

	BadGuy.prototype.takeHit = function () {
		if (!this.exploding) {
			this.hitpoints--;
			if(this.hitpoints <= 0) {
				var event = new CustomEvent('bogiekilled', {detail: {x: this.x, y: this.y}});
				window.dispatchEvent(event);

				this.explode();
				if(this.endLevelOnKill) { game.scenes[0].end(); }
			}
			player.addPoints(10);
		}
	};

	BadGuy.prototype.kill = function() {
		this.active = false;
		this.ShotBullets = [];
	};

	BadGuy.prototype.explode = function() {
		if(!this.exploding) {
			this.exploding = true;
			this.explosion = new Explosion();
			this.explosion.explode(this);
		}
	};

	BadGuy.prototype.shoot = function() {
		if(!this.exploding && !(this.endLevelOnKill && this.t < 1)) {
			var bullet = new Bullet(4, 'lazerRed');
			bullet.shoot(this.x, this.y + (this.height/2));
			this.shotBullets.push(bullet);
		}
	};
