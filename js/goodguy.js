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

var goodGuys = [];
goodGuys.push(new GoodGuy());
goodGuys.push(new GoodGuy());
goodGuys.push(new GoodGuy());

function GoodGuy() {


	var sx = 67;
	var sy = 123;
	var swidth = 60;
	var sheight = 65;
	this.active = true;
	this.x = -25;
	this.y = 250; 
	this.width = 50;
	this.height = 50;
	this.speed = 5;
	this.rotation = 0;	
	this.draw = function(context) {
		
		this.rotation = (Math.PI / 180.0) * 90;

		context.save();
		context.translate(game.width/2, game.height/2);
		context.rotate(this.rotation);
		context.drawImage(sprite, sx, sy, swidth, sheight, this.x, this.y, this.width, this.height);
		context.restore();
	};

	this.updateState = function() {

		if (keydown.up) {    
			this.x -= this.speed;        
            if (this.x < (game.height/2) * -1) {
				this.x = game.height/2 * -1;
			}
        }
        
	    if (keydown.down) {
	    	this.x += this.speed;
	      	if (this.x > (game.height/2)-this.width) {
	    		this.x = (game.height/2)-this.width;
	    	}
	    }

	    if (keydown.right) {
	    	this.y -= this.speed;
	    	if (this.y < (game.width/2) * -1) {
    			this.y = (game.width/2) * -1;
	    	}
	    }

	    if (keydown.left) {
	    	this.y += this.speed;
	    	if (this.y > (game.width/2) - this.height)  {
    			this.y = (game.width/2) - this.height;
	    	}
	    }

	    if(keydown.space) {

	    	this.shoot();
	    	// Prevents holding down the key to shoot frequently.
	    	keydown.space = false;
	    }

	};

	this.shoot = function() {

		var bullet = new Bullet();
		bullet.rotation = 90;;
		bullet.generateTravelPath(this.x+(this.width/2), this.y);
		bullets.push(bullet);
	};

	this.kill = function() {
		this.active = false;

		var explosion = new Explosion();
		explosion.explode(this);
		explosions.push(explosion);
	}
}; 