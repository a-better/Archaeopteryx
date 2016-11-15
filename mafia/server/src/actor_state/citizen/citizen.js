var Citizen = function(){
	this.dead = false;
}

Citizen.prototype.constructor = Citizen;

Citizen.prototype = Object.create(State.prototype);

Citizen.prototype.talk = function(){}
Citizen.prototype.vote = function(){}
Citizen.prototype.murdered = function(){}
Citizen.prototype.saved = function(){}
Citizen.prototype.detected = function(){}