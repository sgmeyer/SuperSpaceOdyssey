function Player() {
  this.points = 0;
  this.lives = 3;
  this.currentGoodGuy;
}

Player.prototype.addPoints = function(points) {
  this.points += points || 0;
};

Player.prototype.addLife = function() {
  this.lives++;
}

Player.prototype.removeLife = function() {
  this.lives--;
}

Player.prototype.getScore = function() {
  return this.points.toString();
}

Player.prototype.getCurrentGoodGuy = function() {
  return this.currentGoodGuy = this.currentGoodGuy || new GoodGuy();
}

Player.prototype.hasLives = function() {
  return this.lives > 0;
}

Player.prototype.kill = function() {
  this.removeLife();
  this.currentGoodGuy = undefined;
}