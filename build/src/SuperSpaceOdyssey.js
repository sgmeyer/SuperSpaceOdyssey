(function(window) { 'use strict';

  var canvas, 
      ctx, 
      spriteLibrary,
      soundLibrary, 
      keydown,
      player;
	function SoundLibrary() {
		this.musicVolume = 1;
		this.soundEffectsVolume = 1;
		this.currentMusic = null;
		this.isLoadComplete = false;

		var audioPath = 'sound/';
		var manifest = [
		    {id:'themeSong', src:'Grey_Sector_v0_86_0.mp3'},
		    {id:'lazer', src:'laser1.wav'},
		    {id:'explosion', src:'8bit_bomb_explosion.wav'}
		];

		createjs.Sound.addEventListener("fileload", function(event) { if(event.id === 'themeSong') { soundLibrary.isLoadComplete = true; } });
		createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
  	createjs.Sound.registerManifest(manifest, audioPath);
	}

	SoundLibrary.prototype.setMusicVolume = function(volume) {
		this.musicVolume = volume || this.musicVolume;

		if(this.currentMusic) { 
			this.currentMusic.setVolume(volume);
		}
	}

	SoundLibrary.prototype.setSoundEffectsVolume = function(volume) {
		this.soundEffectsVolume = volume || this.soundEffectsVolume;
	}

	SoundLibrary.prototype.playExplosion = function() {
		var explosion = createjs.Sound.play('explosion');
		explosion.setVolume(this.soundEffectsVolume);
	}

	SoundLibrary.prototype.playThemeSong = function() {
		this.currentMusic = createjs.Sound.play('themeSong');
		this.currentMusic.setVolume(this.musicVolume);
	}
	
	SoundLibrary.prototype.playLaser = function() {
		var lazer = createjs.Sound.play('lazer');
		lazer.setVolume(this.soundEffectsVolume);
	}
function SpriteLibrary() {
  var shipImage = new Image();
  shipImage.src = 'images/shipsall_4.gif';

  var shipImageTransparent = new Image();
  shipImageTransparent.src = 'images/ships-semi-transparent.png';

  var explosionImage = new Image();
  explosionImage.src = 'images/exp2_0.png';

  this.staticSprites = [
    {id: 'goodGuyShip', x: 69, y: 125, width: 56, height: 59, image: shipImage},
    {id: 'goodGuyShipInvincible', x: 69, y: 125, width: 56, height: 59, image: shipImageTransparent},
    {id: 'badGuyShip', x: 131, y: 128, width: 54, height: 56, image: shipImage},
    {id: 'badGuyShip2', x: 6, y: 3, width: 56, height: 43, image: shipImage},
    {id: 'badGuyShip3', x: 132, y: 4, width: 52, height: 55, image: shipImage},
    {id: 'badGuyShip4', x: 71, y: 65, width: 49, height: 57, image: shipImage},
    {id: 'bullet', x: 133, y: 69, width: 18, height: 45, image: shipImage}
  ];
  this.animationSprites = [
    { id: 'explosion', 
      intervals: [
        { time: .1, x: 0, y: 0, height: 55, width: 55},
        { time: .2, x: 65, y: 0, height: 55, width: 55},
        { time: .3, x: 130, y: 0, height: 55, width: 55},
        { time: .4, x: 195, y: 0, height: 55, width: 55},
        { time: .5, x: 0, y: 65, height: 55, width: 55},
        { time: .6, x: 65, y: 65, height: 55, width: 55},
        { time: .7, x: 130, y: 65, height: 55, width: 55},
        { time: .8, x: 195, y: 65, height: 55, width: 55},
        { time: .9, x: 0, y: 130, height: 55, width: 55},
        { time: 1.0, x: 65, y: 130, height: 55, width: 55},
        { time: 1.1, x: 130, y: 130, height: 55, width: 55},
        { time: 1.2, x: 195, y: 130, height: 55, width: 55}
      ],
      image: explosionImage
    }
  ];
  this.isLoadComplete = true;
}

SpriteLibrary.prototype.getSprite = function(id) {
  for(var i = 0; i < this.staticSprites.length; i++) {
    if(this.staticSprites[i].id === id) {
      return this.staticSprites[i];
    }
  }
}

SpriteLibrary.prototype.getAnimation = function(id) {
  for(var i = 0; i < this.animationSprites.length; i++) {
    if(this.animationSprites[i].id === id) {
      return this.animationSprites[i];
    }
  }
}

SpriteLibrary.prototype.getAnimationFrame = function(animation, time) {
  for(var i = 0; i < animation.intervals.length; i++) {
    if(time < animation.intervals[i].time) {
      return animation.intervals[i];
    }
  }
}
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
function BadGuy(shipId) {
		this.explosion = null;
		this.t = 0;
		this.sprite = spriteLibrary.getSprite(shipId || 'badGuyShip');
		this.travelPath = TravelPath.generateRandomPath(game.height);

		this.x = -game.width;
		this.y = game.height; 
		this.width = 50 * game.scale;
		this.height = 50 * game.scale;
		this.active = true;
		this.speed = 2;
		this.rotation = 0;
		this.shotBullets = [];
		this.exploding = false;
	};

	BadGuy.prototype.updateState = function (delta) {
		if(!this.exploding) {
			this.t += (delta / 10) * this.speed;
			if(this.t > 1) { this.kill(); }
			var point = Math.bezier(this.travelPath.P0, this.travelPath.P1, this.travelPath.P2, this.travelPath.P3, this.t);
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
			context.drawImage(this.sprite.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height);
			context.restore();
		} else {
			if(this.explosion.active) { this.explosion.draw(ctx); }
		}

		this.shotBullets.forEach(function(bullet) { bullet.draw(context); });
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
			bullet.shoot(this.x + (this.width/2), this.y);
			this.shotBullets.push(bullet);
		}
	};

	function Bullet(speed) {
		this.t = 0;
		this.sprite = spriteLibrary.getSprite('bullet');
		this.travelPath = null;

		this.x = 0;
		this.y = 0; 
		this.width = 8 * game.scale;
		this.height = 20 * game.scale;
		this.rotation = 90;
		this.active = true;
		this.speed = speed || 8;
	};

	Bullet.prototype.draw = function (context) {
		var rotation = (Math.PI / 180) * this.rotation;

		context.save();
		context.translate(game.width/2, game.height/2);
		context.rotate(rotation);
		context.drawImage(this.sprite.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height);
		context.restore();
	};

	Bullet.prototype.updateState = function (delta) {
		
		this.t += (delta / 10) * this.speed * game.scale;
		if(this.t > 1) { this.kill(); }
		var point = Math.bezier(this.travelPath.P0, this.travelPath.P1, this.travelPath.P2, this.travelPath.P3, this.t);
		this.x = point.x;
		this.y = point.y;	
	};

	Bullet.prototype.shoot = function(startX, startY) {
		this.x = startX;
		this.y = startY;
		this.travelPath = TravelPath.generateStraightPath(this.x, this.y, game.width, this.width);
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

		// TODO: does this return a boolean or a truth/falsy.
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
		        	player.addPoints(10);
		      	}
		    });
		});

		if(goodGuy.invincibilityTimeRemaining <= 0) {
			badGuys.forEach(function(badGuy) {
				badGuy.shotBullets.forEach(function(bullet){
			      if (CollisionEngine.collides(bullet, goodGuy)) {
			    		bullet.kill();
			    		goodGuy.explode();
			      }
			    });
			});

			badGuys.forEach(function(badGuy) {
				if (!goodGuy.exploding && !badGuy.exploding && CollisionEngine.collides(goodGuy, badGuy)) {
					badGuy.explode();
					goodGuy.explode();
				}
			});
		}
	};

	function Controls() {
	}

	Controls.keycode = {
		space: 32,
		left: 37,
		up: 38,
		right: 39,
		down: 40
	};

	Controls.keyName = function(event) {
    if(Controls.keycode.left == event.which) { return 'left' };
    if(Controls.keycode.up == event.which) { return 'up' };
    if(Controls.keycode.right == event.which) { return 'right' };
    if(Controls.keycode.down == event.which) { return 'down' };
    if(Controls.keycode.space == event.which) { return 'space' };
    return event.which;
  }
  
  function KeyboardGameController() {
  };

  KeyboardGameController.prototype.initialize = function() {
    keydown = {};

    document.onkeydown = function(event) {
      keydown[Controls.keyName(event)] = true;
      event.preventDefault();
    };

    document.onkeyup = function(event) {
      keydown[Controls.keyName(event)] = false;
      event.preventDefault();
    };
  };

function Player() {
  this.points = 0;
  this.lives = 3;
  this.currentGoodGuy;
}

Player.prototype.addPoints = function(points) {
  this.points += points || 0;
};

Player.prototype.addLife = function() {
  this.lives++;
}

Player.prototype.removeLife = function() {
  this.lives--;
}

Player.prototype.getScore = function() {
  return this.points.toString();
}

Player.prototype.getCurrentGoodGuy = function() {
  return this.currentGoodGuy = this.currentGoodGuy || new GoodGuy();
}

Player.prototype.hasLives = function() {
  return this.lives > 0;
}

Player.prototype.kill = function() {
  this.removeLife();
  this.currentGoodGuy = undefined;
}
  function TouchGameController() {
  };

  TouchGameController.prototype.initialize = function() {
    GameController.init({ 
      left: { 
        position: { left: '10%', bottom: '17%' },
        type: 'joystick',
        joystick: {
          touchMove: function(details) {
            keydown['left'] = details.normalizedX < 0;
            keydown['up'] = details.normalizedY > 0;
            keydown['right'] = details.normalizedX > 0;
            keydown['down'] = details.normalizedY < 0;
          },
          touchEnd: function() {
            keydown['left'] = false;
            keydown['up'] = false;
            keydown['right'] = false;
            keydown['down'] = false;
          }
        }
      }, 
      right: { 
        position: { right: '5%' }, 
        type: 'buttons', 
        buttons: [
          { label: 'shoot', fontSize: 13, backgroundColor: 'red', 
            touchStart: function() { 
              keydown['space'] = true;
            },
            touchEnd: function() {
              keydown['space'] = false;
            }
          }, 
          false, false, false
        ] 
      }
    });
  };

	function Explosion() {
		this.t = 0;
		this.animation = spriteLibrary.getAnimation('explosion');
		this.rotation = 0;
		this.playAudio = false;

		this.active = true;
		this.x = 0;
		this.y = 0; 
		this.width = 55 * game.scale;
		this.height = 55 * game.scale;
		this.active = true * game.scale;
		this.speed = 25;
	};

	Explosion.prototype.draw = function(context) {
		var spriteFrame = spriteLibrary.getAnimationFrame(this.animation, this.t);

		if(spriteFrame) {
			context.save();
			context.translate(game.width/2, game.height/2);
			context.rotate(this.rotation);
			context.drawImage(this.animation.image, spriteFrame.x, spriteFrame.y, spriteFrame.width, spriteFrame.height, this.x, this.y, this.width, this.height);
			context.restore();
		}
	};

	Explosion.prototype.updateState = function(delta) {
		this.t += (delta / 10) * this.speed;
		if(this.t < .2 && this.playAudio) { this.playAudio = false; soundLibrary.playExplosion(); }
		if(this.t > 1.2) { this.kill(); }
	};

	Explosion.prototype.explode = function(spaceCraft) {
		this.x = spaceCraft.x;
		this.y = spaceCraft.y;
		this.rotation = spaceCraft.rotation;
		this.playAudio = true;
	};

	Explosion.prototype.kill = function() {
		this.active = false;
		this.x = null;
		this.y = null;
		this.playAudio = false;
	};

function GoodGuy() {
		this.shotInterval = 1000;
		this.explosion = new Explosion();
		this.sprite = spriteLibrary.getSprite('goodGuyShip');
		this.active = true;
		this.width = 50 * game.scale;
		this.height = 50 * game.scale;
		this.x = (this.height/2*-1);
		this.y = ((game.width/2)-this.width); 
		this.speed = 8;
		this.rotation = 0;
		this.shotBullets = [];
		this.exploding = false;
		this.invincibilityTimeRemaining = 3;
	}; 

	GoodGuy.prototype.updateState = function(delta) {
		this.invincibilityTimeRemaining -= delta;
		if(this.invincibilityTimeRemaining > 0) {
			this.sprite = spriteLibrary.getSprite('goodGuyShipInvincible');
		} else {
			this.sprite = spriteLibrary.getSprite('goodGuyShip');
		}

		this.shotInterval += (delta / 10) * this.speed;		
		var distance = delta * 50 * this.speed;	

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
	    	this.shotInterval = 1000;
	    }
		} else {
			if(this.explosion.active) { this.explosion.updateState(delta); }
		}

		if(this.exploding && !this.explosion.active && this.shotBullets.length <= 0) { this.kill() };
		this.shotBullets = this.shotBullets.filter(function(bullet) { return bullet.active; });
		this.shotBullets.forEach(function(bullet) { bullet.updateState(delta); });
	};

	GoodGuy.prototype.draw = function(context) {
		if(!this.exploding) {
			this.rotation = (Math.PI / 180.0) * 90;

			context.save();
			context.translate(game.width/2, game.height/2);
			context.rotate(this.rotation);
			context.drawImage(this.sprite.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height);
			context.restore();
		} else {
			if(this.explosion.active) { this.explosion.draw(ctx); }
		}

		this.shotBullets.forEach(function(bullet) { bullet.draw(context); });
	};

	GoodGuy.prototype.shoot = function() {
		if(this.shotInterval >= .2) {
			var bullet = new Bullet(8);
			bullet.rotation = 90;;
			bullet.shoot(this.x+(this.width/2), this.y);
			this.shotBullets.push(bullet);
			this.shotInterval = 0;
			soundLibrary.playLaser();
		}
	};

	GoodGuy.prototype.kill = function() {
		this.active = false;
		this.shotBullets = [];
		player.kill();
	};

	GoodGuy.prototype.explode = function() {
		if(!this.exploding) {
			this.exploding = true;
			this.explosion = new Explosion();
			this.explosion.explode(this);
		}
	};

	GoodGuy.prototype.setInvincability = function(time) {
		this.invincibilityTimeRemaining = time || 0;
	}


  function LinkButton(x, y, label, textAlign) {
    this.x = x || 0;
    this.y = y || 0;
    this.label = label || '';
    this.textAlign = textAlign || '';
    this.active = true;
  }

  LinkButton.prototype.setActive = function(isActive) {
    this.active = isActive ? true : false;
  }

  LinkButton.prototype.draw = function (context) {
    context.fillStyle = this.active ? Variables.optionsInFocusTextColor() : Variables.optionsOutOfFocusTextColor();
    context.font = Variables.optionsFont();
    context.textAlign = this.textAlign;
    context.fillText(this.label, this.x, this.y);
  }

  // TODO: refactor to use configuration instead of many parameters.
  function RangeSelector(min, max, current, x, y, label) {
    this.min = min || 0;
    this.max = max || 1;
    this.current = current || this.min;
    this.x = x || 0;
    this.y = y || 0;
    this.label = label || '';
    this.active = false;
  }

  RangeSelector.prototype.setActive = function(isActive) {
    this.active = isActive ? true : false;
  }

  RangeSelector.prototype.adjust = function(adjustedValue) {
    var val = adjustedValue || 0;
    this.current = this.current + val;

    if(this.current > this.max) { this.current = this.max; }
    else if (this.current < this.min) { this.current = this.min }
  }

  RangeSelector.prototype.draw = function(context) {
    var startingPoint = this.x;
    context.fillStyle = this.active ? Variables.optionsInFocusTextColor() : Variables.optionsOutOfFocusTextColor();
    context.font = Variables.optionsFont();
    context.textAlign = 'left';
    context.fillText(this.label, this.y, startingPoint);

    context.beginPath();
    context.rect(this.y, startingPoint + 10, 200, 20);
    context.strokeStyle = this.active ? Variables.optionsRangeSelectorInFocusBorderColor() : Variables.optionsRangeSelectorOutOfFocusBorderColor();
    context.stroke();

    context.beginPath();
    context.rect(this.y+2, startingPoint + 12, 196*this.current, 16);
    context.fillStyle = this.active ? Variables.optionsRangeSelectorInFocusFillColor() : Variables.optionsRangeSelectorOutOfFocusFillColor();
    context.fill();
    context.strokeStyle = this.active ? Variables.optionsRangeSelectorInFocusFillColor() : Variables.optionsRangeSelectorOutOfFocusFillColor();
    context.stroke();
  };

function Point(x, y) {
	this.x = x || null;
	this.y = y || null;
};

Math.bezier = function(p0, p1, p2, p3, t) {
	var p4 = Math.linearInterpolation(p0, p1, t);
	var p5 = Math.linearInterpolation(p1, p2, t);
	var p6 = Math.linearInterpolation(p2, p3, t);
	var p7 = Math.linearInterpolation(p4, p5, t);
	var p8 = Math.linearInterpolation(p5, p6, t);
	var p9 = Math.linearInterpolation(p7, p8, t);

	return p9;
}

Math.linearInterpolation = function(p0, p1, t) {
  var xlerp = p0.x + (p1.x - p0.x) * t;
  var ylerp = p0.y + (p1.y - p0.y) * t;

  var newPoint = new Point();
  newPoint.x = xlerp;
  newPoint.y = ylerp;
  return newPoint;
}

function TravelPath() {
	this.P0 = undefined;
	this.P1 = undefined;
	this.P2 = undefined;
	this.P3 = undefined;
};

TravelPath.generateRandomPath = function(gameHeight) {
		var constraint = 200;
		var travelPath = new TravelPath();

		var p0 = new Point();
		p0.x = ((game.height + constraint) / 2) - (Math.random() * (gameHeight + constraint));
		p0.y = game.width / 2;

		var p1 = new Point();
		p1.x = ((game.height + constraint) / 2) - (Math.random() * (gameHeight + constraint));
		p1.y = Math.random() * 100 + 100;

		var p2 = new Point();
		p2.x = ((game.height + constraint) / 2) - (Math.random() * (gameHeight + constraint));
		p2.y = Math.random() * -200 - 50;

		var p3 = new Point();
		p3.x = ((game.height + constraint) / 2) - (Math.random() * (gameHeight + constraint));
		p3.y = (game.width / 2* -1)-50;

		var travelPath = new TravelPath();
		travelPath.P0 = p0;
		travelPath.P1 = p1;
		travelPath.P2 = p2;
		travelPath.P3 = p3;

		return travelPath;
	};

	TravelPath.generateStraightPath = function (startX, startY, gameWidth, projectileWidth) {		
		var distance = gameWidth + projectileWidth;
		var divisions = distance / 3;

		var startPoint = new Point();
		startPoint.x = startX - (projectileWidth/2);
		startPoint.y = startY;

		var endPoint = new Point();
		endPoint.x = startPoint.x;
		endPoint.y =  startPoint.y - gameWidth - projectileWidth;

		var p1 = new Point();
		p1.x = startPoint.x;
		p1.y = startPoint.y - divisions;

		var p2 = new Point();
		p2.x = p1.x;
		p2.y = p1.y - divisions;

		var travelPath = new TravelPath();
		travelPath.P0 = startPoint;
		travelPath.P1 = p1;
		travelPath.P2 = p2;
		travelPath.P3 = endPoint;

		return travelPath;
	};


  function GameOverMenu() {
    this.active = true;
    this.eventDelay = .75;
    var locationItem1 = Variables.mainItemLocation1();
    this.startButton = new LinkButton(locationItem1.x, locationItem1.y, 'Start Game', Variables.mainItemTextAlign);
  };

  GameOverMenu.prototype.draw = function (context) {
    context.fillStyle = Variables.headingFontColor();
    context.font = Variables.headingFont();
    context.textAlign = Variables.headingTextAlign();

    var titleLocation = Variables.headingTitleLocation();
    context.fillText("Game Over: You Suck", titleLocation.x, titleLocation.y); 
    this.startButton.draw(context);
  };

  GameOverMenu.prototype.updateState = function (delta) {
    this.eventDelay -= delta;

    if(this.eventDelay <= 0 && keydown.space) {
        this.end();
        keydown.space = false;
      }
  };

  GameOverMenu.prototype.end = function() {
    game.initializeGameReset();
    this.active = false;
  };

  function Level(levelData) {
    this.distance = levelData ? levelData.distance || 0 : 0;
    this.currentDistance = 0;
    this.bogies = levelData.obstacles;
    this.active = true;
    this.badGuys = [];
    this.background = new Background();
  }

  Level.prototype.initialize = function() {
    this.background = new Background();
    this.background.initialize();
  }

  Level.prototype.updateLevel = function (delta) {
    this.currentDistance += 6 * delta;
    this.generateBadGuy();
    this.badGuys.forEach(function(badGuy) {
      var num = Math.random() * 70;
      if(num <= 1) { badGuy.shoot(); }
    });
  }

  Level.prototype.updateState = function(delta) {
    if(this.currentDistance >= this.distance || !player.hasLives()) { this.end(); }

    this.background.updateState(delta);
    this.badGuys = this.badGuys.filter(function(badGuy) { return badGuy.active; });

    if(player.hasLives()) { 
      var goodGuy = player.getCurrentGoodGuy();
      CollisionEngine.handleCollisions(this.badGuys, goodGuy);
      goodGuy.updateState(delta); 
    }

    this.badGuys.forEach(function (badGuy) { badGuy.updateState(delta); });
    this.updateLevel(delta);
  }

  Level.prototype.draw = function(context) {
    this.background.draw(context);

    if(player.hasLives()) { 
      player.getCurrentGoodGuy().draw(context);
      this.badGuys.forEach(function (badGuy) { badGuy.draw(context); });
    }

    context.fillStyle = "orange";
    context.font = "20px Georgia";
    context.textAlign = "right";
    context.fillText("Score: " + player.getScore(), game.width - 50, 20);
  }

  Level.prototype.generateBadGuy = function() {
    var newBogies = this.bogies.filter((function (currentDistance) { return function(bogie) { return bogie.distance <= currentDistance; } })(this.currentDistance));
    this.bogies = this.bogies.filter((function (currentDistance) { return function(bogie) { return bogie.distance > currentDistance; } })(this.currentDistance));

    for(var i = 0; i < newBogies.length; i++) {
      this.badGuys.push(newBogies[i].entity);
    }
  }

  Level.prototype.end = function() {
    this.active = false;
    game.initializeGameOver();
  }

  function LoadingMenu() {
    this.active = true;
  
    soundLibrary = new SoundLibrary();
    spriteLibrary = new SpriteLibrary();
  }

  LoadingMenu.prototype.updateState = function(delta) {
    if(soundLibrary.isLoadComplete && spriteLibrary.isLoadComplete) {
      this.end();
    }
  }

  LoadingMenu.prototype.draw = function(context) {
    context.fillStyle = "#FF0000";
    context.font = "40px Georgia";
    context.textAlign = "center";
    context.fillText("Loading...", game.width/2, game.height/2-20); 
  }

  LoadingMenu.prototype.end = function() {
    this.active = false;
  }

  function SoundOptionsMenu() {
    this.active = true;
    this.musicVolumeControl = new RangeSelector(0, 1, 1, 100, 188, 'Music Volume');
    this.soundEffectsVolumeControl = new RangeSelector(0, 1, 1, 160, 188, 'Sound Effects Volume');
    this.backButton = new LinkButton(188, 220, 'Back');
    this.selectedOption = 1;
  };

  SoundOptionsMenu.prototype.updateState = function(delta) {
    if(keydown.left) {
      keydown.left = false;
      if(this.selectedOption === 1) {
        this.musicVolumeControl.adjust(-.1);
        soundLibrary.setMusicVolume(this.musicVolumeControl.current);
      } else if (this.selectedOption === 2) {
        this.soundEffectsVolumeControl.adjust(-.1);
        soundLibrary.setSoundEffectsVolume(this.soundEffectsVolumeControl.current);
        soundLibrary.playLaser();
      }
    }
    if(keydown.right) {
      keydown.right = false;
      if(this.selectedOption === 1) {
        this.musicVolumeControl.adjust(.1);
        soundLibrary.setMusicVolume(this.musicVolumeControl.current);
      } else if (this.selectedOption === 2) {
        this.soundEffectsVolumeControl.adjust(.1);
        soundLibrary.setSoundEffectsVolume(this.soundEffectsVolumeControl.current);
        soundLibrary.playLaser();
      }
    }
    if(keydown.down) {
      keydown.down = false;
      this.selectedOption++;
      if(this.selectedOption > 3) { this.selectedOption = 1; }
    }
    if(keydown.up) {
      keydown.up = false;
      this.selectedOption--;
      if(this.selectedOption < 1) { this.selectedOption = 3; }
    }
    if(keydown.space) {
      keydown.space = false;
      if(this.selectedOption === 3) { this.end(); }
    }

    this.musicVolumeControl.setActive(this.selectedOption === 1);
    this.soundEffectsVolumeControl.setActive(this.selectedOption === 2);
    this.backButton.setActive(this.selectedOption === 3);
  };

  SoundOptionsMenu.prototype.draw = function(context) {
    context.fillStyle = Variables.headingFontColor();
    context.font = Variables.headingFont();
    context.textAlign = Variables.headingTextAlign();
    var headingLocation = Variables.headingLocation();
    context.fillText('Sound Options', headingLocation.x, headingLocation.y); 

    this.musicVolumeControl.draw(context);
    this.soundEffectsVolumeControl.draw(context);
    this.backButton.draw(context);
  };

  SoundOptionsMenu.prototype.end = function () {
    game.scenes.splice(1, 0, new StartMenu());
    this.active = false;
  };

  function StartMenu() {
    this.active = true;
    this.selectedOption = 1;

    var locationItem1 = Variables.mainItemLocation1();
    var locationItem2 = Variables.mainItemLocation2();
    this.startButton = new LinkButton(locationItem1.x, locationItem1.y, 'Start Game', Variables.mainItemTextAlign);
    this.optionsButton = new LinkButton(locationItem2.x, locationItem2.y, 'Options', Variables.mainItemTextAlign);
  };

  StartMenu.prototype.updateState = function (delta) {
    if(keydown.space) {
      this.end();
      keydown.space = false;
    }
    if(keydown.up || keydown.down) {
      keydown.up = false;
      keydown.down = false;
      if(this.selectedOption === 1) {
        this.selectedOption = 2;
      } else {
        this.selectedOption = 1;
      }
    }

    this.startButton.setActive(this.selectedOption === 1);
    this.optionsButton.setActive(this.selectedOption === 2);
  };

  StartMenu.prototype.draw = function (context) {   
    context.fillStyle = Variables.headingFontColor();
    context.font = Variables.headingFont();
    context.textAlign = Variables.headingTextAlign();
    var titleLocation = Variables.headingTitleLocation();
    context.fillText("Super Space Odyssey", titleLocation.x, titleLocation.y);
    this.startButton.draw(context);
    this.optionsButton.draw(context);
  };

  StartMenu.prototype.end = function() {
    if(this.optionsButton.active) {
      game.scenes.splice(1, 0, new SoundOptionsMenu());
    } else {
      soundLibrary.playThemeSong();
    }

    this.active = false;
  };

  function Levels() {
  }

  Levels.getAll = function() {
   
    return [{ distance: 500,
              obstacles: [
                { distance: 10, type: 'enemy', entity: new BadGuy() },
                { distance: 10, type: 'enemy', entity: new BadGuy('badGuyShip2') },
                { distance: 10, type: 'enemy', entity: new BadGuy('badGuyShip3') },
                { distance: 10, type: 'enemy', entity: new BadGuy('badGuyShip4') },
                { distance: 20, type: 'enemy', entity: new BadGuy() },
                { distance: 28, type: 'enemy', entity: new BadGuy() },
                { distance: 30, type: 'enemy', entity: new BadGuy() },
                { distance: 35, type: 'enemy', entity: new BadGuy() },
                { distance: 35, type: 'enemy', entity: new BadGuy() },
                { distance: 40, type: 'enemy', entity: new BadGuy() },
                { distance: 50, type: 'enemy', entity: new BadGuy() },
                { distance: 60, type: 'enemy', entity: new BadGuy() },
                { distance: 70, type: 'enemy', entity: new BadGuy() },
                { distance: 80, type: 'enemy', entity: new BadGuy() },
                { distance: 85, type: 'enemy', entity: new BadGuy() },
                { distance: 85, type: 'enemy', entity: new BadGuy() },
                { distance: 87, type: 'enemy', entity: new BadGuy() },
                { distance: 90, type: 'enemy', entity: new BadGuy() },
                { distance: 95, type: 'enemy', entity: new BadGuy() },
                { distance: 105, type: 'enemy', entity: new BadGuy() },
                { distance: 110, type: 'enemy', entity: new BadGuy() },
                { distance: 110, type: 'enemy', entity: new BadGuy() },
                { distance: 115, type: 'enemy', entity: new BadGuy() },
                { distance: 120, type: 'enemy', entity: new BadGuy() }, 
                { distance: 128, type: 'enemy', entity: new BadGuy() },
                { distance: 130, type: 'enemy', entity: new BadGuy() },
                { distance: 135, type: 'enemy', entity: new BadGuy() },
                { distance: 135, type: 'enemy', entity: new BadGuy() },
                { distance: 140, type: 'enemy', entity: new BadGuy() },
                { distance: 150, type: 'enemy', entity: new BadGuy() },
                { distance: 160, type: 'enemy', entity: new BadGuy() },
                { distance: 170, type: 'enemy', entity: new BadGuy() },
                { distance: 180, type: 'enemy', entity: new BadGuy() },
                { distance: 185, type: 'enemy', entity: new BadGuy() },
                { distance: 185, type: 'enemy', entity: new BadGuy() },
                { distance: 187, type: 'enemy', entity: new BadGuy() },
                { distance: 190, type: 'enemy', entity: new BadGuy() },
                { distance: 195, type: 'enemy', entity: new BadGuy() },
                { distance: 205, type: 'enemy', entity: new BadGuy() },
                { distance: 210, type: 'enemy', entity: new BadGuy() },
                { distance: 210, type: 'enemy', entity: new BadGuy() },
                { distance: 215, type: 'enemy', entity: new BadGuy() },
                { distance: 220, type: 'enemy', entity: new BadGuy() }, 
                { distance: 240, type: 'enemy', entity: new BadGuy() },
                { distance: 245, type: 'enemy', entity: new BadGuy() },
                { distance: 248, type: 'enemy', entity: new BadGuy() },
                { distance: 250, type: 'enemy', entity: new BadGuy() },
                { distance: 270, type: 'enemy', entity: new BadGuy() },
                { distance: 280, type: 'enemy', entity: new BadGuy() },
                { distance: 285, type: 'enemy', entity: new BadGuy() },
                { distance: 285, type: 'enemy', entity: new BadGuy() },
                { distance: 300, type: 'enemy', entity: new BadGuy() },
                { distance: 300, type: 'enemy', entity: new BadGuy() },
                { distance: 310, type: 'enemy', entity: new BadGuy() },
                { distance: 310, type: 'enemy', entity: new BadGuy() },
                { distance: 310, type: 'enemy', entity: new BadGuy() },
                { distance: 310, type: 'enemy', entity: new BadGuy() },
                { distance: 320, type: 'enemy', entity: new BadGuy() },
                { distance: 328, type: 'enemy', entity: new BadGuy() },
                { distance: 330, type: 'enemy', entity: new BadGuy() },
                { distance: 335, type: 'enemy', entity: new BadGuy() },
                { distance: 335, type: 'enemy', entity: new BadGuy() },
                { distance: 340, type: 'enemy', entity: new BadGuy() },
                { distance: 350, type: 'enemy', entity: new BadGuy() },
                { distance: 360, type: 'enemy', entity: new BadGuy() },
                { distance: 370, type: 'enemy', entity: new BadGuy() },
                { distance: 380, type: 'enemy', entity: new BadGuy() },
                { distance: 385, type: 'enemy', entity: new BadGuy() },
                { distance: 385, type: 'enemy', entity: new BadGuy() },
                { distance: 387, type: 'enemy', entity: new BadGuy() },
                { distance: 390, type: 'enemy', entity: new BadGuy() },
                { distance: 395, type: 'enemy', entity: new BadGuy() },
                { distance: 405, type: 'enemy', entity: new BadGuy() },
                { distance: 410, type: 'enemy', entity: new BadGuy() },
                { distance: 410, type: 'enemy', entity: new BadGuy() },
                { distance: 415, type: 'enemy', entity: new BadGuy() },
                { distance: 420, type: 'enemy', entity: new BadGuy() },              
                { distance: 440, type: 'enemy', entity: new BadGuy() },
                { distance: 445, type: 'enemy', entity: new BadGuy() },
                { distance: 448, type: 'enemy', entity: new BadGuy() },
                { distance: 450, type: 'enemy', entity: new BadGuy() },
                { distance: 470, type: 'enemy', entity: new BadGuy() },
                { distance: 480, type: 'enemy', entity: new BadGuy() }
              ]
            }];
  }

	function LevelManager() {
		var levels = Levels.getAll();
		this.currentLevel = levels[0];
	}

	LevelManager.prototype.getCurrentLevel = function() {
		var levelData = this.currentLevel;

		var level = new Level(levelData);
		level.initialize();

		return level;
	}

  function Variables() {
  }

  Variables.headingFontColor = function() {
    return '#FF0000';
  }

  Variables.headingFont= function() {
    return '40px Georgia';
  }

  Variables.headingTextAlign = function() {
    return 'center';
  }

  Variables.headingLocation = function() {
    return new Point(game.width/2, 50);
  }

  Variables.headingTitleLocation = function() {
    return new Point(game.width/2, game.height/2-20);
  }

  Variables.mainItemTextAlign = function() {
    return 'center';
  }

  Variables.mainItemLocation1 = function() {
    return new Point(game.width/2, game.height/2+50);
  }

  Variables.mainItemLocation2 = function() {
    return new Point(game.width/2, game.height/2+70);
  }

  Variables.optionsFont = function() {
    return '15px Georgia';
  }

  Variables.optionsInFocusTextColor = function() {
    return '#FFFFFF';
  }

  Variables.optionsOutOfFocusTextColor = function() {
    return '#777777';
  }

  Variables.optionsRangeSelectorInFocusBorderColor = function() {
    return 'white';
  }

  Variables.optionsRangeSelectorInFocusFillColor = function() {
    return 'red';
  }


  Variables.optionsRangeSelectorOutOfFocusBorderColor = function() {
    return 'grey';
  }

  Variables.optionsRangeSelectorOutOfFocusFillColor = function() {
    return 'grey';
  }

	function Game() {
		this.frameRate = 60;
		this.height = 600;
		this.width = 800;
		this.lastTime = 0;
		this.scenes = [];
		this.goodGuys = [];
		this.scale = 1;
	}

	Game.prototype.initialize = function (width, height, touchEnabled) {
		if(this.height < this.width) {
			this.scale = (height || this.height) / this.height;
		}
		else {
			this.scal = (width || this.width) / this.width;
		}

		this.height = height || this.height;
		this.width = width || this.width;

		

		canvas = document.getElementById('space-odyssey-game');
		canvas.height = height;
		canvas.width = width;
		ctx = canvas.getContext("2d");

		this.lastTime = new Date().getTime();
		this.initializeGameStart();

		var gameController;
		if(touchEnabled) {
			gameController = new TouchGameController();
			gameController.initialize();
		} else {
			gameController = new KeyboardGameController();
			gameController.initialize();
		}

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

	Game.prototype.initializeGameOver = function() {
 		this.scenes = [];
		this.scenes.push(new GameOverMenu());
	};

	Game.prototype.initializeGameStart = function() {
		this.scenes = [];
		this.scenes.push(new LoadingMenu());
		this.scenes.push(new StartMenu());

		var levelManager = new LevelManager();
		var level = levelManager.getCurrentLevel();
		this.scenes.push(level);
		player = new Player();
	};

	Game.prototype.initializeGameReset = function() {
		this.scenes = [];

		var levelManager = new LevelManager();
		var level = levelManager.getCurrentLevel();
		this.scenes.push(level);
		player = new Player();
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

	window.game = new Game();

})(window, undefined);