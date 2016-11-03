var Lobby = function () {};
module.exports = Lobby;

Lobby.prototype = {
	init: function() {
	},

	create: function() {
		socket.emit("enter lobby");

		if(!socket.hasListeners("get good game room")) {//addSlots
			socket.on("get good game room", this.getGoodGameRoom.bind(this));
		}
		game.state.start("PendingGame", true, false, null, 0);
	},
	getGoodGameRoom: function(gameData) {
		this.joinGame(this.gameId);
	},
	joinGame : function(gameId){
		socket.removeAllListeners();
		game.state.start("PendingGame", true, false, null, gameId);
	}
};