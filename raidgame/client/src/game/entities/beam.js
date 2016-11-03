var Bullet  = require('./bullet');

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