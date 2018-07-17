import SceneObject from './SceneObject';

export default class Tower extends SceneObject {
  constructor( point ) {
    super( point )
    this.width = 50;
    this.height = 50;
    this.fillStyle = '#8A2BE2'
    this.name = 'Tower';
  }
}
