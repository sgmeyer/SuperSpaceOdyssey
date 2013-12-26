function SoundOptionsMenu() {

};

SoundOptionsMenu.prototype.update = function(delta) {

};

SoundOptionsMenu.prototype.draw = function(context) {
  context.fillStyle = "#FF0000";
    context.font = "40px Georgia";
    context.textAlign = "center";
    context.fillText("Sound Options", game.width/2, 50); 
};
