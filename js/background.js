function Background() {

	this.stars = [];
	
	this.initialize = function() {
		for(var x = 0; x < 200; x++) {
			var star = { location: new Point(), speed: 5 };
			star.location.x = Math.random() * game.width;
			star.location.y = Math.random() * game.height;
			this.stars.push(star);
		}
	}

	this.updateState = function(delta) {
		this.stars.forEach(function(star, delta) {
			var distance = (delta/1000) * star.speed;
			star.location.x -= distance;
		});

		if(Math.random() * 5 < 1) {
			var star = { location: new Point(), speed: 5 };
			star.location.x = game.width;
			star.location.y = Math.random() * game.height;
			this.stars.push(star);
		}

		this.stars.filter(function() { return location.x < 0; });
	};

	this.draw = function(context) {
		context.fillStyle = "#FFFFFF";
		this.stars.forEach(function(star) {
			context.fillRect(star.location.x, star.location.y, 1, 1);
		});
	}
}