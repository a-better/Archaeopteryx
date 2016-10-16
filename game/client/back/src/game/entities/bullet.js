var Bullet = function (game, key){
		Phaser.Sprite.call(this, game, 0, 0, key);

        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        this.anchor.set(0.5);

        //this.checkWorldBounds = true;
        //this.outOfBoundsKill = true;
        this.exists = false;

        this.tracking = false;
        this.scaleSpeed = 0;
        //this.initializeBody();    
};

	Bullet.prototype = Object.create(Phaser.Sprite.prototype);
	Bullet.prototype.constructor = Bullet;
	Bullet.prototype.fire = function (x, y, angle, speed, gx, gy, killdelay) {
	    this.reset(x, y);
	    this.scale.set(1);
	    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
	    this.angle = angle;
	    this.body.gravity.set(gx, gy);
        if(killdelay > 0){
            this.killAfterDelay(killdelay);
        }
        
	};
    Bullet.prototype.killAfterDelay = function(seconds){
        game.time.events.add(Phaser.Timer.SECOND * seconds, this.remove, null, this);
    };

    Bullet.prototype.initializeBody = function(){
        game.physics.arcade.enable(this);
        this.body.bounce.set(0.5);
        this.body.fixedRotation = true; 
    };

    Bullet.prototype.update = function () {
         game.physics.arcade.collide(this, level.foreground, this.onCollide, null, this);
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
    Bullet.prototype.onCollide = function(bullet){
        this.remove(bullet);
    };
    Bullet.prototype.remove = function(bullet){
        bullet.kill();
    };
    module.exports = Bullet;

