	function Explosion() {
		this.sx = 15;
		this.sy = 15;
		this.swidth = 55;
		this.sheight = 55;
		this.t = 0;
		this.rotation = 0;
		this.playAudio = false;

		this.active = true;
		this.x = 0;
		this.y = 0; 
		this.width = 55 * game.scale;
		this.height = 55 * game.scale;
		this.active = true * game.scale;
		this.speed = 25;
	};

	Explosion.prototype.draw = function(context) {
		context.save();
		context.translate(game.width/2, game.height/2);
		context.rotate(this.rotation);
		context.drawImage(spriteExplosion, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
		context.restore();
	};

	Explosion.prototype.updateState = function(delta) {
		this.t += (delta / 10) * this.speed;		
		if(this.t < .1) {
			this.sx = 0;
			this.sy = 0;
		} else if(this.t < .2) {
			if(this.playAudio) { 
				this.playAudio = false;
				audio.playExplosion();
			}
			this.sx = 65;
		} else if(this.t < .3) {
			this.sx = 130;
		} else if(this.t < .4) {
			this.sx = 195;
		} 

		else if(this.t < .5) {
			this.sx = 0;
			this.sy = 65;
		} else if(this.t < .6) {
			this.sx = 65;
			this.sy = 65;
		} else if(this.t < .7) {
			this.sx = 130;
			this.sy = 65;
		} else if(this.t < .8) {
			this.sx = 195;
			this.sy = 65;
		} 

		else if(this.t < .9) {
			this.sx = 0;
			this.sy = 130;
		} else if(this.t < 1.0) {
			this.sx = 65;
			this.sy = 130;
		} else if(this.t < 1.1) {
			this.sx = 130;
			this.sy = 130;
		} else if(this.t < 1.2) {
			this.sx = 195;
			this.sy = 130;
		} 

		else if(this.t < 1.3) {
			this.sx = 0;
			this.sy = 195;
		} else if(this.t < 1.4) {
			this.sx = 65;
			this.sy = 195;
		} else if(this.t < 1.5) {
			this.sx = 130;
			this.sy = 195;
		} else if(this.t < 1.6) {
			this.sx = 195;
			this.sy = 195;
		} else {
			this.kill();
		}
	};

	Explosion.prototype.explode = function(spaceCraft) {
		this.x = spaceCraft.x;
		this.y = spaceCraft.y;
		this.rotation = spaceCraft.rotation;
		this.playAudio = true;
	};

	Explosion.prototype.kill = function() {
		this.active = false;
		this.x = null;
		this.y = null;
		this.playAudio = false;
	};
