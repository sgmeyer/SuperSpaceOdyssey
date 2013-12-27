  function LinkButton(x, y, label, textAlign) {
    this.x = x || 0;
    this.y = y || 0;
    this.label = label || '';
    this.textAlign = textAlign || '';
    this.active = true;
  }

  LinkButton.prototype.setActive = function(isActive) {
    this.active = isActive ? true : false;
  }

  LinkButton.prototype.draw = function (context) {
    context.fillStyle = this.active ? Variables.optionsInFocusTextColor() : Variables.optionsOutOfFocusTextColor();
    context.font = Variables.optionsFont();
    context.textAlign = this.textAlign;
    context.fillText(this.label, this.x, this.y);
  }
