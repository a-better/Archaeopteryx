var Network = require('./network/network');
var Room = require('./room');
var Engine = function(){
	this.network = new Network();
	this.rooms = [];
	this.rounds = [];
	engine = this;
};

Engine.prototype.constructor = Engine;

Engine.prototype = {
	createRoom : function(roomId){
		engine.rooms.push(new Room(roomId));
	},
	addPlayer : function(id, data){
		var room = engine.searchRoomById(data.roomId);
		room.addPlayer(id, data.nickname, data.thumbnail);
		if(room.players.length >= room.minPlayerNum && room.playing == false){
			room.playing = true;
			setTimeout(function(){engine.startGame(room)}, room.gameInterval * 1000);
		}
	},
	removePlayer : function(roomId, id){
		var room = engine.searchRoomById(roomId);
		room.removeById(id);
		if(room.players.length < room.minPlayerNum){
			clearTimeout(room.round);
			engine.network.broadcastMessage(room.id, 'broadcast_endgame', {answer : room.answer, gameInterval : room.gameInterval});
			room.playing = false;
		}
	},
	startGame : function(room){
		room.startGame();
		var round = setTimeout(
			function(){
				room.endGame();
				console.log('gameEnd : roomId'+room.id);
				engine.network.broadcastMessage(room.id, 'broadcast_endgame',{answer : room.answer, gameInterval : room.gameInterval});
			}
			, room.timeout * 1000);
		engine.rounds[room.id] = round;
		var player = room.players[room.turn];	
		engine.network.broadcastMessage(room.id, 'broadcast_startgame', {nickname : player.nickname, timeout : room.timeout});
		engine.network.sendMessage(player.id, room.id, 'send_turn');
	},
	setAnswer : function(roomId, answer){
		var room = engine.searchRoomById(roomId);
		room.answer = answer;
		clearTimeout(engine.rounds[room.id]);
		var round = setTimeout(
			function(){
				room.endGame();
				console.log('gameEnd : roomId'+room.id);
				engine.network.broadcastMessage(room.id, 'broadcast_endgame',{answer : answer, gameInterval : room.gameInterval});
			}
			, room.timeout_solve * 1000);
		engine.rounds[room.id] = round;
		engine.network.broadcastMessage(room.id, 'broadcast_setanswer', {timeout : room.timeout_solve});
	},
	checkAnswer : function(roomId, playerId, answer){
		var room = engine.searchRoomById(roomId);
		var player = room.players[room.turn];
		if(room.checkAnswer(playerId, answer)){
			if(room.addScore(playerId)){
				engine.endGame(room, player, answer);
			}
		}
	},
	endGame : function(room, player, answer){
		clearTimeout(engine.rounds[room.id]);
		engine.network.sendMessage(player.id, room.id, 'send_correct');
		engine.network.broadcastMessage(room.id, 'broadcast_correct',{id : player.id, answer : room.answer, gameInterval : room.gameInterval});
		room.endGame();
	},
	searchRoomById : function(roomId){
		for(var i=0; i < this.rooms.length; i++){
			if(this.rooms[i].id == roomId){
				return this.rooms[i];
			}
		}
		return false;
	},
	getPaints : function(roomId){
		var room = engine.searchRoomById(roomId);
		return room.paints;
	}
};

module.exports = Engine;