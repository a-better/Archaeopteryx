var PendingGame = function() {}
module.exports = PendingGame;


PendingGame.prototype = {
	init: function(gameId) {
		//this.tilemapName = tilemapName;
		this.gameId = gameId;
	},	
	create : function(){
		game.state.start("Level", true, false, "train");
		//socket.emit("enter pending game", {gameId: this.gameId});
		//socket.on("set current players", this.setCurrentPlayers.bind(this));
		//socket.on("player joined", this.playerJoined.bind(this));
		//socket.on("player left", this.playerLeft.bind(this));	
	},
	setCurrentPlayers : function(data){
		this.joinGame();
	},
	joinGame : function(){
		socket.removeAllListeners();
		game.state.start("Level", true, false, "train");	
	}
}
