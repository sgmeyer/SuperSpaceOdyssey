  function KeyboardGameController() {
  };

  KeyboardGameController.prototype.initialize = function() {
    keydown = {};

    document.onkeydown = function(event) {
      keydown[Controls.keyName(event)] = true;
      event.preventDefault();
    };

    document.onkeyup = function(event) {
      keydown[Controls.keyName(event)] = false;
      event.preventDefault();
    };
  };
