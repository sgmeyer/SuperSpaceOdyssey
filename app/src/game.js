	function Game() {
		this.frameRate = 60;
		this.height = 600;
		this.width = 800;
		this.lastTime = 0;
		this.scenes = [];
		this.goodGuys = [];
		this.score = 0;
		this.scale = 1;
	}

	Game.prototype.initialize = function (width, height, touchEnabled) {

		if(this.height < this.width) {
			this.scale = (height || this.height) /  this.height;
		}
		else {
			this.scal = (width || this.width) / this.width;
		}

		this.height = height || this.height;
		this.width = width || this.width;

		soundLibrary = new SoundLibrary();
		soundLibrary.initialize();
		spriteLibrary = new SpriteLibrary();

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

	window.game = new Game();
