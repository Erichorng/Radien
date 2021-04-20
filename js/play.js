var playState = {


    create: function() {
        this.cursor = game.input.keyboard.createCursorKeys();
        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.bigButton = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //add music
        this.bgmusic=game.add.audio('bgmusic');
        this.bgmusic.play();
        //background;
        this.background = game.add.tileSprite(0, 0,game.width, game.height, 'background');

        this.ouch1=game.add.audio('ouch1');
        this.ouch2=game.add.audio('ouch2');
        this.ouch3=game.add.audio('ouch3');
        this.ouch4=game.add.audio('ouch4');
        this.ouch5=game.add.audio('ouch5');
        this.ouch=[this.ouch1,this.ouch2,this.ouch3,this.ouch4,this.ouch5];
        this.explodesound=game.add.audio('explodesound');
        this.gun1sound=game.add.audio('gun1');
        this.lazersound=game.add.audio('lazer');
        //
        //add boss
        this.boss=game.add.sprite(2000,2000,'boss');
        this.boss.maxHealth = 1200;
        this.boss.health = 1200;
        //this.boss.enableBody = true;
        game.physics.arcade.enable(this.boss);
        this.boss.anchor.setTo(0.5, 1);
        this.boss.alive = false;
        this.boss.checkWorldBounds = true;
        this.boss.outOfBoundsKill = true;

        //

        //add enemy 
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        //this.enemies.createMultiple(30, 'enemy1');
        for(var i=0;i<10;i++){
            //  var pos = game.rnd.pick([1, 2, 3])*game.width/4;
              var enemy = this.enemies.create(-50, -50, 'enemy1');
              //bady.animations.add('enemy_hurt', [1, 0], 12, false);
              enemy.anchor.setTo(0.5,1);
              enemy.alive = false;
              enemy.maxHealth = 40;
              enemy.health = 40;
          }

        this.badies=game.add.group();
        this.badies.enableBody=true;
        for(var i=0;i<2;i++){
          //  var pos = game.rnd.pick([1, 2, 3])*game.width/4;
            var bady = this.badies.create(-50, -50, 'bady');
            //bady.animations.add('enemy_hurt', [1, 0], 12, false);
            bady.anchor.setTo(0.5, 1);
            bady.alive = false;
            bady.maxHealth = 200;
            bady.health = 200;
        }
      
        
        //
        //add our bullet
        this.bullet=game.add.group();
        this.bullet.enableBody=true;
        this.bullet.createMultiple(100,'bullet');
        this.bullet.setAll('anchor.x', 0.5);
        this.bullet.setAll('anchor.y', 1);
        this.bullet.setAll('outOfBoundsKill', true);
        this.bullet.setAll('checkWorldBounds', true);
        //add bigone
        this.bigbullet=game.add.sprite(-1000, game.height-200, 'bullet');
        this.bigbullet.scale.setTo(10,10);
        this.bigbullet.anchor.setTo(0.5, 0.5);
       
        game.physics.arcade.enable(this.bigbullet);
        //
        //add enemybullet
        this.enemybullet_period = [];
        for(var i=0;i<60;i++) this.enemybullet_period[i] = 0;
        this.enemyBullets = game.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(60, 'fireball');
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 1);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);
        //
        //add badybullet
        this.badybullet_period = [];
        for(var i=0;i<30;i++) this.badybullet_period[i] = 0;
        this.badyBullets = game.add.group();
        this.badyBullets.enableBody = true;
        this.badyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.badyBullets.createMultiple(30, 'lazer');
        this.badyBullets.setAll('anchor.x', 0.5);
        this.badyBullets.setAll('anchor.y', 1);
        this.badyBullets.setAll('outOfBoundsKill', true);
        this.badyBullets.setAll('checkWorldBounds', true);
        //add boss rocket
        this.rocket = game.add.group();
        this.rocket.enableBody = true;
        this.rocket.physicsBodyType = Phaser.Physics.ARCADE;
        this.rocket.createMultiple(9,'rocket');
        this.rocket.setAll('anchor.x', 0.5);
        this.rocket.setAll('anchor.y', 1);
        this.rocket.setAll('outOfBoundsKill', true);
        this.rocket.setAll('checkWorldBounds', true);

        //
        //add explode
        this.explosion=game.add.group();
        this.explosion.createMultiple(30,'explode');
        this.explosion.forEach(this.setupexplode,this);
        //
        
        //create player
        this.player=game.add.sprite(game.width/2, game.height-200, 'player');
        this.player.scale.setTo(0.5,0.5);
        this.player.anchor.setTo(0.5, 0.5);
        console.log(this.player);
        game.physics.arcade.enable(this.player);
        //this.player.enableBody=true;
        //吃到補子彈!!
        
        this.bull_num=0;
        this.addbulltime=0;
       
        //

        //life
        // Display the score
        this.lifeLabel = game.add.text(30, 30, 'life: 30',
        { font: '18px Arial', fill: '#ffffff' });
        this.scoreLabel = game.add.text(game.width-200, 30, 'score: 0',
        { font: '20px Arial', fill: '#ffffff' });
        // Initialize the score variable
        this.life = 30;
        this.score=0;
        this.bulltime=0;
        this.bigbulltime=0;
        this.round=1;
        this.waitfor5second=0;
        this.timetoshoot=0;//boss rocket
        this.bosshealth=2000;
     
            game.time.events.loop(1200, this.addenemy, this); 
            game.time.events.loop(3000, this.addbady, this);



        //pause/////////////
        pause_label = game.add.text(game.width - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function () {
            // When the paus button is pressed, we pause the game
            game.paused = true;

            // Then add the menu
            menu = game.add.sprite(game.width/2, game.height/2, 'player');
            menu.anchor.setTo(0.5, 0.5);

            // And a label to illustrate which menu item was chosen. (This is not necessary)
            choiseLabel = game.add.text(game.width/2, game.height-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
            choiseLabel.anchor.setTo(0.5, 0.5);
            
            
        });
        game.input.onDown.add(unpause, self);
        function unpause(event){
            // Only act if paused
            if(game.paused){
                // Calculate the corners of the menu
                var x1 = game.width/2 - 270/2, x2 = game.width/2 + 270/2,
                    y1 =game.heighth/2 - 180/2, y2 = game.height/2 + 180/2;
    
                // Check if the click was inside the menu
                if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                    // The choicemap is an array that will help us see which item was clicked
                    var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];
    
                    // Get menu local coordinates for the click
                    var x = event.x - x1,
                        y = event.y - y1;
    
                    // Calculate the choice 
                    var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);
    
                    // Display the choice
                    choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
                }
                else{
                    // Remove the menu and the label
                    menu.destroy();
                    choiseLabel.destroy();
    
                    // Unpause the game
                    game.paused = false;
                }
            }
        };

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unpause, self);





   
     
    },
    update: function() {
        this.moveplayer();
        this.shoot();
        this.bigshoot();
        this.rocketcontrol();
        
        if(0<game.time.now-this.waitfor5second&&game.time.now-this.waitfor5second<19){
            if((this.round==3)){
            console.log(game.time.now-this.waitfor5second);
            this.boss_warning.destroy();
            this.addboss();
            }
        }
        if(0<game.time.now-this.wait3second&&game.time.now-this.wait3second<19){
            this.playerDie();
        }
       // this.enemyshoot();
        this.background.tilePosition.y += 2;
      /*  if(this.round==1){
            this.badiescontrol();    
        }*/

        this.enemies_control();

        //this.changdir();
        game.physics.arcade.overlap(this.player, this.enemyBullets,this.enemyhityou, null, this);
        game.physics.arcade.overlap(this.bullet, this.enemies,this.youhitenemy, null, this);
        game.physics.arcade.overlap(this.bigbullet, this.enemies,this.youhitenemy, null, this);
        game.physics.arcade.overlap(this.player, this.enemies,this.collide, null, this);
        game.physics.arcade.overlap(this.player, this.badyBullets,this.enemyhityou, null, this);//the same as enemy
        game.physics.arcade.overlap(this.bullet, this.badies,this.youhitbady, null, this);
        game.physics.arcade.overlap(this.bigbullet, this.badies,this.youhitbady, null, this);
        game.physics.arcade.overlap(this.bullet, this.boss,this.youhitboss, null, this);
        game.physics.arcade.overlap(this.bigbullet, this.rocket,this.youhitrocket, null, this);
        game.physics.arcade.overlap(this.player, this.badies,this.collide, null, this);//the same as enemy
        game.physics.arcade.overlap(this.player, this.morebull,this.takebull, null, this);//the same as enemy
        game.physics.arcade.overlap(this.player, this.boss,this.collide, null, this);//the 
        game.physics.arcade.overlap(this.player, this.rocket,this.enemyhityou, null, this);
    },
    moveplayer: function(){
        if(this.player.x>0){
            if (this.cursor.left.isDown)
            this.player.x -= 5;
        }
        if(this.player.x<game.width){
            if(this.cursor.right.isDown)
            this.player.x += 5;
        }
        if(this.player.y>=0){
            if(this.cursor.up.isDown)
            this.player.y -= 5;
           // this.background.tilePosition.y += 2;
        }
        if(this.player.y<game.height){
            if(this.cursor.down.isDown)
            this.player.y += 5;
           // this.background.tilePosition.y -= 1;
        }
    },
    addboss:function(){
        console.log('boss is comming');
        this.boss.reset(game.width/2,0);
        this.boss.body.velocity.y=150;
        this.boss.alive=true;
       // this.boss.health=1200;
       // this.boss.maxHealth=1200;
       // console.log(game.time.now-this.waitfor5second);
      //  this.waitfor5second=0;
    },
    addenemy:function(){
     
       var enemy;
        for(var i=0;i<10;i++){
            var enemy_temp = this.enemies.children[i];
            if(enemy_temp.alive == false){
                enemy = enemy_temp;
                break;
            }
        }
        if(!enemy)return;
        var pos = game.rnd.pick([1, 2, 3])*game.width/4;
        enemy.reset(pos, 0);
        enemy.health = 40;
        enemy.body.velocity.x=game.rnd.pick([200,-200]);
        //enemy.alive = true;
        enemy.body.move = true;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;

    },
    addbady:function(){
        var bady;
        for(var i=0;i<2;i++){
            var bady_temp = this.badies.children[i];
            if(bady_temp.alive == false){
                bady = bady_temp;
                break;
            }
        }
        if(!bady)return;
        var pos = game.rnd.pick([1, 2, 3])*game.width/4;
        bady.reset(pos, 0);
        bady.health = 200;
        //bady.alive = true;
        bady.body.move = true;
       // bady.alive=false;
        bady.checkWorldBounds = true;
        bady.outOfBoundsKill = true;

    },
    collide:function(player,enemy){
        if(enemy!=this.boss){
            enemy.kill();
            this.life-=1;
            this.lifeLabel.text='life:'+this.life;
            var i=game.rnd.pick([0,1,2,3,4]);
            this.ouch[i].play();
            if(this.life==0){
                this.lifeLabel.destroy();
                this.player.kill();
                var explosions=this.explosion.getFirstExists(false);
                explosions.reset(this.player.body.x,this.player.body.y);
                explosions.play('explode',30,false,true);
                var i=game.rnd.pick([0,1,2,3,4]);
                this.ouch[i].play();
                this.bgmusic.destroy();
                this.wait3second=game.time.now+3000;
                
            }
            this.player.x=game.width/2;
            this.player.y=game.height-200;
            this.bull_num-=1;
        }
        
        if(enemy==this.boss){
            this.lifeLabel.destroy();
            this.player.kill();
            var explosions=this.explosion.getFirstExists(false);
            explosions.reset(this.player.body.x,this.player.body.y);
            explosions.play('explode',30,false,true);
            var i=game.rnd.pick([0,1,2,3,4]);
            this.ouch[i].play();
            this.bgmusic.destroy();
            this.wait3second=game.time.now+3000;
        }
    },
    bigshoot:function(){
        if(this.bigButton.isDown&&game.time.now>=this.bigbulltime){
            console.log('bigshooot');
            this.gun1sound.play();
            this.bigbullet.reset(this.player.x,this.player.y+10);
            this.bigbullet.body.velocity.y=-800;
            this.bigbulltime=game.time.now+5000;
        }

    },
    shoot:function(){
        if(this.fireButton.isDown&&game.time.now>this.bulltime){
            console.log('shooooooooooot !!!');
            this.gun1sound.play();
            for(var i=0;i<this.bull_num*2+1;i++){
                bull=this.bullet.getFirstExists(false);
                if(bull){
                    bull.reset(this.player.x,this.player.y+10);
                    bull.body.velocity.y=-400;
                    bull.body.velocity.x=(this.bull_num-i)*30;
                    this.bulltime=game.time.now+200;
                }
            }
            
        }
   
    },
 
    setupexplode:function(invader){
        invader.anchor.setTo(0.5,0.5);
        invader.animations.add('explode');

    },
    youhitenemy:function(bullet,enemies){
        if(this.round==1){
            this.explodesound.play();
            if(bullet==this.bigbullet){
                enemies.kill();
            }else{
                bullet.kill();
                enemies.kill();
            }
           this.score+=100;
           game.global.score=this.score;
           this.scoreLabel.text='score: '+this.score;
           var explosions=this.explosion.getFirstExists(false);
           explosions.reset(enemies.body.x,enemies.body.y);
           explosions.play('explode',30,false,true);
           if(this.score>=2000){
               this.round=2;
               ///
               
              // this.setfirstbull();
               if(game.time.now>this.addbulltime){
                var init_pos_x=[];
                for(var i=0;i<game.width;i++){
                    init_pos_x[i]=i;
                }
                var init_pos_y=[];
                for(var i=0;i<game.height;i++){
                    init_pos_y[i]=i;
                }
                this.morebull = game.add.sprite(game.rnd.pick(init_pos_x), game.rnd.pick(init_pos_y), 'bullet');
                game.physics.arcade.enable(this.morebull);
                this.morebull.anchor.setTo(0.5, 0.5);
                this.addbulltime+=100000;
                   
               }

               ///
               for(var i=0;i<10;i++){
                var enemy=this.enemies.children[i];
                if(enemy.alive==false){continue;}
                enemy.body.velocity.y=-600;
                enemy.body.velocity.x=game.rnd.pick([500,50,-500]);

               }
           }
        }
           
    },
    youhitbady:function(bullet,bady){
        if(this.round==2){
            this.explodesound.play();
            if(bullet==this.bigbullet){
               // bullet.kill();
                bady.health-=100;
                bullet.kill();
            }else{
                bullet.kill();
                bady.health-=40;
            }
            
            console.log(bady.health);
            var explosions=this.explosion.getFirstExists(false);
            explosions.reset(bady.body.x,bady.body.y);
            explosions.play('explode',30,false,true);
            if(bady.health<=0){
                bady.kill();
                this.score+=500;
                game.global.score=this.score;
                this.scoreLabel.text='score: '+this.score;
            }
            
            
            if(this.score>=5000){
                this.morebull.kill();
                this.waitfor5second=game.time.now+5000;
               // this.waitfor5second+=50;/////////////////////////////////////////////////////
                this.round=3;
                this.bull_num=1;
                this.boss_warning = game.add.text(game.width/2, game.height/2, 'The Boss is Coming!!!', {font: '40px Orbitron', fill: '#ffffff'});
                this.boss_warning.anchor.setTo(0.5, 0.5);
                for(var i=0;i<2;i++){
                    var bady=this.badies.children[i];
                    if(bady.alive==false){continue;}
                    bady.body.velocity.y=-600;
                    bady.body.velocity.x=game.rnd.pick([500,50,-500]);
    
                   }
            }
        }

    },
    youhitboss:function(boss,bullet){
        console.log('you hit boss');
        if(this.round==3){
            console.log('boss='+this.bosshealth);
            this.explodesound.play();
                if(bullet!=this.bigbullet){
                    this.bosshealth-=40;
                bullet.kill();
                }
                
            
            
            var explosions=this.explosion.getFirstExists(false);
            explosions.reset(bullet.body.x,bullet.body.y);
            explosions.play('explode',30,false,true);
            if( this.bosshealth<=0){
                //console.log('boss='+this.bosshealth);
                this.boss.alive=false;
                this.score+=2000;
                game.global.score=this.score;
                this.scoreLabel.text='score: '+this.score;
                this.bgmusic.destroy();
                game.state.start('win');

            }
        }

    },
    youhitrocket:function(bull,rocket){
        if(this.round==3){
            //bull.kill();
            rocket.kill();
            var explosions=this.explosion.getFirstExists(false);
            explosions.reset(rocket.body.x,rocket.body.y);
            explosions.play('explode',30,false,true);
            this.score+=100;
            game.global.score=this.score;
            this.scoreLabel.text='score: '+this.score;
        }
    },
    enemyhityou:function(player,enemyBullets){
        enemyBullets.kill();
        var explosions=this.explosion.getFirstExists(false);
        explosions.reset(enemyBullets.body.x,enemyBullets.body.y);
        explosions.play('explode',30,false,true);
        this.life-=1;
        this.lifeLabel.text='life:'+this.life;
        var i=game.rnd.pick([0,1,2,3,4]);
        this.ouch[i].play();
        if(this.life==0){
            this.player.kill();
            var explosions=this.explosion.getFirstExists(false);
            explosions.reset(this.player.body.x,this.player.body.y);
            explosions.play('explode',30,false,true);
            var i=game.rnd.pick([0,1,2,3,4]);
            this.ouch[i].play();
            this.bgmusic.destroy();
            this.wait3second=game.time.now+3000;
        }
        this.bull_num=0;
       
    },
  
    enemies_control:function(){
        if(this.round==1){
            for(var i=0;i<10;i++){
                var enemy=this.enemies.children[i];
                if(enemy.alive==false){continue;}
                //move
                if(enemy.y>=150){
                    enemy.body.velocity.y=game.rnd.pick([-30,-50,-100]);
                }else if(enemy.y<=20){
                    enemy.body.velocity.y=game.rnd.pick([50,120,250]);
                }
                if(enemy.x>=game.width-10){
                    enemy.body.velocity.x=game.rnd.pick([-100,-200,-300]);
                }else if(enemy.x<=20){
                    enemy.body.velocity.x=game.rnd.pick([80,170,300]);
                }
                //shooot   
                this.enemybullet_period[i]+=1;
                if(this.enemybullet_period[i] >= 100){
                    //enemy shoot
                    var bullet = this.enemyBullets.getFirstExists(false);
                    var enemy=this.enemies.children[i];
                    if (bullet){
                        var enemy=this.enemies.children[i];
                        bullet.reset(enemy.x,enemy.y+50);
                        bullet.body.velocity.y = 300;
                    }
                    this.enemybullet_period[i] = 0;
                }
                    
                
            }
            
        }else if(this.round==2){
            for (var i = 0; i < 2; i++) { 
                var bady = this.badies.children[i];
                if(bady.alive == false){continue;}
                //move!!
                if(bady.y>=150){
                    bady.body.velocity.y=game.rnd.pick([-10,-50,-100]);
                }else if(bady.y<=20){
                    bady.body.velocity.y=game.rnd.pick([50,120,250]);
                }
                if(bady.x>=game.width-10){
                    bady.body.velocity.x=game.rnd.pick([0,-50,-700]);
                }else if(bady.x-this.player.x>500){
                    bady.body.velocity.x=game.rnd.pick([-150,-250]);
                }else if(bady.x-this.player.x>250){
                    bady.body.velocity.x=game.rnd.pick([-50,-100]);
                }else if(bady.x<=20){
                    bady.body.velocity.x=game.rnd.pick([40,80,120,300]);
                }else if(bady.x-this.player.x<-600){
                    bady.body.velocity.x=game.rnd.pick([300,500]);
                }
                //shoot1111
                this.badybullet_period[i]++;
                if(this.badybullet_period[i] >= 50){
                    //enemy shoot
                    
                    this.lazersound.play();
                    var bullet1 = this.badyBullets.getFirstExists(false);
                    if (bullet1){
                        bullet1.reset(bady.x, bady.y+8);
                        bullet1.body.velocity.y = 500;
                    }
                    var bullet2 = this.badyBullets.getFirstExists(false);
                    if(bullet2){
                        bullet2.reset(bady.x-10, bady.y+8);
                        bullet2.body.velocity.y = 500;
                        bullet2.body.velocity.x=-100;
                    }
                    var bullet3 = this.badyBullets.getFirstExists(false);
                    
                    
                    if(bullet3){
                        bullet3.reset(bady.x+10, bady.y+8);
                        bullet3.body.velocity.y=500; 
                        bullet3.body.velocity.x=100;

                    }
                    this.badybullet_period[i] = 0;
                }  
            }
        }else if(this.round==3){
            //move
            if(this.boss.alive){
                if(this.boss.y>=150){
                this.boss.body.velocity.y=0;
            }else if(this.boss.y<=100){
                this.boss.body.velocity.y=80;
            }
            if(this.boss.x>=game.width-30){
                this.boss.body.velocity.x=-300;
            }else if(this.boss.x<=30){
                this.boss.body.velocity.x=300;
            }else if((this.boss.x-this.player.x)*(this.boss.x-this.player.x)+(this.boss.y-this.player.y)*(this.boss.y-this.player.y)<40000){
                this.boss.body.velocity.x=(this.boss.x-this.player.x)*3;
                if(this.boss.y>=100){
                    this.boss.body.velocity.y=-50;
                }
            }
            //shoot
            if(game.time.now>this.timetoshoot){
                this.timetoshoot=game.time.now+game.rnd.pick([4,5,6,7,8])*100;
                this.lazersound.play();
                var rocket = this.rocket.getFirstExists(false);
                if(rocket){
                    rocket.reset(this.boss.x, this.boss.y+10);
                   // rocket.body.velocity.y = 400;
                }

            }
            }
            
            
        }

    },
    rocketcontrol:function(){
        for(var i=0;i<9;i++){
            var rocket=this.rocket.children[i];
            if(!rocket){continue;}
            if(rocket.x-this.player.x>0&&rocket.body.velocity.x>=-350){
                rocket.body.velocity.x-=10;
                rocket.body.velocity.y=Math.sqrt(160000-Math.pow(rocket.body.velocity.x,2));
                game.add.tween(rocket).to( { angle:  rocket.body.velocity.x/400*(-90) }, 20, Phaser.Easing.Linear.None, true);

            }else if(rocket.x-this.player.x<0&&rocket.body.velocity.x<=350){
                rocket.body.velocity.x+=10;
                rocket.body.velocity.y=Math.sqrt(160000-Math.pow(rocket.body.velocity.x,2));
                game.add.tween(rocket).to( { angle:  rocket.body.velocity.x/400*(-90) }, 20, Phaser.Easing.Linear.None, true);
            }
        }
    },
    takebull: function(player, bull) {
        bull.kill(); // Kill the coin.
        this.bull_num += 1;
        var bull_pos=[{x:50,y:200},{x:720,y:100},{x:950,y:450}];
        for (var i = 0; i < bull_pos.length; i++) {
            if (bull_pos[i].x == this.morebull.x) {
            bull_pos.splice(i, 1);
            }
            }
            var new_pos=game.rnd.pick(bull_pos);
            this.morebull.reset(new_pos.x, new_pos.y); 
            console.log(new_pos);
        },
    
    playerDie: function() { 
        this.bgmusic.destroy();
        
        game.state.start('lose');
    }


    }; 