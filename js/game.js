var game = {
	frameRate: 60,
	height: 400,
	width: 600,
	lastTime:0,
	initGame: function () {
		controls.wireUp();
		sprite = this.loadSprite("./images/shipsall_4.gif");
		spriteExplosion = this.loadSprite("./images/exp2_0.png");

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


		badGuyBullets = badGuyBullets.filter(function(bullet) { return bullet.active; });
		badGuyBullets.forEach(function(bullet) { bullet.updateState(delta); });

		explosions.filter(function(explosion) { return explosion.active; });
		explosions.forEach(function(explosion) { explosion.updateState(delta); });

		lvl.updateLevel(delta, badGuys);	

		explosions[0].updateState(delta);	
	},
	renderScene: function() { 
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		bullets.forEach(function(bullet) { bullet.draw(ctx); });
		badGuyBullets.forEach(function(bullet) { bullet.draw(ctx); });

		if(goodGuys.length > 0) { goodGuys[0].draw(ctx); }
		badGuys.forEach(function (badGuy) { badGuy.draw(ctx); });

		if(goodGuys.length == 0) { 
			ctx.fillStyle = "#FF0000";
			ctx.font="20px Georgia";
			ctx.textAlign = "center";
			ctx.fillText("You Suck!", game.width/2, game.height/2); 
		}
		
		explosions.forEach(function(explosion) { explosion.draw(ctx); });
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

	badGuyBullets.forEach(function(bullet) {
    	goodGuys.forEach(function(goodGuy) {
	      	if (collides(bullet, goodGuy)) {
	    		bullet.kill();
	    		goodGuy.kill();
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