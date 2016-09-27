/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	

	window.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
	window.player = null;
	//window.socket = null;
	window.level = null;
	window.scale = 1;
	startGame();

	function startGame() {
	    // socket = io("http://localhost:8000");

		game.state.add("Boot", __webpack_require__(11));
		game.state.add("Preloader", __webpack_require__(12));
		game.state.add("Level", __webpack_require__(13));
		game.state.start('Boot');
	};

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	var Boot = function () {};

	module.exports = Boot;

	Boot.prototype = {

	  preload: function () {
	    // Fill in later.
	  },

	  create: function () {
	    game.stage.disableVisibilityChange = true; // So that game doesn't stop when window loses focus.
	    game.input.maxPointers = 1;

	    if (game.device.desktop) {
	      game.stage.scale.pageAlignHorizontally = true;
	    } else {
	      game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
	      //game.stage.scale.minWidth =  32*40;
	  //    game.stage.scale.minHeight = ;
	      game.stage.scale.maxWidth = window.innerWidth;
	      game.stage.scale.maxHeight = window.innerHeight;
	      game.stage.scale.forceLandscape = true;
	      game.stage.scale.pageAlignHorizontally = true;
	      game.stage.scale.setScreenSize(true);
	    }

	    game.state.start('Preloader');
	  }
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	var Preloader = function () {};

	module.exports = Preloader;

	Preloader.prototype = {

		preload : function(){

	    	this.load.tilemap('train', 'assets/map/train2.json', null, Phaser.Tilemap.TILED_JSON);
	    	this.load.image('trainSprites', 'assets/images/env/carpet.png');
	    	this.load.image('window', 'assets/images/env/window.png');
	    	this.load.image('wood', 'assets/images/env/wood1.png');
	    	this.load.spritesheet('candle', 'assets/images/env/candle1-sheet.png', 64, 64);
	    	this.load.image('frog', 'assets/images/character/frog2.png');
	    	this.load.onLoadComplete.add(function() {
	    	    game.state.start("Level", true, false, "train");
	    	});
		}
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(14);
	//var RemotePlayer = require("../entities/remoteplayer");
	var Level = function () {};
	var test;
	module.exports = Level;

	Level.prototype = {
	  remotePlayers: {},

	  gameFrozen : true,
	  init : function(tilemapName){
	  	this.tilemapName = tilemapName;
	  },

	  setEventHandlers : function(){

	  },

	  create : function(){
	  	level = this;
	  	game.physics.startSystem(Phaser.Physics.ARCADE);
	    
	   this.initializeMap();
	  	this.items ={};
	  	//this.setEventHandlers();
	  	this.initializePlayers();
	  	this.initializeCamera();
	    game.physics.arcade.enable(player);
	    player.body.bounce.set(0.5);
	   // player.body.setCollisionGroup(playerCollisionGroup);
	    player.body.fixedRotation = true; 
	  	cursors =  game.input.keyboard.createCursorKeys();
	  },

	  update : function(){
	  	player.handleInput();

	  	//for(var i=0; i<100; i++){
	  	//	this.remotePlayers[id].interpolate(this.lastFrameTime);
	  	//}
	   
	  	this.lastFrameTime = game.time.now;
	  },

	  initializeMap : function(){
	  	 game.stage.backgroundColor = '#000000';
	    this.map = this.game.add.tilemap('train');
	    this.map.addTilesetImage('carpet', 'trainSprites');
	    this.map.addTilesetImage('window', 'window');
	    this.map.addTilesetImage('wood_small', 'wood');
	    this.background = this.map.createLayer('background');
	    this.carpet = this.map.createLayer('carpet');
	    this.foreground = this.map.createLayer('foreground');
	    //stageGroup.add(this.background);
	    //stageGroup.add(this.foreground);
	 
	    //stageGroup.add(collisionTile);
	    //this.background.resizeWorld();
	    this.createCandles(this.map);
	    this.foreground.resizeWorld();

	    this.background.setScale(scale, scale);
	    this.carpet.setScale(scale, scale);
	    this.foreground.setScale(scale, scale);

	    this.map.setCollisionBetween(1, 1000, true, this.foreground);
	  },
	  initializePlayers : function(){
	      player = new Player(500 * scale, 500 * scale);

	  },
	  initializeCamera : function(){
	    game.camera.follow(player);
	  	var bounds       = Phaser.Rectangle.clone(game.world.bounds);
	    var cameraBounds = game.camera.bounds;
	    var x,y,width,height;
	    x=  bounds.width  * (1 - scale)/2;
	    y=  bounds.height * (1 - scale)/2;
	    width = bounds.width  * scale;
	    height = bounds.height * scale;
	    //cameraBounds.x      = bounds.width  * (1 - scale)/2;
	    //cameraBounds.y      = bounds.height * (1 - scale)/2;
	    cameraBounds.width  = width  * scale;
	    cameraBounds.height = height * scale;
	  },
	   createCandles : function(map){
	    //create items
	    this.items = this.game.add.group();
	    this.items.enableBody = true;
	    var item;    
	    result = this.findObjectsByType('candle', map, 'Candle');
	    result.forEach(function(element){
	      this.createFromTiledObject(element, this.items);
	    }, this);
	    this.items.forEach(function(element){
	        element.animations.add('idle', [0,1], 1/0.35, true);
	        element.animations.play('idle');
	    });
	  },

	  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
	  findObjectsByType : function (type, map, layer) {
	    var result = new Array();
	    map.objects[layer].forEach(function(element){
	      if(element.type == type) {
	        element.y -= map.tileHeight;
	        result.push(element);
	      }      
	    });
	    return result;
	  },
	  createFromTiledObject :   function(element, group) {
	   // game.add.sprite(element.x*scale, element.y *scale, element.properties.sprite);
	    //console.log(elemet.x + '/' + elemet.y + '/' + elemet.properties.sprite + '/')
	    var sprite = group.create((element.x)*scale, (element.y-20) *scale, element.properties.sprite);
	        sprite.scale.setTo(scale, scale);
	      //  createCandleLights(element.x, element.y);
	     //   createCandleLights(element.x, element.y+550);
	      //copy all properties to the sprite
	      Object.keys(element.properties).forEach(function(key){
	        sprite[key] = element.properties[key];
	      });
	  }

	  
	};



/***/ },
/* 14 */
/***/ function(module, exports) {

	
	var Player = function(x, y){
		Phaser.Sprite.call(this, game, x, y, 'frog');
		this.speed = 250 * scale;
	    this.anchor.setTo(0.5, 0.5);
	    this.scale.setTo(scale, scale);
	    game.add.existing(this);
	};
	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;

	Player.prototype.handleInput = function(){
		this.handleMotionInput();
	};

	Player.prototype.handleMotionInput = function(){
	      //console.log('1');
	     game.physics.arcade.collide(this, level.foreground);

	    if(cursors.left.isDown){
	      player.body.velocity.x = -this.speed;
	          //player.animations.play('left');
	    }
	    else if(cursors.right.isDown){
	       player.body.velocity.x = this.speed;
	       //player.animations.play('right');
	    }
	    else{
	        //player.animations.stop();
	         //player.frame = 4;
	    }

	    if(cursors.up.isDown){
	        player.body.velocity.y = -this.speed;
	    }
	    else if(cursors.down.isDown){
	        player.body.velocity.y = this.speed;
	    }
	};
	module.exports = Player;

/***/ }
/******/ ]);