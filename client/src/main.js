

window.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
window.player = null;
//window.socket = null;
window.level = null;
window.scale = 1;
startGame();

function startGame() {
    // socket = io("http://localhost:8000");

	game.state.add("Boot", require("./game/states/boot"));
	game.state.add("Preloader", require("./game/states/preloader"));
	game.state.add("Level", require("./game/states/level"));
	game.state.start('Boot');
};