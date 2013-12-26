  function LinkButton(x, y, label, textAlign) {
    this.x = x || 0;
    this.y = y || 0;
    this.label = label || '';
    this.textAlign = textAlign || 'left';
    this.active = true;
  }

  LinkButton.prototype.setActive = function(isActive) {
    this.active = isActive ? true : false;
  }

  LinkButton.prototype.draw = function (context) {
    context.fillStyle = this.active ? '#FFFFFF' : '#777777';;
    context.font = '15px Georgia';
    context.textAlign = this.textAlign;
    context.fillText(this.label, this.x, this.y);
  }
