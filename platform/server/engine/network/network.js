var Network = function(engine){
	network = this;
	this.engine = engine;
};

Network.prototype.Constructor = Network;

Network.prototype = {
	setConnection : function(server){
		io = require("socket.io").listen(server);
	},
	setEventHandlers: function(){
		io.on("connection", function(client) {
			console.log('connected !'+ ':'+ client.id);
			client.on("create link", network.onCreateLink);
		});
	},
	onCreateLink : function(data){
		var roomId = network.engine.link.createLink(data);
		io.to(this.id).emit("receive link", {id : roomId});
	}
};

module.exports = Network;