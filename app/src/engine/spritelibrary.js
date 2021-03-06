function SpriteLibrary() {
  var shipImage = new Image();
  shipImage.src = 'images/shipsall_4.gif';

  var shipImageTransparent = new Image();
  shipImageTransparent.src = 'images/ships-semi-transparent.png';

  var boss1 = new Image();
  boss1.src = 'images/boss1.png';

  var bulletImage = new Image();
  bulletImage.src = 'images/bullets.png';

  var explosionImage = new Image();
  explosionImage.src = 'images/exp2_0.png';

  this.staticSprites = [
    {id: 'goodGuyShip', x: 127, y: 67, width: 59, height: 56, image: shipImage},
    {id: 'goodGuyShipInvincible', x: 127, y: 67, width: 59, height: 56, image: shipImageTransparent},
    {id: 'badGuyShip', x: 130, y: 6, width: 57, height: 55, image: shipImage},
    {id: 'badGuyShip2', x: 4, y: 7, width: 55, height: 53, image: shipImage},
    {id: 'badGuyShip3', x: 65, y: 70, width: 58, height: 51, image: shipImage},
    {id: 'badGuyShip4', x: 4, y: 130, width: 55, height: 56, image: shipImage},
    //{id: 'bomb', x: 133, y: 69, width: 18, height: 45, image: shipImage},
    {id: 'lazerBlue', x: 86, y: 69, width: 47, height: 13, image: bulletImage},
    {id: 'lazerRed', x: 86, y: 52, width: 47, height: 13, image: bulletImage},
    {id: 'greenWarez', x: 110, y: 260, width: 12, height: 12, image: bulletImage},
    {id: 'boss1', x: 110, y: 2600, width: 12, height: 12, image:boss1}
  ];
  this.animationSprites = [
    { id: 'explosion',
      intervals: [
        { time: .1, x: 0, y: 0, height: 55, width: 55},
        { time: .2, x: 65, y: 0, height: 55, width: 55},
        { time: .3, x: 130, y: 0, height: 55, width: 55},
        { time: .4, x: 195, y: 0, height: 55, width: 55},
        { time: .5, x: 0, y: 65, height: 55, width: 55},
        { time: .6, x: 65, y: 65, height: 55, width: 55},
        { time: .7, x: 130, y: 65, height: 55, width: 55},
        { time: .8, x: 195, y: 65, height: 55, width: 55},
        { time: .9, x: 0, y: 130, height: 55, width: 55},
        { time: 1.0, x: 65, y: 130, height: 55, width: 55},
        { time: 1.1, x: 130, y: 130, height: 55, width: 55},
        { time: 1.2, x: 195, y: 130, height: 55, width: 55}
      ],
      image: explosionImage
    }
  ];
  this.isLoadComplete = true;
}

SpriteLibrary.prototype.getSprite = function(id) {
  for(var i = 0; i < this.staticSprites.length; i++) {
    if(this.staticSprites[i].id === id) {
      return this.staticSprites[i];
    }
  }
}

SpriteLibrary.prototype.getAnimation = function(id) {
  for(var i = 0; i < this.animationSprites.length; i++) {
    if(this.animationSprites[i].id === id) {
      return this.animationSprites[i];
    }
  }
}

SpriteLibrary.prototype.getAnimationFrame = function(animation, time) {
  for(var i = 0; i < animation.intervals.length; i++) {
    if(time < animation.intervals[i].time) {
      return animation.intervals[i];
    }
  }
}
