var Network = require('./network/network');
var Room = require('./room');
var Engine = function(){
	this.urls = [];
	this.network = new Network();
	engine = this;
};

Engine.prototype.constructor = Engine;

Engine.prototype = {
	findUrl : function(webServerIp, webServerPort, roomId){
		url = 'http://'+webServerIp+':'+webServerPort + '/' + roomId;
		for(var i=0; i<this.urls.length; i++){
			if(this.urls[i] == url){
				return this.urls[i];
			}
		}
		return null;
	}

};

module.exports = Engine;