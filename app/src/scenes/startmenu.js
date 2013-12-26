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
    context.fillStyle = "#FF0000";
    context.font = "40px Georgia";
    context.textAlign = "center";
    context.fillText("Super Space Odyssey", game.width/2, game.height/2-20); 

    this.startButton.draw(context);
    this.optionsButton.draw(context);
  };

  StartMenu.prototype.end = function() {
    if(this.optionsButton.active) {
      game.scenes.splice(1, 0, new SoundOptionsMenu());
    }

    this.active = false;
  };
