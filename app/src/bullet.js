	function Bullet(speed) {
		this.t = 0;
		this.sprite = spriteLibrary.getSprite('bullet');
		this.travelPath = null;

		this.x = 0;
		this.y = 0; 
		this.width = 8 * game.scale;
		this.height = 20 * game.scale;
		this.rotation = 90;
		this.active = true;
		this.speed = speed || 8;
	};

	Bullet.prototype.draw = function (context) {
		var rotation = (Math.PI / 180) * this.rotation;

		context.save();
		context.translate(game.width/2, game.height/2);
		context.rotate(rotation);
		context.drawImage(this.sprite.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height);
		context.restore();
	};

	Bullet.prototype.updateState = function (delta) {
		
		this.t += (delta / 10) * this.speed * game.scale;
		if(this.t > 1) { this.kill(); }
		var point = Math.bezier(this.travelPath.P0, this.travelPath.P1, this.travelPath.P2, this.travelPath.P3, this.t);
		this.x = point.x;
		this.y = point.y;	
	};

	Bullet.prototype.shoot = function(startX, startY) {
		this.x = startX;
		this.y = startY;
		this.travelPath = TravelPath.generateStraightPath(this.x, this.y, game.width, this.width);
	};

	Bullet.prototype.kill = function() {
		this.active = false;
	}
	