  function GameOverMenu() {
    this.active = true;
  };

  GameOverMenu.prototype.draw = function (context) {
    context.fillStyle = "#FF0000";
    context.font = "40px Georgia";
    context.textAlign = "center";
    context.fillText("Game Over: You Suck", game.width/2, game.height/2-20); 

    context.fillStyle = "#FFFFFF";
    context.font = "15px Georgia";
    context.textAlign = "center";
    context.fillText("Press Spacebar to Start Over", game.width/2, game.height/2 + 50);
  };

  GameOverMenu.prototype.updateState = function (delta) {
    if(keydown.space) {
        this.end();
        // Prevents holding down the key to shoot frequently.
        keydown.space = false;
      }
  };

  GameOverMenu.prototype.end = function() {
    game.initializeGameReset();
  };
