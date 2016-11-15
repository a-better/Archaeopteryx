var Network = require('./network/network');
var Link = require('../rest/link/link');
var Engine = function(){
	this.network = new Network(this);
	this.link = new Link();
	engine = this;
};

Engine.prototype.constructor = Engine;

Engine.prototype = {
};

module.exports = Engine;