	function CollisionEngine() {

	}

	CollisionEngine.collides = function(a, b) {

		var a_x = (a.y * -1) + (game.width/2) - a.width;
		var a_y = a.x + (game.height/2);
		var a_width = a.height;
		var a_height = a.width;
		var b_x = b.y + (game.width/2);
		var b_y = (b.x * -1) + (game.height/2) - b.height;	

		// TODO: does this return a boolean or a truth/falsy.
		return a_x < b_x + b.width &&
				   a_x + a.width > b_x &&
				   a_y < b_y + b.height &&
				   a_y + a.height > b_y;
	};

	CollisionEngine.handleCollisions = function (badGuys, goodGuy) {
		goodGuy.shotBullets.forEach(function(bullet) {
	    	badGuys.forEach(function(badGuy) {
		      	if (!badGuy.exploding && CollisionEngine.collides(bullet, badGuy)) {
		    			badGuy.explode();
		        	bullet.kill();
		        	player.addPoints(10);
		      	}
		    });
		});

		if(goodGuy.invincibilityTimeRemaining <= 0) {
			badGuys.forEach(function(badGuy) {
				badGuy.shotBullets.forEach(function(bullet){
			      if (CollisionEngine.collides(bullet, goodGuy)) {
			    		bullet.kill();
			    		goodGuy.explode();
			      }
			    });
			});

			badGuys.forEach(function(badGuy) {
				if (!goodGuy.exploding && !badGuy.exploding && CollisionEngine.collides(goodGuy, badGuy)) {
					badGuy.explode();
					goodGuy.explode();
				}
			});
		}
	};
