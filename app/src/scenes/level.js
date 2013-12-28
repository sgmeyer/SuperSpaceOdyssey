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
    if(this.currentDistance >= this.distance || game.goodGuys.length < 1) { this.end(); }

    this.background.updateState(delta);
    game.goodGuys = game.goodGuys.filter(function(goodGuy) { return goodGuy.active; });
    this.badGuys = this.badGuys.filter(function(badGuy) { return badGuy.active; });

    if(game.goodGuys.length > 0) { CollisionEngine.handleCollisions(this.badGuys, game.goodGuys[0]); }
    if(game.goodGuys.length > 0) { game.goodGuys[0].updateState(delta); }
    this.badGuys.forEach(function (badGuy) { badGuy.updateState(delta); });

    this.updateLevel(delta);
  }

  Level.prototype.draw = function(context) {
    this.background.draw(context);

    if(game.goodGuys.length > 0) { 
      game.goodGuys[0].draw(context);
      this.badGuys.forEach(function (badGuy) { badGuy.draw(context); });
    }

    context.fillStyle = "orange";
    context.font = "20px Georgia";
    context.textAlign = "right";
    context.fillText("Score: " + game.score.toString(), game.width - 50, 20);
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
