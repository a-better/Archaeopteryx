var Debug = function(){
	this.debugMode = true;
	this.useAlert = false;
}

Debug.prototype.constructor = Debug;

Debug.prototype.Log = function(type, msg){
	if(this.debugMode == false)
		return;
	if(typeof console == "undefined")
		return;

	switch(type){
		case "LOG" :
			console.log(msg);
			break;
		case "WARN" :
			console.warn(msg);
			break;
		case "ERROR" :
			if(this.useAlert){
				alert(msg);
			}
			console.error(msg);
			break;						
	};
}

module.exports = Debug;