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

function GoodGuy() {
	var shotInterval = 1000;
	var explosion = null;
	var sx = 67;
	var sy = 123;
	var swidth = 60;
	var sheight = 65;
	this.active = true;
	this.width = 50;
	this.height = 50;
	this.x = this.height/2*-1;
	this.y = (game.width/2)-this.width; 
	this.speed = 6;
	this.rotation = 0;
	this.shotBullets = [];
	this.exploding = false;

	this.updateState = function(delta) {
		shotInterval += (delta / 10) * this.speed;		
		var distance = (delta * 50) * this.speed;	

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
		    	shotInterval = 1000;
		    }

		    
		} else {
			if(explosion.active) { explosion.updateState(delta); }
		}


		if(this.exploding && !explosion.active && this.shotBullets.length <= 0) this.kill();
		this.shotBullets = this.shotBullets.filter(function(bullet) { return bullet.active; });
		this.shotBullets.forEach(function(bullet) { bullet.updateState(delta); });
	};

	this.draw = function(context) {
		if(!this.exploding) {
			this.rotation = (Math.PI / 180.0) * 90;

			context.save();
			context.translate(game.width/2, game.height/2);
			context.rotate(this.rotation);
			context.drawImage(sprite, sx, sy, swidth, sheight, this.x, this.y, this.width, this.height);
			context.restore();
			
		} else {
			if(explosion.active) { explosion.draw(ctx); }
		}

		game.goodGuys[0].shotBullets.forEach(function(bullet) { bullet.draw(context); });
	};

	this.shoot = function() {
		if(shotInterval >= .2) {
			var bullet = new Bullet();
			bullet.rotation = 90;;
			bullet.generateTravelPath(this.x+(this.width/2), this.y);
			this.shotBullets.push(bullet);
			shotInterval = 0;
			audio.playLaser();
		}
	};

	this.kill = function() {
		this.active = false;
		this.shotBullets = [];
	}

	this.explode = function() {
		if(!this.exploding) {
			this.exploding = true;
			explosion = new Explosion();
			explosion.explode(this);
		}
	}
}; 