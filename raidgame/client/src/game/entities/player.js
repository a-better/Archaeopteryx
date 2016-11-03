var WeaponManager  = require('./weapon_manager');
var Player = function(x, y){
	Phaser.Sprite.call(this, game, x, y, 'frog');
	this.speed = 250 * scale;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(scale, scale);
    game.add.existing(this);
  this.weaponManager = new WeaponManager(this.game);
  this.weapon = this.weaponManager.selectWeapon(0);

  this.initializeBody();
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(){
	this.handleMotionInput();
  this.handleMouseInput();
  this.handleShotInput();
};
Player.prototype.initializeBody = function(){
  game.physics.arcade.enable(this);
  this.body.bounce.set(0.5);
  this.body.fixedRotation = true; 
}
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