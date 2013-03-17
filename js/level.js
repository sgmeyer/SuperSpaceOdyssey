var lvl = new Level();

function Level() {
	
	this.enemiesOnScreen = 6;
	this.length = 60000;
	this.enemiesStager = 1000;
	this.timing = this.enemiesStager;

	this.updateLevel = function (delta, badGuys) {
		this.timing -= delta * 1000;

		if(this.timing <= 0) {
			if(badGuys.length < this.enemiesOnScreen) {
				badGuys.push(generateBadGuy());
			}
			this.timing = this.enemiesStager;
		}

		badGuys.forEach(function(badGuy) {
			var num = Math.random() * 70;
			if(num <= 1) { badGuy.shoot(); }
		});
	};
}