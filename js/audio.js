var temp = 0;

var audio = {
	explosion: null,
	themeSong: null,
	initialize: function() {
        audio.explosion = new Audio("./sound/8bit_bomb_explosion.wav"); // buffers automatically when created
        audio.explosion.loop = false;

        audio.themeSong = new Audio("./sound/Grey_Sector_v0_86_0.mp3");
        audio.themeSong.loop = true;
	},
	playExplosion: function() {
		var xp = new Audio("./sound/8bit_bomb_explosion.wav"); // buffers automatically when created
        xp.loop = false;
		xp.play();
	},
	playThemeSong: function() {
		audio.themeSong.play();
	}
};