var Room = require('../../core/objects/room');
var MafiaActorManager = require('../actor/mafiaActorManager');
var Debug = require('../../core/debug/debug');
var MafiaRoom = function(id, max, min, platformServerId, url){
	Room.call(this, id, max, min);
	this.platformServerId = platformServerId;
	this.url = url;
	this.actorManager = new MafiaActorManager();
	this.debug = new Debug({'debug': true});
	this.hostId = '';
	this.network;
}

MafiaRoom.prototype.constructor = MafiaRoom;
MafiaRoom.prototype = Object.create(Room.prototype);

MafiaRoom.prototype.setHostClient = function(){
	var keys = Object.keys(this.actorManager.objects);
	this.hostId = keys[0];
}

MafiaRoom.prototype.setState = function(stateFactory){
	this.minActor = 8;
	this.maxActor = 10;
	var idle = stateFactory.idle();
	this.stateManager.add('idle', idle, true);

	var day = stateFactory.roomState('day');
	var night = stateFactory.roomState('night');
	this.stateManager.add('day', day);
	this.stateManager.add('night', night);
}

MafiaRoom.prototype.setNetwork = function(network){
	this.network = network;
}

MafiaRoom.prototype.reset = function(){
	this.stateManager.states['day'].count = 0;
	this.stateManager.states['night'].count = 0;
	this.actorManager.reset();
}
MafiaRoom.prototype.setActorState = function(){
	this.actorManager.setActorState(this.minActor);
	var keys = Object.keys(this.actorManager.objects);
	for(var i=0; i<keys.length; i++){
		this.debug.log("LOG", "플레이어"+keys[i]+"의 직업은"+this.actorManager.getJob(keys[i]));
	}
}
MafiaRoom.prototype.join= function(id, nickname, thumbnail){
	this.actorManager.add(id, nickname, thumbnail);
	if(this.actorManager.length() == 1){
		this.setHostClient();
		this.debug.log("LOG", "호스트는 "+this.hostId+"입니다.");
	}
}
MafiaRoom.prototype.leave = function(id){
	this.actorManager.remove(id);
	if(this.actorManager.length() > 0 && id == this.hostId){
		this.setHostClient();	
		this.debug.log("LOG", "호스트가 "+ this.hostId+"로 변경되었습니다.");
	}
	if(this.checkEndCondition()){
		this.end();
	}
}
MafiaRoom.prototype.start = function(room){
	this.stateManager.changeState('night');
	this.stateManager.getCurrentState().count++;
	this.game = setTimeout(function(){room.toggleDayNight(room)}, 50);
}
MafiaRoom.prototype.end = function(){
	clearTimeout(this.game);
	this.stateManager.changeState('idle');
}
MafiaRoom.prototype.checkEndCondition = function(){
	var mafiaTeamNum = this.actorManager.getMafiaActors().length;
	var mafiaNum = this.actorManager.getActorByState('mafia').length;
	var citizenNum = this.actorManager.getLiveActors().length - mafiaTeamNum;

	if(mafiaTeamNum >= citizenNum){
		this.debug.log("LOG", "마피아 승리");
		this.end();
	} 
	else if(mafiaNum == 0){
		this.debug.log("LOG", "시민 승리");
		this.end();
	}
}
MafiaRoom.prototype.toggleDayNight = function(room){
	this.debug.log("LOG", this.stateManager.current + this.stateManager.getCurrentState().count);
	if(this.stateManager.current == 'night'){
		this.kill();
		this.actorManager.reset();
		this.stateManager.changeState('day');
	}
	else if(this.stateManager.current == 'day'){
		var candidate = this.actorManager.selectMostVotedActor();
		if(typeof candidate === "undefined"){
			this.debug.log("LOG", "투표 무효");
		}
		else{
			this.actorManager.killVotedCitizen(candidate);
			this.debug.log("LOG", candidate + "가 투표로 제거");
		}
		this.actorManager.reset();
		this.stateManager.changeState('night');
	}
	this.stateManager.getCurrentState().count++;
	clearTimeout(this.game);
	this.game = setTimeout(function(){room.toggleDayNight(room)}, 50);
	this.checkEndCondition();
}

MafiaRoom.prototype.useSkill = function(actor, target){
	//사람 감지 는 바로 반환 필요 
	//사람을 죽이는 능력은 밤이 끝날떄 결과를 처리 
	if(this.enableSkill(actor, target)){
		this.actorManager.setSkillTarget(actor, target);
		this.detect(actor, target);
	}
}
MafiaRoom.prototype.kill = function(){
	var result;
	var target = this.actorManager.killedCitizen;
	if(target){
		result = this.actorManager.killCitizen();
		if(result){
			this.debug.log("LOG", this.actorManager.killedCitizen +"마피아에 의해 사망");
		}
		else{
			if(this.actorManager.isAvoidKill(target) && this.actorManager.isSoldier(target)){
				this.debug.log("LOG", "군인 킬 회피");
			}
			else{
				this.debug.log("LOG", "화타");
			}
		}
		
	}
	else{
		this.debug.log("LOG", "마피아 선택 X");
	}
}
MafiaRoom.prototype.vote = function(actor, target){
	if(this.stateManager.current == 'day'){
		this.actorManager.vote(actor, target);
	}
}
MafiaRoom.prototype.detect = function(actor, target){
	var detectedJob;
	var actorJob = this.actorManager.getJob(actor); 
	this.debug.log('LOG', actorJob);
	switch(actorJob){
		case 'spy':
			detectedJob = this.actorManager.detectCitizen(actor);
			if(detectedJob){
				if(this.actorManager.objects[actor].state.contacted == false){
					this.debug.log('LOG', target+"의 직업은 마피아입니다. 당신은 마피아팀");
					this.actorManager.objects[actor].state.contact();
				}
				else{
					this.debug.log('LOG', target+"의 직업은"+detectedJob);
				}
			}
			if(this.actorManager.isSoldier(target)){
				this.debug.log('LOG', '군인이 스파이를 감지함');
				this.debug.log('LOG', target+"의 직업은 "+detectedJob);
				this.debug.log('LOG', actor+"의 직업은 스파이");
			}
			break;
		case 'police':
			detectedJob = this.actorManager.detectCitizen(actor);
			if(detectedJob){
				this.debug.log('LOG', target+"의 직업은 마피아입니다.");
			}			
			break;
	}

}

MafiaRoom.prototype.enableSkill = function(actor, target){
	var actorJob = this.actorManager.getJob(actor); 
	if(this.stateManager.current == 'night'){
		if(actorJob == 'doctor' && actor == target){
			if(this.stateManager.getCurrentState().count == 1){
				this.debug.log('LOG', '첫 밤 자힐 가능');
				return true;
			}
			else{
				return false;
			}
		}
		else{
			return true;
		}
	}
	else{
		return false;
	}
}

MafiaRoom.prototype.isPlaying = function(){
	if(this.stateManager.current == 'day' || this.stateManager.current == 'night'){
		return true;
	}
	else{
		return false;
	}
}
MafiaRoom.prototype.isOverMaximunActor = function(){
	if(this.actorManager.length >= this.maxActor){
		return true;
	}
	else{
		false;
	}
}


module.exports = MafiaRoom;