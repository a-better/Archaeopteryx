var width = window.innerWidth;
var height = window.innerHeight;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update : update, render : render });
//var scaleManager = new Phaser.ScaleManager(game, width, height);
function preload() {
    

    //  Tilemaps are split into two parts: The actual map data (usually stored in a CSV or JSON file) 
    //  and the tileset/s used to render the map.

    //  Here we'll load the tilemap data. The first parameter is a unique key for the map data.

    //  The second is a URL to the JSON file the map data is stored in. This is actually optional, you can pass the JSON object as the 3rd
    //  parameter if you already have it loaded (maybe via a 3rd party source or pre-generated). In which case pass 'null' as the URL and
    //  the JSON object as the 3rd parameter.

    //  The final one tells Phaser the foramt of the map data, in this case it's a JSON file exported from the Tiled map editor.
    //  This could be Phaser.Tilemap.CSV too.


    //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

   // scaleManager.boot();
    this.load.tilemap('train', 'assets/map/train2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('trainSprites', 'assets/images/env/carpet.png');
    this.load.image('window', 'assets/images/env/window.png');
    this.load.image('wood', 'assets/images/env/wood1.png');
    this.load.spritesheet('candle', 'assets/images/env/candle1-sheet.png', 64, 64);
    this.load.image('frog', 'assets/images/character/frog2.png');
  
}
var map;
var layer;
var player;
var scale = 1.8;
var stageGroup; 
var candles;
var collisionTile;
 var playerCollisionGroup;
  var tileCollisionGroup ;
function create() {
   // stageGroup = game.add.group();
game.plugins.add(Phaser.Plugin.PhaserIlluminated);
   candles = game.add.group();
    game.physics.startSystem(Phaser.Physics.ARCADE);
   
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
    this.foreground.resizeWorld();

   

    playerCollisionGroup = game.add.group();
    playerCollisionGroup.enableBody = true;
    playerCollisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
    tileCollisionGroup = game.add.group();
    tileCollisionGroup.enableBody = true;
    tileCollisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
    player = game.add.sprite(500*scale, 500*scale, 'frog');
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(scale, scale);

        //create items
    createCandles(this.map);

    cursors =  game.input.keyboard.createCursorKeys();
     game.camera.follow(player);   
    console.log(game.camera.bounds);
    //////////////////////////////////////////Scaling/////////////////////////////////
    //stageGroup.scale.setTo(scale);
    var bounds       = Phaser.Rectangle.clone(game.world.bounds);
    var cameraBounds = game.camera.bounds;
    var x,y,width,height;
    x=  bounds.width  * (1 - scale)/2;
    y=  bounds.height * (1 - scale)/2;
    width = bounds.width  * scale;
    height = bounds.height * scale;
    //cameraBounds.x      = bounds.width  * (1 - scale)/2;
    //cameraBounds.y      = bounds.height * (1 - scale)/2;
    cameraBounds.width  = bounds.width  * scale;
    cameraBounds.height = bounds.height * scale;


    this.background.setScale(scale, scale);
    this.carpet.setScale(scale, scale);
    this.foreground.setScale(scale, scale);
    ///////////////////////////////////////////////Scaling////////////////////////////////////

    ////Physics Performance Test////////////
     var obj;
     for(var i=0; i<100; i++)
     {

        obj = game.add.sprite(game.world.randomX*scale, game.world.randomY*scale, 'frog');
        game.physics.arcade.enable(obj);
         obj.body.bounce.set(0.5);
         tileCollisionGroup.add(obj);
       // obj.body.setRectangle(30, 30);
        //obj.body.setCollisionGroup(tileCollisionGroup);
       // obj.body.collides([tileCollisionGroup, playerCollisionGroup]);
    }
    ////Physics Performance Test////////////

    //////////////////////////////////////////Player Layer Collision ///////////////////////////
    this.map.setCollisionBetween(1, 1000, true, this.foreground);
   // collisionTile = game.physics.arcade.convertTilemap(this.map, this.foreground);
     //for(var i=0; i< collisionTile.length; i++)
     {

           // collisionTile[i].setCollisionGroup(tileCollisionGroup);
          // tileCollisionGroup.add(obj);
            //collisionTile[i].collides([tileCollisionGroup,playerCollisionGroup])
     } 
    game.physics.arcade.enable(player);
    player.body.bounce.set(0.5);
   // player.body.setCollisionGroup(playerCollisionGroup);
    player.body.fixedRotation = true; 
    playerCollisionGroup.add(player); 
  // player.body.collides([playerCollisionGroup, tileCollisionGroup]);
    


     /////////////////////////////////////////////////Player Layer COllision//////////////////////////////
    //createLights
  //  createLight(32*10, 32*12);
  //  createLight(32*30, 32*12);
  // createLightedObj();
   ///createMask();
}


var speed = 250 * scale;
//var lightsUpdate = true;
function update(){
           game.physics.arcade.collide(playerCollisionGroup, tileCollisionGroup);
           game.physics.arcade.collide(playerCollisionGroup, this.foreground);
           game.physics.arcade.collide(tileCollisionGroup, this.foreground);
         
            //player.body.setZeroVelocity();
            if(cursors.left.isDown){
                player.body.velocity.x = -speed;
                //player.animations.play('left');
            }
            else if(cursors.right.isDown){
                player.body.velocity.x = speed;
                //player.animations.play('right');
            }
            else{
                //player.animations.stop();
                //player.frame = 4;
            }

            if(cursors.up.isDown){
                player.body.velocity.y = -speed;
            }
            else if(cursors.down.isDown){
                player.body.velocity.y = speed;
            }
           // myObj.originalX = player.body.x;
            //myObj.originalY = player.body.y;
          // updateLights();

}

function render(){
}

function zoomTo(scale, l1, l2) {
    var bounds       = Phaser.Rectangle.clone(game.world.bounds);
    var cameraBounds = game.camera.bounds;
    var x,y,width,height;
    x=  bounds.width  * (1 - scale)/2;
    y=  bounds.height * (1 - scale)/2;
    width = bounds.width  * scale;
    height = bounds.height * scale;
    cameraBounds.x      = bounds.width  * (1 - scale)/2;
    cameraBounds.y      = bounds.height * (1 - scale)/2;
    cameraBounds.width  = bounds.width  * scale;
    cameraBounds.height = bounds.height * scale;
    l1.crop(new Phaser.Rectangle(x, y, width, height));
    l2.crop(new Phaser.Rectangle(x, y, width, height));

}
   function createCandles(map){
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;    
    result = findObjectsByType('candle', map, 'Candle');
    result.forEach(function(element){
      createFromTiledObject(element, this.items);
    }, this);
    this.items.forEach(function(element){
            playAnimation(element);
    });
  }

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  function findObjectsByType(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.type == type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  }
  //create a sprite from an object
   function createFromTiledObject(element, group) {
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

  function playAnimation(obj){
        obj.animations.add('idle', [0,1], 1/0.35, true);
        obj.animations.play('idle');
  }
var myLamp;
var myLamps = [];
var myMask;
var myObj;
function createCandleLights(x, y){
    

    //illuminated objects are added via this addition to the game.add instance.
    //these functions return Phaser.Sprite objects that can be used as such
    //config object is the same as illuminated lamps take, to customize all parameters
    //you can use myLamp1.getLamp() to get the illuminated lamp object
    myLamp = game.add.illuminated.lamp((x+30) *scale, y * scale ,{ distance: 75*scale,
    radius: 5*scale,
    color : 'rgba(243, 181, 57, 0.55)',
    diffuse: 0,
    samples: 10});

    //add an opaque object.  parameters are (x, y, width, height).
    //this is not a phaser.sprite object because it's not actually drawn,
    //except by the lamp.
    //It's an illuminated.polygonObject instance
      
    
    //lighting is done on a per-lamp basis, so each lamp sprite has a lighting object under it
    //that you can create and add PolygonObjects to.

    

    //darkmask is a sprite but takes up the entire game screen, IE WxH.
    //it cookie-cutters out existing lamp implementations.
    //it needs a reference to all lamp sprites, but these can be added later
     myLamps.push(myLamp);
     
    //myMask.addLampSprite(myLamp2); <-- alternative to adding at construction time
}
function createLight(x, y){
   // console.log('1');
    myLamp = game.add.illuminated.lamp(x *scale, y * scale ,{ distance: 200*scale,
    radius: 0,
    diffuse: 0,
    color : 'rgba(251, 221, 147, 0.40)',
    samples: 10});
    myLamps.push(myLamp);

}

function createLightedObj(){
    myObj = game.add.illuminated.discObject(200 *scale, 200 *scale, 7 * scale);
    var myObjs = [];
     myObjs.push(myObj);
     myLamps.forEach(function(element){
        element.createLighting(myObjs);
       // console.log('1');
     });
}

function createMask(){
    myMask = game.add.illuminated.darkMask(myLamps, 'rgba(4, 4, 12, 0.75)');
}
function updateLights(){
    //console.log('1');
   
    // console.log('1');
   myLamps.forEach(function(element){
       element.refresh();
   });
   myMask.refresh();
    
}