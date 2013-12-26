  function LinkButton(x, y, label) {
    this.x = x || 0;
    this.y = y || 0;
    this.label = label || '';
    this.active = false;
  }

  LinkButton.prototype.setActive = function(isActive) {
    this.active = isActive ? true : false;
  }

  LinkButton.prototype.draw = function (context) {

    context.fillStyle = this.active ? '#FFFFFF' : '#777777';;
    context.font = '15px Georgia';
    context.textAlign = 'left';
    context.fillText(this.label, this.y, this.x);
  }
