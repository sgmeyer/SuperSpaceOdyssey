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

		goodGuys = goodGuys.filter(function(goodGuy) { return goodGuy.active; });

		if(goodGuys.length > 0) { handleCollisions(); }
		if(goodGuys.length > 0) { goodGuys[0].updateState(); }


		badGuys = badGuys.filter(function(badGuy) { return badGuy.active; });
		badGuys.forEach(function (badGuy) { badGuy.updateState(delta); });
		
		bullets = bullets.filter(function(bullet) { return bullet.active; });
		bullets.forEach(function(bullet) { bullet.updateState(delta); });	

		lvl.updateLevel(delta, badGuys);


		
	},
	renderScene: function() { 
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		bullets.forEach(function(bullet) { bullet.draw(ctx); });
		if(goodGuys.length > 0) { goodGuys[0].draw(ctx); }
		badGuys.forEach(function (badGuy) { badGuy.draw(ctx); });

		if(goodGuys.length == 0) { 
			ctx.fillStyle = "#FF0000";
			ctx.font="20px Georgia";
			ctx.textAlign = "center";
			ctx.fillText("You Suck!", game.width/2, game.height/2); 
		}
	},
	loadSprite: function(name) {
	    var sprite = new Image();
	    sprite.src = name;
	    return sprite;
	}
}

function handleCollisions() {
	bullets.forEach(function(bullet) {
    	badGuys.forEach(function(badGuy) {
	      	if (collides(bullet, badGuy)) {
	    		badGuy.kill();
	        	bullet.kill();
	      	}
	    });
	});

	badGuys.forEach(function(badGuy) {
		if (collides(goodGuys[0], badGuy)) {
			badGuy.kill();
			goodGuys[0].kill();
		}
	});
}