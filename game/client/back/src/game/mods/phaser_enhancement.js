
Phaser.Game.prototype.setCanvas = function(parent, id){
  var div = document.getElementById(parent);
  var canvas =  div.getElementsByTagName("canvas");
  canvas.id = id;
};