var Player = require("../entities/player");
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

