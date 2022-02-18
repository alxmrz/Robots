import SceneObject from './SceneObject';
import Phaser from "phaser";

export default class Tower extends Phaser.GameObjects.Rectangle {
  constructor( point, scene) {
    super(scene, point.getX(), point.getY(), 50, 50, 0xff0000);
    this.setOrigin(0, 0);

    this.width = 50;
    this.height = 50;
    this.fillStyle = ''
    this.name = 'Tower';

    this.scene.add.existing(this);
  }
}
