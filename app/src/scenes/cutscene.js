  function Cutscene() {
    this.active = true;
    this.timer = 10;
    this.timer2 = 8;
  };

  Cutscene.prototype.draw = function (context) {
    context.fillStyle = Variables.headingFontColor();
    context.font = Variables.headingFont();
    context.textAlign = Variables.headingTextAlign();

    var titleLocation = Variables.headingTitleLocation();
    context.fillText("some awesome content here   " + this.timer, titleLocation.x, titleLocation.y); 
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
