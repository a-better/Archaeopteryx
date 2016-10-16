var Player = require('./player');
var Paint = require('./paint');
var Room = function(roomId){
	this.id = roomId;
	this.paints = [];
	this.players = [];
	this.turn = 0;
	this.answer = '';
	this.round = null;
	this.timeout = 30;
	this.timeout_solve = 120;
	this.gameInterval = 5;
	this.minPlayerNum = 2;
	this.playing = false;
	room = this;
};

Room.prototype.constructor = Room;

Room.prototype = {
	addPlayer : function(id, nickname, thumbnail){
		var player = new Player(id, nickname, thumbnail);
		room.players.push(player);
	},
	addPaint : function(oldX, oldY, x, y, rgba, brushSize){
	    var paint = new Paint(oldX, oldY, x, y, rgba, brushSize);
	    room.paints.push(paint); 
	},
	removeById : function(id){
		for(var i = room.players.length - 1; i >= 0; i--) {
		    if(room.players[i].id === id) {
		       room.players.splice(i, 1);
		    }
		}
		return room.players;
	},
	startGame : function(){
		if(room.players[room.turn].turn === undefined){
			console.log('err ::::platform.server.engine.room.startGame 39: ' +room.players.length);
			console.log('err ::::platform.server.engine.room.startGame 40: ' + room.turn);
			room.turn++;
			if(room.turn >= room.players.length){
				room.turn = 0;
			}
			room.players[room.turn].turn = true;
		}
		else{
			room.players[room.turn].turn = true;
		}
		room.answer = '';
	},
	endGame : function(){
		if(room.players[room.turn].turn === undefined){
			console.log('err ::::platform.server.engine.room.startGame 53: ' +room.players.length);
			console.log('err ::::platform.server.engine.room.startGame 54: ' + room.turn);
		}
		else{
			room.players[room.turn].turn = false;
		}
		room.turn++;
		room.answer = '';
		if(room.turn >= room.players.length){
			room.turn = 0;
		}
	},
	checkAnswer : function(playerId, answer){
		if(room.answer == answer && room.answer != ''){
			return true;
		}
		else{
			return false;
		}
	},
	addScore : function(playerId){
		for(var i=0; i<room.players.length; i++){
			if(room.players[i].id == playerId && room.players[i].turn == false){
				room.players[i].score ++;
				return true;
			}
		}
		return false;
	},
	searchPlayerById : function(playerId){
		for(var i=0; i<room.players.length; i++){
			if(room.players[i].id == playerId){
				return room.players[i];
			}
		}
	}	
};

module.exports = Room;