	function SoundLibrary() {
		this.musicVolume = 1;
		this.soundEffectsVolume = 1;
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
		var explosion = createjs.Sound.play('explosion');
		explosion.volume = this.soundEffectsVolume;
	}

	SoundLibrary.prototype.playThemeSong = function() {
		var music = createjs.Sound.play('themeSong');
		music.volume = this.musicVolume;
	}
	
	SoundLibrary.prototype.playLaser = function() {
		var lazer = createjs.Sound.play('lazer');
		lazer.volume = this.soundEffectsVolume;
	}