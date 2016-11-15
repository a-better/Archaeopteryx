var State = require('../state');
var StateManager = require('../stateManager');
var Playing = function(){
	State.call(this);
	this.playing = true;
	this.stateManager = new StateManager();
}

Playing.prototype.contructor = Object.create(State.prototype);

Playing.prototype = {
}
module.exports = Playing;