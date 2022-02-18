import SceneObject from './SceneObject';
import Phaser from "phaser";

export default class Wall extends Phaser.GameObjects.Rectangle {
  constructor( point, scene ) {
    super(scene, point.getX(), point.getY(), 25, 25, 0x808080);
    this.setOrigin(0, 0);

    this.width = 25;
    this.height = 25;
    this.fillStyle = 'brown'
    this.name = 'Wall';

    this.scene.add.existing(this);
  }
}

