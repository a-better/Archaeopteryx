var JsonConfig = require('../../utils/json_config');
var StringUtils = require('../../utils/string');
var idGenerator = require('../../utils/id');
var Link = function(){
	link = this;
	this.links = {};
	this.timeouts = {};
	this.expireTime = 300;
	gameServerInfo = new JsonConfig("server/game_serverinfo.json");
}
Link.prototype.constructor = Link;
Link.prototype = {
	addLink : function(key, link){
		link.links[key] = link;
	},
	removeLink : function(key){
		
		delete link.links[key];
	},
	createLink : function(data){
		var url;
		var key;
		var ip;
		var port;
		var roomId;
		ip = gameServerInfo.jsonContent[data.game]["ip"];
		port = gameServerInfo.jsonContent[data.game]["port"];
		id = idGenerator();
		url = "http://" + ip + ":" + port + "/" + id;
		key = url.hashCode();
		link.links[key] = url
		link.timeouts[key] =
		setTimeout(function(){link.removeLink(key), delete link.timeouts[key]}, 1000 * link.expireTime);
		console.log(key);
		return key;
	},
	getLink : function(key){
		return link.links[key];
	},
	checkLink : function(key){
		if(link.links[key]){
			return true;
		}
		else{
			return false;
		}
	}
}

module.exports = Link;