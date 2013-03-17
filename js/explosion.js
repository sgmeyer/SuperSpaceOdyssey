var explosions = [];
explosions.push(new Explosion());

function Explosion() {
	
	var sx = 15;
	var sy = 15;
	var swidth = 55;
	var sheight = 55;
	this.active = true;
	this.x = 0;
	this.y = 0; 
	this.width = 55;
	this.height = 55;
	this.active = true;
	this.speed = 25;

	var t = 0;
	var rotation = 0;

	this.draw = function(context) {

		context.save();
		context.translate(game.width/2, game.height/2);
		context.rotate(rotation);
		context.drawImage(spriteExplosion, sx, sy, swidth, sheight, this.x, this.y, this.width, this.height);
		context.restore();
	};

	this.updateState = function(delta) {
		t += (delta / 10) * this.speed;		
		
		if(t > 1.6) { this.kill(); }

		if(t < .1) {
			sx = 0;
			sy = 0;
		} else if(t < .2) {
			sx = 65;
		} else if(t < .3) {
			sx = 130;
		} else if(t < .4) {
			sx = 195;
		} 

		else if(t < .5) {
			sx = 0;
			sy = 65;
		} else if(t < .6) {
			sx = 65;
			sy = 65;
		} else if(t < .7) {
			sx = 130;
			sy = 65;
		} else if(t < .8) {
			sx = 195;
			sy = 65;
		} 

		else if(t < .9) {
			sx = 0;
			sy = 130;
		} else if(t < 1.0) {
			sx = 65;
			sy = 130;
		} else if(t < 1.1) {
			sx = 130;
			sy = 130;
		} else if(t < 1.2) {
			sx = 195;
			sy = 130;
		} 

		else if(t < 1.3) {
			sx = 0;
			sy = 195;
		} else if(t < 1.4) {
			sx = 65;
			sy = 195;
		} else if(t < 1.5) {
			sx = 130;
			sy = 195;
		} else if(t < 1.6) {
			sx = 195;
			sy = 195;
		}
	}

	this.explode = function(spaceCraft) {
		this.x = spaceCraft.x;
		this.y = spaceCraft.y;
		rotation = spaceCraft.rotation;
	};

	this.kill = function() {
		this.active = false;
	}
}