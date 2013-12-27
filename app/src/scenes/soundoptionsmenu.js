  function SoundOptionsMenu() {
    this.active = true;
    this.musicVolumeControl = new RangeSelector(0, 1, 1, 100, 188, 'Music Volume');
    this.soundEffectsVolumeControl = new RangeSelector(0, 1, 1, 160, 188, 'Sound Effects Volume');
    this.backButton = new LinkButton(188, 220, 'Back');
    this.selectedOption = 1;
  };

  SoundOptionsMenu.prototype.updateState = function(delta) {
    if(keydown.left) {
      keydown.left = false;
      if(this.selectedOption === 1) {
        this.musicVolumeControl.adjust(-.1);
        soundLibrary.setMusicVolume(this.musicVolumeControl.current);
      } else if (this.selectedOption === 2) {
        this.soundEffectsVolumeControl.adjust(-.1);
        soundLibrary.setSoundEffectsVolume(this.soundEffectsVolumeControl.current);
        soundLibrary.playLaser();
      }
    }
    if(keydown.right) {
      keydown.right = false;
      if(this.selectedOption === 1) {
        this.musicVolumeControl.adjust(.1);
        soundLibrary.setMusicVolume(this.musicVolumeControl.current);
      } else if (this.selectedOption === 2) {
        this.soundEffectsVolumeControl.adjust(.1);
        soundLibrary.setSoundEffectsVolume(this.soundEffectsVolumeControl.current);
        soundLibrary.playLaser();
      }
    }
    if(keydown.down) {
      keydown.down = false;
      this.selectedOption++;
      if(this.selectedOption > 3) { this.selectedOption = 1; }
    }
    if(keydown.up) {
      keydown.up = false;
      this.selectedOption--;
      if(this.selectedOption < 1) { this.selectedOption = 3; }
    }
    if(keydown.space) {
      keydown.space = false;
      if(this.selectedOption === 3) { this.end(); }
    }

    this.musicVolumeControl.setActive(this.selectedOption === 1);
    this.soundEffectsVolumeControl.setActive(this.selectedOption === 2);
    this.backButton.setActive(this.selectedOption === 3);
  };

  SoundOptionsMenu.prototype.draw = function(context) {
    context.fillStyle = Variables.headingFontColor();
    context.font = Variables.headingFont();
    context.textAlign = Variables.headingTextAlign();
    var headingLocation = Variables.headingLocation();
    context.fillText('Sound Options', headingLocation.x, headingLocation.y); 

    this.musicVolumeControl.draw(context);
    this.soundEffectsVolumeControl.draw(context);
    this.backButton.draw(context);
  };

  SoundOptionsMenu.prototype.end = function () {
    game.scenes.splice(1, 0, new StartMenu());
    this.active = false;
  };
