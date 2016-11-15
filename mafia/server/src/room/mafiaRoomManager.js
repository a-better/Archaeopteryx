var GameObjectManager = require('../../core/objects/gameObjectManager');
var GameObjectFactory = require('../../core/objects/gameObjectFactory');
var StateFactory = require('../../core/state/stateFactory');
var MafiaRoomManager = function(){
   GameObjectManager.call(this);
   this.gameObjectFactory = new GameObjectFactory();
   this.stateFactory = new StateFactory();
}

MafiaRoomManager.prototype.constructor = MafiaRoomManager;
MafiaRoomManager.prototype = Object.create(GameObjectManager.prototype);

MafiaRoomManager.prototype.create = function(id, key, object){
	var room = this.gameObjectFactory.room(id, key, object);
	return room;
}
MafiaRoomManager.prototype.set = function(key){
	this.objects[key].setState(this.stateFactory);
}
MafiaRoomManager.prototype.join = function(key, id, nickname, thumbnail){
	this.objects[key].join(id, nickname, thumbnail);
}
MafiaRoomManager.prototype.leave = function(key, id){
	this.objects[key].leave(id);
}
MafiaRoomManager.prototype.startGame = function(key){
	var room = this.objects[key];
	room.start();
}
MafiaRoomManager.prototype.endGame = function(key){
	var room = this.objects[key];
	room.end();
}

module.exports = MafiaRoomManager;