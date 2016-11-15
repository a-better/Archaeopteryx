var Night = function(){
	this.vote = false;
	this.chatCitizen = false;
	this.chatMafia = true;
	this.enableKill = true;
}
Night.prototype.constructor = Night;
Night.prototype = Object.create(State.prototype);
Night.prototype.vote = function(){
	return vote;
}
Night.prototype.kill = function(actorManager){

}
Night.prototype.chat = function(){

}
