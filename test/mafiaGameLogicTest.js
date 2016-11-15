var expect    = require("chai").expect;
var Mafia = require("../mafia/server/src/engine");

describe("Mafia Game Server", function() {
	this.timeout(5000);
  	var mafia;
  	before("create game server", function(){
  		mafia = new Mafia();
  		 for(var i=0; i<100; i++){
    		room = mafia.roomManager.create(i);
    		room.playingTime = 100/1000;
   			mafia.roomManager.add(room.id, room);
    	}		
   		expect(100).to.equal(mafia.roomManager.length());
    	for(var i=0; i<100; i++){
    		mafia.roomManager.set(i);
    		var room = mafia.roomManager.objects[i];
    		expect(true).to.equal(room.stateManager.checkState('idle'));
    		expect(true).to.equal(room.stateManager.checkState('playing'));
    	}	   		
  	});	
  describe("mafia game's state", function(){
    it("generate game state", function(){

    });
    it("change to playing from idle", function(){

    });
    it("day is first", function(){

    });
    it("night is changed from day", function(){

    });
  });
  describe("player state", function(){
    it("generate player state", function(){

    });
    it("kill citizen", function(){

    });
    it("save citizen", function(){

    });
    it("detect citizen", function(){

    });
  });

  describe("connect current game state and player state", function(){
    it("connect day and player state", function(){

    });
    it("connect night and player state",function(){

    });
  });
});