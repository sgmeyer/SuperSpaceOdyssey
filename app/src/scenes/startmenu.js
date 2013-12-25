  function StartMenu() {
    this.active = true;
  }

  StartMenu.prototype.draw = function (context) {   
    context.fillStyle = "#FF0000";
    context.font = "40px Georgia";
    context.textAlign = "center";
    context.fillText("Super Space Odyssey", game.width/2, game.height/2-20); 

    context.fillStyle = "#FFFFFF";
    context.font = "15px Georgia";
    context.textAlign = "center";
    context.fillText("Press Spacebar to Start", game.width/2, game.height/2 + 50);
  };

  StartMenu.prototype.updateState = function (delta) {
    if(keydown.space) {
        this.end();
        // Prevents holding down the key to shoot frequently.
        keydown.space = false;
      }
  };

  StartMenu.prototype.end = function() {
    this.active = false;
  };