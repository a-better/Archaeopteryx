var width = window.innerWidth;
var height = window.innerHeight;
var myLamp1;
var myLamps = [];
var myMask;
var myObj;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update : update });
//var scaleManager = new Phaser.ScaleManager(game, width, height);
function preload() {
    

}
var map;
var layer;
var player;
var scale = 1;
var stageGroup; 
var candles;
var collisionTile;
function create() {
   // stageGroup = game.add.group();
    createLights();
    cursors =  game.input.keyboard.createCursorKeys();
      console.log(myObj.originalX);
}

function update(){
             myLamp1.refresh();
             myMask.refresh();
            if(cursors.left.isDown){
                //player.animations.play('left');
                  myObj.originalX  = myObj.originalX + 1;
                  console.log(myObj.originalX);
               

            }
            else if(cursors.right.isDown){
                //player.animations.play('right');
            }
            else{
                //player.animations.stop();
                //player.frame = 4;
            }

            if(cursors.up.isDown){
            }
            else if(cursors.down.isDown){
            }

}

function createLights(){
    game.plugins.add(Phaser.Plugin.PhaserIlluminated);

    //illuminated objects are added via this addition to the game.add instance.
    //these functions return Phaser.Sprite objects that can be used as such
    //config object is the same as illuminated lamps take, to customize all parameters
    //you can use myLamp1.getLamp() to get the illuminated lamp object
    myLamp1 = game.add.illuminated.lamp(200 *scale, 200 * scale ,{ distance: 200,
    radius: 10,
    samples: 50});

    //add an opaque object.  parameters are (x, y, width, height).
    //this is not a phaser.sprite object because it's not actually drawn,
    //except by the lamp.
    //It's an illuminated.polygonObject instance
    myObj = game.add.illuminated.rectangleObject(210 *scale, 210 *scale, 40*scale, 30*scale);

    //lighting is done on a per-lamp basis, so each lamp sprite has a lighting object under it
    //that you can create and add PolygonObjects to.
     var myObjs = [];
     myObjs.push(myObj);
     myLamp1.createLighting(myObjs);

    //darkmask is a sprite but takes up the entire game screen, IE WxH.
    //it cookie-cutters out existing lamp implementations.
    //it needs a reference to all lamp sprites, but these can be added later
     myLamps.push(myLamp1);
     myMask = game.add.illuminated.darkMask(myLamps/*, color*/);
    //myMask.addLampSprite(myLamp2); <-- alternative to adding at construction time
}
