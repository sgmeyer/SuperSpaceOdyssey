var game = {
	frameRate: 60,
	height: 400,
	width: 600,
	lastTime:0,
	scenes: [],
	goodGuys: [],
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
		this.scenes.push(new Level());
		this.goodGuys.push(new GoodGuy());
		this.goodGuys.push(new GoodGuy());
		this.goodGuys.push(new GoodGuy());
	},
 	initializeGameReset: function() {
		this.scenes = [];
		this.scenes.push(new Level());
		this.goodGuys.push(new GoodGuy());
		this.goodGuys.push(new GoodGuy());
		this.goodGuys.push(new GoodGuy());
	}
}