  function LoadingMenu() {
    this.active = true;
  
    soundLibrary = new SoundLibrary();
    spriteLibrary = new SpriteLibrary();
  }

  LoadingMenu.prototype.updateState = function(delta) {
    if(soundLibrary.isLoadComplete && spriteLibrary.isLoadComplete) {
      this.end();
    }
  }

  LoadingMenu.prototype.draw = function(context) {
    context.fillStyle = "#FF0000";
    context.font = "40px Georgia";
    context.textAlign = "center";
    context.fillText("Loading...", game.width/2, game.height/2-20); 
  }

  LoadingMenu.prototype.end = function() {
    this.active = false;
  }
