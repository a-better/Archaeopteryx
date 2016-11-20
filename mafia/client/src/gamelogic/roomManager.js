var Room = require('./room/room');
var Network = require('../network/network');
var RoomManager = function(){
	this.network = new Network();
	this.observers = {};
}

RoomManager.prototype = RoomManager;

RoomManager.prototype = {
	setObserver : function(key, obj){
		this.observers[key] = obj;
	},
	notifyObserver : function(){
		for(key in this.observer){
			this.observers[key].update(this.room);
		}
	},
	update : function(data){
		switch(data.tag){
			case '':
				break;
		};
	}
}

module.exports = RoomManager;