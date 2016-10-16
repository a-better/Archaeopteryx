var Network = require('./network/network');
var Room = require('./room');
//var EventHandler = require('./eventHandler');
var Engine = function(){
	engine = this;
	this.network = new Network();
	this.room = new Room();
};

Engine.prototype.constructor = Engine;

Engine.prototype = {
	setCanvas : function(parent){
		var div = document.getElementById(parent);
 		canvas =  div.getElementsByTagName("canvas")[0];
 		ctx = canvas.getContext('2d'); 
	}
}


module.exports = Engine;