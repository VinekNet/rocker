class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setBounce(0.);
        this.setGravityY(850)
        this.setFriction(1,1);
        this.setDisplaySize(64,110);
        this.setBodySize(this.body.width,this.body.height);
        this.setOffset(0, 0);
        this.sens = 1;
        this.ramped = false;
        this.rampActiv;
        this.key = 'default';
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 16 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 8 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'stance',
            frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 4 }),
            frameRate: 4
        });
        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('idleR', { start: 0, end: 4 }),
            frameRate: 4
        });
        this.anims.create({
            key: 'jump',
            frames: [{ key: 'JUMP', frame: 2 }],
            frameRate: 4
        });
        this.anims.create({
            key: 'jumpback',
            frames: [{ key: 'JUMPB', frame: 2 }],
            frameRate: 4
        });

        this._directionX=0;
        this._directionY=0;
        this.energy = 50;

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
    stop() {
        if (this.ramped == false) {
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.directionY = 0;
            this.directionX = 0;
        }
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move() {

        if (this._directionX < 0) {
            this.sens = -1;
            this.setVelocityX(-200);
            this.anims.play('left', true);
        }
        else if (this._directionX > 0) {
            this.sens = 1;
            this.setVelocityX(200);
            this.anims.play('right', true);
        }

        else {
            if (this.ramped == false) {
                this.setVelocityX(0);
                this.anims.play('stance', true);
                this.anims.play(this.sens === -1 ? 'back' : 'stance', true);
            }
        }




        if (this._directionY < 0) {
            if (this.body.blocked.down && this.ramped == false) {
                this.setVelocityY(-550);

            }
            else {
                if (this.sens == -1) {
                    this.anims.play('jumpback', true);
                }
                else { this.anims.play('jump', true); }
            }
        }
        else {
            if (this.body.blocked.down) {

            }
            else {
                if (this.sens == -1) {
                    this.anims.play('jumpback', true);
                }
                else { this.anims.play('jump', true); }
            }
        }
    }
    



    

    shoot() {
        if (this.energy >= 5) {
            var bullet = new Shoot(this.scene, this.x + 20 * this.sens, this.y - 10);
            console.log("Tir");
            setTimeout(function () {
                bullet.destroy();
            }, 1500);
            this.energy -= 5;
        }
    }

    shield() {
        if (this.energy >= 10) {
            var shield = new Shield(this.scene, this.x +50 * this.sens, this.y - 10);
            console.log("Shield");
            setTimeout(function () {
                shield.destroy();
            }, 5000);
            this.energy -= 10;
        }
    }

    ramp() {
        if (this.energy >= 25) {
            this.rampActiv = new Ramp(this.scene, this.x + 126 * this.sens, this.y + 25);
            console.log("Rampe");
            this.energy -= 25;
        }
    }

    boostRamp() {
        this.body.setVelocityX(200000);
        this.body.setVelocityY(-500);
        console.log(this.body.velocity);
        let here = this;
        setTimeout(function () {
            here.rampActiv.destroy();
        }, 500);
    }


}