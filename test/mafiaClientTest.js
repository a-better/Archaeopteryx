var expect    = require("chai").expect;
var Test = require("../mafia/client/src/test/test");
//#### Client Side Test ####

//Compile and test(Node.js 테스트) 
//webpack test/mafiaClientTest.js mafia/client/dist/main.bundle.js --target node

//mocha-loader(인 브라우저 테스트) 
//testMafiaClient.bat
//webpack "mocha\!./test/mafiaClientTest.js" mafia/client/dist/main.bundle.js
describe("Simple Client Test", function(){

	it("say hello", function(){
		var test = new Test();
		expect('hello').to.equal(test.hello());
	});
	it("access to dom", function(){
		var div = document.createElement('div');
		expect(div.style.background).is.empty
	});
});