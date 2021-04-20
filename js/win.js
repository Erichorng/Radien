var winState={
    create:function(){
        //this.win = game.add.sprite(game.width/2, 140, 'win');
       // this.win.width = 50;
       // this.win.height = 100;
        //this.win.anchor.setTo(0.5, 0.5);
        this.mnmusic=game.add.audio('menumusic');
        this.mnmusic.play();
        var haha=['你贏了','太強了吧','水喔','任務達成'];
        var n=game.rnd.pick([0,1,2,3]);


        var menu_txt_start = game.add.text(game.width/2, 200, haha[n], {font: '40px Orbitron', fill: '#ffffff'});
        menu_txt_start.anchor.setTo(0.5, 0.5);
        var score_txt = game.add.text(game.width/2, 240, '你有 ' + game.global.score + ' 分!!', {font: '30px Orbitron', fill: '#ffffff', backgroundColor: '#6A5ACD'});
        score_txt.anchor.setTo(0.5, 0.5);
       // var name_txt = game.add.text(game.width/2-50, 280, 'INPUT YOUR NAME:', {font: '13px Orbitron', fill: '#ffffff'});
        //name_txt.anchor.setTo(0.5, 0.5);
        var menu_txt_enter = game.add.text(game.width/2, 320, '<Press Enter To Menu>', {font: '13px Orbitron', fill: '#ffffff'});
        menu_txt_enter.anchor.setTo(0.5, 0.5);

        this.cursor = game.input.keyboard.createCursorKeys();
        var key_enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        key_enter.onDown.add(this.control_enter, this);


    },

    control_enter: function (){
        this.mnmusic.stop();
      //  music_start=false;
      //  var rankRef = firebase.database().ref('rank');
      //  var newPostRef = rankRef.push();
      //  newPostRef.set({
      //      name: this.user_name.text,
      //      score: score
      //  });
        game.state.start('menu');
    }

}