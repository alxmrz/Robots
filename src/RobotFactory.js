import SceneObject from './SceneObject';
import Phaser from "phaser";
export default class RobotFactory extends Phaser.GameObjects.Rectangle {
  constructor( point, scene ) {
    super(scene, point.getX(), point.getY(), 100, 100, 0x00008B);

    this.setOrigin(0, 0);
    this.setInteractive();
    this.x = point.getX();
    this.y = point.getY();
    this.width = 100;
    this.height = 100;
    this.fillStyle = '#00008B'
    this.name = 'RobotFactory';
    this.scene.add.existing(this);

  }
}
