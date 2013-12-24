	function SoundLibrary() {
	}

	SoundLibrary.prototype.initialize = function() {
		var audioPath = 'sound/';
		var manifest = [
		    {id:'themeSong', src:'Grey_Sector_v0_86_0.mp3'},
		    {id:'lazer', src:'laser1.wav'},
		    {id:'explosion', src:'8bit_bomb_explosion.wav'}
		];

		createjs.Sound.addEventListener("fileload", function(event) { soundLibrary.playThemeSong(); });
		createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
  	createjs.Sound.registerManifest(manifest, audioPath);
	}

	SoundLibrary.prototype.playExplosion = function() {
		createjs.Sound.play('explosion');
	}

	SoundLibrary.prototype.playThemeSong = function() {
		createjs.Sound.play('themeSong');
	}
	
	SoundLibrary.prototype.playLaser = function() {
		createjs.Sound.play('lazer');
	}