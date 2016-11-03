
var Preloader = function () {};
module.exports = Preloader;

Preloader.prototype = {

	preload : function(){
        game.time.advancedTiming = true;
        console.log('Preloader');
    	//this.load.tilemap('train', 'assets/map/train2.json', null, Phaser.Tilemap.TILED_JSON);
    	//this.load.image('trainSprites', 'assets/images/env/carpet.png');
    	//this.load.image('window', 'assets/images/env/window.png');
    	//this.load.image('wood', 'assets/images/env/wood1.png');
    	//this.load.spritesheet('candle', 'assets/images/env/candle1-sheet.png', 64, 64);
    	//this.load.image('frog', 'assets/images/character/frog2.png');
    	
        game.state.start("Room");
    	
        //for (var i = 1; i <= 11; i++)
        //{
        //    this.load.image('bullet' + i, 'assets/images/bullets/bullet' + i + '.png');
        //}

       //  Note: Graphics are not for use in any commercial project
	}
};