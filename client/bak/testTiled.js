var width = window.innerWidth;
var height = window.innerHeight;
var game = new Phaser.Game('100', '100', Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update : update });
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

    //scaleManager.boot();
    game.add.plugin(Phaser.Plugin.Tiled);

    var cacheKey = Phaser.Plugin.Tiled.utils.cacheKey;
    game.load.tiledmap(cacheKey('train', 'tiledmap'), 'assets/map/train.json', null, Phaser.Tilemap.TILED_JSON);
    console.log('1');
    game.load.image(cacheKey('train', 'tileset', 'candle1-sheet'), 'assets/images/env/candle1-sheet.png');
    console.log('2');
    game.load.image(cacheKey('train', 'tileset', 'carpet'), 'assets/images/env/carpet.png');
    console.log('3');
    game.load.image(cacheKey('train', 'tileset', 'window'), 'assets/images/env/window.png');
    console.log('4');
    
    game.load.image(cacheKey('train', 'tileset', 'wood_small'), 'assets/images/env/wood1.png');

    game.load.image('frog', '/assets/images/character/frog2.png');
    console.log('5');
  
}
var map;
var layer;

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.8;
    game.stage.backgroundColor = '#000000';
    map = game.add.tiledmap('train');
    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    player = game.add.sprite(500, 500, 'frog');
    player.scale.setTo(1.5, 1.5);
    game.physics.p2.enable(player);
    player.body.setCollisionGroup(playerCollisionGroup);
    //scaleManager.setupScale(width * 1.5, height * 1.5);
    game.camera.follow(player);

    cursors =  game.input.keyboard.createCursorKeys();
}

function update(){
            player.body.setZeroVelocity();
            if(cursors.left.isDown){
                player.body.velocity.x = -150;
                //player.animations.play('left');


            }
            else if(cursors.right.isDown){
                player.body.velocity.x = 150;
                //player.animations.play('right');
            }
            else{
                //player.animations.stop();
                //player.frame = 4;
            }

            if(cursors.up.isDown){
                player.body.velocity.y = -150;
            }
            else if(cursors.down.isDown){
                player.body.velocity.y = 150;
            }
}