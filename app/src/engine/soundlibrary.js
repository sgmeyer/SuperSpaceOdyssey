	function SoundLibrary() {
		this.musicVolume = 1;
		this.soundEffectsVolume = 1;
		this.currentMusic = null;
		this.isLoadComplete = false;

		var audioPath = 'sound/';
		var soundsLoadingProgress = {
			introSong: false,
			themeSong: false
		};
		var manifest = [
		    {id: 'introSong', src: 'Digital Native.mp3'},
		    {id: 'normalPickup', src: 'Pickup_01.mp3'},
		    {id: 'themeSong', src: 'Grey_Sector_v0_86_0.mp3'},
		    {id: 'lazer', src: 'laser1.wav'},
		    {id: 'explosion', src: '8bit_bomb_explosion.wav'}
		];

		createjs.Sound.addEventListener("fileload", function(event) {
			console.log(event.id);
			soundsLoadingProgress[event.id] = true;
			soundLibrary.isLoadComplete =
				soundsLoadingProgress.introSong &&
				soundsLoadingProgress.themeSong &&
				soundsLoadingProgress.normalPickup &&
				soundsLoadingProgress.lazer &&
				soundsLoadingProgress.explosion;
		});

		createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
  	createjs.Sound.registerManifest(manifest, audioPath);
	}

	SoundLibrary.prototype.setMusicVolume = function(volume) {
		this.musicVolume = volume || this.musicVolume;

		if(this.currentMusic) {
			this.currentMusic.setVolume(volume);
		}
	}

	SoundLibrary.prototype.setSoundEffectsVolume = function(volume) {
		this.soundEffectsVolume = volume || this.soundEffectsVolume;
	}

	SoundLibrary.prototype.playExplosion = function() {
		var explosion = createjs.Sound.play('explosion');
		explosion.setVolume(this.soundEffectsVolume);
	}

	SoundLibrary.prototype.playNormalPickup = function() {
		var explosion = createjs.Sound.play('normalPickup');
		explosion.setVolume(this.soundEffectsVolume);
	}

	SoundLibrary.prototype.playIntroSong = function() {
		this.currentMusic = createjs.Sound.play('introSong',  {loop: -1});
		this.currentMusic.setVolume(this.musicVolume);
	}

	SoundLibrary.prototype.playThemeSong = function() {
		this.currentMusic = createjs.Sound.play('themeSong');
		this.currentMusic.setVolume(this.musicVolume);
	}

	SoundLibrary.prototype.playLaser = function() {
		var lazer = createjs.Sound.play('lazer');
		lazer.setVolume(this.soundEffectsVolume);
	}

	SoundLibrary.prototype.stopAllSounds = function() {
		createjs.Sound.stop();
	}
