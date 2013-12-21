var audio = {
	//explosion: null,
	//themeSong: null,
	initialize: function() {
        audio.themeSong = new Audio("./sound/Grey_Sector_v0_86_0.mp3");
        audio.themeSong.volume = 1;
        audio.themeSong.loop = true;
	},
	playExplosion: function() {
		//var xp = new Audio("./sound/8bit_bomb_explosion.wav");
		//xp.volume = 1;
    //xp.loop = false;
		//xp.play();
		//xp = undefined;
	},
	playThemeSong: function() {
		audio.themeSong.play();
	},
	playLaser: function() {
		//var lzr = new Audio("./sound/laser1.wav"); 
		//lzr.volume = .25;
		//lzr.loop = false;
		//lzr.play();
	}
};
