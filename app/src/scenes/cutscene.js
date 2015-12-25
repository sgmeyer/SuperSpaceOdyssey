  function Cutscene() {
    this.active = true;
    this.timer = 3;
    this.timer2 = 0;
  };

  Cutscene.prototype.draw = function (context) {
    context.fillStyle = Variables.headingFontColor();
    context.font = Variables.headingFont();
    context.textAlign = Variables.headingTextAlign();

    var titleLocation = Variables.headingTitleLocation();
    context.fillText('The game will begin in ' + Math.ceil(this.timer), titleLocation.x, titleLocation.y);
    this.startButton.draw(context);
  };

  Cutscene.prototype.updateState = function (delta) {
    this.timer -= delta;

    if(this.timer <- 0) { this.end(); }

    if(keydown.space && this.timer2 > this.timer) {
      keydown.space = false;
      this.end();
    }
  };

  Cutscene.prototype.end = function() {
    this.active = false;
  };
