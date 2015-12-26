function Warez(x, y, spriteId) {
  this.t = 0;
  this.sprite = spriteLibrary.getSprite(spriteId || 'greenWarez');
  this.travelPath = null;

  this.startPoint = new Point(x, y);
  this.endPoint = new Point();

  this.pointsValue = 100;

  this.x = x;
  this.y = y;
  this.height = 15 * game.scale;
  this.width = 15 * game.scale;
  this.active = true;
  this.speed = 1;
};

Warez.prototype.draw = function (context) {
  context.drawImage(this.sprite.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height);
};

Warez.prototype.updateState = function (delta) {
  this.t += (delta / 10) * this.speed;
  if(this.t > 1) { this.kill(); }
  var point = Math.linearInterpolation(this.startPoint, this.endPoint, this.t);
  this.x = point.x;
  this.y = point.y;
};

Warez.prototype.pickUp = function() {
  this.active = false;
}
