import Point from './Point';
import Wall from './Wall';
import Tower from './Tower';
import RobotFactory from './RobotFactory';
import Gate from './Gate';
import Phaser from "phaser";
import MoveTo from "phaser3-rex-plugins/plugins/moveto";

export default class Builder extends Phaser.GameObjects.Rectangle {
    constructor(point, scene) {
        super(scene, point.getX(), point.getY(), 50, 50, 0x0000ff);
        this.x = point.getX();
        this.y = point.getY();
        this.point = point;
        this.setOrigin(0, 0);
        this.setInteractive();
        this.instructions = [];
        this.seconds = 0;
        this.nextSecond = 0;
        this.offsetX = undefined;
        this.offsetY = undefined;
        this.speed = 1;
        this.scene = scene;
        this.width = 50;
        this.height = 50;
        this.name = 'Builder';
        this.destination = null;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

       this.moveTo = new MoveTo(this, {speed: 200, rotateToTarget: false});
       this.moveTo.on('complate', function (gameObject, moveTo) {
           gameObject.destination.destroy();
       })

    }

    setDestination(destination) {
        if (this.destination) {
          //  destination.destroy();
        }

        this.destination = destination;
        this.moveTo.moveTo(destination.x, destination.y);
    }

    buildWall() {
        this.addNewInstruction(
            function () {
                this.scene.sceneObjects['builders'].push(new Wall(new Point(this.point.getX(), this.point.getY()),  this.scene));
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
        /*this.addNewInstruction(
            function (offset) {
                let date = new Date();
                if (this.offsetX === undefined) {
                    this.offsetX = this.point.getX() + offsetX;
                }

                if (this.point.getX() < this.offsetX) {
                    this.point.setX(this.point.getX() + this.speed);
                    if (this.seconds !== date.getSeconds()) {
                        this.nextSecond = date.getSeconds();
                        this.seconds = date.getSeconds();
                    }
                    this.x = this.point.getX();

                    return false;
                }

                this.offsetX = undefined;
                return true;
            },
            offsetX
        );*/
    }

    moveLeft(offsetX) {
        this.x -= offsetX;
       /* this.addNewInstruction(
            function (offset) {
                if (this.offsetX === undefined) {

                    this.offsetX = this.point.getX() - offset;

                }

                if (this.point.getX() > this.offsetX) {
                    this.point.setX(this.point.getX() - this.speed);
                    this.x = this.point.getX();
                    return false;
                }
                this.offsetX = undefined;
                return true;
            },
            offsetX
        );*/
    }

    moveDown(offsetY) {
        this.addNewInstruction(
            function (offsetY) {
                if (this.offsetY === undefined) {
                    this.offsetY = this.point.getY() + offsetY;
                }
                if (this.point.getY() < this.offsetY) {
                    this.point.setY(this.point.getY() + this.speed);
                    this.y = this.point.getY();
                    return false;
                }
                this.currentSprite = 0;
                this.offsetY = undefined;
                return true;
            },
            offsetY
        );
    }

    moveUp(offsetY) {
        this.addNewInstruction(
            function (offsetY) {
                if (this.offsetY === undefined) {
                    this.offsetY = this.point.getY() - offsetY;
                }

                if (this.point.getY() > this.offsetY) {
                    this.point.setY(this.point.getY() - this.speed);
                    this.y = this.point.getY();
                    return false;
                }
                this.currentSprite = 0;
                this.offsetY = undefined;
                return true;
            },
            offsetY
        );
    }

    addNewInstruction(callback, args) {
        this.instructions.push([callback, args]);
    }

    runInstructions() {
        if (this.instructions.length !== 0) {
            if (this.instructions[0][1]) {
                var func = this.instructions[0][0].bind(this, ...[this.instructions[0][1]]);
            } else {
                var func = this.instructions[0][0].bind(this);
            }


            if (func()) {
                this.instructions.shift();
                if (this.instructions.lenght === 0) {
                    this.currentSprite = 0;
                }
            }
        }
    }

    getOrientation(orientation) {
        return this.orientation;
    }

    getPoint() {
        return this.point;
    }
}

