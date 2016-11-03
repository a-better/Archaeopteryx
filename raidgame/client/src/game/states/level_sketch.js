var Level_Sketch = function () {};
var test;
module.exports = Level_Sketch;

Level_Sketch.prototype = {
  init : function(){
    this.i=0;
    this.oldX = null;
    this.oldY = null;
    this.brsuhSize = null;
    this.onUp = true;
  },
  preload : function(){
    var thumbnail = document.getElementById('thumbnail').value;
    game.load.image('thumbnail', thumbnail);
  },
  create : function(){
    console.log('level');
  	level = this;
    this.initializeCanvas();
    game.input.addMoveCallback(this.sendPaint, this);   
  },
  update : function(){
    for(var i=0; i< engine.room.paints.length; i++){
        var paint = engine.room.paints[i];
        this.paint(paint.oldX, 
          paint.oldY, 
          paint.x, 
          paint.y, 
          paint.rgba,
          paint.brushSize);
    }
    engine.room.paints = [];
    if(clear == true){
      bmd.fill(255, 255, 255);
      clear = false;
    }
    if(game.input.activePointer.isUp && this.onUp == false){
      this.onUp == true;
      this.oldX = null;
      this.oldY = null;
     }

  	this.lastFrameTime = game.time.now;
  },
  render: function(){
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");   
  },
  initializeCanvas : function(){
      bmd = game.add.bitmapData(window.innerWidth, window.innerHeight);
      ctx = bmd.context;
      bmd.fill(255, 255, 255);
      game.add.sprite(0, 0, bmd);
      this.brushSize = 5 * 1/500000;
  },
  sendPaint : function(pointer, x, y){
    var xRatio;
    var yRatio;
    if (pointer.isDown)
    {
      this.onUp = false;
      xRatio = x/window.innerWidth;
      yRatio = y/window.innerHeight;
      if(eraser == false){
          engine.room.sendPaint(this.oldX, this.oldY, xRatio, yRatio, colorPicker.rgba, this.brushSize);
          this.paint(this.oldX, this.oldY, xRatio, yRatio, colorPicker.rgba, this.brushSize);
      }
      else{
          var brushSize = this.brushSize * 5;
          engine.room.sendPaint(this.oldX, this.oldY, xRatio, yRatio, 'rgba(255,255,255, 1)', brushSize);
          this.paint(this.oldX, this.oldY, xRatio, yRatio, 'rgba(255,255,255, 1)', brushSize);
      }
      this.oldX = xRatio;
      this.oldY = yRatio;
    }

  },
  paint : function(oldX, oldY, x, y, rgba, brushSize){
        brushSize = brushSize *  window.innerWidth * window.innerHeight ;
        x = x * window.innerWidth;
        y = y * window.innerHeight;
        if(oldX == null || oldY == null){
          bmd.circle(x, y, brushSize/2, rgba);
        } 
        else{  
          oldX = oldX * window.innerWidth;
          oldY = oldY * window.innerHeight;
          bmd.line(oldX, oldY, x, y, rgba, brushSize);
        } 
  }

};

