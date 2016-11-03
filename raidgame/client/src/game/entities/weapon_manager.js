
var SingleBullet  = require('./singlebullet');
var Beam  = require('./beam');
var WeaponManager = function(game){
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

WeaponManager.prototype.constructor = WeaponManager;

WeaponManager.prototype.selectWeapon = function(index){
    this.weapons[index].visible = true;
    return this.weapons[index];
};



 module.exports = WeaponManager;