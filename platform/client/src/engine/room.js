var Room = function(){
	this.id = null;
	this.url= null;
	this.messenger = null;
	//this.players = [];
};

Room.prototype.constructor = Room;

Room.prototype = {
	setRoomId : function(roomId){
		this.id = roomId;
	},
	setMessenger : function(messenger){
		this.messenger = messenger
	},
	setURL : function(url){
		this.url = url;
	},
	addPlayer : function(){
		//var player = new Player();
	}
};

module.exports = Room;