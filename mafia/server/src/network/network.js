var Network = function(){
	this.roomManager;
	network = this;
};

Network.prototype.Constructor = Network;
Network.prototype = {
	setRoomManager : function(roomManager){
		this.roomManager = roomManager;
	},
	setConnection : function(server){
		io = require("socket.io").listen(server);
	},
	setEventHandlers: function(){
		io.on("connection", function(client) {
			console.log('connected !'+ ':'+ client.id);
			client.on("join room", network.onJoinRoom);
			client.on("disconnect", network.onClientDisconnect);
			client.on("use skill", network.onUseSkill);
			client.on("vote player", network.onVotePlayer);
			
			//client.on('change turn', network.onChangeTurn);
			//client.on("send data", this.onSendData);
		});
	},
	send : function(tag){
		switch(tag){
			case 'notice':
				break;
			case 'team':
				break;
		}
	},
	broadcast : function(tag){
		switch(tag){
			case 'notice':
				break;
			case 'dead':
				break;
			case 'leave':
				break;
		}
	},

};

module.exports = Network;