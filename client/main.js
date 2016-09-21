var width = window.innerWidth;
var height = window.innerHeight;

var obstacleGroup, player;

var floorGroup;
var playerGroup;
var exitMaker;

var GrassGroup;

var controls;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render }, false, true);
var cursors;
const imagePath = '/assets/images/';
const charPath	= imagePath + 'character/';
const envPath	= imagePath +'env/';
const tilePath  = envPath + 'tiles/';

function preload(){
	game.load.image('cactus1', envPath + 'obstacle1.png');
	game.load.image('cactus2', envPath + 'obstacle2.png');
	game.load.image('rock', envPath + 'obstacle3.png');

	game.load.image('grass1', tilePath + 'ground_tile_grass1.png');
	game.load.image('grass2', tilePath + 'ground_tile_grass2.png');
	game.load.image('grass3', tilePath + 'ground_tile_grass3.png');

	game.load.image('tile', tilePath + 'ground_tile.png');

	//game.load.spritesheet('' , +'');
	game.load.spritesheet('batAnim' , charPath+'bat.png', 96, 64);
	game.load.spritesheet('charAnim' , charPath+'character_walking.png',  96, 64);

	game.plugins.add(new Phaser.Plugin.Isometric(game));
	game.world.setBounds(0, 0, 2048, 1024);

	game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
	game.iso.anchor.setTo(0.5, 0);

}

function create(){
	game.stage.backgroundColor = "0xde6712";

 	floorGroup = game.add.group();
	grassGroup = game.add.group();
	playerGroup = game.add.group();
 	obstacleGroup = game.add.group();
 	game.physics.isoArcade.gravity.setTo(0, 0, -500);

	       itemsTxt = game.add.text(100, 8, '', {
			        font: "16px Arial",
			        fill: "#FFFFFF",
			        align: "center"
			    });
     // create the floor tiles
    var floorTile;
    for (var xt = 1024; xt > 0; xt -= 35) {
        for (var yt = 1024; yt > 0; yt -= 35) {
        	floorTile = game.add.isoSprite(xt, yt, 0, 'tile', 0, floorGroup);
        	floorTile.anchor.set(0.5);

        }
    }
    
    // create the grass tiles randomly
    var grassTile;
    for (var xt = 1024; xt > 0; xt -= 35) {
        for (var yt = 1024; yt > 0; yt -= 35) {
        	
        	var rnd = rndNum(20);
        	
        	if (rnd == 0) {
        		grassTile = game.add.isoSprite(xt, yt, 0, 'grass1', 0, grassGroup);
        		grassTile.anchor.set(0.5);
        	}
        	else if (rnd == 1)
        	{
        		grassTile = game.add.isoSprite(xt, yt, 0, 'grass2', 0, grassGroup);
        		grassTile.anchor.set(0.5);
        	}
        	else if (rnd == 2)
        	{
        		grassTile = game.add.isoSprite(xt, yt, 0, 'grass3', 0, grassGroup);
        		grassTile.anchor.set(0.5);
        	}
        	
        	

        }
    }
    
    // create an immovable cactus tile and randomly choose one of two graphical cactus representations
    var cactus1;
    for (var xt = 1024; xt > 0; xt -= 400) {
        for (var yt = 1024; yt > 0; yt -= 400) {
            
        	var rnd = rndNum(1);
        	
        	if (rnd == 0) {
        		cactus1 = game.add.isoSprite(xt, yt, 0, 'cactus1', 0, obstacleGroup);
        	}
        	else
        	{
        		cactus1 = game.add.isoSprite(xt, yt, 0, 'cactus2', 0, obstacleGroup);
        	}
        	           	
        	cactus1.anchor.set(0.5);

            // Let the physics engine do its job on this tile type
            game.physics.isoArcade.enable(cactus1);

            // This will prevent our physic bodies from going out of the screen
            cactus1.body.collideWorldBounds = true;
            
            // Make the cactus body immovable
            cactus1.body.immovable = true;
            
        }
    }
    
    
    var rock;
    for (var xt = 1024; xt > 0; xt -= 400) {
        for (var yt = 1024; yt > 0; yt -= 400) {
            
        	rock = game.add.isoSprite(xt + 80, yt + 80, 0, 'rock', 0, obstacleGroup);
        	rock.anchor.set(0.5);

        	// Let the physics engine do its job on this tile type
            game.physics.isoArcade.enable(rock);

            // This will prevent our physic bodies from going out of the screen
            rock.body.collideWorldBounds = true;

            // set the physics bounce amount on each axis  (X, Y, Z)
            rock.body.bounce.set(0.2, 0.2, 0);

            // set the slow down rate on each axis (X, Y, Z)
            rock.body.drag.set(100, 100, 0);
        }
    }

    //player
    player = game.add.isoSprite(350, 280, 0, 'charAnim', 0, playerGroup);
	player.scale.setTo(1.5, 1.5);
    player.animations.add('idleS', [0], 10, true);
    player.animations.add('idleSE', [5], 10, true);
	player.animations.add('idleE', [10], 10, true);
	player.animations.add('idleNE', [15], 10, true);
	player.animations.add('idleN', [20], 10, true);
	player.animations.add('idleNW', [25], 10, true);
	player.animations.add('idleW', [30], 10, true);
	player.animations.add('idleSW', [35], 10, true);


    player.animations.add('S', [1,2,3,4], 10, true);
    player.animations.add('SE', [6,7,8,9], 10, true);
    player.animations.add('E', [11,12,13,14], 10, true);
    player.animations.add('NE', [16,17,18,19], 10, true);
    player.animations.add('N', [21,22,23,24], 10, true);
    player.animations.add('NW', [26,27,28,29], 10, true);
    player.animations.add('W', [31,32,33,34], 10, true);
    player.animations.add('SW', [36,37,38,39], 10, true);

    player.anchor.set(0.5);
	
	// enable physics on the player
	game.physics.isoArcade.enable(player);
	player.body.collideWorldBounds = true;



	

    var player2 = game.add.isoSprite(350, 240, 0, 'charAnim', 0, playerGroup);

    player2.animations.add('idleS', [0], 10, true);
    player2.animations.add('idleSE', [5], 10, true);
	player2.animations.add('idleE', [10], 10, true);
	player2.animations.add('idleNE', [15], 10, true);
	player2.animations.add('idleN', [20], 10, true);
	player2.animations.add('idleNW', [25], 10, true);
	player2.animations.add('idleW', [30], 10, true);
	player2.animations.add('idleSW', [35], 10, true);


    player2.animations.add('S', [1,2,3,4], 10, true);
    player2.animations.add('SE', [6,7,8,9], 10, true);
    player2.animations.add('E', [11,12,13,14], 10, true);
    player2.animations.add('NE', [16,17,18,19], 10, true);
    player2.animations.add('N', [21,22,23,24], 10, true);
    player2.animations.add('NW', [26,27,28,29], 10, true);
    player2.animations.add('W', [31,32,33,34], 10, true);
    player2.animations.add('SW', [36,37,38,39], 10, true);
    

	player2.anchor.set(0.5);
	
	// enable physics on the player
	game.physics.isoArcade.enable(player2);
	player2.body.collideWorldBounds = true;

	playerGroup.forEach(function(obj){
		obj.animations.play('idleS');
	});
	game.camera.follow(player);
	cursors =  this.game.input.keyboard.createCursorKeys();

 	this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
     ]);

    //monster
    this.game.input.keyboard.onPushCallback = function(e){str += e.keyCode;
	console.log(str);};


}

// generate random number
function rndNum(num) {
	
	return Math.round(Math.random() * num);
	
}
var preSpeedX;
var preSpeedY;
var slowdown = 0.7;

//var time = new Time(game);
var dash = 0;
function update(){
	
	var speed;
	if(dash){
		speed = 400;
	}
	else{
		speed = 250;
	}
	var currentSpeedX =0;
	var currentSpeedY =0;

	if(cursors.left.isDown){

		currentSpeedY = speed*slowdown;
		currentSpeedX = -speed*slowdown;
	}
	else if(cursors.right.isDown){
		currentSpeedY = -speed*slowdown;
		currentSpeedX = speed*slowdown; 
	}


	if(cursors.up.isDown){
		if(cursors.left.isDown){
			currentSpeedY = 0;
			currentSpeedX = -speed; 
		}
		else if(cursors.right.isDown){
			currentSpeedY = -speed;
			currentSpeedX = 0; 
		}
		else{
			currentSpeedY = -speed;
			currentSpeedX = -speed;
		} 
	}
	else if(cursors.down.isDown){
		if(cursors.left.isDown){
			currentSpeedY = speed;
			currentSpeedX = 0; 
		}
		else if(cursors.right.isDown){
			currentSpeedY = 0;
			currentSpeedX = speed; 
		}
		else{
			currentSpeedY = speed;
			currentSpeedX = speed;
		} 
	}
	


	if(currentSpeedX > 0 && currentSpeedY > 0){
		player.animations.play('S');
	}
	else if(currentSpeedX > 0 && currentSpeedY == 0){
		player.animations.play('SE');
	}
	else if(currentSpeedX > 0 && currentSpeedY < 0){
		player.animations.play('E');

	}
	else if(currentSpeedX == 0 && currentSpeedY < 0){
		player.animations.play('NE');

	}
	else if(currentSpeedX < 0 && currentSpeedY < 0){
		player.animations.play('N');

	}
	else if(currentSpeedX < 0 && currentSpeedY == 0){
		player.animations.play('NW');

	}
	else if(currentSpeedX < 0 && currentSpeedY > 0){
		player.animations.play('W');

	}
	else if(currentSpeedX == 0 && currentSpeedY > 0){
		player.animations.play('SW');
	}
	else{

		if(preSpeedX > 0 && preSpeedY > 0){
			player.animations.play('idleS');
		}
		else if(preSpeedX > 0 && preSpeedY == 0){
			player.animations.play('idleSE');
		}
		else if(preSpeedX > 0 && preSpeedY < 0){
		player.animations.play('idleE');
		}
		else if(preSpeedX == 0 && preSpeedY < 0){
			player.animations.play('idleNE');
		}
		else if(preSpeedX < 0 && preSpeedY < 0){
			player.animations.play('idleN');
		}
		else if(preSpeedX < 0 && preSpeedY == 0){
			player.animations.play('idleNW');
		}
		else if(preSpeedX < 0 && preSpeedY > 0){
			player.animations.play('idleW');
		}
		else if(preSpeedX == 0 && preSpeedY > 0){
			player.animations.play('idleSW');
		}
	}

	preSpeedX  = currentSpeedX;
	preSpeedY  = currentSpeedY;
	player.body.velocity.y = currentSpeedY;
	player.body.velocity.x = currentSpeedX;
	game.physics.isoArcade.collide(playerGroup,obstacleGroup);
	itemsTxt.setText(player.body.velocity.y+'/'+player.body.velocity.x);

}
Math.clip = function(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

var str = '';
function onDown(e){
	str += e.keyCode;
	console.log(str);
}
function render() {
    obstacleGroup.forEach(function (obj) {
        game.debug.body(obj, 'rgba(189, 221, 235, 0.6)', false);
    });

        playerGroup.forEach(function (obj) {
        game.debug.body(obj, 'rgba(0, 221, 0, 0.6)', false);
    });

    game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
    // game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
}