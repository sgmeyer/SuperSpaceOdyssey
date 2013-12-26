  function StartMenu() {
    this.active = true;
    this.selectedOption = 1;

    this.startButton = new LinkButton(game.width/2, game.height/2+50, 'Start Game', 'center');
    this.optionsButton = new LinkButton(game.width/2, game.height/2 + 70, 'Options', 'center');
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
    context.textAlign = Variables.headingTextAlign;
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
