// Initialize Phaser
var game = new Phaser.Game(1024, 640, Phaser.AUTO, 'canvas');
// Define our global variable
game.global = { score: 0 ,best:0};
// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('lose', loseState);
//game.state.add('play', playState);
// Start the 'boot' state
game.state.start('boot');