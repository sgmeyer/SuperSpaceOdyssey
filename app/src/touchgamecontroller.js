  function TouchGameController() {
  };

  TouchGameController.prototype.initialize = function() {
    window.keydown = {};
    GameController.init({ 
      left: { 
        position: { left: '10%', bottom: '17%' },
        type: 'joystick',
        joystick: {
          touchMove: function(details) {
            keydown['left'] = details.normalizedX < 0;
            keydown['up'] = details.normalizedY > 0;
            keydown['right'] = details.normalizedX > 0;
            keydown['down'] = details.normalizedY < 0;
          },
          touchEnd: function() {
            keydown['left'] = false;
            keydown['up'] = false;
            keydown['right'] = false;
            keydown['down'] = false;
          }
        }
      }, 
      right: { 
        position: { right: '5%' }, 
        type: 'buttons', 
        buttons: [
          { label: 'shoot', fontSize: 13, backgroundColor: 'red', 
            touchStart: function() { 
              keydown['space'] = true;
            },
            touchEnd: function() {
              keydown['space'] = false;
            }
          }, 
          false, false, false
        ] 
      }
    });
  };
