var loadState = {
    preload: function () {
    // Add a 'loading...' label on the screen
    var loadingLabel = game.add.text(game.width/2, 150,
    'loading...', { font: '30px Arial', fill: '#ffffff' });
    loadingLabel.anchor.setTo(0.5, 0.5);
    // Display the progress bar
    var progressBar = game.add.sprite(game.width/2, game.height/2, 'progressBar');
    progressBar.anchor.setTo(0.5, 0.5);
    game.load.setPreloadSprite(progressBar);
    // Load all game assets
    game.load.image('player', 'assets/player.png');
    game.load.image('enemy1', 'assets/enemy1.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('bady', 'assets/bady.png');
    game.load.image('fireball', 'assets/fireball.png');
    game.load.image('boss', 'assets/boss.png');
    game.load.image('rocket', 'assets/test.png');
    game.load.image('lazer', 'assets/lazer.png');
    game.load.spritesheet('explode', 'assets/explode.png',128,128);
    // Load a new asset that we will use in the menu state
    game.load.image('background', 'assets/background.png');
    game.load.audio('bgmusic',['assets/bass solo.mp3','assets/bass solo.ogg']);
    game.load.audio('ouch1',['assets/ouch1.mp3','assets/ouch1.ogg']);
    game.load.audio('ouch2',['assets/ouch2.mp3','assets/ouch2.ogg']);
    game.load.audio('ouch3',['assets/ouch3.mp3','assets/ouch3.ogg']);
    game.load.audio('ouch4',['assets/ouch4.mp3','assets/ouch4.ogg']);
    game.load.audio('ouch5',['assets/ouch5.mp3','assets/ouch5.ogg']);
    game.load.audio('menumusic',['assets/menu music.mp3','assets/menu music.ogg']);
    game.load.audio('explodesound',['assets/explode.mp3','assets/explode.ogg']);
    game.load.audio('gun1',['assets/gun1.mp3','assets/gun1.ogg']);
    game.load.audio('lazer',['assets/lazer.mp3','assets/lazer.ogg']);
    },
    create: function() {
     //Go to the menu state
    game.state.start('menu');
    }
}; 