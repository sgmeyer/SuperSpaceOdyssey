	function Level() {
		this.game = null;
		this.active = true;
		this.enemiesOnScreen = 6;
		this.length = 60000;
		this.enemiesStager = 1000;
		this.timing = this.enemiesStager;
		this.badGuys = [];
		this.background = new Background();
	};

	Level.prototype.initialize = function() {
		this.background = new Background();
		this.background.initialize();
	}

	Level.prototype.updateLevel = function (delta) {
		this.timing -= delta * 1000;

		if(this.timing <= 0) {
			this.badGuys.push(this.tryToGenerateBadGuy());
		}

		this.badGuys.forEach(function(badGuy) {
			var num = Math.random() * 70;
			if(num <= 1) { badGuy.shoot(); }
		});
	};

	Level.prototype.updateState = function(delta) {
		this.background.updateState(delta);
		game.goodGuys = game.goodGuys.filter(function(goodGuy) { return goodGuy.active; });
		this.badGuys = this.badGuys.filter(function(badGuy) { return badGuy.active; });

		if(game.goodGuys.length > 0) { CollisionEngine.handleCollisions(this.badGuys, game.goodGuys[0]); }
		if(game.goodGuys.length > 0) { game.goodGuys[0].updateState(delta); }
		this.badGuys.forEach(function (badGuy) { badGuy.updateState(delta); });

		this.updateLevel(delta);
	}

	Level.prototype.draw = function(context) {
		this.background.draw(context);

		if(game.goodGuys.length <= 0) { 
			game.scenes[0].active = false;
			game.initializeGameOver();
		} else {
			game.goodGuys[0].draw(context);
			this.badGuys.forEach(function (badGuy) { badGuy.draw(context); });
		}

		context.fillStyle = "orange";
        context.font = "20px Georgia";
        context.textAlign = "right";
        context.fillText("Score: " + game.score.toString(), game.width- 50, 20);
	}

	Level.prototype.tryToGenerateBadGuy = function() {
		if(this.badGuys.length < this.enemiesOnScreen) {
			var badGuy = new BadGuy();
			this.timing = this.enemiesStager;
			return badGuy;
		}
	}
