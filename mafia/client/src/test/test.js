var Test = function(){

}

Test.prototype.constructor = Test;
Test.prototype = {
	hello : function(){
		return 'hello'
	}
}

module.exports = Test;