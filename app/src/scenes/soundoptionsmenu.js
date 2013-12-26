  function SoundOptionsMenu() {
    this.active = true;
    this.musicVolumeControl = new RangeSelector(0, 1, 1, 100, 188, 'Music Volume');
    this.soundEffectsVolumeControl = new RangeSelector(0, 1, 1, 160, 188, 'Sound Effects Volume');
    this.backButton = new LinkButton(188, 220, 'Back');
    this.selectedOption = 1;
  };

  SoundOptionsMenu.prototype.updateState = function(delta) {
    if(keydown.left) {
      if(this.selectedOption === 1) {
        this.musicVolumeControl.adjust(-.1);
        soundLibrary.setMusicVolume(this.musicVolumeControl.current);
      } else if (this.selectedOption === 2) {
        this.soundEffectsVolumeControl.adjust(-.1);
        soundLibrary.setSoundEffectsVolume(this.soundEffectsVolumeControl.current);
        soundLibrary.playLaser();
      }
      keydown.left = false;
    }
    if(keydown.right) {
      if(this.selectedOption === 1) {
        this.musicVolumeControl.adjust(.1);
        soundLibrary.setMusicVolume(this.musicVolumeControl.current);
      } else if (this.selectedOption === 2) {
        this.soundEffectsVolumeControl.adjust(.1);
        soundLibrary.setSoundEffectsVolume(this.soundEffectsVolumeControl.current);
        soundLibrary.playLaser();
      }
      keydown.right = false;
    }
    if(keydown.down) {
      this.selectedOption++;
      if(this.selectedOption > 3) { this.selectedOption = 1; }
      keydown.down = false;
    }
    if(keydown.up) {
      this.selectedOption--;
      if(this.selectedOption < 1) { this.selectedOption = 3; }
      keydown.up = false;
    }
    if(keydown.space) {
      if(this.selectedOption === 3) { this.end(); }
      keydown.space = false;
    }

    this.musicVolumeControl.setActive(this.selectedOption === 1);
    this.soundEffectsVolumeControl.setActive(this.selectedOption === 2);
    this.backButton.setActive(this.selectedOption === 3);
  };

  SoundOptionsMenu.prototype.draw = function(context) {
    context.fillStyle = '#FF0000';
    context.font = '40px Georgia';
    context.textAlign = 'center';
    context.fillText('Sound Options', game.width/2, 50); 

    this.musicVolumeControl.draw(context);
    this.soundEffectsVolumeControl.draw(context);
    this.backButton.draw(context);
  };

  SoundOptionsMenu.prototype.end = function () {
    game.scenes.splice(1, 0, new StartMenu());
    this.active = false;
  };
