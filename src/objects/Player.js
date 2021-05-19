class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.);
        this.setGravityY(700)
        this.setFriction(1,1);
        this.setDisplaySize(64,110);
        this.setBodySize(this.body.width,this.body.height);
        this.setOffset(0, 0);
        this.sens = 1;

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
        });

        this._directionX=0;
        this._directionY=0;


    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);   
        this.directionY=0;
        this.directionX=0;
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move(){
        switch (true) {
            case this._directionX < 0:
                this.sens = -1;
                this.setVelocityX(-160);
                this.anims.play('left', true);
                break;
            case this._directionX > 0:
                this.sens = 1;
                this.setVelocityX(160);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
            // this.anims.play('stance', true);
            //this.anims.play(this.sens===-1 ? 'back' : 'stance' ,true); //équivalent d'un if, pour mémoriser la position du personnage pour qu'il regarde à gauche ou à droite en fonction du dernier déplacement effectué
        }
        


        /*switch (true){
            case this._directionX<0:
                this.setVelocityX(-160);
                this.anims.play('left', true);
                break;
            case this._directionX>0:

                this.setVelocityX(160);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                this.anims.play('turn');
        }*/

        if(this._directionY<0){
            if(this.body.blocked.down || this.body.touching.down){
                this.setVelocityY(-550);
            
            }
        }


    }
    /*shoot(){
        this.blasterButton = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Z,
          );

          if (this.blasterButton.isDown) {
            this._setShootingState();
            
          }
    }*/
    shoot() {
        var bullet = new Shoot(this.scene, this.x, this.y);
        console.log("Tir");
        setTimeout(function () {
            bullet.destroy();
        }, 1500);
    }


}