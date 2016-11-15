var MafiaRoomManager = require('./room/mafiaRoomManager');
var Engine = function(){
	this.roomManager = new MafiaRoomManager();
}

Engine.prototype.constructor = Engine;
Engine.prototype = {

}
module.exports = Engine;