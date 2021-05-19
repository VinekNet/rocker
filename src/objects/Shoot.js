class Shoot extends ObjetPhysique {
    constructor(scene, x, y) {
        super(scene, x, y, "tir");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = false;
        this.setDisplaySize(200, 100);
        this.setBodySize(this.body.width, this.body.height);

        this.setVelocityX(450 * scene.player.sens);
        this.setBounce(1);
        this.setDepth(1000);
        //scene.monstersContainer.iterate(monster => {
            //scene.physics.add.overlap(this, monster, function () { monster.Tmortlol() }, null, scene);
        //})
        scene.physics.add.overlap(this, Twomp, function () { Twomp.Tmortlol() }, null, scene);
    }
}