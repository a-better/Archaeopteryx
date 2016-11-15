var MafiaRoom = function(){

}

MafiaRoom.prototype.constructor = MafiaRoom;
MafiaRoom.prototype = Object.create(Room.prototype);

MafiaRoom.prototype.setState() = function(){
	var idle = stateFactory.idle();
	var playing = stateFactory.playing();
	this.stateManager.add('idle', idle, true);
	this.stateManager.add('playing', playing);

	var day = stateFactory.day();
	var night = stateFactory.night();
	this.stateManager.states['playing'].stateManager.add('day', day);
	this.stateManager.states['playing'].stateManager.add('night', night);
}