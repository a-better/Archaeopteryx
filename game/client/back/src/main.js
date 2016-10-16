var Engine = require('./game/engine/engine');
var ColorPicker = require('./game/utils/color_picker');
window.canvasParent = 'phaser';
var roomId 		= document.getElementById('roomId').value;
var nickname 	= document.getElementById('nickname').value;
var thumbnail 	= document.getElementById('thumbnail').value;
var scoreBoard 	= document.getElementById('scoreBoard');
var dialog 		= document.getElementById('message_box_div');   
var colorCanvas = document.getElementById('color_picker');


var engine = new Engine();
var img = new Image();
img.src = 'colorPicker.jpg';
var colorPicker = new ColorPicker(colorCanvas, img);

window.player = null;
window.eraser = false;
window.clear = false;
window.level = null;
window.scale = 1.3;
$('#eraser').click(function(){
	if(eraser == true){
		$('#eraser').val('eraser');
		eraser = false;
	}
	else{
		$('#eraser').val('brush');
		eraser = true;
	}
});
$('#clear').click(function(){
		clear = true;
		engine.network.sendMessage('clear', '');
});
window.yourTurn = true;
init();
function init(){
		engine.network.setConnection(roomId);
	setRoomInfo();
	Sketch.create({

        container: document.getElementById( 'sketch' ),
        autoclear: false,
        setup: function() {
            console.log( 'setup' );
        },

        update: function() {
            brushSize = (2 + abs( sin( this.millis * 0.003 ) * 20 )) * (1/800000);
            for(var i=0; i< engine.room.paints.length; i++){
        		var paint = engine.room.paints[i];
                this.lineCap = 'round';
                this.lineJoin = 'round';
                this.fillStyle = this.strokeStyle = paint.rgba;
                this.lineWidth = paint.brushSize * window.innerWidth * window.innerHeight;
    

                this.beginPath();
                this.moveTo( paint.oldX * window.innerWidth, paint.oldY * window.innerHeight);
                this.lineTo( paint.x* window.innerWidth, paint.y * window.innerHeight);
                this.stroke();
   			}
    		engine.room.paints = [];
            if(clear == true){
            	this.clear();
            	clear = false;
            }
        },

        touchmove: function() {
            for ( var i = this.touches.length - 1, touch; i >= 0; i-- ) {
               if(this.dragging == true && yourTurn == true){    
                    touch = this.touches[i];
                    this.lineCap = 'round';
                    this.lineJoin = 'round';
                    if(eraser == true){
                    	this.fillStyle = this.strokeStyle = 'rgba(255,255,255,1)';
                    	this.lineWidth = brushSize * window.innerWidth * window.innerHeight * 5;
                    	engine.room.sendPaint(touch.ox/window.innerWidth,
    						touch.oy/window.innerHeight,
    						touch.x/window.innerWidth,
    						touch.y/window.innerHeight,
    						'rgba(255,255,255,1)',
    						this.lineWidth/(window.innerWidth * window.innerHeight));
                	}
                	else{
                		this.fillStyle = this.strokeStyle = colorPicker.rgba;
                		this.lineWidth = brushSize * window.innerWidth * window.innerHeight;
                    	engine.room.sendPaint(touch.ox/window.innerWidth,
    						touch.oy/window.innerHeight,
    						touch.x/window.innerWidth,
    						touch.y/window.innerHeight,
    						colorPicker.rgba,
    						this.lineWidth/(window.innerWidth * window.innerHeight));                		
                	}
                    this.beginPath();
                    this.moveTo( touch.ox, touch.oy );
                    this.lineTo( touch.x, touch.y );
                    this.stroke();

               }
            }
        }
    });

}
function setRoomInfo(){
	if(roomId != null){
		roomId = roomId.value;
		engine.room.setRoomId(roomId);
		if(nickname != null)
		{ 
			engine.room.setPlayer(nickname, thumbnail);
			var player = engine.room.getPlayer();
			engine.network.joinRoom(player);
			engine.room.createScoreBoard(scoreBoard);
			engine.room.createDialog(dialog);
		}
	}
}

