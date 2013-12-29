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
    {id: 'goodGuyShip', x: 69, y: 125, width: 56, height: 59, image: shipImage},
    {id: 'goodGuyShipInvincible', x: 69, y: 125, width: 56, height: 59, image: shipImageTransparent},
    {id: 'badGuyShip', x: 131, y: 128, width: 54, height: 56, image: shipImage},
    {id: 'badGuyShip2', x: 6, y: 3, width: 56, height: 43, image: shipImage},
    {id: 'badGuyShip3', x: 132, y: 4, width: 52, height: 55, image: shipImage},
    {id: 'badGuyShip4', x: 71, y: 65, width: 49, height: 57, image: shipImage},
    {id: 'bomb', x: 133, y: 69, width: 18, height: 45, image: shipImage},
    {id: 'lazer', x: 85, y: 69, width: 49, height: 13, image: bulletImage},
    {id: 'boss1', x: 0, y: 0, width: 278, height: 347, image:boss1}
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