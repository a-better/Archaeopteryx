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
};

Room.prototype.constructor = Room;

Room.prototype = {
	addPlayer : function(id, nickname, thumbnail){
		var player = new Player(id, nickname, thumbnail);
		this.players.push(player);
	},
	addPaint : function(oldX, oldY, x, y, rgba, brushSize){
	    var paint = new Paint(oldX, oldY, x, y, rgba, brushSize);
	    this.paints.push(paint); 
	},
	removeById : function(id){
		for(var i = this.players.length - 1; i >= 0; i--) {
		    if(this.players[i].id === id) {
		       this.players.splice(i, 1);
		    }
		}
		return this.players;
	},
	startGame : function(){
		this.players[this.turn].turn = true;
		this.answer = '';
		this.playing = true;
	},
	endGame : function(){
		this.players[this.turn].turn = false;
		this.turn++;
		this.answer = '';
		if(this.turn >= this.players.length){
			this.turn = 0;
		}
	},
	checkAnswer : function(playerId, answer){
		if(this.answer == answer && this.answer != ''){
			return true;
		}
		else{
			return false;
		}
	},
	addScore : function(playerId){
		for(var i=0; i<this.players.length; i++){
			if(this.players[i].id == playerId && this.players[i].turn == false){
				this.players[i].score ++;
				return true;
			}
		}
		return false;
	},
	searchPlayerById : function(playerId){
		for(var i=0; i<this.players.length; i++){
			if(this.players[i].id == playerId){
				return this.players[i];
			}
		}
	}	
};

module.exports = Room;