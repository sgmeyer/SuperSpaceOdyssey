var controls = {
	keycode: {
		space: 32,
		left: 37,
		up: 38,
		right: 39,
		down: 40
	},
	wireUp: function() {
		window.keydown = {};

		function keyName(event) {
			if(controls.keycode.left == event.which) return "left";
			if(controls.keycode.up == event.which) return "up";
			if(controls.keycode.right == event.which) return "right";
			if(controls.keycode.down == event.which) return "down";
			if(controls.keycode.space == event.which) return "space";
			return event.which;
		}

		document.onkeydown = function(event) {
			keydown[keyName(event)] = true;
			event.preventDefault();
		};

		document.onkeyup = function(event) {
			keydown[keyName(event)] = false;
			event.preventDefault();
		};
	}
}