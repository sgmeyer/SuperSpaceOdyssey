	function Controls() {
	}

	Controls.keycode = {
		space: 32,
		left: 37,
		up: 38,
		right: 39,
		down: 40
	};

	Controls.keyName = function(event) {
		if(Controls.keycode.left == event.which) return 'left';
		if(Controls.keycode.up == event.which) return 'up';
		if(Controls.keycode.right == event.which) return 'right';
		if(Controls.keycode.down == event.which) return 'down';
		if(Controls.keycode.space == event.which) return 'space';
		return event.which;
	}

	Controls.wireUp = function() {
		window.keydown = {};

		document.onkeydown = function(event) {
			keydown[Controls.keyName(event)] = true;
			event.preventDefault();
		};

		document.onkeyup = function(event) {
			keydown[Controls.keyName(event)] = false;
			event.preventDefault();
		};

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
	        position: { right: '5%', bottom: '17%' }, 
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
		        { label: 'start', fontSize: 11, backgroundColor: 'white', fontColor: '000000', offset: { y: '4', x: '-22' }, radius: '4', 
		        	touchStart: function() { 
		            //keydown['space'] = true;
         			},
         			touchEnd: function() {
         				//keydown['space'] = false;
	         		}
	        	},
	        	false, false, false
	        ] 
	    }
		});
	};
