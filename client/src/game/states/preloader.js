var Preloader = function () {};

module.exports = Preloader;

Preloader.prototype = {

	preload : function(){

    	this.load.tilemap('train', 'assets/map/train2.json', null, Phaser.Tilemap.TILED_JSON);
    	this.load.image('trainSprites', 'assets/images/env/carpet.png');
    	this.load.image('window', 'assets/images/env/window.png');
    	this.load.image('wood', 'assets/images/env/wood1.png');
    	this.load.spritesheet('candle', 'assets/images/env/candle1-sheet.png', 64, 64);
    	this.load.image('frog', 'assets/images/character/frog2.png');
    	this.load.onLoadComplete.add(function() {
    	    game.state.start("Level", true, false, "train");
    	});
	}
};