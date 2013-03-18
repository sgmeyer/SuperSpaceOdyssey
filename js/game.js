var game = {
	frameRate: 60,
	height: 400,
	width: 600,
	lastTime: 0,
	scenes: [],
	goodGuys: [],
	score: 0,
	initialize: function () {
		audio.initialize();
		controls.wireUp();
		sprite = this.loadSprite("./images/shipsall_4.gif");
		spriteExplosion = this.loadSprite("./images/exp2_0.png");

		canvas = $("#space-odyssey-game")[0];
		ctx = canvas.getContext("2d");

		this.lastTime = new Date().getTime();
		audio.playThemeSong();
		this.initializeGameStart();

		this.setLoop();
	},
	updateScene: function (delta) {
		this.scenes = this.scenes.filter(function (scene) { return scene.active; });
		if(this.scenes.length > 0) {
			this.scenes[0].updateState(delta);
		}		
	},
	renderScene: function() { 
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(this.scenes.length > 0) {
			this.scenes[0].draw(ctx);
		}
	},
	loadSprite: function(name) {
	    var sprite = new Image();
	    sprite.src = name;
	    return sprite;
	},
 	initializeGameOver: function() {
 		this.scenes = [];
		this.scenes.push(new GameOverMenu());
	},
 	initializeGameStart: function() {
		this.scenes = [];
		this.scenes.push(new StartMenu());

		var lvl = new Level();
		lvl.initialize();
		this.scenes.push(lvl);
		this.goodGuys.push(new GoodGuy());
		this.goodGuys.push(new GoodGuy());
		this.goodGuys.push(new GoodGuy());
		this.score = 0;
	},
 	initializeGameReset: function() {
		this.scenes = [];

		var lvl = new Level();
		lvl.initialize();
		this.scenes.push(lvl);
		this.goodGuys.push(new GoodGuy());
		this.goodGuys.push(new GoodGuy());
		this.goodGuys.push(new GoodGuy());
		this.score = 0;
	},
	setLoop: function() {
		setInterval(function() {
				var currentTime = new Date().getTime();
				var delta = (currentTime - game.lastTime) / 1000.0;
				game.lastTime = currentTime;
				
				if (delta > 1.0) delta = 1.0;
				game.updateScene(delta);
				game.renderScene();
			}, 
		1000/this.frameRate);
	}
}