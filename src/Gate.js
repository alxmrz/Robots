import Phaser from "phaser";

export default class Gate extends Phaser.GameObjects.Rectangle {
    constructor(point, scene, type = 'horizontal') {
        let width = 0;
        let height = 0;
        if (type === 'horizontal') {
            width = 75;

            height = 25;
        } else {
            width = 25;
            height = 75;
        }
        super(scene, point.getX(), point.getY(), width, height, 0x8A2BE2);

        this.setOrigin(0, 0);

        this.width = width;
        this.height = height;


        this.type = type;
        this.fillStyle = '#8A2BE2'
        this.name = 'Gate';

        this.scene.add.existing(this);

    }

}
