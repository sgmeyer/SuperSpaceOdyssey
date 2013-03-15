var game = {
	frameRate: 60,
	height: 400,
	width: 600,
	lastTime:0,
	initGame: function () {
		controls.wireUp();
		sprite = this.loadSprite("./images/shipsall_4.gif");

		canvas = $("#space-odyssey-game")[0];
		ctx = canvas.getContext("2d");

		this.lastTime = new Date().getTime();
	},
	updateScene: function (delta) {
		goodGuys[0].updateState();
		badGuys = badGuys.filter(function(badGuy) { return badGuy.active; });
		badGuys.forEach(function (badGuy) { badGuy.updateState(delta); });
		lvl.updateLevel(delta, badGuys);
	},
	renderScene: function() { 
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		goodGuys[0].draw(ctx);		
		badGuys.forEach(function (badGuy) { badGuy.draw(ctx); });
	},
	loadSprite: function(name) {
	    var sprite = new Image();
	    sprite.src = name;
	    return sprite;
	}
}