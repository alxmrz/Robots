define(['../src/SceneObject'], function(SceneObject){
  class RobotFactory extends SceneObject {
    constructor(point, scene) {
      super(point, scene)
      this.width = 100;
      this.height = 100;
      this.fillStyle = '#00008B'
      this.name = 'RobotFactory';
    }
  }
  return RobotFactory;
});