
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