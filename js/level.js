function Level() {
	this.game = null;
	this.active = true;
	this.enemiesOnScreen = 6;
	this.length = 60000;
	this.enemiesStager = 1000;
	this.timing = this.enemiesStager;
	this.badGuys = [];
	this.explosions = [];

	this.updateLevel = function (delta) {
		this.timing -= delta * 1000;

		if(this.timing <= 0) {
			if(this.badGuys.length < this.enemiesOnScreen) {
				this.badGuys.push(this.generateBadGuy());
			}
			this.timing = this.enemiesStager;
		}

		this.badGuys.forEach(function(badGuy) {
			var num = Math.random() * 70;
			if(num <= 1) { badGuy.shoot(); }
		});
	};

	this.updateState = function(delta) {
		game.goodGuys = game.goodGuys.filter(function(goodGuy) { return goodGuy.active; });
		this.badGuys = this.badGuys.filter(function(badGuy) { return badGuy.active; });

		if(game.goodGuys.length > 0) { handleCollisions(this.badGuys, this.explosions, game.goodGuys[0]); }
		if(game.goodGuys.length > 0) { game.goodGuys[0].updateState(delta); }
		this.badGuys.forEach(function (badGuy) { badGuy.updateState(delta); });
		
		this.explosions = this.explosions.filter(function(explosion) { return explosion.active; });
		this.explosions.forEach(function(explosion) { explosion.updateState(delta); });

		this.updateLevel(delta);
	}

	this.draw = function(ctx) {
		if(game.goodGuys.length <= 0) { 
			game.scenes[0].active = false;
			game.initializeGameOver();
		}

		game.goodGuys[0].draw(ctx);
		this.badGuys.forEach(function (badGuy) { badGuy.draw(ctx); });
		this.explosions.forEach(function(explosion) { explosion.draw(ctx); });		
	}

	this.generateBadGuy = function() {
		var badGuy = new BadGuy();
		badGuy.generateTravelPath();
		return badGuy;
	}
}