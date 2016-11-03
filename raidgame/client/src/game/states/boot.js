
var Boot = function () {};

module.exports = Boot;

Boot.prototype = {

  preload: function () {
    // Fill in later.
  },

  create: function () {
    game.stage.disableVisibilityChange = true; // So that game doesn't stop when window loses focus.
    game.input.maxPointers = 1;

    if (game.device.desktop) {
      game.stage.scale.pageAlignHorizontally = true;
    } else {
      //game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
      ////game.stage.scale.minWidth =  32*40;
  //  //  game.stage.scale.minHeight = ;
      //game.stage.scale.maxWidth = window.innerWidth;
      //game.stage.scale.maxHeight = window.innerHeight;
      //game.stage.scale.forceLandscape = true;
      //game.stage.scale.pageAlignHorizontally = true;
      //game.stage.scale.setScreenSize(true);
      game.stage.scale.forceLandscape = true;
      game.stage.scale.pageAlignHorizontally = true;
      //game.stage.scale.setScreenSize(true);
      scale = 1;
    }
    console.log('boot');
    game.state.start('Preloader');
  }

};
