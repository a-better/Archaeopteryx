var Room = function() {};
module.exports = Room;
Room.prototype = {
	create : function(){
		console.log('Room');
		//socket.emit("enter pending game", {gameId: this.gameId});
		//socket.on("set current players", this.setCurrentPlayers.bind(this));
		//socket.on("player joined", this.playerJoined.bind(this));
		//socket.on("player left", this.playerLeft.bind(this));	
		
				
		this.joinGame();
	},
	setCurrentPlayers : function(data){
		this.joinGame();
	},
	joinGame : function(){
		//socket.removeAllListeners();
		game.state.start("Level_Sketch", true, false);	
	}
};
