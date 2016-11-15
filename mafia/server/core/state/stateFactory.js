var Idle = require('./room_state/idle');
var Playing = require('./room_state/playing');

var StateFactory = function(){

}
StateFactory.prototype.constructor = StateFactory;

StateFactory.prototype = {
	idle : function(){
		return new Idle();
	},
	playing : function(){
		return new Playing();
	}
}

module.exports = StateFactory;
