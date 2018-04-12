define(['../src/SceneObject'], function(SceneObject){
  class Wall extends SceneObject {
    constructor(point) {
      super(point)
      this.width = 25;
      this.height = 25;
      this.fillStyle = 'brown'
      this.name = 'Wall';
    }

  }
  return Wall;
});
