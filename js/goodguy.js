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

function GoodGuy() {

	var sx = 67;
	var sy = 123;
	var swidth = 60;
	var sheight = 65;
	var x = -25;
	var y = 250; 
	var width = 50;
	var height = 50;

	this.speed = 5;
	
	this.draw = function(context) {
		
		var rotation = (Math.PI / 180.0) * 90;

		context.save();
		ctx.translate(game.width/2, game.height/2);
		context.rotate(rotation);
		context.drawImage(sprite, sx, sy, swidth, sheight, x, y, width, height);
		context.restore();
	};

	this.updateState = function() {

		if (keydown.up) {    
			x -= this.speed;        
            if (x < (game.height/2) * -1) {
				x = game.height/2 * -1;
			}
        }
        
	    if (keydown.down) {
	    	x += this.speed;
	      	if (x > (game.height/2)-width) {
	    		x = (game.height/2)-width;
	    	}
	    }

	    if (keydown.right) {
	    	y -= this.speed;
	    	if (y < (game.width/2) * -1) {
    			y = (game.width/2) * -1;
	    	}
	    }

	    if (keydown.left) {
	    	y += this.speed;
	    	if (y > (game.width/2) - height)  {
    			y = (game.width/2) - height;
	    	}
	    }
	};
}; 