	function Bullet(speed, spriteId) {
		this.t = 0;
		this.sprite = spriteLibrary.getSprite(spriteId || 'lazerBlue');
		this.travelPath = null;

		this.x = 0;
		this.y = 0; 
		this.height = 5 * game.scale;
		this.width = 20 * game.scale;
		this.active = true;
		this.speed = speed || 8;
	};

	Bullet.prototype.draw = function (context) {
		context.drawImage(this.sprite.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height);
	};

	Bullet.prototype.updateState = function (delta) {
		this.t += (delta / 10) * this.speed;
		if(this.t > 1) { this.kill(); }
		var point = Math.bezier(this.travelPath.P0, this.travelPath.P1, this.travelPath.P2, this.travelPath.P3, this.t);
		this.x = point.x;
		this.y = point.y;	
	};

	Bullet.prototype.shoot = function(startX, startY, leftToRight) {
		this.x = startX;
		this.y = startY;
		if(leftToRight) {
			this.travelPath = TravelPath.generateStraightPathToRight(new Point(this.x, this.y), this.width);
		} else {
			this.travelPath = TravelPath.generateStraightPathToLeft(new Point(this.x, this.y), this.width);
		}
	};

	Bullet.prototype.kill = function() {
		this.active = false;
	}
	