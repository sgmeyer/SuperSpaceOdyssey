  // TODO: refactor to use configuration instead of many parameters.
  function RangeSelector(min, max, current, x, y, label) {
    this.min = min || 0;
    this.max = max || 1;
    this.current = current || this.min;
    this.x = x || 0;
    this.y = y || 0;
    this.label = label || '';
    this.active = false;
  }

  RangeSelector.prototype.setActive = function(isActive) {
    this.active = isActive ? true : false;
  }

  RangeSelector.prototype.adjust = function(adjustedValue) {
    var val = adjustedValue || 0;
    this.current = this.current + val;

    if(this.current > this.max) { this.current = this.max; }
    else if (this.current < this.min) { this.current = this.min }
  }

  RangeSelector.prototype.draw = function(context) {
    var startingPoint = this.x;
    context.fillStyle = this.active ? Variables.optionsInFocusTextColor() : Variables.optionsOutOfFocusTextColor();
    context.font = Variables.optionsFont();
    context.textAlign = 'left';
    context.fillText(this.label, this.y, startingPoint);

    context.beginPath();
    context.rect(this.y, startingPoint + 10, 200, 20);
    context.strokeStyle = this.active ? Variables.optionsRangeSelectorInFocusBorderColor() : Variables.optionsRangeSelectorOutOfFocusBorderColor();
    context.stroke();

    context.beginPath();
    context.rect(this.y+2, startingPoint + 12, 196*this.current, 16);
    context.fillStyle = this.active ? Variables.optionsRangeSelectorInFocusFillColor() : Variables.optionsRangeSelectorOutOfFocusFillColor();
    context.fill();
    context.strokeStyle = this.active ? Variables.optionsRangeSelectorInFocusFillColor() : Variables.optionsRangeSelectorOutOfFocusFillColor();
    context.stroke();
  };
