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

		game.state.add("Boot", __webpack_require__(1));
		game.state.add("Preloader", __webpack_require__(2));
		game.state.add("Level", __webpack_require__(3));
		game.state.start('Boot');
	};

/***/ },
/* 1 */
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
/* 2 */
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

	        for (var i = 1; i <= 11; i++)
	        {
	            this.load.image('bullet' + i, 'assets/images/bullets/bullet' + i + '.png');
	        }

	       //  Note: Graphics are not for use in any commercial project
		}
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(4);
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
	    this.initializationKeyEvent();
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
	  },
	  initializationKeyEvent : function(){
	    cursors =  game.input.keyboard.createCursorKeys();
	    shot = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    game.input.mouse.capture = true;
	    up = game.input.keyboard.addKey(Phaser.Keyboard.W);
	    down = game.input.keyboard.addKey(Phaser.Keyboard.S);
	    left = game.input.keyboard.addKey(Phaser.Keyboard.A);
	    right= game.input.keyboard.addKey(Phaser.Keyboard.D);
	  }
	  
	};



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	var SingleBullet  = __webpack_require__(6);
	var Weapon  = __webpack_require__(5);
	var Player = function(x, y){
		Phaser.Sprite.call(this, game, x, y, 'frog');
		this.speed = 250 * scale;
	    this.anchor.setTo(0.5, 0.5);
	    this.scale.setTo(scale, scale);
	    game.add.existing(this);
	  this.weaponManager = new Weapon(this.game);
	  this.weapon = this.weaponManager.selectWeapon(1);
	};
	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;

	Player.prototype.handleInput = function(){
		this.handleMotionInput();
	  this.handleMouseInput();
	  this.handleShotInput();
	};

	Player.prototype.handleMotionInput = function(){
	      //console.log(this.body.angle);
	     game.physics.arcade.collide(this, level.foreground);

	 
	    if(cursors.left.isDown || left.isDown){
	      player.body.velocity.x = -this.speed;
	          //player.animations.play('left');
	    }
	    else if(cursors.right.isDown || right.isDown){
	       player.body.velocity.x = this.speed;
	       //player.animations.play('right');
	    }
	    else{
	        //player.animations.stop();
	         //player.frame = 4;
	    }

	    if(cursors.up.isDown || up.isDown){
	        player.body.velocity.y = -this.speed;
	    }
	    else if(cursors.down.isDown || down.isDown){
	        player.body.velocity.y = this.speed;
	    }
	};

	Player.prototype.handleMouseInput = function(){
	 // console.log( Math.atan2(game.input.activePointer.y - player.y, game.input.activePointer.x - player.x));

	 // console.log(game.input.mousePointer.worldY + '/' + player.y);
	  this.body.angle = (360 / (2 * Math.PI)) * game.math.angleBetween( player.x, player.y, game.input.activePointer.worldX,game.input.activePointer.worldY);
	};

	Player.prototype.handleShotInput = function(){
	      //   
	  if (shot.isDown)
	  {  //console.log('1'); 
	      this.weapon.fire(this);
	  }
	  else if(level.input.activePointer.leftButton.isDown){
	      this.weapon.fire(this);
	  }     
	};

	module.exports = Player;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	var SingleBullet  = __webpack_require__(6);
	var Beam  = __webpack_require__(8);
	var Weapon = function(game){
	    this.weapons = [];
	    this.singleBullet = new SingleBullet(game);
	    this.beam = new Beam(game);
	    this.weapons.push(this.singleBullet);
	    this.weapons.push(this.beam);
	    this.currentWeapon = 0;
	    for (var i = 1; i < this.weapons.length; i++)
	    {
	      this.weapons[i].visible = false;
	    }
	};

	Weapon.prototype.constructor = Weapon;

	Weapon.prototype.selectWeapon = function(index){
	    this.weapons[index].visible = true;
	    return this.weapons[index];
	};



	 module.exports = Weapon;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Bullet  = __webpack_require__(7);
	SingleBullet = function (game) {

	        Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

	        this.nextFire = 0;
	        this.bulletSpeed = 600;
	        this.fireRate = 100;

	        for (var i = 0; i < 64; i++)
	        {
	            this.add(new Bullet(game, 'bullet5'), true);
	        }

	        return this;

	    };

	    SingleBullet.prototype = Object.create(Phaser.Group.prototype);
	    SingleBullet.prototype.constructor = SingleBullet;

	    SingleBullet.prototype.fire = function (source) {

	        if (this.game.time.time < this.nextFire) { return; }

	        var x = source.x + 10;
	        var y = source.y + 10;

	        this.getFirstExists(false).fire(x, y, source.body.angle, this.bulletSpeed, 0, 0);

	        this.nextFire = this.game.time.time + this.fireRate;

	    };

	    module.exports = SingleBullet;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var Bullet = function (game, key){
			Phaser.Sprite.call(this, game, 0, 0, key);

	        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

	        this.anchor.set(0.5);

	        this.checkWorldBounds = true;
	        this.outOfBoundsKill = true;
	        this.exists = false;

	        this.tracking = false;
	        this.scaleSpeed = 0;
	};

		Bullet.prototype = Object.create(Phaser.Sprite.prototype);
		Bullet.prototype.constructor = Bullet;
		Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {
		    this.reset(x, y);
		    this.scale.set(1);
		    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
		    this.angle = angle;
		    this.body.gravity.set(gx, gy);
		};

	    Bullet.prototype.update = function () {

	        if (this.tracking)
	        {
	            this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
	        }

	        if (this.scaleSpeed > 0)
	        {
	            this.scale.x += this.scaleSpeed;
	            this.scale.y += this.scaleSpeed;
	        }

	    };

	    module.exports = Bullet;



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Bullet  = __webpack_require__(7);

	Beam = function (game) {

	    Phaser.Group.call(this, game, game.world, 'Beam', false, true, Phaser.Physics.ARCADE);

	    this.nextFire = 0;
	    this.bulletSpeed = 1000;
	    this.fireRate = 45;

	    for (var i = 0; i < 64; i++)
	    {
	        this.add(new Bullet(game, 'bullet11'), true);
	    }

	    return this;

	};

	Beam.prototype = Object.create(Phaser.Group.prototype);
	Beam.prototype.constructor = Beam;

	Beam.prototype.fire = function (source) {

	    if (this.game.time.time < this.nextFire) { return; }

	    var x = source.x + 40;
	    var y = source.y + 10;

	    this.getFirstExists(false).fire(x, y, source.body.angle, this.bulletSpeed, 0, 0);

	    this.nextFire = this.game.time.time + this.fireRate;

	};

	module.exports = Beam;

/***/ }
/******/ ]);