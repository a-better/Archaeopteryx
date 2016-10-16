var Room = require('./room');
var Network = require('./network/network');
//var EventHandler = require('./eventHandler');
var Engine = function(){
	this.room = new Room();
	this.rooms = [];
	engine = this;
	this.network = new Network();
};

Engine.prototype.constructor = Engine;

Engine.prototype = {
	addRoom : function(){
	},
	setRoomId : function(id){
		this.room.setRoomId(id);
	}
}


module.exports = Engine;