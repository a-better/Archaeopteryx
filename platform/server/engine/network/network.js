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
			client.on("register room", network.onRegisterRoom);
		});
	},
	onRegisterRoom : function(data){
		console.log('onRegisterRoom : ' + data);
		engine.urls.push(data);
	}
};

module.exports = Network;