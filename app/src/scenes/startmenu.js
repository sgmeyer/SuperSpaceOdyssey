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
      soundLibrary.stopAllSounds();
      soundLibrary.playThemeSong();
    }

    this.active = false;
  };
