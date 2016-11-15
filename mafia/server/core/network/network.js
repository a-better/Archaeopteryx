var Network = function(){
	network = this;
};

Network.prototype.Constructor = Network;

Network.prototype = {
	setConnection : function(server){
		io = require("socket.io").listen(server);
	},
	setEventHandlers: function(){
		io.on("connection", function(client) {
			console.log('connected !'+ ':'+ client.id);
			client.on("create room", network.onCreateRoom);
			client.on("join room", network.onJoinRoom);
			//client.on('change turn', network.onChangeTurn);
			//client.on("send data", this.onSendData);
		});
	}
}