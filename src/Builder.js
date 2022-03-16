import Point from './Point';
import Wall from './Wall';
import Tower from './Tower';
import RobotFactory from './RobotFactory';
import Gate from './Gate';
import Phaser from "phaser";
import MoveTo from "phaser3-rex-plugins/plugins/moveto";
import Destination from "@app/Destination";

export default class Builder extends Phaser.GameObjects.Rectangle {
    constructor(point, scene) {
        super(scene, point.getX(), point.getY(), 50, 50, 0x0000ff);
        this.x = point.getX();
        this.y = point.getY();
        this.point = point;
        this.setOrigin(0, 0);
        this.setInteractive();
        this.instructions = [];
        this.speed = 1;
        this.scene = scene;
        this.width = 50;
        this.height = 50;
        this.name = 'Builder';
        this.destination = null;
        this.path = [];
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.moveTo = new MoveTo(this, {speed: 200, rotateToTarget: false});
        this.moveTo.on('complete', (gameObject, moveTo) => {
            if (this.path.length === 0) return;
            this.destination.destroy();
            this.setDestination(new Destination(this.path.shift(), this.scene));
        });
        this.body.setSize(45, 45, 5, 5);
    }

    followPath(path) {
        this.setDestination(new Destination(path.shift(), this.scene));
        this.path = path;
    }

    setDestination(destination) {
        this.destination = destination;
        this.moveTo.moveTo(destination.x, destination.y);
    }

    buildWall() {
        this.addNewInstruction(
            function () {
                this.scene.sceneObjects['builders'].push(new Wall(new Point(this.point.getX(), this.point.getY()), this.scene));
                return true;
            }
        );
    }

    buildTower() {
        this.addNewInstruction(
            function () {
                this.scene.sceneObjects['builders'].push(new Tower(new Point(this.point.getX(), this.point.getY()), this.scene));
                return true;
            }
        );
    }

    buildGate(gateType) {
        this.addNewInstruction(
            function (gateType) {
                this.scene.sceneObjects['builders'].push(new Gate(new Point(this.point.getX(), this.point.getY()), this.scene, gateType));
                return true;
            },
            gateType
        );
    }

    buildRobotFactory() {
        this.addNewInstruction(
            function () {
                this.scene.sceneObjects['builders'].push(new RobotFactory(new Point(this.point.getX(), this.point.getY()), this.scene));
                return true;
            }
        );
    }

    moveRight(offsetX) {
        this.x += offsetX;
    }

    moveLeft(offsetX) {
        this.x -= offsetX;
    }

    moveDown(offsetY) {
        this.y += offsetY;
    }

    moveUp(offsetY) {
        this.y -= offsetY;
    }

    addNewInstruction(callback, args) {
        this.instructions.push([callback, args]);
    }

    runInstructions() {
        if (this.instructions.length !== 0) {
            if (this.instructions[0][1]) {
                let func = this.instructions[0][0].bind(this, ...[this.instructions[0][1]]);
            } else {
                let func = this.instructions[0][0].bind(this);
            }


            if (func()) {
                this.instructions.shift();
            }
        }
    }

    getOrientation(orientation) {
        return this.orientation;
    }

    getPoint() {
        return this.point;
    }

    resetDestination() {
        if (this.destination) {
            this.destination.destroy();
        }
    }

    position() {
        return this.body.position;
    }
}

