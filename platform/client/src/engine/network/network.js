var Network = function(){
	network = this;
};

Network.prototype.Constructor = Network;

Network.prototype = {
	setConnection :function(SERVER){
		var domain = document.domain;
		var port = location.port;
		if(SERVER == 'GAME')
		{
			var url = 'http://'+gameServerIp + ':'+gameServerPort;
			console.log(url);
			socket = io(url);
		}
		else if(SERVER == 'WEB'){
			var url = 'http://'+webServerIp + ':'+webServerPort;
			console.log(url);
			socket_web = io(url);
		}
		this.setEventHandlers();
	},
	registerRoom : function(room){
		socket_web.emit('register room', room.url);
	},
	getSocket : function(){
		return socket;
	},
	setEventHandlers: function(){
		socket.on("send room", this.onSendRoom);
		socket.on("no exist", this.onNoExist);
		socket.on("exist", this.onExist);
	},
	joinRoom : function(){
		engine.room.setRoomId();
		socket.emit('add player');
	},
	createRoom : function(){
		console.log('createRoom');
		socket.emit('create room');
	},
	onSendRoom : function(data){
		console.log(data);
		engine.setRoomId(data.room.id);
	},
	checkRoom : function(){
		var roomId = document.getElementById('roomId').value;
		socket.emit("check room", {roomId : roomId});
	},
	onNoExist : function(){
		alert("this room is not available!");
		location.href = 'http://'+webServerIp + ':'+webServerPort;
	},
	onExist : function(){
		$('#kakao-login-btn').trigger('click');
	}
};

module.exports = Network;