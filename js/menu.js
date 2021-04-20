var menuState = {
    preload:function(){

    },
    create: function() {
        // Add a background image
        this.background=game.add.sprite(0, 0, 'background');
        //this.background.scale.setTo(0.5,0.55);
        console.log(this.background);
        this.mnmusic=game.add.audio('menumusic');
        this.mnmusic.play();

        var nameLabel = game.add.text(game.width/2, 100, '雷電',
        { font: '50px Arial', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);
        // Show the score at the center of the screen
        var scoreLabel = game.add.text(game.width/2, game.height/2,
        'score: ' + game.global.score, { font: '40px Arial', fill: '#ffffff' });
        scoreLabel.anchor.setTo(0.5, 0.5);

        var bestscore=game.add.text(game.width/2,game.height/2+50,'best score: '+game.global.best,{ font: '25px Arial', fill: '#ffffff' });
        bestscore.anchor.setTo(0.5,0.5);
        // Explain how to start the game
        var startLabel = game.add.text(game.width/2, game.height-80,
        'press the up arrow key to start', { font: '25px Arial', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);
        // Create a new Phaser keyboard variable: the up arrow key
        // When pressed, call the 'start'
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.start, this);
    },
    start: function() {
    // Start the actual game
    this.mnmusic.stop();
    game.state.start('play');
    },
    }; 