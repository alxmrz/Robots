import ObjectFactory from './ObjectFactory';
import Builder from './Builder';
import Point from "@app/Point";

export default class Level extends Phaser.Scene{
  constructor() {
    super();
    this.sceneObjects = {
      builders: []
    };
    this.factory = new ObjectFactory();
  }
  preload() {
    this.canvas = this.sys.game.canvas;
    this.add.grid(0, 0, this.canvas.clientWidth,  this.canvas.clientHeight, 25, 25).setOrigin(0, 0).setOutlineStyle(0x000000);
  };
  create() {
    this.addBuilderToScene( 25, 75 );

    let builders = this.getBuilders();
  }
  update(time, delta) {
  }

  addBuilderToScene( x, y ) {
    this.sceneObjects['builders'].push( this.factory.getBuilder( x, y, this ) );
  }

  getBuilders() {
    return this.sceneObjects['builders'];
  }

}