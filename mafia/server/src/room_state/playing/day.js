var Day = function(){
	this.vote = true;
	this.chatCitizen = true;
	this.chatMafia = true;
	this.enableKill = false;
}
Day.prototype.constructor = Day;
Day.prototype = Object.create(State.prototype);

Day.prototype.vote = function(){

}
Day.prototype.chat = function(){

}

Day.prototype.kill = function(){
	return enableKill;
}
