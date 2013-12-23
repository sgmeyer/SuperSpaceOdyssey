	var audioPath = 'sound/';
	var manifest = [
	    {id:'themeSong', src:'Grey_Sector_v0_86_0.mp3'},
	    {id:'lazer', src:'laser1.wav'},
	    {id:'explosion', src:'8bit_bomb_explosion.wav'}
	];

	var audio = {
		explosion: null,
		themeSong: null,
		initialize: function() {
			createjs.Sound.addEventListener("fileload", function(event) {
				audio.playThemeSong();
			});
			createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
    	createjs.Sound.registerManifest(manifest, audioPath);
		},
		playExplosion: function() {
			createjs.Sound.play('explosion');
		},
		playThemeSong: function() {
			createjs.Sound.play('themeSong');
		},
		playLaser: function() {
			createjs.Sound.play('lazer');
		}
	};
