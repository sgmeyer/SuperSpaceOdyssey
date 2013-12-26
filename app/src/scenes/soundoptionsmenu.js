function SoundOptionsMenu() {
  this.active = true;
  this.musicVolume = 1;
  this.soundEffectsVolume = 1;
};

SoundOptionsMenu.prototype.updateState = function(delta) {
  if(keydown.left) {
    this.musicVolume -= .1;
    this.musicVolume = Math.max(this.musicVolume, 0);
    keydown.left = false;
  }
  if(keydown.right) {
    this.musicVolume += .1;
    this.musicVolume = Math.min(this.musicVolume, 1);
    keydown.right = false;
  }
};

SoundOptionsMenu.prototype.draw = function(context) {
  context.fillStyle = '#FF0000';
  context.font = '40px Georgia';
  context.textAlign = 'center';
  context.fillText('Sound Options', game.width/2, 50); 

  var startingPoint = 100;
  context.fillStyle = '#FFFFFF';
  context.font = '15px Georgia';
  context.textAlign = 'left';
  context.fillText('Music Volume', 188, startingPoint);

  context.beginPath();
  context.rect(188, startingPoint + 10, 200, 20);
  context.strokeStyle = 'white';
  context.stroke();

  context.beginPath();
  context.rect(190, startingPoint + 12, 196*this.musicVolume, 16);
  context.fillStyle = 'red';
  context.fill();
  context.strokeStyle = 'red';
  context.stroke();
};

SoundOptionsMenu.prototype.end = function () {
  this.active = false;
}
