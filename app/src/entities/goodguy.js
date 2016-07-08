function GoodGuy() {
		this.shotInterval = 1000;
		this.explosion = new Explosion();
		this.sprite = spriteLibrary.getSprite('goodGuyShip');
		this.active = true;
		this.width = 50 * game.scale;
		this.height = 50 * game.scale;
		this.x = 0;
		this.y = game.height / 2 - this.height / 2; 
		this.speed = 8;
		this.shotBullets = [];
		this.exploding = false;
		this.invincibilityTimeRemaining = 3;
	}; 

	GoodGuy.prototype.updateState = function(delta) {
		this.invincibilityTimeRemaining -= delta;

		var spriteId = this.invincibilityTimeRemaining > 0 ? 'goodGuyShipInvincible' : 'goodGuyShip';
		this.sprite = spriteLibrary.getSprite(spriteId);

		this.shotInterval += (delta / 10) * this.speed;		
		var distance = delta * (50 * game.scale ) * this.speed;	

		if (!this.exploding) { if (keydown.left) { this.x = Math.max(this.x - distance, 0); }
	    if (keydown.right) { this.x = Math.min(this.x + distance, game.width - this.width); }
	    if (keydown.up) { this.y = Math.max(this.y - distance, 0); }
	    if (keydown.down) { this.y = Math.min(this.y + distance, game.height - this.height); }

	    if(keydown.space) { this.shoot(); }
	    else { this.shotInterval = 1000; }
		} else {
			if(this.explosion.active) { this.explosion.updateState(delta); }
		}

		if(this.exploding && !this.explosion.active && this.shotBullets.length <= 0) { this.kill() };
		this.shotBullets = this.shotBullets.filter(function(bullet) { return bullet.active; });
		this.shotBullets.forEach(function(bullet) { bullet.updateState(delta); });
	};

	GoodGuy.prototype.draw = function(context) {
		if(!this.exploding) {
			context.drawImage(this.sprite.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height);
		} else {
			if(this.explosion.active) { this.explosion.draw(ctx); }
		}

		this.shotBullets.forEach(function(bullet) { bullet.draw(context); });
	};

	GoodGuy.prototype.shoot = function() {
		if(this.shotInterval >= .2) {
			var bullet = new Bullet(8, 'lazerBlue');
			bullet.shoot(this.x + this.width, this.y + this.height / 2, true);
			this.shotBullets.push(bullet);
			this.shotInterval = 0;
			soundLibrary.playLaser();
		}
	};

	GoodGuy.prototype.kill = function() {
		this.active = false;
		this.shotBullets = [];
		player.kill();
	};

	GoodGuy.prototype.explode = function() {
		if(!this.exploding) {
			this.exploding = true;
			this.explosion = new Explosion();
			this.explosion.explode(this);
		}
	};

	GoodGuy.prototype.setInvincability = function(time) {
		this.invincibilityTimeRemaining = time || 0;
	}
