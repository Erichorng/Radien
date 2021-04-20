var bootState = {
    preload: function () {
    // Load the progress bar image.
    game.load.image('progressBar', 'assets/load.png');
    },
    create: function() {
    // Set some game settings.
    game.stage.backgroundColor = '#3498db';
    game.renderer.renderSession.roundPixels = true;
    //Start the load state.
    game.state.start('load');
    }
    }; 