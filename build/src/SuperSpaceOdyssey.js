(function(window) { 'use strict';

var audio = {
	//explosion: null,
	//themeSong: null,
	initialize: function() {
        audio.themeSong = new Audio("./sound/Grey_Sector_v0_86_0.mp3");
        audio.themeSong.volume = 1;
        audio.themeSong.loop = true;
	},
	playExplosion: function() {
		//var xp = new Audio("./sound/8bit_bomb_explosion.wav");
		//xp.volume = 1;
    //xp.loop = false;
		//xp.play();
		//xp = undefined;
	},
	playThemeSong: function() {
		audio.themeSong.play();
	},
	playLaser: function() {
		//var lzr = new Audio("./sound/laser1.wav"); 
		//lzr.volume = .25;
		//lzr.loop = false;
		//lzr.play();
	}
};

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
	/*** 
	sx		Optional. The x coordinate where to start clipping
	sy		Optional. The y coordinate where to start clipping
	swidth	Optional. The width of the clipped image
	sheight	Optional. The height of the clipped image
	x		The x coordinate where to place the image on the canvas
	y		The y coordinate where to place the image on the canvas
	width	Optional. The width of the image to use (stretch or reduce the image)
	height	Optional. The height of the image to use (stretch or reduce the image)
	***/

	function BadGuy() {
		this.explosion = null;
		this.t = 0;
		this.sx = 131;
		this.sy = 128;
		this.swidth = 54; 
		this.sheight = 56;
		this.travelPath = null;

		this.x = -game.width;
		this.y = game.height; 
		this.width = 50;
		this.height = 50;
		this.active = true;
		this.speed = 3;
		this.rotation = 0;
		this.shotBullets = [];
		this.exploding = false;
	};

	BadGuy.prototype.updateState = function (delta) {
		if(!this.exploding) {
			this.t += (delta / 10) * this.speed;		
			if(this.t > 1) { this.kill(); }
			var point = bezier(this.travelPath.P0, this.travelPath.P1, this.travelPath.P2, this.travelPath.P3, this.t);
			this.x = point.x;
			this.y = point.y;
		} else {
			if(this.explosion.active) { this.explosion.updateState(delta); }
		}

		if(this.exploding && this.explosion.active == false && this.shotBullets.length <= 0) this.kill();

		this.shotBullets = this.shotBullets.filter(function(bullet) { return bullet.active; });
		this.shotBullets.forEach(function(bullet) { bullet.updateState(delta); });
	};

	BadGuy.prototype.draw = function (context) {
		if(!this.exploding) {
			this.rotation = (Math.PI / 180) * 270;

			context.save();
			context.translate(game.width/2, game.height/2);
			context.rotate(this.rotation);
			context.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
			context.restore();
		} else {
			if(this.explosion.active) { this.explosion.draw(ctx); }
		}

		this.shotBullets.forEach(function(bullet) { bullet.draw(context); });
	};

	BadGuy.prototype.generateTravelPath = function () {
		this.travelPath = new TravelPath();
		this.travelPath.generateRandom();
	};

	BadGuy.prototype.kill = function() {
		this.active = false;
		this.ShotBullets = [];
	}

	BadGuy.prototype.explode = function() {
		if(!this.exploding) {
			this.exploding = true;
			this.explosion = new Explosion();
			this.explosion.explode(this);
		}
	}

	BadGuy.prototype.shoot = function() {
		if(!this.exploding) { 
			var bullet = new Bullet();
			bullet.rotation = 270;
			bullet.generateTravelPath(this.x + (this.width/2), this.y);
			this.shotBullets.push(bullet);
		}
	};

	/*** 
	sx		Optional. The x coordinate where to start clipping
	sy		Optional. The y coordinate where to start clipping
	swidth	Optional. The width of the clipped image
	sheight	Optional. The height of the clipped image
	x		The x coordinate where to place the image on the canvas
	y		The y coordinate where to place the image on the canvas
	width	Optional. The width of the image to use (stretch or reduce the image)
	height	Optional. The height of the image to use (stretch or reduce the image)
	***/

	function Bullet() {
		
		this.t = 0;
		this.sx = 131;
		this.sy = 70;
		this.swidth = 20; 
		this.sheight = 45;
		this.travelPath = null;

		this.x = 0;
		this.y = 0; 
		this.width = 8;
		this.height = 20;
		this.rotation = 90;
		this.active = true;
		this.speed = 8;
	};

	Bullet.prototype.draw = function (context) {
		var rotation = (Math.PI / 180) * this.rotation;

		context.save();
		context.translate(game.width/2, game.height/2);
		context.rotate(rotation);
		context.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
		context.restore();
	};

	Bullet.prototype.updateState = function (delta) {
		
		this.t += (delta / 10) * this.speed;
		if(this.t > 1) { this.kill(); }
		var point = bezier(this.travelPath.P0, this.travelPath.P1, this.travelPath.P2, this.travelPath.P3, this.t);
		this.x = point.x;
		this.y = point.y;	
	};

	Bullet.prototype.generateTravelPath = function (startX, startY) {		

		this.x = startX;
		this.y = startY;
		var distance = game.width + this.width;
		var divisions = distance / 3;

		var startPoint = new Point();
		startPoint.x = startX - (this.width/2);
		startPoint.y = startY;

		var endPoint = new Point();
		endPoint.x = startPoint.x;
		endPoint.y =  startPoint.y - game.width - this.width;

		var p1 = new Point();
		p1.x = startPoint.x;
		p1.y = startPoint.y - divisions;

		var p2 = new Point();
		p2.x = p1.x;
		p2.y = p1.y - divisions;

		this.travelPath = new TravelPath();
		this.travelPath.P0 = startPoint;
		this.travelPath.P1 = p1;
		this.travelPath.P2 = p2;
		this.travelPath.P3 = endPoint;
	};

	Bullet.prototype.kill = function() {
		this.active = false;
	}
	function CollisionEngine() {

	}

	CollisionEngine.collides = function(a, b) {

		var a_x = (a.y * -1) + (game.width/2) - a.width;
		var a_y = a.x + (game.height/2);
		var a_width = a.height;
		var a_height = a.width;

		var b_x = b.y + (game.width/2);
		var b_y = (b.x * -1) + (game.height/2) - b.height;	

		return a_x < b_x + b.width &&
				   a_x + a.width > b_x &&
				   a_y < b_y + b.height &&
				   a_y + a.height > b_y;
	};

	CollisionEngine.handleCollisions = function (badGuys, goodGuy) {
		goodGuy.shotBullets.forEach(function(bullet) {
	    	badGuys.forEach(function(badGuy) {
		      	if (!badGuy.exploding && CollisionEngine.collides(bullet, badGuy)) {
		    			badGuy.explode();
		        	bullet.kill();
		        	game.score += 10;
		      	}
		    });
		});

		badGuys.forEach(function(badGuy) {
			badGuy.shotBullets.forEach(function(bullet){
		      if (CollisionEngine.collides(bullet, game.goodGuys[0])) {
		    		bullet.kill();
		    		goodGuy.explode();
		      }
		    });
		});

		badGuys.forEach(function(badGuy) {
			if (!game.goodGuys[0].exploding && !badGuy.exploding && CollisionEngine.collides(game.goodGuys[0], badGuy)) {
				badGuy.explode();
				goodGuy.explode();
			}
		});
	};

var controls = {
	keycode: {
		space: 32,
		left: 37,
		up: 38,
		right: 39,
		down: 40
	},
	wireUp: function() {
		window.keydown = {};

		function keyName(event) {
			if(controls.keycode.left == event.which) return "left";
			if(controls.keycode.up == event.which) return "up";
			if(controls.keycode.right == event.which) return "right";
			if(controls.keycode.down == event.which) return "down";
			if(controls.keycode.space == event.which) return "space";
			return event.which;
		}

		document.onkeydown = function(event) {
			keydown[keyName(event)] = true;
			event.preventDefault();
		};

		document.onkeyup = function(event) {
			keydown[keyName(event)] = false;
			event.preventDefault();
		};
	}
};

function Explosion() {
	
	var sx = 15;
	var sy = 15;
	var swidth = 55;
	var sheight = 55;
	this.active = true;
	this.x = 0;
	this.y = 0; 
	this.width = 55;
	this.height = 55;
	this.active = true;
	this.speed = 25;

	var t = 0;
	var rotation = 0;
	var playAudio = false;

	this.draw = function(context) {

		context.save();
		context.translate(game.width/2, game.height/2);
		context.rotate(rotation);
		context.drawImage(spriteExplosion, sx, sy, swidth, sheight, this.x, this.y, this.width, this.height);
		context.restore();
	};

	this.updateState = function(delta) {
		t += (delta / 10) * this.speed;		
		if(t < .1) {
			sx = 0;
			sy = 0;
		} else if(t < .2) {
			if(playAudio) { 
				playAudio = false;
				audio.playExplosion();
			}
			sx = 65;
		} else if(t < .3) {
			sx = 130;
		} else if(t < .4) {
			sx = 195;
		} 

		else if(t < .5) {
			sx = 0;
			sy = 65;
		} else if(t < .6) {
			sx = 65;
			sy = 65;
		} else if(t < .7) {
			sx = 130;
			sy = 65;
		} else if(t < .8) {
			sx = 195;
			sy = 65;
		} 

		else if(t < .9) {
			sx = 0;
			sy = 130;
		} else if(t < 1.0) {
			sx = 65;
			sy = 130;
		} else if(t < 1.1) {
			sx = 130;
			sy = 130;
		} else if(t < 1.2) {
			sx = 195;
			sy = 130;
		} 

		else if(t < 1.3) {
			sx = 0;
			sy = 195;
		} else if(t < 1.4) {
			sx = 65;
			sy = 195;
		} else if(t < 1.5) {
			sx = 130;
			sy = 195;
		} else if(t < 1.6) {
			sx = 195;
			sy = 195;
		} else {
			this.kill();
		}
	};

	this.explode = function(spaceCraft) {
		this.x = spaceCraft.x;
		this.y = spaceCraft.y;
		rotation = spaceCraft.rotation;
		playAudio = true;
	};

	this.kill = function() {
		this.active = false;
		this.x = null;
		this.y = null;
		playAudio = false;
	};
};

/*** 
sx		Optional. The x coordinate where to start clipping
sy		Optional. The y coordinate where to start clipping
swidth	Optional. The width of the clipped image
sheight	Optional. The height of the clipped image
x		The x coordinate where to place the image on the canvas
y		The y coordinate where to place the image on the canvas
width	Optional. The width of the image to use (stretch or reduce the image)
height	Optional. The height of the image to use (stretch or reduce the image)
***/

function GoodGuy() {
	var shotInterval = 1000;
	var explosion = null;
	var sx = 67;
	var sy = 123;
	var swidth = 60;
	var sheight = 65;
	this.active = true;
	this.width = 50;
	this.height = 50;
	this.x = this.height/2*-1;
	this.y = (game.width/2)-this.width; 
	this.speed = 6;
	this.rotation = 0;
	this.shotBullets = [];
	this.exploding = false;

	this.updateState = function(delta) {
		shotInterval += (delta / 10) * this.speed;		
		var distance = (delta * 50) * this.speed;	

		if(!this.exploding) {
			if (keydown.up) {    
				this.x -= distance;        
	            if (this.x < (game.height/2) * -1) {
					this.x = game.height/2 * -1;
				}
	        }
	        
		    if (keydown.down) {
		    	this.x += distance;
		      	if (this.x > (game.height/2)-this.width) {
		    		this.x = (game.height/2)-this.width;
		    	}
		    }

		    if (keydown.right) {
		    	this.y -= distance;
		    	if (this.y < (game.width/2) * -1) {
	    			this.y = (game.width/2) * -1;
		    	}
		    }

		    if (keydown.left) {
		    	this.y += distance;
		    	if (this.y > (game.width/2) - this.height)  {
	    			this.y = (game.width/2) - this.height;
		    	}
		    }

		    if(keydown.space) {
		    	this.shoot();
		    } else {
		    	shotInterval = 1000;
		    }

		    
		} else {
			if(explosion.active) { explosion.updateState(delta); }
		}


		if(this.exploding && !explosion.active && this.shotBullets.length <= 0) this.kill();
		this.shotBullets = this.shotBullets.filter(function(bullet) { return bullet.active; });
		this.shotBullets.forEach(function(bullet) { bullet.updateState(delta); });
	};

	this.draw = function(context) {
		if(!this.exploding) {
			this.rotation = (Math.PI / 180.0) * 90;

			context.save();
			context.translate(game.width/2, game.height/2);
			context.rotate(this.rotation);
			context.drawImage(sprite, sx, sy, swidth, sheight, this.x, this.y, this.width, this.height);
			context.restore();
			
		} else {
			if(explosion.active) { explosion.draw(ctx); }
		}

		game.goodGuys[0].shotBullets.forEach(function(bullet) { bullet.draw(context); });
	};

	this.shoot = function() {
		if(shotInterval >= .2) {
			var bullet = new Bullet();
			bullet.rotation = 90;;
			bullet.generateTravelPath(this.x+(this.width/2), this.y);
			this.shotBullets.push(bullet);
			shotInterval = 0;
			audio.playLaser();
		}
	};

	this.kill = function() {
		this.active = false;
		this.shotBullets = [];
	}

	this.explode = function() {
		if(!this.exploding) {
			this.exploding = true;
			explosion = new Explosion();
			explosion.explode(this);
		}
	}
}; 

function Level() {
	this.game = null;
	this.active = true;
	this.enemiesOnScreen = 6;
	this.length = 60000;
	this.enemiesStager = 1000;
	this.timing = this.enemiesStager;
	this.badGuys = [];
	this.background = new Background();

	this.initialize = function() {
		this.background = new Background();
		this.background.initialize();
	}

	this.updateLevel = function (delta) {
		this.timing -= delta * 1000;

		if(this.timing <= 0) {
			this.badGuys.push(this.tryToGenerateBadGuy());
		}

		this.badGuys.forEach(function(badGuy) {
			var num = Math.random() * 70;
			if(num <= 1) { badGuy.shoot(); }
		});
	};

	this.updateState = function(delta) {

		this.background.updateState(delta);
		game.goodGuys = game.goodGuys.filter(function(goodGuy) { return goodGuy.active; });
		this.badGuys = this.badGuys.filter(function(badGuy) { return badGuy.active; });

		if(game.goodGuys.length > 0) { CollisionEngine.handleCollisions(this.badGuys, game.goodGuys[0]); }
		if(game.goodGuys.length > 0) { game.goodGuys[0].updateState(delta); }
		this.badGuys.forEach(function (badGuy) { badGuy.updateState(delta); });

		this.updateLevel(delta);
	}

	this.draw = function(context) {

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

	this.tryToGenerateBadGuy = function() {
		if(this.badGuys.length < this.enemiesOnScreen) {
			var badGuy = new BadGuy();
			badGuy.generateTravelPath();
			this.timing = this.enemiesStager;
			return badGuy;
		}
	}
};

function Point() {

	this.x = null;
	this.y = null;
};

function bezier(p0, p1, p2, p3, t) {

	var p4 = linearInterpolation(p0, p1, t);
	var p5 = linearInterpolation(p1, p2, t);
	var p6 = linearInterpolation(p2, p3, t);
	var p7 = linearInterpolation(p4, p5, t);
	var p8 = linearInterpolation(p5, p6, t);
	var p9 = linearInterpolation(p7, p8, t);

	return p9;
}

function linearInterpolation(p0, p1, t) {

    var xlerp = p0.x + (p1.x - p0.x) * t;
    var ylerp = p0.y + (p1.y - p0.y) * t;

    var newPoint = new Point();
    newPoint.x = xlerp;
    newPoint.y = ylerp;
    return newPoint;
}

function TravelPath() {
	this.P0 = null;
	this.P1 = null;
	this.P2 = null;
	this.P3 = null;

	this.generateRandom = function() {
		
		var constraint = 200;

		this.P0 = new Point();
		this.P0.x = ((game.height + constraint) / 2) - (Math.random() * (game.height+ constraint));
		this.P0.y = game.width / 2;

		this.P1 = new Point();
		this.P1.x = ((game.height + constraint) / 2) - (Math.random() * (game.height + constraint));
		this.P1.y = Math.random() * 100 + 100;

		this.P2 = new Point();
		this.P2.x = ((game.height + constraint) / 2) - (Math.random() * (game.height + constraint));
		this.P2.y = Math.random() * -200 - 50;

		this.P3 = new Point();
		this.P3.x = ((game.height + constraint) / 2) - (Math.random() * (game.height + constraint));
		this.P3.y = (game.width / 2* -1)-50;
	}
};

function StartMenu() {
	
	this.active = true;

	this.draw = function (context) {		
		context.fillStyle = "#FF0000";
		context.font = "40px Georgia";
		context.textAlign = "center";
		context.fillText("Super Space Odyssey", game.width/2, game.height/2-20); 

		context.fillStyle = "#FFFFFF";
		context.font = "15px Georgia";
		context.textAlign = "center";
		context.fillText("Press Spacebar to Start", game.width/2, game.height/2 + 50);
	};

	this.updateState = function (delta) {
		if(keydown.space) {
	    	this.end();
	    	// Prevents holding down the key to shoot frequently.
	    	keydown.space = false;
	    }
	};

	this.end = function() {
		this.active = false;
	};
}

function GameOverMenu() {
	this.active = true;

	this.draw = function (context) {
		context.fillStyle = "#FF0000";
		context.font = "40px Georgia";
		context.textAlign = "center";
		context.fillText("Game Over: You Suck", game.width/2, game.height/2-20); 

		context.fillStyle = "#FFFFFF";
		context.font = "15px Georgia";
		context.textAlign = "center";
		context.fillText("Press Spacebar to Start Over", game.width/2, game.height/2 + 50);
	};

	this.updateState = function (delta) {
		if(keydown.space) {
	    	this.end();
	    	// Prevents holding down the key to shoot frequently.
	    	keydown.space = false;
	    }
	};

	this.end = function() {
		game.initializeGameReset();
	};
};

	function Game() {
		this.frameRate = 60;
		this.height = 600;
		this.width = 800;
		this.lastTime = 0;
		this.scenes = [];
		this.goodGuys = [];
		this.score = 0;
	}

	Game.prototype.initialize = function (width, height) {

		this.height = height || this.height;
		this.width = width || this.width;

		audio.initialize();
		controls.wireUp();
		sprite = this.loadSprite("./images/shipsall_4.gif");
		spriteExplosion = this.loadSprite("./images/exp2_0.png");

		canvas = document.getElementById('space-odyssey-game');
		canvas.height = height;
		canvas.width = width;
		ctx = canvas.getContext("2d");

		this.lastTime = new Date().getTime();
		audio.playThemeSong();
		this.initializeGameStart();

		this.setLoop();
	};

	Game.prototype.updateScene = function (delta) {
		this.scenes = this.scenes.filter(function (scene) { return scene.active; });
		if(this.scenes.length > 0) {
			this.scenes[0].updateState(delta);
		}		
	};

	Game.prototype.renderScene = function() { 
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(this.scenes.length > 0) {
			this.scenes[0].draw(ctx);
		}
	};

	Game.prototype.loadSprite = function(name) {
    var sprite = new Image();
    sprite.src = name;
    return sprite;
	};

	Game.prototype.initializeGameOver = function() {
 		this.scenes = [];
		this.scenes.push(new GameOverMenu());
	};

	Game.prototype.initializeGameStart = function() {
		this.scenes = [];
		this.scenes.push(new StartMenu());

		var lvl = new Level();
		lvl.initialize();
		this.scenes.push(lvl);
		this.goodGuys.push(new GoodGuy());
		this.goodGuys.push(new GoodGuy());
		this.goodGuys.push(new GoodGuy());
		this.score = 0;
	};

	Game.prototype.initializeGameReset = function() {
		this.scenes = [];

		var lvl = new Level();
		lvl.initialize();
		this.scenes.push(lvl);
		this.goodGuys.push(new GoodGuy());
		this.goodGuys.push(new GoodGuy());
		this.goodGuys.push(new GoodGuy());
		this.score = 0;
	};

	Game.prototype.setLoop = function() {
			setInterval(function() {
					var currentTime = new Date().getTime();
					var delta = (currentTime - game.lastTime) / 1000.0;
					game.lastTime = currentTime;
					
					if (delta > 1.0) delta = 1.0;
					game.updateScene(delta);
					game.renderScene();
				}, 
			1000/this.frameRate);
		};

	var canvas, ctx, sprite, spriteExplosion;
	window.game = new Game();

})(window);