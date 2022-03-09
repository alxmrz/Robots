import Point from './Point';
import Wall from './Wall';
import Tower from './Tower';
import RobotFactory from './RobotFactory';
import Gate from './Gate';
import Phaser from "phaser";

export default class Destination extends Phaser.GameObjects.Arc {
    constructor(point, scene, radius = 50) {
        super(scene, point.getX(), point.getY(), 25, 0, 360, false, 0x000000, 0.5);
        this.x = point.getX();
        this.y = point.getY();
        this.point = point;
        this.setOrigin(0.5,0.5);
        this.scene = scene;

        this.scene.add.existing(this);
    }

    getPoint() {
        return this.point;
    }
}

