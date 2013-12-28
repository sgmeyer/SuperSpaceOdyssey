  function GameOverMenu() {
    this.active = true;
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
    if(keydown.space) {
        this.end();
        // Prevents holding down the key to shoot frequently.
        keydown.space = false;
      }
  };

  GameOverMenu.prototype.end = function() {
    game.initializeGameReset();
    this.active = false;
  };
