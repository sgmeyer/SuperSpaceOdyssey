  function StartMenu() {
    this.active = true;
    this.selectedOption = 1;
  }

  StartMenu.prototype.draw = function (context) {   
    context.fillStyle = "#FF0000";
    context.font = "40px Georgia";
    context.textAlign = "center";
    context.fillText("Super Space Odyssey", game.width/2, game.height/2-20); 

    context.fillStyle = this.selectedOption === 1 ? "#FFFFFF" : "#777777"; 
    context.font = "15px Georgia";
    context.textAlign = "center";
    context.fillText("Start Game", game.width/2, game.height/2 + 50);

    context.fillStyle = this.selectedOption === 2 ? "#FFFFFF" : "#777777";
    context.font = "15px Georgia";
    context.textAlign = "center";
    context.fillText("Options", game.width/2, game.height/2 + 70);
  };

  StartMenu.prototype.updateState = function (delta) {
    if(keydown.space) {
      this.end();
      // Prevents holding down the key to shoot frequently.
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
  };

  StartMenu.prototype.end = function() {
    if(this.selectedOption === 2) {
      game.scenes.splice(1, 1, new SoundOptionsMenu());
    }

    this.active = false;
  };