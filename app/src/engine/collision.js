	function CollisionEngine() {

	}

	CollisionEngine.collides = function(a, b) {
		return a.x < b.x + b.width &&
					 a.x + a.width > b.x &&
					 a.y < b.y + b.height &&
					 a.y + a.height > b.y;
	};

	CollisionEngine.handleCollisions = function (badGuys, goodGuy, warez) {
		goodGuy.shotBullets.forEach(function(bullet) {
	    	badGuys.forEach(function(badGuy) {
		      	if (!badGuy.exploding && CollisionEngine.collides(bullet, badGuy)) {
		      		badGuy.hitpoints--;
		      		if(badGuy.hitpoints <= 0) {
			    			badGuy.explode();
			    			if(badGuy.endLevelOnKill) { game.scenes[0].end(); }
			    		}
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

		warez.forEach(function(ware) {
			if (!goodGuy.exploding && CollisionEngine.collides(goodGuy, ware)) {
				ware.pickUp();
				player.addPoints(ware.pointsValue);	
			}
		});
	};
