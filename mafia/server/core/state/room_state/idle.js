var State = require('../state');
var StateManager = require('../stateManager');
var Idle = function(){
	State.call(this);
	this.playing = false;
	this.stateManager = new StateManager();
}

Idle.prototype.contructor = Object.create(State.prototype);

Idle.prototype = {
}
module.exports = Idle;