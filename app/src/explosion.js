	function Explosion() {
		this.t = 0;
		this.animation = spriteLibrary.getAnimation('explosion');
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
		var spriteFrame = spriteLibrary.getAnimationFrame(this.animation, this.t);

		if(spriteFrame) {
			context.save();
			context.translate(game.width/2, game.height/2);
			context.rotate(this.rotation);
			context.drawImage(this.animation.image, spriteFrame.x, spriteFrame.y, spriteFrame.width, spriteFrame.height, this.x, this.y, this.width, this.height);
			context.restore();
		}
	};

	Explosion.prototype.updateState = function(delta) {
		this.t += (delta / 10) * this.speed;
		if(this.t < .2 && this.playAudio) { this.playAudio = false; soundLibrary.playExplosion(); }
		if(this.t > 1.2) { this.kill(); }
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
