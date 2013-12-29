	function Background() {
		this.stars = [];
	};

	Background.prototype.initialize = function() {
		for(var x = 0; x < 200; x++) {
			var star = { location: new Point(), speed: 5 * Math.random() };
			star.location.x = Math.random() * game.width;
			star.location.y = Math.random() * game.height;
			this.stars.push(star);
		}
	};

	Background.prototype.updateState = function(delta) {
		this.stars.forEach(function(star) {
			var distance = (delta*10) * star.speed;
			star.location.x -= distance;
		});

		if(this.stars.length < 500 && Math.random() * 5 < 1) {
			var star = { location: new Point(), speed: 5 * Math.random() };
			star.location.x = game.width;
			star.location.y = Math.random() * game.height;
			this.stars.push(star);
		}

		this.stars = this.stars.filter(function(star) { return star.location.x > 0; });
	};

	Background.prototype.draw = function(context) {
		context.fillStyle = "#FFFFFF";
		this.stars.forEach(function(star) {
			context.fillRect(star.location.x, star.location.y, 1, 1);
		});
	};