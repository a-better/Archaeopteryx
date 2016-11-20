var Network = function(){
	this.observers = {};
	this.data = '';
}

Network.prototype.constructor = Network;

Network.prototype = {
	setObserver : function(key, obj){
		this.observers[key] = obj;
	},
	notifyObserver : function(){
		this.observer.update(this.data);		
	}
}

module.exports = Network;