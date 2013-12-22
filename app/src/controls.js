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
		if(Controls.keycode.left == event.which) return "left";
		if(Controls.keycode.up == event.which) return "up";
		if(Controls.keycode.right == event.which) return "right";
		if(Controls.keycode.down == event.which) return "down";
		if(Controls.keycode.space == event.which) return "space";
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
	};
