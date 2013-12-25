function GoodGuy() {
		this.shotInterval = 1000;
		this.explosion = new Explosion();
		this.sprite = spriteLibrary.getSprite('goodGuyShip');

		this.active = true;
		this.width = 50 * game.scale;
		this.height = 50 * game.scale;
		this.x = (this.height/2*-1);
		this.y = ((game.width/2)-this.width); 
		this.speed = 4;
		this.rotation = 0;
		this.shotBullets = [];
		this.exploding = false;
	}; 

	GoodGuy.prototype.updateState = function(delta) {
		this.shotInterval += (delta / 10) * this.speed;		
		var distance = delta * 50 * this.speed;	

		if(!this.exploding) {
			if (keydown.up) {    
				this.x -= distance;    
	      if (this.x < (game.height/2) * -1) {
					this.x = game.height/2 * -1;
				}
	    }
	        
	    if (keydown.down) {
	    	this.x += distance;
      	if (this.x > (game.height/2)-this.width) {
    			this.x = (game.height/2)-this.width;
    		}
	    }

	    if (keydown.right) {
	    	this.y -= distance;
	    	if (this.y < (game.width/2) * -1) {
    			this.y = (game.width/2) * -1;
	    	}
	    }

	    if (keydown.left) {
	    	this.y += distance;
	    	if (this.y > (game.width/2) - this.height)  {
					this.y = (game.width/2) - this.height;
	    	}
	    }

	    if(keydown.space) {
	    	this.shoot();
	    } else {
	    	this.shotInterval = 1000;
	    }
		} else {
			if(this.explosion.active) { this.explosion.updateState(delta); }
		}

		if(this.exploding && !this.explosion.active && this.shotBullets.length <= 0) { this.kill() };
		this.shotBullets = this.shotBullets.filter(function(bullet) { return bullet.active; });
		this.shotBullets.forEach(function(bullet) { bullet.updateState(delta); });
	};

	GoodGuy.prototype.draw = function(context) {
		if(!this.exploding) {
			this.rotation = (Math.PI / 180.0) * 90;

			context.save();
			context.translate(game.width/2, game.height/2);
			context.rotate(this.rotation);
			context.drawImage(this.sprite.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height);
			context.restore();
		} else {
			if(this.explosion.active) { this.explosion.draw(ctx); }
		}

		game.goodGuys[0].shotBullets.forEach(function(bullet) { bullet.draw(context); });
	};

	GoodGuy.prototype.shoot = function() {
		if(this.shotInterval >= .2) {
			var bullet = new Bullet(8);
			bullet.rotation = 90;;
			bullet.shoot(this.x+(this.width/2), this.y);
			this.shotBullets.push(bullet);
			this.shotInterval = 0;
			soundLibrary.playLaser();
		}
	};

	GoodGuy.prototype.kill = function() {
		this.active = false;
		this.shotBullets = [];
	};

	GoodGuy.prototype.explode = function() {
		if(!this.exploding) {
			this.exploding = true;
			this.explosion = new Explosion();
			this.explosion.explode(this);
		}
	};
