var Network = function(){
	this.socket;
	this.roomId
	network = this;
};

Network.prototype.Constructor = Network;

Network.prototype = {
	setConnection : function(roomId){
		var domain = document.domain;
		var port = location.port;
		var url = "http://"+domain+":"+port;
		this.roomId = roomId;
		console.log(url);
		this.socket = io(url);
		this.setEventHandlers();
	},
	getSocket : function(){
		return this.socket;
	},  
 	setEventHandlers : function(){
 	  this.socket.on('add player', network.onAddPlayer);
 	  this.socket.on('remove player', network.onRemovePlayer);
 	  this.socket.on('chat', network.onChat);
 	  this.socket.on('send room info', network.onSendRoomInfo);
 	  this.socket.on('paint', network.onPaint);
 	  this.socket.on('clear canvas', network.onClearCanvas);
 	},
	joinRoom : function(player){
		if(this.roomId != null){
			//engine.room.setRoomId();
			this.socket.emit('join room', {roomId : this.roomId, nickname : player.nickname, thumbnail : player.thumbnail});
		}
	},
	sendMessage : function(tag, data){
		if(this.roomId != null){
			this.socket.emit('send message',{tag : tag, roomId : this.roomId, contents : data});
		}
	},
	onAddPlayer : function(data){
		engine.room.addRemotePlayer(data.contents.nickname, data.contents.thumbnail, data.id);
		engine.room.createScoreBoard(scoreBoard);
	},
	onChat : function(data){
		//console.log(data);
		engine.room.addChat(data);
	},
	onSendRoomInfo : function(data){
		engine.room.init(data);
	},
  	onPaint  : function(data){
    	console.log('receive'+data.x + '|'+data.y +'|'+ data.rgba);
    	engine.room.receivePaint(data.oldX, data.oldY, data.x, data.y, data.rgba, data.brushSize);
    },
    onClearCanvas : function(){
    	clear = true;
    },
    onRemovePlayer : function(data){
    	engine.room.removeById(data.id);
    	engine.room.createScoreBoard(scoreBoard);
    }
};

module.exports = Network;