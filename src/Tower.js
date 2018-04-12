define(['../src/SceneObject'], function(SceneObject){
  class Tower extends SceneObject {
    constructor(point) {
      super(point)
      this.width = 25;
      this.height = 25;
      this.fillStyle = '#8A2BE2'
      this.name = 'Tower';
    }
  }
  return Tower;
});